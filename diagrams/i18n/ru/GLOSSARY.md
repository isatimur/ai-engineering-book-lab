# Russian glossary for the figures

Use one Russian term for each book term in every figure. Prefer a plain Russian word to a calque.

| English | Russian | Note |
|---|---|---|
| assistant | ассистент | |
| copilot | напарник | not «копилот» |
| delegate (noun) | исполнитель | the one you hand work to |
| delegated execution | делегированное исполнение | |
| colleague | коллега | |
| the shift | сдвиг | |
| transcript | переписка | not «транскрипт» |
| workflow | процесс | not «воркфлоу» |
| durable | надёжный | |
| checkpoint | контрольная точка | |
| crash | сбой | |
| harness / scaffolding | обвязка | |
| eval(s) | оценка, оценки | |
| review | ревью | |
| observability | наблюдаемость | |
| guardrails | ограничители | |
| retrieval | поиск | |
| provenance | происхождение данных, источники | |
| failure surface | зона ошибок | |
| artifact | результат | |
| slop | халтура | |
| trust under action | доверие в действии | |
| delight under conversation | восторг в разговоре | |
| corpus video #N | видео корпуса #N | |
| AI engineering | ИИ-инженерия | not «AI-инженерия» |
| AI-native organization | ИИ-нативная организация | |
| runtime | среда исполнения | not «среда выполнения» |
| human control plane | контур контроля человека | |
| trace | трейс | not «трасса» |
| gate (check between stages) | барьер | |
| gateway | шлюз | e.g. шлюз MCP |
| scope (of a token) | права, доступ | not «scope»; keep it inside code |
| step-up (auth) | повышение прав (по запросу) | |
| least privilege | минимум прав | |
| root of trust | корень доверия | |
| standing key | вечный ключ | |
| scoped identity | узкая идентичность | |
| subagent | субагент | |
| fan out / fan in | раздать / собрать | |
| replay / snapshot | воспроизведение / снимок | |
| agency (dial) | автономия (регулятор) | |
| context misassembly | неверная сборка контекста | |
| progressive discovery | постепенное обнаружение | |
| chunk | кусок | |
| vibe coding / vibe engineering | вайб-кодинг / вайб-инжиниринг | |
| taste | вкус | |
| spec | спецификация | |
| framing | постановка задачи | |
| production | продакшен | |
| flywheel | маховик | |
| regression set | регрессионный набор | |
| rubric | рубрика | |
| benchmark | бенчмарк | |
| ratchet | храповик | |
| load-bearing | несущий | |
| throughput | поток; пропускная способность | |
| alignment debt | долг согласованности | |
| approval path | путь согласования | |
| seats (licenses) | места | |
| latency budget | бюджет задержки | |
| barge-in / interruption | перебивание (short: перебив) | |
| turn (spoken) | реплика | |
| half-duplex / full-duplex | полудуплекс / полный дуплекс | |
| back-channeling | поддакивание | |
| constrained delegation | ограниченное делегирование | |
| what endures | что остаётся | |
| Software Factory (case) | Фабрика ПО | not «фабрика софта» |
| High-Stakes Colleague (case) | Коллега при высоких ставках | not «для высоких ставок» |
| Meridian / Hargrove (case firms) | «Меридиан» / «Харгроув» | Cyrillic, in quotes |
| Practical checklist / Closing move (headings) | Практический чек-лист / Итог | |
| legible / legibility | понятный / понятность | of a repository |
| agent-ready | готовый для агентов | |
| spec-driven development | разработка через спецификации | |
| tacit judgment / externalize | неявное суждение / выносить наружу | |
| slop era / war on slop | эпоха халтуры / война с халтурой | |
| context engineering | контекстная инженерия | |
| control plane (short) | контур контроля | |
| blast radius | радиус поражения | |
| sandbox | песочница | |
| prompt injection | промпт-инъекция | |
| overscoped authority | избыточные полномочия | |
| turn-taking | очерёдность реплик | |
| redaction | маскировка | |
| roll-up | сводка, сводный | |
| service tier / flex tier | тариф / гибкий тариф | |
| rework rate | доля переделок | |
| outcome (metric) | исход | |
| coherence | согласованность | |
| staff / senior engineer | ведущий / старший инженер | |
| pull request / diff | пул-реквест / дифф | PR stays PR |
| postmortem | разбор инцидента | |
| golden patch | эталонный патч | |

Names used in both text and figures: Джастин Рейок, Аканкша Чоудхери, Фил Хетцель, Гийом Вернад, Квиндла Крамер, Райан Лопополо, Ино Рейес, Эрик Закариассон, Мэгги Эпплтон, Дэн Шиппер.

Product and company names, code and identifiers stay in English. Speaker names are transliterated (Joel Hron → Джоэл Хрон).

## How to translate a figure

1. Extract the text: `excal_i18n.py extract FIG.excalidraw -o diagrams/i18n/ru/NAME.strings.json`.
2. Fill in every `translation`. Translate all text: the eyebrow, caption and citation too. Quotes are translated, in «ёлочки», with the speaker's name in Russian.
3. Apply: `excal_i18n.py apply FIG.excalidraw NAME.strings.json --lang ru -o diagrams/i18n/ru --wrap-free`. On OVERFLOW, shorten the text. Do not shrink the font.
4. Render with `npx @excalidraw-skill-pack/render@0.3.2 NAME.ru.excalidraw`, then look at the PNG. Fix any text that touches a border.

The scripts are in the global `excalidraw-diagram` skill (`~/.claude/skills/excalidraw-diagram/scripts/`).
