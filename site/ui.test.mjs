import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = resolve(import.meta.dirname, '..');

function buildSite(...args) {
  const output = mkdtempSync(join(tmpdir(), 'linux-ui-'));
  const run = spawnSync('python3', ['tools/build_site.py', '--output', output, ...args], {
    cwd: root, encoding: 'utf8', env: { ...process.env, PYTHONDONTWRITEBYTECODE: '1' }
  });
  return { output, run };
}

test('the public builder emits the production interface landmarks and assets', () => {
  const { output, run } = buildSite();
  try {
    assert.equal(run.status, 0, run.stderr);
    const home = readFileSync(join(output, 'index.html'), 'utf8');
    const reader = readFileSync(join(output, 'unidades', '01-fundamentos.html'), 'utf8');
    assert.match(home, /<a class="skip-link" href="#contenido">/);
    assert.match(home, /<header id="site-header" class="site-header">/);
    assert.match(home, /<main id="contenido">/);
    assert.match(home, /<nav aria-label="Principal" class="primary-nav">/);
    assert.match(home, /<label for="site-search">Buscar en el curso<\/label>/);
    assert.match(home, /<section class="hero">/);
    assert.match(home, /class="catalog" id="catalogo"/);
    assert.match(reader, /<aside id="course-sidebar" class="course-sidebar"/);
    assert.match(reader, /<details[^>]*class="sidebar-toggle"/);
    assert.match(reader, /assets\/style\.css/);
    assert.match(reader, /assets\/app\.js/);
    assert.ok(existsSync(join(output, 'assets', 'style.css')));
    assert.ok(existsSync(join(output, 'assets', 'app.js')));
  } finally {
    rmSync(output, { recursive: true, force: true });
  }
});

test('primary navigation links to available course sections from both build modes', () => {
  for (const include of [false, true]) {
    const { output, run } = buildSite(...(include ? ['--include-minicourses'] : []));
    try {
      assert.equal(run.status, 0, run.stderr);
      assert.equal(run.stderr, '');
      assert.equal(run.stdout, `Built ${include ? 34 : 20} pages.\n`);
      const read = (path) => readFileSync(join(output, path), 'utf8');
      for (const [path, base] of [['index.html', './'], ['unidades/01-fundamentos.html', '../'],
        ...(include ? [['recursos/minicursos/nvim.html', '../../']] : [])]) {
        const nav = read(path).match(/<nav aria-label="Principal" class="primary-nav">([\s\S]*?)<\/nav>/)?.[1];
        assert.ok(nav, path);
        assert.ok(nav.includes(`href="${base}index.html#catalogo">Unidades</a>`));
        assert.match(nav, /<details class="resources-menu">\s*<summary>Recursos<\/summary>/);
        for (const route of ['recursos.html', 'recursos/bandit.html', 'recursos/proxmox.html', 'recursos.html#talleres']) {
          assert.ok(nav.includes(`href="${base}${route}"`), route);
        }
        assert.equal(nav.includes(`href="${base}recursos/minicursos/index.html"`), include);
      }
      assert.match(read('recursos.html'), /id="talleres"/);
    } finally {
      rmSync(output, { recursive: true, force: true });
    }
  }
});

test('generated reader styles keep long source content inside local scroll areas', () => {
  const { output, run } = buildSite();
  try {
    assert.equal(run.status, 0, run.stderr);
    const styles = readFileSync(join(output, 'assets', 'style.css'), 'utf8');
    assert.match(styles, /article pre \{[^}]*max-width: 100%;[^}]*overflow-x: auto/s);
    assert.match(styles, /article table \{[^}]*display: block;[^}]*width: 100%;[^}]*overflow-x: auto/s);
    assert.match(styles, /article :not\(pre\) code \{[^}]*overflow-wrap: anywhere/s);
  } finally {
    rmSync(output, { recursive: true, force: true });
  }
});

test('generated homepage restores its full-width column when the sidebar has no units', () => {
  const { output, run } = buildSite();
  try {
    assert.equal(run.status, 0, run.stderr);
    const home = readFileSync(join(output, 'index.html'), 'utf8');
    const reader = readFileSync(join(output, 'unidades', '01-fundamentos.html'), 'utf8');
    const styles = readFileSync(join(output, 'assets', 'style.css'), 'utf8');
    const homeSidebar = home.match(/<aside id="course-sidebar" class="course-sidebar"[\s\S]*?<\/aside>/)?.[0] || '';
    const readerSidebar = reader.match(/<aside id="course-sidebar" class="course-sidebar"[\s\S]*?<\/aside>/)?.[0] || '';
    assert.doesNotMatch(homeSidebar, /<ul>/);
    assert.match(readerSidebar, /<ul>/);
    assert.match(styles, /main:not\(:has\(\.course-sidebar ul\)\) \{ display: block; \}/);
  } finally {
    rmSync(output, { recursive: true, force: true });
  }
});

test('filtering and quiz feedback expose all client-side states', async () => {
  const module = await import('./app.js');
  const entries = [
    { text: 'Docker y contenedores', id: 'docker' },
    { text: 'Nginx como proxy', id: 'nginx' }
  ];
  assert.deepEqual(module.filterEntries(entries, 'DOCKER'), [entries[0]]);
  assert.deepEqual(module.filterEntries(entries, '  '), entries);
  assert.deepEqual(module.filterEntries(entries, 'certbot'), []);
  assert.equal(module.quizFeedback(null, 1).state, 'unanswered');
  assert.equal(module.quizFeedback('0', 1).state, 'wrong');
  assert.equal(module.quizFeedback('1', 1).state, 'correct');
});
