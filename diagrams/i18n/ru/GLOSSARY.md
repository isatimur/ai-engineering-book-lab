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

## How to translate a figure

1. Extract the text: `excal_i18n.py extract FIG.excalidraw -o diagrams/i18n/ru/NAME.strings.json`.
2. Fill in every `translation`. Translate all text: the eyebrow, caption and citation too. Quotes are translated, in «ёлочки», with the speaker's name in Russian.
3. Apply: `excal_i18n.py apply FIG.excalidraw NAME.strings.json --lang ru -o diagrams/i18n/ru --wrap-free`. On OVERFLOW, shorten the text. Do not shrink the font.
4. Render with `npx @excalidraw-skill-pack/render@0.3.2 NAME.ru.excalidraw`, then look at the PNG. Fix any text that touches a border.

The scripts are in the global `excalidraw-diagram` skill (`~/.claude/skills/excalidraw-diagram/scripts/`).
