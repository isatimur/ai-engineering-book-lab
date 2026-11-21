// website/scripts/press-explainer-lib.mjs
// Pure functions behind src/data/press-explainer.json, the data for the
// "layer by layer" explainer on the press homepage. gen-press-explainer.mjs
// writes the file; src/lib/pressExplainer.test.ts rebuilds it from the same
// sources and fails if the committed copy has drifted.
//
// The evidence files are ~300 KB together. The press page needs about 3 KB of
// them, so this step keeps the full files out of the press bundle.

/**
 * The sample claim the explainer follows from talk to chapter. An editor chose
 * it: the highest-ranked claims by chapter count carry ASR fragments as quotes
 * ("classic benchmark maxing."), and a reader judges the method by the sample.
 * `lead` names the anchor whose quote the transcript layer shows.
 */
export const SAMPLE = {
  claimId: 'claims#4',
  lead: { videoId: 'am_oeAoUhew', start: '00:24:40.799' },
};

/** Index every claim of one book: its text, level, chapters and unique anchors. */
export function indexClaims(evidence) {
  const claims = new Map();
  for (const [chapter, list] of Object.entries(evidence)) {
    for (const c of list) {
      let entry = claims.get(c.claim_id);
      if (!entry) {
        entry = { id: c.claim_id, text: c.text, support: c.support_level, chapters: new Set(), anchors: new Map() };
        claims.set(c.claim_id, entry);
      }
      entry.chapters.add(Number(chapter));
      for (const a of c.anchors) entry.anchors.set(`${a.video_id}@${a.start}`, a);
    }
  }
  return claims;
}

/** The sample claim with its chapters and anchors. Throws if the sources lost it. */
export function buildSample(evidence) {
  const entry = indexClaims(evidence).get(SAMPLE.claimId);
  if (!entry) throw new Error(`sample claim ${SAMPLE.claimId} is not in evidence.json`);
  const anchors = [...entry.anchors.values()].map((a) => ({
    label: a.label,
    videoId: a.video_id,
    start: a.start,
    end: a.end,
    startSeconds: a.start_seconds,
    confidence: a.confidence,
    quote: a.quote,
  }));
  const lead = anchors.findIndex((a) => a.videoId === SAMPLE.lead.videoId && a.start === SAMPLE.lead.start);
  if (lead < 0) throw new Error(`lead anchor ${SAMPLE.lead.videoId} ${SAMPLE.lead.start} is not on ${SAMPLE.claimId}`);
  // The lead anchor goes first, so every layer can read anchors[0].
  anchors.unshift(...anchors.splice(lead, 1));
  return {
    claimId: entry.id,
    number: Number(entry.id.split('#')[1]),
    text: entry.text,
    support: entry.support,
    chapters: [...entry.chapters].sort((x, y) => x - y),
    anchors,
  };
}

/**
 * How the chapters of one book share claims. A link joins two chapters that
 * cite the same ledger entry; its weight is the number of entries they share.
 */
export function buildWeb(evidence) {
  const claims = [...indexClaims(evidence).values()];
  const chapterNumbers = Object.keys(evidence).map(Number).sort((x, y) => x - y);
  const pair = new Map();
  for (const c of claims) {
    const chs = [...c.chapters].sort((x, y) => x - y);
    for (let i = 0; i < chs.length; i++) {
      for (let j = i + 1; j < chs.length; j++) {
        const key = `${chs[i]}-${chs[j]}`;
        pair.set(key, (pair.get(key) ?? 0) + 1);
      }
    }
  }
  return {
    claims: claims.length,
    shared: claims.filter((c) => c.chapters.size > 1).length,
    chapters: chapterNumbers.map((n) => ({
      n,
      claims: claims.filter((c) => c.chapters.has(n)).length,
    })),
    links: [...pair.entries()]
      .map(([key, shared]) => {
        const [a, b] = key.split('-').map(Number);
        return { a, b, shared };
      })
      .sort((x, y) => x.a - y.a || x.b - y.b),
  };
}

/**
 * The rival panel. judge-scores.json does not name its models; the panel
 * definition does (scripts/mash_agent/cli.py: "the median of deepseek-chat /
 * llama-3.3-70b / qwen-2.5-72b").
 */
export const PANEL_MODELS = ['DeepSeek Chat', 'Llama 3.3 70B', 'Qwen 2.5 72B'];

const DIM_LABELS = {
  humanness: 'Reads as human',
  usefulness: 'Useful to a practitioner',
  evidence_density: 'Evidence density',
  claim_defensibility: 'Claims hold up',
};

/** Book-level panel scores. A dimension the last run scored on zero paragraphs is left out. */
export function buildPanel(scores) {
  const dims = scores.run.dims
    .filter((d) => (scores.run.coverage[d]?.total ?? 0) > 0)
    .map((d) => ({
      id: d,
      label: DIM_LABELS[d] ?? d,
      score: scores.book[d],
      paragraphs: scores.run.coverage[d].total,
    }));
  return { models: PANEL_MODELS, runId: scores.run.run_id, dims };
}

/** The whole explainer payload. Books without a ledger yet are left out. */
export function buildExplainer({ book1, book2, scores }) {
  const webs = [];
  if (Object.keys(book1).length) webs.push({ book: 1, ...buildWeb(book1) });
  if (Object.keys(book2).length) webs.push({ book: 2, ...buildWeb(book2) });
  return { sample: buildSample(book1), webs, panel: buildPanel(scores) };
}
