import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = resolve(import.meta.dirname, '..');

test('published Apache and web workshops provide isolated configuration, evidence, and rollback', () => {
  const output = mkdtempSync(join(tmpdir(), 'brochure-web-skills-'));
  try {
    const run = spawnSync('python3', ['tools/build_site.py', '--output', output], {
      cwd: root, encoding: 'utf8', env: { ...process.env, PYTHONDONTWRITEBYTECODE: '1' }
    });
    assert.equal(run.status, 0, run.stderr);

    const apache = readFileSync(join(output, 'unidades', '09-apache.html'), 'utf8');
    assert.match(apache, /Apache HTTP Server 2\.4/);
    assert.match(apache, /&lt;VirtualHost 127\.0\.0\.1:8080&gt;/);
    assert.match(apache, /Require local/);
    assert.match(apache, /mpm_event/);
    assert.match(apache, /access\.log/);
    assert.match(apache, /apachectl -t/);
    assert.match(apache, /Rollback/);

    const web = readFileSync(join(output, 'unidades', '10-web.html'), 'utf8');
    assert.match(web, /nginx\.conf/);
    assert.match(web, /server_name localhost/);
    assert.match(web, /proxy_pass http:\/\/127\.0\.0\.1:8080/);
    assert.match(web, /nginx -t/);
    assert.match(web, /access\.log/);
    assert.match(web, /Rollback/);
  } finally {
    rmSync(output, { recursive: true, force: true });
  }
});
