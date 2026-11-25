import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = resolve(import.meta.dirname, '..');
const pythonEnv = { ...process.env, PYTHONDONTWRITEBYTECODE: '1' };

function buildSite() {
  const output = mkdtempSync(join(tmpdir(), 'linux-learner-flow-'));
  const run = spawnSync('python3', ['tools/build_site.py', '--output', output], {
    cwd: root, encoding: 'utf8', env: pythonEnv
  });
  return { output, run };
}

test('published practice cards take learners directly to the matching workshop', () => {
  const { output, run } = buildSite();
  try {
    assert.equal(run.status, 0, run.stderr);
    const catalog = JSON.parse(readFileSync(join(root, 'course/catalog.json'), 'utf8'));
    for (const unit of catalog.units) {
      const page = readFileSync(join(output, 'unidades', `${unit.id}.html`), 'utf8');
      const practice = page.match(/<div class="lesson-guide-item" id="lesson-practica">([\s\S]*?)<\/div>/)?.[1] || '';
      assert.match(practice, new RegExp(`href="\.\./recursos\\.html#taller-${unit.id}"`));
      assert.match(practice, /Abrir taller/);
    }
  } finally {
    rmSync(output, { recursive: true, force: true });
  }
});

test('wrong quiz answers offer a conceptual review link', async () => {
  const { output, run } = buildSite();
  try {
    assert.equal(run.status, 0, run.stderr);
    const page = readFileSync(join(output, 'unidades', '08-docker.html'), 'utf8');
    assert.match(page, /<fieldset data-answer="\d+" data-review-href="#lesson-conceptos">/);
    const { quizFeedback } = await import('./app.js');
    assert.deepEqual(quizFeedback('0', 1, '#lesson-conceptos'), {
      state: 'wrong',
      message: 'Aún no es correcto. Repasa el concepto y vuelve a intentarlo.',
      reviewHref: '#lesson-conceptos'
    });
    assert.equal(quizFeedback('0', 1, 'javascript:alert(1)').reviewHref, '');
  } finally {
    rmSync(output, { recursive: true, force: true });
  }
});

test('search is scoped to indexed units and omitted from pages without entries', () => {
  const { output, run } = buildSite();
  try {
    assert.equal(run.status, 0, run.stderr);
    const home = readFileSync(join(output, 'index.html'), 'utf8');
    const reader = readFileSync(join(output, 'unidades', '01-fundamentos.html'), 'utf8');
    const resources = readFileSync(join(output, 'recursos.html'), 'utf8');
    assert.match(home, /<form class="search-form" role="search" data-search-scope="unidades">/);
    assert.match(home, /Busca solo en unidades publicadas\./);
    assert.match(reader, /data-search-scope="unidades"/);
    assert.doesNotMatch(resources, /id="site-search"|class="search-form"/);
  } finally {
    rmSync(output, { recursive: true, force: true });
  }
});
