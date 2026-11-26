import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = resolve(import.meta.dirname, '..');
const pythonEnv = { ...process.env, PYTHONDONTWRITEBYTECODE: '1' };

function quizExpectations(text) {
  const blocks = [...text.matchAll(/```\{quizdown\}\n([\s\S]*?)```|````quizdown\n([\s\S]*?)````|::: quizdown\n([\s\S]*?):::/g)];
  return blocks.flatMap(([, fenced, official, div]) => {
    const parts = (fenced || official || div).split(/^##\s+(.+)$/m);
    const questions = [];
    for (let index = 1; index < parts.length; index += 2) {
      const options = [...parts[index + 1].matchAll(/^\s*(?:\d+\.\s*)?-?\s*\[([ xX]?)\]\s*(.+)$/gm)];
      if (options.length) questions.push({ count: options.length, answer: options.findIndex(([, mark]) => mark.toLowerCase() === 'x') });
    }
    return questions;
  });
}

function renderFixture(source, routes = {}) {
  const run = spawnSync('python3', ['-c',
    'import json,sys; from content import render_markdown; print(render_markdown(sys.argv[1], json.loads(sys.argv[2])))',
    source, JSON.stringify(routes)], { cwd: join(root, 'tools'), encoding: 'utf8', env: pythonEnv });
  assert.equal(run.status, 0, run.stderr);
  return run.stdout;
}

test('public builder converts every published unit and its Quizdown forms', () => {
  const output = mkdtempSync(join(tmpdir(), 'linux-content-'));
  try {
    const run = spawnSync('python3', ['tools/build_site.py', '--output', output], { cwd: root, encoding: 'utf8', env: pythonEnv });
    assert.equal(run.status, 0, run.stderr);
    assert.equal(run.stdout, 'Built 30 pages.\n');
    assert.equal(run.stderr, '');
    const catalog = JSON.parse(readFileSync(join(root, 'course/catalog.json'), 'utf8'));
    for (const unit of catalog.units) {
      const source = readFileSync(join(root, unit.source), 'utf8');
      const quiz = readFileSync(join(root, unit.quiz), 'utf8');
      const expected = [...quizExpectations(source), ...quizExpectations(quiz)];
      const page = readFileSync(join(output, 'unidades', `${unit.id}.html`), 'utf8');
      assert.doesNotMatch(page, /```\{quizdown\}|::: quizdown|quizdown/i);
      assert.doesNotMatch(page, /<script\b(?![^>]*\bsrc=["'][^"']*assets\/app\.js["'])/i);
      assert.match(page, /<pre><code class="language-/);
      assert.match(page, /class="callout/);
      assert.match(page, /<h[1-6] id="[a-z0-9-]+">/);
      const table = source.match(/^\|\s*([^|]+)\|[^\n]*\n\|\s*:?-+/m);
      if (table) {
        assert.match(page, /<table>/);
        assert.ok(page.includes(table[1].trim()), `${unit.id} preserves a source table header`);
      }
      const forms = [...page.matchAll(/<fieldset data-answer="(\d+)"[^>]*>([\s\S]*?)<\/fieldset>/g)];
      assert.equal(forms.length, expected.length, `${unit.id} keeps every source and associated-quiz question`);
      for (const [index, [, answer, fieldset]] of forms.entries()) {
        const options = [...fieldset.matchAll(/type="radio" name="([^"]+)" value="(\d+)"/g)];
        assert.equal(options.length, expected[index].count);
        assert.equal(Number(answer), expected[index].answer);
        assert.equal(new Set(options.map(([, name]) => name)).size, 1);
      }
      assert.equal((page.match(/<form class="quiz">/g) || []).length, (page.match(/role="status"/g) || []).length);
    }
  } finally { rmSync(output, { recursive: true, force: true }); }
});

test('renderer keeps malicious source markup and unsafe links inert', () => {
  const rendered = renderFixture('<script>alert(1)</script> [bad](javascript:alert(1)) <img src="x" onerror="alert(1)">');
  assert.match(rendered, /&lt;script&gt;alert\(1\)&lt;\/script&gt;/);
  assert.match(rendered, /&lt;img src=&quot;x&quot; onerror=&quot;alert\(1\)&quot;&gt;/);
  assert.doesNotMatch(rendered, /href=|<script\b|<img\b/);
});

test('renderer maps published QMD links beside their unit page', () => {
  const rendered = renderFixture('[Unidad II](../02-paquetes/index.qmd#tema)', { '02-paquetes': 'unused' });
  assert.match(rendered, /href="02-paquetes.html#tema"/);
});

test('renderer escapes query URLs once and leaves code spans literal', () => {
  const rendered = renderFixture('[consulta](https://example.test/?a=1&b=2) <https://example.test/?a=1&b=2> `**sin formato**`');
  assert.match(rendered, /href="https:\/\/example\.test\/\?a=1&amp;b=2"/);
  assert.doesNotMatch(rendered, /amp;amp;|<strong>sin formato<\/strong>/);
  assert.match(rendered, /<code>\*\*sin formato\*\*<\/code>/);
});

test('associated quizzes match the brochure units and reject legacy topics', () => {
  const expected = {
    1: '¿Qué es un Sistema Operativo?', 2: '¿Qué comando actualiza el índice de paquetes',
    3: '¿Qué opción activa', 4: '¿Qué archivo contiene los hashes',
    5: '¿Qué es un proceso en Linux?', 6: '¿Qué es LVM',
    7: '¿Cuál es la política recomendada de UFW', 8: '¿Qué define un scope DHCP?',
    9: '¿Qué describe un virtual host de Apache?', 10: '¿Qué es Nginx?',
    11: '¿Qué es MariaDB?', 12: '¿Qué es la metodología de diagnóstico?'
  };
  const legacy = { 2: 'requisito mínimo de RAM', 3: 'directorio actual', 4: 'contenedor Docker', 7: 'TCP/IP', 8: 'Docker', 9: 'Nginx' };
  for (const [unit, question] of Object.entries(expected)) {
    const quiz = readFileSync(join(root, 'quizzes', `quiz_unidad${unit}.qmd`), 'utf8');
    assert.ok(quiz.includes(question), `unidad ${unit} uses its brochure topic`);
    if (legacy[unit]) assert.doesNotMatch(quiz, new RegExp(legacy[unit], 'i'));
    if (legacy[unit]) assert.equal(quizExpectations(quiz).length, 3);
  }
});
