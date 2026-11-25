import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = resolve(import.meta.dirname, '..');
const slugs = [
  'nvim', 'zsh', 'oh-my-zsh', 'lazyvim', 'herdr', 'opencode', 'ranger',
  'bash-scripting', 'monitoreo', 'fallos', 'errores', 'hardening', 'zero-trust',
];

test('Recursos links a separate index and thirteen distinct minicourse pages', () => {
  const output = mkdtempSync(join(tmpdir(), 'linux-minicourses-'));
  try {
    const run = spawnSync('python3', ['tools/build_site.py', '--output', output], {
      cwd: root, encoding: 'utf8', env: { ...process.env, PYTHONDONTWRITEBYTECODE: '1' },
    });
    assert.equal(run.status, 0, run.stderr);
    assert.equal(run.stderr, '');
    const read = (...path) => readFileSync(join(output, ...path), 'utf8');
    assert.match(read('recursos.html'), /href="recursos\/minicursos\/index\.html"/);
    const index = read('recursos', 'minicursos', 'index.html');
    assert.match(index, /href="\.\.\/\.\.\/recursos\.html"/);
    const titles = new Set();
    for (const slug of slugs) {
      assert.ok(index.includes(`href="${slug}.html"`), `Missing index link: ${slug}`);
      const course = read('recursos', 'minicursos', `${slug}.html`);
      const heading = [...course.matchAll(/<h1>([^<]+)<\/h1>/g)];
      assert.equal(heading.length, 1, slug);
      titles.add(heading[0][1]);
      assert.match(course, /<h2\b[^>]*>Objetivo<\/h2>/);
      assert.match(course, /<h2\b[^>]*>Ejercicio práctico<\/h2>/);
      assert.match(course, /href="index\.html"/);
      assert.match(course, /href="\.\.\/\.\.\/assets\/style\.css"/);
    }
    assert.equal(titles.size, slugs.length);
    for (const slug of ['bandit', 'proxmox']) {
      assert.ok(read('recursos', `${slug}.html`));
    }
    assert.equal(run.stdout, 'Built 29 pages.\n');
  } finally {
    rmSync(output, { recursive: true, force: true });
  }
});
