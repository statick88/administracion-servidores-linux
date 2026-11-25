import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = resolve(import.meta.dirname, '..');

test('public lessons keep Docker access, cleanup, and database examples safe for a lab', () => {
  const output = mkdtempSync(join(tmpdir(), 'linux-safe-examples-'));
  try {
    const run = spawnSync('python3', ['tools/build_site.py', '--output', output], {
      cwd: root, encoding: 'utf8', env: { ...process.env, PYTHONDONTWRITEBYTECODE: '1' }
    });
    assert.equal(run.status, 0, run.stderr);

    const docker = readFileSync(join(output, 'unidades', '08-docker.html'), 'utf8');
    const databases = readFileSync(join(output, 'unidades', '11-bases-datos.html'), 'utf8');

    assert.match(docker, /grupo <code>docker<\/code> como atajo/i);
    assert.match(docker, /grupo equivale a control administrativo/i);
    assert.match(docker, /rootless/i);
    assert.match(docker, /solo.*laboratorio.*datos.*desechables/is);
    assert.match(databases, /mariadb:11\.4/);
    assert.match(databases, /--env-file \.env\.lab/);
    assert.match(databases, /127\.0\.0\.1:3307:3306/);
    assert.match(databases, /mariadb-dump/);
    assert.doesNotMatch(databases, /0\.0\.0\.0:|CambiaEstePasswordFuerte|PasswordAppFuerte|NuevaPasswordFuerte/);
  } finally {
    rmSync(output, { recursive: true, force: true });
  }
});
