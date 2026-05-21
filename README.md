# Parseflow demo

This page shows a real (anonymized) document on the left and the extracted JSON on the right.

## API request example

This demo is a static snapshot. If you want to reproduce the same extraction via the API, the request would look like:

```bash
curl -sS \
  -X POST "https://YOUR_API_HOST/v1/extract" \
  -H "Authorization: Bearer $PARSEFLOW_API_KEY" \
  -H "Content-Type: application/json" \
  -d @- <<'JSON'
{
  "document": {
    "type": "text/markdown",
    "name": "lab_report.md",
    "content": "<paste the document text here>"
  },
  "options": {
    "schema": "school_lab_report"
  }
}
JSON
```

## Exact outputs shown on this page

- Full mode output: `data/extracted_full.json`
- Excerpt mode output: `data/extracted.json`
