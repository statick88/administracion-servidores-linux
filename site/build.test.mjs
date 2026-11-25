import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, existsSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = resolve(import.meta.dirname, '..');
test('build publishes the eleven brochure units without executing their examples', () => {
  const output = mkdtempSync(join(tmpdir(), 'linux-site-'));
  try {
    const run = spawnSync('python3', ['tools/build_site.py', '--output', output], { cwd: root, encoding: 'utf8' });
    assert.equal(run.status, 0, run.stderr);
    assert.equal(run.stderr, '');
    assert.equal(run.stdout, 'Built 29 pages.\n');
    const catalog = JSON.parse(readFileSync(join(root, 'course/catalog.json'), 'utf8'));
    assert.equal(catalog.schemaVersion, 1);
    assert.equal(catalog.units.length, 11);
    const home = readFileSync(join(output, 'index.html'), 'utf8');
    assert.match(home, /Docker/);
    assert.match(home, /Requisitos de inscripción/);
    for (const unit of catalog.units) {
      assert.match(home, new RegExp(`unidades/${unit.id}\\.html`));
      const page = readFileSync(join(output, 'unidades', `${unit.id}.html`), 'utf8');
      assert.ok(page.includes(unit.title));
      assert.ok(page.includes('href="../index.html"'));
      assert.ok(unit.topics.every(topic => home.includes(topic.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll("'", '&#x27;'))));
    }
    assert.ok(!new RegExp(['aba', 'com'].join('') + '|quarto', 'i').test(home));
    assert.ok(!existsSync(join(output, 'logo.jpeg')));
    assert.ok(!existsSync(join(output, 'unidades', '12.html')));
  } finally { rmSync(output, { recursive: true, force: true }); }
});

test('build command documents its output option', () => {
  const run = spawnSync('python3', ['tools/build_site.py', '--help'], { cwd: root, encoding: 'utf8' });
  assert.equal(run.status, 0, run.stderr);
  assert.match(run.stdout, /--output/);
  assert.equal(run.stderr, '');
});
