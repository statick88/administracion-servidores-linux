import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = resolve(import.meta.dirname, '..');

function renderWorkshop(path) {
  const source = readFileSync(resolve(root, path), 'utf8');
  const run = spawnSync('python3', ['-c',
    'import sys; from content import render_markdown; print(render_markdown(sys.stdin.read(), {}))'
  ], {
    cwd: resolve(root, 'tools'), input: source, encoding: 'utf8',
    env: { ...process.env, PYTHONDONTWRITEBYTECODE: '1' }
  });
  assert.equal(run.status, 0, run.stderr);
  return run.stdout;
}

test('workshops VIII and XII render isolated, evidence-first brochure labs', () => {
  const dhcp = renderWorkshop('course/workshops/08-dhcp.md');
  assert.match(dhcp, /dhcpd\.conf\.sintetico/);
  assert.match(dhcp, /subnet 192\.0\.2\.0 netmask 255\.255\.255\.0/);
  assert.match(dhcp, /option domain-name-servers 192\.0\.2\.53/);
  assert.match(dhcp, /fixed-address 192\.0\.2\.50/);
  assert.match(dhcp, /dhcpd\.leases\.evidencia/);
  assert.match(dhcp, /67\/udp.*ALLOW IN.*lab-dhcp0/is);
  assert.match(dhcp, /dhcpd -t -cf .*dhcpd\.conf\.sintetico/);
  assert.match(dhcp, /No se inicia.*demonio.*No se transmite.*LAN/is);

  const rescue = renderWorkshop('course/workshops/12-rescate-proyecto.md');
  assert.match(rescue, /VM desechable.*instantánea/is);
  assert.match(rescue, /systemd\.unit=rescue\.target/);
  assert.match(rescue, /fsck -n .*rescate-prueba\.img/);
  assert.match(rescue, /imagen.*sin montar/is);
  assert.match(rescue, /journalctl -b -p err/);
  assert.match(rescue, /strace -f -o strace-proceso-local\.log -- sh -c &#x27;sleep 30&#x27;/);
  assert.match(rescue, /proceso_local_pid=\$!/);
  assert.match(rescue, /lsof -nP -p &quot;\$proceso_local_pid&quot;/);
  assert.match(rescue, /kill &quot;\$proceso_local_pid&quot;/);
  assert.match(rescue, /wait &quot;\$proceso_local_pid&quot;/);
  assert.match(rescue, /rúbrica integrada/i);
  assert.match(rescue, /Evidencia.*Diagnóstico.*Reversión/is);
});
