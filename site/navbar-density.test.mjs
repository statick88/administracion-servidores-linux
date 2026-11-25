import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const page = readFileSync(resolve(root, 'site/page.html'), 'utf8');
const styles = readFileSync(resolve(root, 'site/style.css'), 'utf8');

test('template places the shared primary landmark at the page-specific navigation slot', () => {
  assert.match(page, /<a class="brand"[^>]*aria-label="Administración de Servidores Linux, inicio"/);
  assert.match(page, /<span class="brand-title">Administración de Servidores Linux<\/span>/);
  assert.match(page, /\{\{primary_navigation\}\}/);
  assert.doesNotMatch(page, /<nav aria-label="Principal"/);
});

test('navbar uses compact desktop spacing and touch-safe mobile controls without a horizontal scroll container', () => {
  assert.match(styles, /\.site-header \{[^}]*align-items: center;[^}]*padding: \.5rem clamp\(\.75rem, 3vw, 2rem\);/s);
  assert.match(styles, /\.primary-nav a, \.resources-menu summary \{[^}]*min-height: 44px;/s);
  assert.match(styles, /@media \(max-width: 900px\) \{[\s\S]*?\.primary-nav \{[^}]*flex-wrap: wrap;/);
  assert.doesNotMatch(styles, /\.primary-nav \{[^}]*overflow-x: auto;/);
  assert.match(styles, /@media \(max-width: 760px\) \{[\s\S]*?\.brand-title \{[^}]*clip: rect\(0 0 0 0\);/);
  assert.doesNotMatch(styles, /\.search-form label|\.search-scope/);
});

test('compact navbar retains search and reading-mode hooks', () => {
  assert.match(page, /\{\{search\}\}/);
  assert.match(page, /reader-navigation-restore/);
  assert.match(styles, /body\.reader-navigation-hidden \.site-header,/);
});
