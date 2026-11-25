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
    assert.equal(run.stdout, 'Built 20 pages.\n');
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
  } finally { rmSync(output, { recursive: true, force: true }); }
});

test('build command documents its output option', () => {
  const run = spawnSync('python3', ['tools/build_site.py', '--help'], { cwd: root, encoding: 'utf8' });
  assert.equal(run.status, 0, run.stderr);
  assert.match(run.stdout, /--output/);
  assert.equal(run.stderr, '');
});
