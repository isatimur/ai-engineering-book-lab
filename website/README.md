
# From Copilot to Colleague Website

Website package based on `isatimur/bookshelf`, adapted as the online representation of the AI engineering book.

Canonical deployed app: https://editorial-book-ui-41282466630.us-west1.run.app

Template source: [`isatimur/bookshelf`](https://github.com/isatimur/bookshelf) at `d8cced91284f6843172d448f95bd59dcb482c0b3`.

## Reader behavior
- Each chapter is loaded as a separate markdown source from `src/content/`.
- The website includes a chapter selector, previous/next controls, word counts, and a dedicated reading panel.
- Chapter 3 uses the fuller drafting-layer version; the other chapters use the public-safe chapter drafts.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies: `npm install`
2. Run the app: `npm run dev`
3. Build for production: `npm run build`

## Cloud Run

This package includes a production `Dockerfile` and a small static Node server for Cloud Run.

```bash
gcloud run deploy editorial-book-ui \
  --source . \
  --region us-west1 \
  --allow-unauthenticated
```
