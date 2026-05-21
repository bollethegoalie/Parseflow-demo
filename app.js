const sourceText = document.getElementById('sourceText');
const jsonOut = document.getElementById('jsonOut');
const rawBtn = document.getElementById('rawBtn');
const simpleBtn = document.getElementById('simpleBtn');
const copyBtn = document.getElementById('copyBtn');

let rawData = null;

function simplify(data) {
  return {
    document_title: data.document_title,
    language: data.language,
    authors_count: data.authors.length,
    authors_preview: data.authors.slice(0, 3),
    research_question: data.research_question,
    experiment_summary: {
      reactions_count: data.reactions.length,
      key_reagents: data.key_reagents,
      core_conclusion: data.conclusion
    },
    metrics: data.metrics
  };
}

async function loadDemo() {
  const sourceRes = await fetch('data/source_excerpt.md');
  sourceText.textContent = await sourceRes.text();

  const jsonRes = await fetch('data/extracted.json');
  rawData = await jsonRes.json();
  jsonOut.textContent = JSON.stringify(rawData, null, 2);
}

rawBtn.addEventListener('click', () => {
  if (!rawData) return;
  jsonOut.textContent = JSON.stringify(rawData, null, 2);
});

simpleBtn.addEventListener('click', () => {
  if (!rawData) return;
  jsonOut.textContent = JSON.stringify(simplify(rawData), null, 2);
});

copyBtn.addEventListener('click', async () => {
  await navigator.clipboard.writeText(jsonOut.textContent);
  copyBtn.textContent = 'Copied';
  setTimeout(() => {
    copyBtn.textContent = 'Copy';
  }, 1000);
});

loadDemo().catch((err) => {
  sourceText.textContent = 'Failed to load demo data.';
  jsonOut.textContent = String(err);
});
