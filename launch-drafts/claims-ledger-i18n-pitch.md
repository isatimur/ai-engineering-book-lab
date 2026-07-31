# Multilingual launch pitches — claims-ledger

Short pitch blurbs for posting on region-specific dev communities, since
Hacker News is English-only and the Show HN draft (`claims-ledger-show-hn.md`)
doesn't travel. Each blurb is a translated hook + the same universal 60-second
demo (commands stay in English — code is code everywhere).

**Caveat: these are machine-translated, not native-reviewed.** Technical
tone and idiom matter a lot for credibility on these communities — get a
native speaker (or a fluent teammate) to skim each one before posting.
Nothing here should go live unreviewed.

Recommended platform per region (English-only HN doesn't reach these
audiences; each has its own hub):

| Language | Platform(s) | Notes |
|---|---|---|
| Chinese (Simplified) | V2EX, 掘金 (Juejin), SegmentFault | Juejin skews frontend/AI-tooling; V2EX skews infra/CLI tools |
| Russian | Habr | Long-form technical audience, receptive to dev-tool writeups |
| Portuguese (Brazil) | TabNews (HN-style clone), dev.to (pt) | TabNews is the closest Brazilian analog to HN |
| Spanish | dev.to (es), Reddit r/devsarg / r/programacion | Fragmented across LATAM/Spain — dev.to has the widest reach |
| Hindi | — | Indian dev community is overwhelmingly English-first even in Hindi-speaking regions; post the English Show HN + cross-share on Indian dev Twitter/LinkedIn instead of translating. Included below only if you want a Hindi-language variant for non-English-first audiences. |

---

## Chinese (Simplified) — 简体中文

**标题：** claims-ledger —— 文档中的过时断言会让 CI 直接报红

**正文：**
文档会悄悄腐烂。有人（或者一个 AI agent）写下"token 每 24 小时轮换一次"，六周后有人重构了
`rotate.ts`，这句话就悄悄变成了谎言——没人会发现，直到用户踩坑。

claims-ledger 把这条规则机制化：文档、PR 或 agent 决策里的每一个断言，都必须带有一个可机器验证
的来源指针（commit、文档片段、ADR、GitHub 讨论、视频时间戳），指针一旦过期，CI 立刻报红。

60 秒体验：

    git clone https://github.com/isatimur/claims-ledger && cd claims-ledger
    npm install && npm run build
    ./demo/scenario.sh

或者零本地安装，直接用 GitHub Action 给 PR 加门禁：

    - uses: isatimur/claims-ledger@v1

仓库：https://github.com/isatimur/claims-ledger

---

## Russian — Русский

**Заголовок:** claims-ledger — CI падает, когда утверждение в документации устаревает

**Текст:**
Документация незаметно устаревает. Кто-то (или AI-агент) пишет «токены обновляются каждые
24 часа», через шесть недель кто-то рефакторит `rotate.ts` — и фраза незаметно становится
ложью. Никто этого не замечает, пока не наткнётся пользователь.

claims-ledger превращает это в правило: каждое утверждение в документации, PR или решении
агента несёт машинно-проверяемую ссылку на источник (коммит, раздел документа, ADR, тред на
GitHub, таймкод видео). Как только ссылка устаревает — CI падает.

Демо за 60 секунд:

    git clone https://github.com/isatimur/claims-ledger && cd claims-ledger
    npm install && npm run build
    ./demo/scenario.sh

Или без локальной установки — через GitHub Action на каждый PR:

    - uses: isatimur/claims-ledger@v1

Репозиторий: https://github.com/isatimur/claims-ledger

---

## Portuguese (Brazil) — Português

**Título:** claims-ledger — o CI quebra quando uma afirmação na documentação fica desatualizada

**Texto:**
Documentação apodrece em silêncio. Alguém (ou um agente de IA) escreve "os tokens giram a
cada 24h", seis semanas depois alguém refatora `rotate.ts`, e a frase vira ficção sem que
ninguém perceba — até um usuário esbarrar nisso.

O claims-ledger transforma essa disciplina em regra: toda afirmação na documentação, em um PR
ou em uma decisão de agente carrega um ponteiro verificável por máquina para sua fonte (commit,
trecho de doc, ADR, thread no GitHub, timestamp de vídeo). Quando o ponteiro fica obsoleto, o
CI quebra.

Demo de 60 segundos:

    git clone https://github.com/isatimur/claims-ledger && cd claims-ledger
    npm install && npm run build
    ./demo/scenario.sh

Ou sem instalação local, via GitHub Action em cada PR:

    - uses: isatimur/claims-ledger@v1

Repositório: https://github.com/isatimur/claims-ledger

---

## Spanish — Español

**Título:** claims-ledger — el CI falla cuando una afirmación en la documentación queda obsoleta

**Texto:**
La documentación se pudre en silencio. Alguien (o un agente de IA) escribe "los tokens rotan
cada 24h", seis semanas después alguien refactoriza `rotate.ts`, y la frase se convierte en
ficción sin que nadie lo note — hasta que un usuario lo sufre.

claims-ledger convierte esa disciplina en una regla: cada afirmación en la documentación, un
PR o una decisión de un agente lleva un puntero verificable por máquina a su fuente (commit,
sección de doc, ADR, hilo de GitHub, timestamp de video). Cuando el puntero queda obsoleto, el
CI falla.

Demo de 60 segundos:

    git clone https://github.com/isatimur/claims-ledger && cd claims-ledger
    npm install && npm run build
    ./demo/scenario.sh

O sin instalación local, vía GitHub Action en cada PR:

    - uses: isatimur/claims-ledger@v1

Repositorio: https://github.com/isatimur/claims-ledger

---

## Hindi — हिन्दी (optional — see platform note above)

**शीर्षक:** claims-ledger — जब दस्तावेज़ में कोई दावा पुराना हो जाता है, तो CI फेल हो जाता है

**विवरण:**
दस्तावेज़ चुपचाप बासी हो जाते हैं। कोई (या एक AI एजेंट) लिखता है "टोकन हर 24 घंटे में बदलते हैं," छह
हफ्तों बाद कोई `rotate.ts` को रीफ़ैक्टर करता है, और वह वाक्य बिना किसी को पता चले झूठ बन जाता है — जब
तक कोई यूज़र इसमें फंस न जाए।

claims-ledger इस अनुशासन को नियम बना देता है: दस्तावेज़, PR या एजेंट के हर निर्णय में हर दावे के साथ
एक मशीन-सत्यापन योग्य स्रोत पॉइंटर होता है (commit, doc सेक्शन, ADR, GitHub थ्रेड, वीडियो टाइमस्टैम्प)।
पॉइंटर पुराना होते ही CI फेल हो जाता है।

60-सेकंड डेमो:

    git clone https://github.com/isatimur/claims-ledger && cd claims-ledger
    npm install && npm run build
    ./demo/scenario.sh

बिना लोकल इंस्टॉल के, हर PR पर GitHub Action से गेट करें:

    - uses: isatimur/claims-ledger@v1

रिपॉज़िटरी: https://github.com/isatimur/claims-ledger
