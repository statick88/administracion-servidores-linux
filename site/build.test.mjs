import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, existsSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = resolve(import.meta.dirname, '..');
test('build publishes the twelve brochure units in the official sequence without executing their examples', () => {
  const output = mkdtempSync(join(tmpdir(), 'linux-site-'));
  try {
    const run = spawnSync('python3', ['tools/build_site.py', '--output', output], { cwd: root, encoding: 'utf8' });
    assert.equal(run.status, 0, run.stderr);
    assert.equal(run.stderr, '');
    assert.equal(run.stdout, 'Built 30 pages.\n');
    const catalog = JSON.parse(readFileSync(join(root, 'course/catalog.json'), 'utf8'));
    assert.equal(catalog.schemaVersion, 1);
    assert.equal(catalog.units.length, 12);
    assert.deepEqual(catalog.units.map(({ id }) => id), [
      '01-fundamentos', '02-paquetes', '03-scripting', '04-usuarios',
      '05-procesos', '06-redes', '07-seguridad', '08-dhcp', '09-apache',
      '10-web', '11-bases-datos', '12-rescate-proyecto'
    ]);
    const home = readFileSync(join(output, 'index.html'), 'utf8');
    assert.match(home, /12 unidades/);
    assert.match(home, /Servidor DHCP/);
    assert.match(home, /Servidor Web \(Apache\)/);
    assert.match(home, /Nginx y Apache/);
    assert.match(home, /Requisitos de inscripción/);
    assert.match(home, /Llenar y firmar formulario de inscripción y adjuntar comprobante de pago del curso/);
    assert.match(home, /Adjuntar copia de cédula y\/o pasaporte/);
    assert.match(home, /webcam, micrófono y parlantes o audífonos/);
    for (const unit of catalog.units) {
      assert.match(home, new RegExp(`unidades/${unit.id}\\.html`));
      const page = readFileSync(join(output, 'unidades', `${unit.id}.html`), 'utf8');
      assert.ok(page.includes(unit.title));
      assert.ok(page.includes('href="../index.html"'));
      assert.ok(unit.topics.every(topic => home.includes(topic.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll("'", '&#x27;'))));
    }
    assert.ok(!new RegExp(['aba', 'com'].join('') + '|quarto', 'i').test(home));
    assert.ok(!existsSync(join(output, 'logo.jpeg')));
    assert.ok(existsSync(join(output, 'unidades', '12-rescate-proyecto.html')));
    const preservedReaders = {
      '08-docker': /grupo <code>docker<\/code> como atajo/i,
      '09-nginx': /proxy_pass/i,
      '10-ssl': /Certbot/i,
    };
    for (const [legacy, sourceMarker] of Object.entries(preservedReaders)) {
      const reader = readFileSync(join(output, 'unidades', `${legacy}.html`), 'utf8');
      assert.match(reader, /Unidad X: Nginx y Apache/);
      assert.match(reader, sourceMarker, `${legacy} retains its complete source reader`);
    }
    const historicalReader = readFileSync(join(output, 'unidades', '11-bases-datos-multimotor.html'), 'utf8');
    assert.match(historicalReader, /lectura histórica multi-motor/i);
    assert.match(historicalReader, /la ruta oficial de la Unidad XI está centrada en MariaDB/);
    for (const reader of [...Object.keys(preservedReaders), '11-bases-datos-multimotor']) {
      const page = readFileSync(join(output, 'unidades', `${reader}.html`), 'utf8');
      assert.match(page, /<details class="sidebar-toggle" open>/, `${reader} restores its unit navigation open`);
    }
  } finally { rmSync(output, { recursive: true, force: true }); }
});

test('official readers expose valid topic anchors and canonical previous/next destinations', () => {
  const output = mkdtempSync(join(tmpdir(), 'linux-reader-navigation-'));
  try {
    const run = spawnSync('python3', ['tools/build_site.py', '--output', output], { cwd: root, encoding: 'utf8' });
    assert.equal(run.status, 0, run.stderr);
    const home = readFileSync(join(output, 'index.html'), 'utf8');
    assert.equal((home.match(/<nav aria-label="Principal" class="primary-nav">/g) || []).length, 1);
    const header = home.match(/<header id="site-header" class="site-header">([\s\S]*?)<\/header>/)?.[1] || '';
    const hero = home.match(/<section class="hero">([\s\S]*?)<\/section>/)?.[1] || '';
    assert.match(header, /<nav aria-label="Principal" class="primary-nav">/);
    assert.doesNotMatch(hero, /<nav aria-label="Principal" class="primary-nav">/);
    const units = JSON.parse(readFileSync(join(root, 'course/catalog.json'), 'utf8')).units;
    for (const [index, unit] of units.entries()) {
      const reader = readFileSync(join(output, 'unidades', `${unit.id}.html`), 'utf8');
      assert.match(reader, /class="reader-topic-nav"/);
      assert.match(reader, /class="reader-rail-toggle"/);
      const headingIds = new Set([...reader.matchAll(/<h[1-6] id="([^"]+)"/g)].map((match) => match[1]));
      const rail = reader.match(/<nav class="reader-topic-nav"[\s\S]*?<\/nav>/)?.[0] || '';
      for (const href of rail.matchAll(/href="#([^"]+)"/g)) assert.ok(headingIds.has(href[1]), `${unit.id}#${href[1]}`);
      const pager = reader.match(/<nav class="unit-pager"[\s\S]*?<\/nav>/)?.[0] || '';
      if (index) assert.ok(pager.includes(`href="${units[index - 1].id}.html">← Anterior: ${units[index - 1].title}`));
      else assert.doesNotMatch(pager, /Anterior:/);
      if (index + 1 < units.length) assert.ok(pager.includes(`href="${units[index + 1].id}.html">Siguiente: ${units[index + 1].title} →`));
      else assert.doesNotMatch(pager, /Siguiente:/);
    }
  } finally { rmSync(output, { recursive: true, force: true }); }
});

test('build command documents its output option', () => {
  const run = spawnSync('python3', ['tools/build_site.py', '--help'], { cwd: root, encoding: 'utf8' });
  assert.equal(run.status, 0, run.stderr);
  assert.match(run.stdout, /--output/);
  assert.equal(run.stderr, '');
});
