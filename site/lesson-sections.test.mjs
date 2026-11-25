import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = resolve(import.meta.dirname, '..');
const labels = ['Tema', 'Objetivo', 'Conceptos', 'Ejemplo', 'Práctica', 'Tarea', 'Quiz', 'Conclusión', 'Siguiente tema'];

test('public builder adds the ordered didactic guide to every unit', () => {
  const output = mkdtempSync(join(tmpdir(), 'linux-sections-'));
  try {
    const run = spawnSync('python3', ['tools/build_site.py', '--output', output], {
      cwd: root, encoding: 'utf8', env: { ...process.env, PYTHONDONTWRITEBYTECODE: '1' }
    });
    assert.equal(run.status, 0, run.stderr);
    const catalog = JSON.parse(readFileSync(join(root, 'course/catalog.json'), 'utf8'));
    for (const [index, unit] of catalog.units.entries()) {
      const page = readFileSync(join(output, 'unidades', `${unit.id}.html`), 'utf8');
      const guide = page.match(/<section class="lesson-guide"[^>]*>([\s\S]*?)<\/section>/)?.[1] || '';
      let position = -1;
      for (const label of labels) {
        const match = guide.indexOf(`>${label}</`);
        assert.ok(match > position, `${unit.id} orders ${label}`);
        position = match;
      }
      assert.ok(guide.includes('href="#evaluaciones"'), `${unit.id} links to its quiz`);
      const nextHref = index + 1 < catalog.units.length ? `${catalog.units[index + 1].id}.html` : '../index.html';
      assert.ok(guide.includes(`href="${nextHref}"`), `${unit.id} has a published next destination`);
    }
  } finally {
    rmSync(output, { recursive: true, force: true });
  }
});
