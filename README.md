# jsonparser Product Hunt Demo (Static)

A tiny, static demo you can link in Product Hunt's "Interactive demo" field.

## Why this setup
- No backend server required
- Very low hosting cost (can run on GitHub Pages/Netlify/Vercel free tier)
- Real source text + real extracted JSON shown side by side

## Run locally
```bash
cd producthunt-demo
python -m http.server 8000
```
Open http://localhost:8000

## Product Hunt demo link
Host this folder and paste that URL into Product Hunt's "Link to the demo" field.

## Optional PDF
If you want a real PDF button in the UI:
1. Put your PDF at `assets/source.pdf`
2. Reload the page
3. The "Open PDF" link will work directly

## Files
- `index.html`: one-page demo UI
- `styles.css`: lightweight styling
- `app.js`: JSON view + simplified mode
- `data/source_excerpt.md`: source sample shown on left
- `data/extracted.json`: extracted output shown on right

## Deploy fast (GitHub Pages)
1. Push this folder to a standalone repo
2. In repo settings, enable Pages from `main` branch root
3. Use the generated URL as your Product Hunt interactive demo link
