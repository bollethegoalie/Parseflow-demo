const sourceText = document.getElementById('sourceText');
const jsonOut = document.getElementById('jsonOut');
const rawBtn = document.getElementById('rawBtn');
const simpleBtn = document.getElementById('simpleBtn');
const copyBtn = document.getElementById('copyBtn');
const excerptModeBtn = document.getElementById('excerptModeBtn');
const fullModeBtn = document.getElementById('fullModeBtn');
const pdfLink = document.getElementById('pdfLink');
const pdfStatus = document.getElementById('pdfStatus');

let rawData = null;
let activeMode = 'excerpt';

const MODES = {
  excerpt: {
    sourcePath: 'data/source_excerpt.md',
    jsonPath: 'data/extracted.json'
  },
  full: {
    sourcePath: 'data/source_full.md',
    jsonPath: 'data/extracted_full.json'
  }
};

function simplify(data) {
  const authors = Array.isArray(data.authors) ? data.authors : [];
  const reactions = Array.isArray(data.reactions) ? data.reactions : [];
  return {
    document_title: data.document_title,
    language: data.language,
    authors_count: authors.length,
    authors_preview: authors.slice(0, 3),
    research_question: data.research_question,
    experiment_summary: {
      reactions_count: reactions.length,
      key_reagents: data.key_reagents,
      core_conclusion: data.conclusion
    },
    metrics: data.metrics
  };
}

async function checkPdfAvailability() {
  try {
    const res = await fetch('assets/source.pdf', { method: 'HEAD' });
    if (res.ok) {
      pdfStatus.textContent = 'PDF detected: click Open PDF to view the original sample.';
      return;
    }
  } catch (_err) {
    // No-op: handled below.
  }

  pdfLink.setAttribute('aria-disabled', 'true');
  pdfLink.style.pointerEvents = 'none';
  pdfLink.style.opacity = '0.55';
  pdfStatus.textContent = 'No PDF found yet at assets/source.pdf. Upload one to enable this link.';
}

async function loadDemo() {
  const selected = MODES[activeMode];
  const sourceRes = await fetch(selected.sourcePath);
  sourceText.textContent = await sourceRes.text();

  const jsonRes = await fetch(selected.jsonPath);
  rawData = await jsonRes.json();
  jsonOut.textContent = JSON.stringify(rawData, null, 2);

  await checkPdfAvailability();
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
