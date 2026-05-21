const sourceText = document.getElementById('sourceText');
const jsonOut = document.getElementById('jsonOut');
const rawBtn = document.getElementById('rawBtn');
const simpleBtn = document.getElementById('simpleBtn');
const copyBtn = document.getElementById('copyBtn');
const excerptModeBtn = document.getElementById('excerptModeBtn');
const fullModeBtn = document.getElementById('fullModeBtn');
const modeMeta = document.getElementById('modeMeta');

let rawData = null;
let activeMode = 'excerpt';

const MODES = {
  excerpt: {
    label: 'Excerpt mode: short source preview with concise extraction output.',
    sourcePath: 'data/source_excerpt.md',
    jsonPath: 'data/extracted.json'
  },
  full: {
    label: 'Full mode: long anonymized source with expanded extraction schema.',
    sourcePath: 'data/source_full.md',
    jsonPath: 'data/extracted_full.json'
  }
};

function simplify(data) {
  const authors = Array.isArray(data.authors) ? data.authors : [];
  const reactions = Array.isArray(data.reactions) ? data.reactions : [];
  const variables = data.variables || {};
  const conclusion = typeof data.conclusion === 'object'
    ? data.conclusion.summary
    : data.conclusion;
  return {
    document_title: data.document_title,
    document_type: data.document_type,
    language: data.language,
    authors_count: authors.length,
    authors_preview: authors.slice(0, 3),
    research_question: data.research_question,
    experiment_summary: {
      reactions_count: reactions.length,
      key_reagents: data.key_reagents || reactions.flatMap((r) => r.reagents || []),
      independent_variables: variables.independent || [],
      dependent_variables: variables.dependent || [],
      core_conclusion: conclusion
    },
    metrics: data.metrics
  };
}

async function loadDemo() {
  const selected = MODES[activeMode];
  modeMeta.textContent = selected.label;
  const sourceRes = await fetch(selected.sourcePath);
  sourceText.textContent = await sourceRes.text();

  const jsonRes = await fetch(selected.jsonPath);
  rawData = await jsonRes.json();
  jsonOut.textContent = JSON.stringify(rawData, null, 2);
}

function setMode(mode) {
  if (!MODES[mode]) return;
  activeMode = mode;
  excerptModeBtn.classList.toggle('alt', mode !== 'excerpt');
  fullModeBtn.classList.toggle('alt', mode === 'excerpt');
  loadDemo().catch((err) => {
    sourceText.textContent = 'Failed to load demo data.';
    jsonOut.textContent = String(err);
  });
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

excerptModeBtn.addEventListener('click', () => setMode('excerpt'));
fullModeBtn.addEventListener('click', () => setMode('full'));

loadDemo().catch((err) => {
  sourceText.textContent = 'Failed to load demo data.';
  jsonOut.textContent = String(err);
});
