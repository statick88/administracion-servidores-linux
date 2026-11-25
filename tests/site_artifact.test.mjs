import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = resolve(import.meta.dirname, '..');
const validator = join(root, 'tools', 'validate_site.py');

function childEnv(values = {}) {
  const env = { ...process.env, ...values };
  delete env.NODE_TEST_CONTEXT;
  return env;
}

function run(output, ...args) {
  return spawnSync('python3', [validator, '--site', output, ...args], {
    cwd: root, encoding: 'utf8', env: childEnv({ PYTHONDONTWRITEBYTECODE: '1' }),
  });
}

function fixture(files) {
  const output = mkdtempSync(join(tmpdir(), 'linux-site-artifact-'));
  for (const [relative, content] of Object.entries(files)) {
    const destination = join(output, relative);
    mkdirSync(resolve(destination, '..'), { recursive: true });
    writeFileSync(destination, content);
  }
  return output;
}

test('public artifact validator accepts a complete production fixture', () => {
  const output = fixture({
    'index.html': '<a href="recursos.html">Recursos</a>',
    'recursos.html': '<a href="recursos/minicursos/index.html">Minicursos</a>',
    'recursos/bandit.html': '<a href="../recursos.html">Recursos</a>',
    'recursos/proxmox.html': '<a href="../recursos.html">Recursos</a>',
    'recursos/minicursos/index.html': '<a href="nvim.html">Nvim</a>',
    ...Object.fromEntries(['nvim', 'zsh', 'oh-my-zsh', 'lazyvim', 'herdr', 'opencode', 'ranger', 'bash-scripting', 'monitoreo', 'fallos', 'errores', 'hardening', 'zero-trust'].map((slug) => [`recursos/minicursos/${slug}.html`, '<a href="index.html">Índice</a>'])),
    ...Object.fromEntries(['01-fundamentos', '02-paquetes', '03-scripting', '04-usuarios', '05-procesos', '06-redes', '07-seguridad', '08-docker', '09-nginx', '10-ssl', '11-bases-datos'].map((unit) => [`unidades/${unit}.html`, '<a href="../index.html">Inicio</a>'])),
  });
  try {
    const result = run(output, '--production');
    assert.equal(result.status, 0, result.stderr);
  } finally {
    rmSync(output, { recursive: true, force: true });
  }
});

test('public artifact validator rejects a broken local link', () => {
  const output = fixture({ 'index.html': '<a href="missing.html">Roto</a>' });
  try {
    const result = run(output);
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /index\.html.*missing\.html/);
  } finally {
    rmSync(output, { recursive: true, force: true });
  }
});

test('production builder artifact passes the public validator with opt-in minicourses', () => {
  const parent = mkdtempSync(join(tmpdir(), 'linux-production-build-'));
  const output = join(parent, 'site');
  try {
    const build = spawnSync('python3', ['tools/build_site.py', '--output', output, '--include-minicourses'], {
      cwd: root, encoding: 'utf8', env: childEnv({ PYTHONDONTWRITEBYTECODE: '1' }),
    });
    assert.equal(build.status, 0, build.stderr);
    const result = run(output, '--production');
    assert.equal(result.status, 0, result.stderr);
    const brand = spawnSync('node', ['--test', 'tests/guard_brand.test.mjs'], {
      cwd: root, encoding: 'utf8', env: childEnv({ SITE_OUTPUT: output }),
    });
    assert.equal(brand.status, 0, brand.stderr);
  } finally {
    rmSync(parent, { recursive: true, force: true });
  }
});

test('brand guard rejects missing generated output instead of skipping it', () => {
  const parent = mkdtempSync(join(tmpdir(), 'linux-missing-artifact-'));
  const missing = join(parent, 'missing');
  try {
    const brand = spawnSync('node', ['--test', 'tests/guard_brand.test.mjs'], {
      cwd: root, encoding: 'utf8', env: childEnv({ SITE_OUTPUT: missing }),
    });
    assert.match(brand.stdout, /generated site output is required/);
    assert.match(brand.stdout, /fail 1/);
  } finally {
    rmSync(parent, { recursive: true, force: true });
  }
});
