import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = resolve(import.meta.dirname, '..');

test('homepage keeps the primary navbar in its header and removes only visible search copy', () => {
  const output = mkdtempSync(join(tmpdir(), 'linux-navigation-copy-'));
  try {
    const run = spawnSync('python3', ['tools/build_site.py', '--output', output], {
      cwd: root, encoding: 'utf8', env: { ...process.env, PYTHONDONTWRITEBYTECODE: '1' }
    });
    assert.equal(run.status, 0, run.stderr);
    const home = readFileSync(join(output, 'index.html'), 'utf8');
    const header = home.match(/<header id="site-header" class="site-header">([\s\S]*?)<\/header>/)?.[1] || '';
    const hero = home.match(/<section class="hero">([\s\S]*?)<\/section>/)?.[1] || '';
    assert.match(header, /<nav aria-label="Principal" class="primary-nav">/);
    assert.doesNotMatch(hero, /<nav aria-label="Principal" class="primary-nav">/);
    assert.doesNotMatch(home, /Buscar en el curso|Busca solo en unidades publicadas\./);
    assert.match(home, /<input id="site-search" type="search"[^>]*aria-label="Buscar unidades"[^>]*placeholder="Docker, Nginx, permisos…">/);
    assert.match(home, /<p id="search-status" class="search-status" aria-live="polite"><\/p>/);
  } finally {
    rmSync(output, { recursive: true, force: true });
  }
});
