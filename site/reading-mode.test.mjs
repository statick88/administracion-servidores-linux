import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { readerNavigationState, readerRailState } from './app.js';

const root = resolve(import.meta.dirname, '..');

function buildSite() {
  const output = mkdtempSync(join(tmpdir(), 'linux-reading-mode-'));
  const run = spawnSync('python3', ['tools/build_site.py', '--output', output], {
    cwd: root, encoding: 'utf8', env: { ...process.env, PYTHONDONTWRITEBYTECODE: '1' }
  });
  return { output, run };
}

test('reader navigation hides only after a downward scroll and stays visible when navigation owns focus', () => {
  assert.equal(readerNavigationState({ isReader: true, scrollY: 160, lastScrollY: 80, navigationHasFocus: false }), 'hidden');
  assert.equal(readerNavigationState({ isReader: true, scrollY: 160, lastScrollY: 80, navigationHasFocus: true }), 'visible');
  assert.equal(readerNavigationState({ isReader: true, scrollY: 80, lastScrollY: 160, navigationHasFocus: false }), 'visible');
  assert.equal(readerNavigationState({ isReader: false, scrollY: 160, lastScrollY: 80, navigationHasFocus: false }), 'visible');
});

test('reader rail hover opens its disclosure and Escape waits for a fresh pointer entry', () => {
  assert.deepEqual(readerRailState({ event: 'enter', hasHover: true, hasFocus: false, hoverSuppressed: false }), { open: true, hoverSuppressed: false });
  assert.deepEqual(readerRailState({ event: 'escape', hasHover: true, hasFocus: false, hoverSuppressed: false }), { open: false, hoverSuppressed: true });
  assert.deepEqual(readerRailState({ event: 'escape', hasHover: false, hasFocus: true, hoverSuppressed: false }), { open: false, hoverSuppressed: false });
  assert.deepEqual(readerRailState({ event: 'enter', hasHover: true, hasFocus: false, hoverSuppressed: true }), { open: false, hoverSuppressed: true });
  assert.deepEqual(readerRailState({ event: 'leave', hasHover: true, hasFocus: false, hoverSuppressed: true }), { open: false, hoverSuppressed: false });
  assert.deepEqual(readerRailState({ event: 'leave', hasHover: true, hasFocus: true, hoverSuppressed: true }), { open: false, hoverSuppressed: false });
  assert.deepEqual(readerRailState({ event: 'leave', hasHover: true, hasFocus: true, hoverSuppressed: false }), { open: true, hoverSuppressed: false });
  const app = readFileSync(join(root, 'site', 'app.js'), 'utf8');
  assert.match(app, /let pointerInside = false;/);
  assert.match(app, /hasHover: pointerInside/);
  assert.doesNotMatch(app, /hasHover: supportsHover/);
});

test('built unit readers provide a keyboard-accessible restore control without activating reading mode on the homepage', () => {
  const { output, run } = buildSite();
  try {
    assert.equal(run.status, 0, run.stderr);
    const home = readFileSync(join(output, 'index.html'), 'utf8');
    const reader = readFileSync(join(output, 'unidades', '01-fundamentos.html'), 'utf8');
    const styles = readFileSync(join(output, 'assets', 'style.css'), 'utf8');
    assert.match(reader, /<button class="reader-navigation-restore" type="button" aria-controls="site-header course-sidebar" hidden>Mostrar navegación<\/button>/);
    assert.match(home, /<button class="reader-navigation-restore" type="button" aria-controls="site-header course-sidebar" hidden>Mostrar navegación<\/button>/);
    assert.doesNotMatch(home, /class="reader-navigation-hidden"/);
    assert.match(styles, /body\.reader-navigation-hidden \.site-header,[\s\S]*body\.reader-navigation-hidden \.course-sidebar/);
    assert.match(styles, /@media \(prefers-reduced-motion: reduce\)[\s\S]*reader-navigation-hidden[\s\S]*transition: none/);
  } finally {
    rmSync(output, { recursive: true, force: true });
  }
});
