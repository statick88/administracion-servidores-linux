import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = resolve(import.meta.dirname, '..');

test('build publishes safe registered resources and links them from home and matching units', () => {
  const output = mkdtempSync(join(tmpdir(), 'linux-resources-'));
  try {
    const run = spawnSync('python3', ['tools/build_site.py', '--output', output], {
      cwd: root, encoding: 'utf8', env: { ...process.env, PYTHONDONTWRITEBYTECODE: '1' }
    });
    assert.equal(run.status, 0, run.stderr);
    assert.equal(run.stdout, 'Built 13 pages.\n');
    const home = readFileSync(join(output, 'index.html'), 'utf8');
    const resources = readFileSync(join(output, 'recursos.html'), 'utf8');
    const fundamentals = readFileSync(join(output, 'unidades', '01-fundamentos.html'), 'utf8');
    const security = readFileSync(join(output, 'unidades', '07-seguridad.html'), 'utf8');
    assert.match(home, /href="(?:\.\/)?recursos\.html">Recursos</);
    assert.match(resources, /Bandit: guía de pistas seguras para aprender/);
    assert.match(resources, /Proxmox VE: orientación compatible/);
    const resourceManifest = JSON.parse(readFileSync(join(root, 'course/resources.json'), 'utf8'));
    const advancedRecord = resourceManifest.resources.find(({ id }) => id === 'proxmox-avanzado');
    assert.deepEqual(advancedRecord?.units, [], 'Advanced Proxmox must remain supplemental');
    assert.equal(advancedRecord?.publication, 'guide');
    const advanced = resources.split('<section id="proxmox-avanzado">')[1];
    assert.ok(advanced, 'Missing advanced Proxmox guide');
    assert.match(advanced, /Proxmox VE avanzado: laboratorio administrativo aislado/);
    assert.match(advanced, /Plantillas y cloud-init sin secretos/);
    assert.match(advanced, /Contenedores LXC no privilegiados y límites de recursos/);
    assert.match(advanced, /Segmentación de red y verificación de aislamiento/);
    assert.match(advanced, /Copia de seguridad y restauración verificable/);
    assert.match(advanced, /No se adaptan los procedimientos de alta disponibilidad, clústeres, quorum, fencing/);
    assert.match(resources, /Prácticas existentes y minicursos compatibles/);
    assert.match(resources, /Antes de automatizar, define una entrada, una salida esperada y un límite de permisos/);
    assert.match(resources, /Verifica una política UFW y una señal de Fail2Ban en un laboratorio aislado/);
    assert.match(resources, /Fuera de alcance curricular actual/);
    assert.match(resources, /no contiene datos de acceso/);
    assert.doesNotMatch(resources, /bandit[0-9]+/i);
    assert.match(fundamentals, /href="\.\.\/recursos\.html#proxmox-fundamentos-compatibles"/);
    assert.match(fundamentals, /href="\.\.\/recursos\.html#practica-fundamentos-wsl2"/);
    assert.match(security, /href="\.\.\/recursos\.html#bandit-pistas-seguras"/);
    assert.match(security, /href="\.\.\/recursos\.html#practica-hardening"/);
    const catalog = JSON.parse(readFileSync(join(root, 'course/catalog.json'), 'utf8'));
    assert.match(resources, /<h2>Talleres por unidad<\/h2>/);
    for (const { id } of catalog.units) {
      const reader = readFileSync(join(output, 'unidades', `${id}.html`), 'utf8');
      const workshop = resources.split(`<section id="taller-${id}">`)[1]?.split('</section>')[0];
      assert.ok(workshop, `Missing workshop for ${id}`);
      assert.match(workshop, /Pasos guiados/);
      assert.match(workshop, /Entregables/);
      assert.ok(reader.includes(`href="../recursos.html#taller-${id}"`), `Missing workshop link for ${id}`);
    }
  } finally {
    rmSync(output, { recursive: true, force: true });
  }
});
