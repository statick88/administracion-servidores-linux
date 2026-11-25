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
    const home = readFileSync(join(output, 'index.html'), 'utf8');
    const resources = readFileSync(join(output, 'recursos.html'), 'utf8');
    const bandit = readFileSync(join(output, 'recursos', 'bandit.html'), 'utf8');
    const proxmox = readFileSync(join(output, 'recursos', 'proxmox.html'), 'utf8');
    assert.equal(run.stdout, 'Built 27 pages.\n');
    assert.equal(run.stderr, '');
    assert.match(resources, /href="recursos\/bandit\.html/);
    assert.match(resources, /href="recursos\/proxmox\.html/);
    assert.doesNotMatch(resources, /Plantillas y cloud-init sin secretos|no contiene datos de acceso/);
    for (const guide of [bandit, proxmox]) {
      assert.match(guide, /href="\.\.\/recursos\.html"/);
      assert.match(guide, /href="\.\.\/assets\/style\.css"/);
    }
    const article = (page) => {
      const body = page.match(/<article>[\s\S]*?<\/article>/)?.[0];
      assert.ok(body, 'Missing guide article');
      return body;
    };
    assert.doesNotMatch(article(bandit), /Proxmox VE/);
    assert.doesNotMatch(article(proxmox), /Bandit/);
    const fundamentals = readFileSync(join(output, 'unidades', '01-fundamentos.html'), 'utf8');
    const security = readFileSync(join(output, 'unidades', '07-seguridad.html'), 'utf8');
    assert.match(home, /href="(?:\.\/)?recursos\.html">Todos los recursos</);
    assert.match(resources, /Bandit: guía de pistas seguras para aprender/);
    assert.match(resources, /Proxmox VE: orientación compatible/);
    const resourceManifest = JSON.parse(readFileSync(join(root, 'course/resources.json'), 'utf8'));
    const advancedRecord = resourceManifest.resources.find(({ id }) => id === 'proxmox-avanzado');
    assert.deepEqual(advancedRecord?.units, [], 'Advanced Proxmox must remain supplemental');
    assert.equal(advancedRecord?.publication, 'guide');
    const advanced = proxmox.split('<section id="proxmox-avanzado">')[1];
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
    assert.match(resources, /Lab Linux: cobertura y límites/);
    assert.match(resources, /Lectores complementarios: Docker, Nginx y TLS/);
    assert.match(resources, /href="unidades\/08-docker\.html">Docker<\/a>/);
    assert.match(resources, /href="unidades\/09-nginx\.html">Nginx<\/a>/);
    assert.match(resources, /href="unidades\/10-ssl\.html">TLS\/HTTPS<\/a>/);
    assert.match(resources, /href="unidades\/11-bases-datos\.html">lección oficial de MariaDB<\/a>/);
    assert.match(resources, /href="unidades\/11-bases-datos-multimotor\.html">lectura complementaria sobre bases de datos en contenedores<\/a>/);
    assert.match(resources, /sus números no equivalen a las unidades del brochure/);
    assert.match(resources, /Cobertura parcial de la Unidad X; no es equivalencia numérica con el laboratorio/);
    assert.match(resources, /configuraciones privilegiadas o acceso a socket/);
    assert.match(resources, /Fuera de alcance curricular actual/);
    assert.match(bandit, /no contiene datos de acceso/);
    assert.doesNotMatch(bandit, /bandit[0-9]+/i);
    assert.match(fundamentals, /href="\.\.\/recursos\/proxmox\.html#proxmox-fundamentos-compatibles"/);
    assert.match(fundamentals, /href="\.\.\/recursos\.html#practica-fundamentos-wsl2"/);
    assert.match(security, /href="\.\.\/recursos\/bandit\.html#bandit-pistas-seguras"/);
    assert.match(security, /href="\.\.\/recursos\.html#practica-hardening"/);
    const catalog = JSON.parse(readFileSync(join(root, 'course/catalog.json'), 'utf8'));
    assert.match(resources, /<h2>Talleres por unidad<\/h2>/);
    for (const { id } of catalog.units) {
      const reader = readFileSync(join(output, 'unidades', `${id}.html`), 'utf8');
      const workshop = resources.split(`<section id="taller-${id}">`)[1]?.split(/<section id="taller-/)[0];
      assert.ok(workshop, `Missing workshop for ${id}`);
      assert.match(workshop, /Pasos guiados/);
      assert.match(workshop, /Entregables/);
      assert.ok(reader.includes(`href="../recursos.html#taller-${id}"`), `Missing workshop link for ${id}`);
    }
  } finally {
    rmSync(output, { recursive: true, force: true });
  }
});

test('build publishes the offline Lab Linux index and six locally navigable companion practices', () => {
  const output = mkdtempSync(join(tmpdir(), 'linux-lab-linux-'));
  try {
    const run = spawnSync('python3', ['tools/build_site.py', '--output', output], {
      cwd: root, encoding: 'utf8', env: { ...process.env, PYTHONDONTWRITEBYTECODE: '1' }
    });
    assert.equal(run.status, 0, run.stderr);
    assert.equal(run.stdout, 'Built 27 pages.\n');
    const resources = readFileSync(join(output, 'recursos.html'), 'utf8');
    assert.match(resources, /href="recursos\/lab-linux\/index\.html">Lab Linux/);
    const index = readFileSync(join(output, 'recursos', 'lab-linux', 'index.html'), 'utf8');
    assert.match(index, /documentación local incluida en este sitio/i);
    assert.match(index, /repositorio de Lab Linux/i);
    assert.match(index, /href="\.\.\/\.\.\/recursos\.html"/);
    const rescue = readFileSync(join(output, 'recursos', 'lab-linux', '12-rescate-proyecto.html'), 'utf8');
    assert.doesNotMatch(rescue, /(?:^|\n)\s*kill\s+(?!-0\b)/m, 'The rescue guide must not signal a saved PID');
    const pages = ['06-redes', '08-dhcp', '09-apache', '10-nginx-apache', '11-mariadb', '12-rescate-proyecto'];
    for (const slug of pages) {
      assert.match(index, new RegExp(`href="${slug}\\.html"`));
      const guide = readFileSync(join(output, 'recursos', 'lab-linux', `${slug}.html`), 'utf8');
      assert.match(guide, /documentación local incluida en este sitio/i);
      assert.match(guide, /href="index\.html">Volver al índice de Lab Linux/);
      assert.match(guide, /href="\.\.\/\.\.\/assets\/style\.css"/);
    }
  } finally {
    rmSync(output, { recursive: true, force: true });
  }
});
