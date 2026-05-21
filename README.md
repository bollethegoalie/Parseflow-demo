# jsonparser Product Hunt Demo (Static)

Minimal static demo for Product Hunt "Interactive demo".

## What this gives you
- No backend runtime
- Near-zero server cost
- Real source content + extracted JSON side-by-side
- Optional `assets/source.pdf` support

## Run locally
```bash
cd producthunt-demo
python3 -m http.server 8000
```
Open `http://localhost:8000`

If port 8000 is already in use:
```bash
cd producthunt-demo
python3 -m http.server 8080
```
Open `http://localhost:8080`

## Add your PDF (optional)
1. Place your file at `assets/source.pdf`
2. Refresh the demo
3. "Open PDF" becomes active automatically

## Fast deploy options

### Option A: Netlify (recommended if GitHub Pages is already tied to main site)
1. Go to Netlify: `Add new site` -> `Import an existing project`
2. Select repo: `bollethegoalie/jsonparser-producthunt-demo`
3. Build command: leave empty
4. Publish directory: `.`
5. Deploy

You get an instant URL like: `https://<site>.netlify.app`

### Option B: Vercel
1. Import repo `jsonparser-producthunt-demo`
2. Framework preset: `Other`
3. Build command: empty
4. Output directory: empty
5. Deploy

You get URL like: `https://jsonparser-producthunt-demo.vercel.app`

### Option C: GitHub Pages
1. Open repo settings -> Pages
2. Source: `Deploy from a branch`
3. Branch: `main` and folder `/ (root)`
4. Save and wait 1-2 minutes

Expected URL: `https://bollethegoalie.github.io/jsonparser-producthunt-demo/`

## Why you might not see a Pages link yet
- Pages not enabled on this repo yet
- First build still in progress
- Browser cache using old settings
- Repository visibility/settings mismatch

If Pages still does not show a URL quickly, use Netlify or Vercel and continue launch.

## Use parseflow.tech domain

Recommended: `demo.parseflow.tech`

### For Netlify
1. In Netlify site settings -> Domain management -> Add custom domain
2. Add `demo.parseflow.tech`
3. In your DNS provider, add CNAME:
	- Name: `demo`
	- Target: your Netlify site hostname (shown in Netlify)

### For Vercel
1. In project settings -> Domains -> Add `demo.parseflow.tech`
2. Add DNS record Vercel requests (usually CNAME `demo` -> `cname.vercel-dns.com`)

### For Cloudflare Pages
1. Create Pages project from this repo
2. Add custom domain `demo.parseflow.tech`
3. Cloudflare auto-manages DNS if your zone is in Cloudflare

## Product Hunt field
Paste your final public demo URL into Product Hunt's "Link to the demo" field.

## Repo files
- `index.html`: one-page demo UI
- `styles.css`: lightweight styles
- `app.js`: raw/simplified/copy behavior
- `data/source_excerpt.md`: source sample
- `data/extracted.json`: parsed output sample
