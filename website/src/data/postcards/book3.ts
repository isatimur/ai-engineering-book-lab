import { publicUrl } from '../book';
import type { Postcard } from '../figurePostcards';

/** Book 3 postcards after chapter 1. See figurePostcards.ts for the rules. */

/** "https://aiepress.com/third-book" -> "aiepress.com/third-book". */
const at = (path: string) => publicUrl(path).replace(/^https?:\/\//, '').replace(/\/$/, '');

const TO = 'the reader who turned the card';

/** The fields every Book 3 card shares with chapter 1's. */
const base = (chapter: string, word: string, title: string) => ({
  book: 'book3' as const,
  bookNo: 3 as const,
  chapter,
  bookTitle: 'The Shape of the Work',
  stamp: {
    title: ['The Shape', 'of the Work'],
    cover: '/covers/the-shape-of-the-work-600w.webp',
    position: 'center 78%',
    size: '190% auto',
  },
  postmarkRing: `AIEPRESS.COM · CHAPTER ${word} · ${title} ·`,
  address: { to: TO, from: `The Shape of the Work, ch. ${Number(chapter)}`, at: at('/third-book') },
});

const art = (chapter: string, alt: string) => ({
  wide: `/postcards/book3-ch${chapter}-wide.jpg`,
  tall: `/postcards/book3-ch${chapter}-tall.jpg`,
  alt,
});

export const BOOK3_MORE: Postcard[] = [
  {
    ...base('02', 'TWO', 'INTENT FIRST'),
    riddle: 'The agents build faster than ever. So why do good products get worse faster?',
    art: art(
      '02',
      'Small robots finish a grand stone bridge over a dry meadow, while the real river runs past unbridged; a woman with a map looks from one to the other.',
    ),
    back: {
      kicker: 'Speed goes where it is pointed',
      headline: ['Nobody checked the pointing. ', 'Decide what to build first.'],
      bars: [
        { label: 'build first', text: 'working software nobody needed — faster' },
        { label: 'intent first', text: 'the job the user hires the product to do', hot: true },
      ],
      barNote: {
        value: '3',
        text: 'sides of that job: functional, social, emotional (Dodds)',
        basis: ['He then breaks the job into three dimensions'],
      },
      stats: [
        {
          value: '2–3',
          text: 'real options on the record — one of them: build nothing',
          basis: ['Laying out two or three real alternatives'],
        },
        {
          value: '15+',
          text: 'meetings a week, and the CTO still prototypes to keep his judgement',
          hot: true,
          basis: ['His week is fifteen-plus recurring meetings'],
        },
      ],
      sources: 'Sources: #1244, #1245 — Kent C. Dodds, EpicProduct.engineer · chapter 2 (Hursh Agrawal, The Browser Company)',
    },
    quote: {
      text: 'Products go from good to bad faster than ever.',
      by: 'Dax Raad, as Kent C. Dodds quotes him',
    },
  },
  {
    ...base('03', 'THREE', 'WHAT A SPEC IS FOR'),
    riddle: 'The code still runs on Monday. So what did the weekend’s work throw away?',
    art: art(
      '03',
      'A lamp throws the shadow of a finely rigged model ship onto a wall as a blank blob; a man studies the shadow with a magnifying glass, his back to the ship.',
    ),
    back: {
      kicker: 'The weekend build, on Monday',
      headline: ['The code keeps the what. ', 'The specification keeps the why.'],
      bars: [
        { label: 'code only', text: 'a lossy projection — the reasons were never stored' },
        { label: 'specification', text: 'a surface to argue on, while change is cheap', hot: true },
      ],
      barNote: {
        value: 'week 1',
        text: 'when a spec does its job: it surfaces the disagreement early',
        basis: ["if the document's job was to surface a disagreement in week one"],
      },
      stats: [
        {
          value: '10 yrs',
          text: 'of the same consistency problems on one product, before agents (Cichra)',
          basis: ['the same ones he saw across a decade on a single product'],
        },
        {
          value: '2nd',
          text: 'reader: the agent, which reads everything and cannot ask why',
          hot: true,
          basis: ['the document now has a second audience that did not exist before, and that audience reads everything'],
        },
      ],
      sources: 'Sources: #265 — Sean Grove, OpenAI · #106 — Corey J. Gallon, Rexmore · chapter 3 (Michal Cichra, Safe Intelligence)',
    },
    quote: { text: 'If you don’t have a specification, you just have a vague idea.', by: 'Sean Grove, OpenAI' },
  },
  {
    ...base('04', 'FOUR', 'THE PLAN'),
    riddle: 'A bad line of code is one bad line. What is a bad line of plan?',
    art: art(
      '04',
      'A surveyor’s instrument on a hill aims slightly askew; the railway laid from it drifts across the valley and ends in a field beside the town it was meant to reach.',
    ),
    back: {
      kicker: 'Where an error multiplies',
      headline: ['One bad part of a plan: ', 'a hundred bad lines of code.'],
      bars: [
        { label: 'review the diff', text: 'the cheapest artifact, after the error has multiplied' },
        { label: 'review the plan', text: 'one read catches it upstream', hot: true },
      ],
      barNote: {
        value: '100',
        text: 'bad lines of code that one bad part of a plan can become (Horthy)',
        basis: ['a bad part of a plan can be a hundred bad lines of code'],
      },
      stats: [
        {
          value: '40%',
          text: 'of the context window — past it, the “dumb zone”; size each step to fit',
          basis: ['He calls the region past roughly forty percent of the window the dumb zone'],
        },
        {
          value: '35,000',
          text: 'lines in about seven hours, after research and a read plan',
          hot: true,
          basis: ['about seven hours on a Saturday and shipping some 35,000 lines'],
        },
      ],
      sources: 'Sources: #89 — Dex Horthy, HumanLayer (citing Geoffrey Huntley)',
    },
    quote: {
      text: 'AI cannot replace thinking. It can only amplify the thinking you have done or the lack of thinking you have done.',
      by: 'Dex Horthy, HumanLayer',
    },
  },
  {
    ...base('05', 'FIVE', 'EXECUTION UNDER A SPEC'),
    riddle: 'Nobody is watching the agent work tonight. What still holds it to the plan?',
    art: art(
      '05',
      'At dusk a small robot gardener works alone inside a high-walled garden; at the only gate each basket must cross a balance scale; the farmhouse beyond is dark.',
    ),
    back: {
      kicker: 'The plan, running unwatched',
      headline: ['Only two things bind it: ', 'what it can reach, and what gets checked.'],
      bars: [
        { label: 'instruction', text: 'asked to follow — a suggestion once it runs' },
        { label: 'constraint', text: 'a sandbox it cannot leave, a check that must pass', hot: true },
      ],
      barNote: {
        value: '2',
        text: 'mechanisms bind a spec during execution; the rest is advisory',
        basis: ['a specification binds through exactly two mechanisms, and everything else is advisory'],
      },
      stats: [
        {
          value: '15,000',
          text: 'lines deleted at Cursor, replaced by one skill — “almost as good”',
          basis: ['around 15,000 lines of code deleted'],
        },
        {
          value: '1,000s',
          text: 'of repos patched for CVEs: one crisp spec, checked repo by repo',
          hot: true,
          basis: ['tens of thousands of developers, thousands of repositories'],
        },
      ],
      sources: 'Sources: #1330, #42 — Robert Brennan, OpenHands · #633 — David Gomes, Cursor',
    },
    quote: {
      text: 'You can run as many GitHub Actions as you’re willing to pay for.',
      by: 'Robert Brennan, OpenHands, on sandboxes',
    },
  },
  {
    ...base('06', 'SIX', 'THE INDEPENDENCE PROBLEM'),
    riddle: 'The judge learned from the same teacher as the judged. Whose mistakes does it catch?',
    art: art(
      '06',
      'A new stone tower leans; the builder and his twin, in the same spectacles, nod at it; a third person holds a plumb line that shows how far it leans.',
    ),
    back: {
      kicker: 'One benchmark, two judges',
      headline: ['A judge with your blind spots ', 'confirms your mistakes.'],
      bars: [
        { label: 'same kind', text: 'errors correlate — they confirm, not cancel' },
        { label: 'other kind', text: 'a different mechanism fails for other reasons', hot: true },
      ],
      barNote: {
        value: '74% → 38%',
        text: 'one model, one benchmark: the official judge, then a human-aligned one (Browserbase)',
        basis: ['the model scored 74%', 'the same model on the same benchmark scored around 38%'],
      },
      stats: [
        {
          value: '4 in 10',
          text: 'sessions had an error that mattered, after 107 billion tokens (Gallon)',
          basis: ['In about four in 10 sessions, an agent got something wrong that mattered', 'over 107 billion tokens'],
        },
        {
          value: '3',
          text: 'characters minimum — so +++ from any diff certified any commit',
          hot: true,
          basis: ['An anchor verifier required an excerpt of at least three characters'],
        },
      ],
      sources: 'Sources: #1250 — Browserbase · #1347 — Corey Gallon, Rexmore · #864 — Tariq Shaukat, Sonar · chapter 6 (this repository)',
    },
    quote: {
      text: 'There’s a huge gap between what the existing verifiers say and what is actually the ground truth.',
      by: 'Browserbase, on the WebVoyager judge',
    },
  },
  {
    ...base('07', 'SEVEN', 'GATES THAT CAN FAIL'),
    riddle: 'Which alarm is more dangerous: the one that always rings, or the one that never has?',
    art: art(
      '07',
      'A night watchman dozes by a brass alarm bell whose clapper lies in the grass, while a fox slips into an open henhouse under a crescent moon.',
    ),
    back: {
      kicker: 'Two ways a gate dies',
      headline: ['A gate never seen red ', 'may be unable to go red.'],
      bars: [
        { label: 'cries wolf', text: 'loud, so it gets fixed' },
        { label: 'never objects', text: 'silent, so it gets praised', hot: true },
      ],
      barNote: {
        value: '3',
        text: 'answers a gate needs: pass, fail — and “could not check”',
        basis: ['Most gates offer two answers to a three-answer question'],
      },
      stats: [
        {
          value: '20 min',
          text: 'suite: a small tax at 30 commits a day, a hard ceiling at 300',
          basis: [
            'A suite that takes twenty minutes is a minor tax at thirty commits a day and a hard ceiling at three hundred',
          ],
        },
        {
          value: '90 days',
          text: 'then GitHub expires the logs — and missing evidence reads as a pass',
          hot: true,
          basis: ['GitHub expires workflow logs after ninety days'],
        },
      ],
      sources: 'Sources: #837 — Sumaiya Shrabony · #1356 — Gautam Korlam, Sonar · chapter 7 (this repository)',
    },
    quote: {
      text: 'One day, it silently fails, but you haven’t noticed for a week. So, you build alerts. You just reinvented CI monitoring.',
      by: 'Sumaiya Shrabony',
    },
  },
  {
    ...base('08', 'EIGHT', 'MERGED IS NOT LIVE'),
    riddle: 'Every run said success and every tick was green. Why did the site never change?',
    art: art(
      '08',
      'A postman drops letters into a pillar box on a country lane; the box has no back, and unopened letters pile up in the grass while the village waits.',
    ),
    back: {
      kicker: 'Green ticks, stale site',
      headline: ['Merged is not live. ', 'An absence is not an event.'],
      bars: [
        { label: 'implicit', text: 'a push assumed to deploy — silent when it does not' },
        { label: 'explicit', text: 'the job asks for the deployment', hot: true },
      ],
      barNote: {
        value: '30',
        text: 'automated commits in a row, zero deployments, every run green',
        basis: ['thirty consecutive automated commits had produced no deployment at all'],
      },
      stats: [
        {
          value: '4×',
          text: 'faster releases at VS Code, monthly to weekly — the slack is gone',
          basis: ['Compressing a release cycle by a factor of four'],
        },
        {
          value: '1 line',
          text: 'to make a trigger explicit, and end a whole class of silence',
          hot: true,
          basis: ['Making it explicit costs one line and removes an entire class of silence'],
        },
      ],
      sources: 'Sources: chapter 8 (this repository, commit 2de004f) · #1227 — Harald Kirschner, VS Code',
    },
    quote: { text: '0 of the last 30 bot stats commits ever deployed', by: 'this repository, commit 2de004f' },
  },
  {
    ...base('09', 'NINE', 'BROWNFIELD AND SPEC ROT'),
    riddle: 'Every change passed review, and each one was correct. Why is the system falling apart?',
    art: art(
      '09',
      'Small robots each extend one part of an old hilltop castle in a clashing style, one building a second staircase beside the first, while the old caretaker walks away.',
    ),
    back: {
      kicker: 'Many agents, many slices',
      headline: ['Each slice is correct. ', 'The whole stops making sense.'],
      bars: [
        { label: 'per change', text: 'locally reasonable — every review passes' },
        { label: 'whole system', text: 'duplicates, mixed standards, drift', hot: true },
      ],
      barNote: {
        value: '10,000s',
        text: 'of repositories: too much for any context window (Adler)',
        basis: ['tens of thousands of repositories'],
      },
      stats: [
        {
          value: '10+',
          text: 'legacy repos that nobody wants to touch (Linkov)',
          basis: ['or actually more than 10 repos, nobody actually wants to touch the code'],
        },
        {
          value: '3',
          text: 'kinds of spec rot — and only one is about documents',
          hot: true,
          basis: ['Three distinct decays hide under the phrase', 'Only the first is really about documents.'],
        },
      ],
      sources: 'Sources: #1237 — Dan Adler, Sourcegraph · #991 — Denys Linkov, Wisedocs',
    },
    quote: {
      text: 'different coding standards being applied in different places by different agents across the codebase.',
      by: 'Dan Adler, Sourcegraph',
    },
  },
  {
    ...base('10', 'TEN', 'THE REVIEW WALL'),
    riddle: 'Code pours out faster every month. Why does so little of it reach anyone?',
    art: art(
      '10',
      'A river crowded with paper boats presses against one narrow canal lock; a lone keeper turns the wheel, and only a few boats drift through.',
    ),
    back: {
      kicker: 'All of it arrives at a person',
      headline: ['More code made ', 'a queue, not more releases.'],
      bars: [
        { label: 'generation', text: 'cheaper every month' },
        { label: 'judgement', text: 'the one input that did not get cheaper', hot: true },
      ],
      barNote: {
        value: '30,000',
        text: 'changes merged a day at Anthropic — up from about 2,500 to 3,000 months before',
        basis: ['Anthropic merges roughly 30,000 code changes a day', 'around 2,500 to 3,000'],
      },
      stats: [
        {
          value: '+2,450%',
          text: 'lines of code; commits +240%',
          basis: ['2,450% increase in lines of code, 240% increase in commits'],
        },
        {
          value: '+30%',
          text: 'releases — same study (Shaukat)',
          hot: true,
          basis: ['only a 30% increase in releases'],
        },
      ],
      sources: 'Sources: #1432 — Tariq Shaukat, Sonar · #1285 — Gabriel Martinez, G2i · chapter 10 (Manish Kapur, Sonar)',
    },
    quote: {
      text: 'We haven’t figured out how to scale from producing stuff to shipping stuff.',
      by: 'Tariq Shaukat, Sonar',
    },
  },
  {
    ...base('11', 'ELEVEN', 'THE FACTORY'),
    riddle: 'A factory’s whole craft is repetition. What happens to anything software builds twice?',
    art: art(
      '11',
      'A conveyor stamps out rows of identical teapots; at its end a potter at a wheel shapes a one-of-a-kind vessel beside a shelf of vessels, each different.',
    ),
    back: {
      kicker: 'Where the metaphor leaks',
      headline: ['Built twice, it becomes a function. ', 'What is left is always new.'],
      bars: [
        { label: 'factory', text: 'one fixed product; variation is pure loss' },
        { label: 'software', text: 'variation is the whole job', hot: true },
      ],
      barNote: {
        value: '+30%',
        text: 'releases against +2,450% lines of code — judge a factory on the first',
        basis: ['Lines of code up 2,450%, releases up 30%.'],
      },
      stats: [
        {
          value: '4',
          text: 'things settled — one: throughput metrics are nearly worthless as evidence',
          basis: ['Four things can be stated with reasonable confidence', 'Throughput metrics are nearly worthless as evidence.'],
        },
        {
          value: '1,000s',
          text: 'of one well-specified change: where the factory does work',
          hot: true,
          basis: ['thousands of instances of one well-specified change, genuinely a manufacturing problem'],
        },
      ],
      sources: 'Sources: #704 — Lou Bichard, Ona · #923 — Dex Horthy, HumanLayer · #1206 — Ryan Cooke, WorkOS',
    },
    quote: {
      text: 'It’s very hard to distinguish whether the output is actually driving outcomes.',
      by: 'Ryan Cooke, WorkOS',
    },
  },
  {
    ...base('12', 'TWELVE', 'HOW MUCH PROCESS'),
    riddle: 'One crew brought a full pipeline, another brought nothing. Which one shipped the better fix?',
    art: art(
      '12',
      'Three travellers cross a frozen lake to one shore: one drags a heaped sled, one walks empty-handed, one taps the ice ahead with a long pole.',
    ),
    back: {
      kicker: 'Three arms, one defect, two rounds',
      headline: ['Process changed the cost, not the result. ', 'Watch the test fail first.'],
      bars: [
        { label: 'ceremony', text: 'same scorecard, more tokens, more time' },
        { label: 'failing test first', text: 'one extra tool call', hot: true },
      ],
      barNote: {
        value: '6,000',
        text: 'tokens — the whole price of writing the failing test first',
        basis: ['It cost one extra tool call and about six thousand tokens.'],
      },
      stats: [
        {
          value: '+⅓',
          text: 'more tokens for ceremony, and half again the time — same scorecard',
          basis: ['cost roughly a third more tokens and half again the wall-clock time for an identical scorecard'],
        },
        {
          value: '16',
          text: 'files in round two — no process, same design decision',
          hot: true,
          basis: [
            'Sixteen files, two published books at risk',
            'The control, with no process at all, made the same interface decision as the arm that wrote a design document and a plan.',
          ],
        },
      ],
      sources: 'Sources: chapter 12 (this repository’s two-round trial) · #89 — Dex Horthy, HumanLayer · #711 — Angus J. McLean, Oliver',
    },
    quote: { text: 'between free will and determinism', by: 'Angus J. McLean, Oliver, on bounded autonomy' },
  },
];
