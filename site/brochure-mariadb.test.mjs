import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = resolve(import.meta.dirname, '..');

test('MariaDB is the canonical Unit XI reader while the complete multi-engine lesson remains supplemental', () => {
  const output = mkdtempSync(join(tmpdir(), 'linux-mariadb-brochure-'));
  try {
    const run = spawnSync('python3', ['tools/build_site.py', '--output', output], {
      cwd: root, encoding: 'utf8', env: { ...process.env, PYTHONDONTWRITEBYTECODE: '1' }
    });
    assert.equal(run.status, 0, run.stderr);

    const official = readFileSync(join(output, 'unidades', '11-bases-datos.html'), 'utf8');
    const supplemental = readFileSync(join(output, 'unidades', '11-bases-datos-multimotor.html'), 'utf8');
    const workshop = readFileSync(join(root, 'course', 'workshops', '11-bases-datos.md'), 'utf8');
    assert.match(official, /<h1[^>]*>Servidor de Base de Datos \(MariaDB\)<\/h1>/);
    assert.match(official, /mariadb:11\.4/);
    assert.match(official, /127\.0\.0\.1:3307:3306/);
    assert.match(official, /CREATE USER.*inventario_app/);
    assert.match(official, /GRANT SELECT, INSERT, UPDATE ON inventario_demo\.\* TO.*inventario_app/);
    assert.match(official, /mariadb-dump[^\n]*inventario_demo/);
    assert.match(workshop, /^# Servidor de Base de Datos \(MariaDB\)$/m);
    assert.doesNotMatch(workshop, /^CREATE DATABASE inventario_demo;/m);
    assert.match(workshop, /^docker compose exec -T mariadb sh -c 'mariadb-dump [^\n]* inventario_demo' > inventario_demo\.sql/m);
    assert.doesNotMatch(workshop, /^docker compose exec -T mariadb sh -c 'mariadb-dump [^\n]*--databases/m);
    assert.match(workshop, /^if grep -nE '\^\(CREATE DATABASE\|USE \)' inventario_demo\.sql;/m);
    assert.match(official, /restauracion_ok/);
    assert.match(official, /innodb-buffer-pool-size=64M/);
    assert.doesNotMatch(official, /0\.0\.0\.0:/);
    assert.match(official, /11-bases-datos-multimotor\.html/);
    assert.match(supplemental, /MySQL\/MariaDB/);
    assert.match(supplemental, /PostgreSQL/);
    assert.match(supplemental, /lectura histórica multi-motor/i);
  } finally {
    rmSync(output, { recursive: true, force: true });
  }
});
