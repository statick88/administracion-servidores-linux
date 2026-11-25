// Guard: the Pages workflow builds and deploys the static site without Quarto,
// and the repo keeps no Quarto build configuration (spec S3 of
// odd/tasks/sitio-web-sin-quarto.md).
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const WORKFLOW = join(ROOT, ".github", "workflows", "pages.yml");
const workflow = readFileSync(WORKFLOW, "utf8");

test("Pages workflow never installs or invokes Quarto", () => {
  assert.ok(!/quarto/i.test(workflow), "pages.yml must not mention Quarto");
});

test("Pages workflow builds the site with tools/build_site.py", () => {
  assert.ok(workflow.includes("tools/build_site.py"), "builder invocation missing");
  assert.ok(/path:\s*_site\b/.test(workflow), "artifact path must be _site");
});

test("Pages validates its exact generated artifact before upload", () => {
  assert.match(workflow, /python3 tools\/validate_site\.py --site _site --production/);
  assert.match(workflow, /SITE_OUTPUT=_site node --test tests\/guard_brand\.test\.mjs/);
  assert.ok(workflow.indexOf("Build production site with minicourses") < workflow.indexOf("validate_site.py"));
  assert.ok(workflow.indexOf("validate_site.py") < workflow.indexOf("Upload artifact"));
});

test("repository keeps no root Quarto build configuration", () => {
  for (const rel of [
    "_quarto.yml",
    "_extensions",
    "_quarto_internal_scss_error.scss",
    "TEMPLATE_CONTENIDO_MEJORADO.qmd",
    "TEMPLATE_CONTENIDO_MEJORADO.html",
    "TEMPLATE_CONTENIDO_MEJORADO_files",
  ]) {
    assert.ok(!existsSync(join(ROOT, rel)), `${rel} must be removed`);
  }
});

test("content sources and the standalone presentations project stay", () => {
  for (const rel of [
    "01-fundamentos/index.qmd",
    "quizzes/quiz_unidad1.qmd",
    "presentaciones/_quarto.yml",
    "tools/build_site.py",
  ]) {
    assert.ok(existsSync(join(ROOT, rel)), `${rel} must be kept`);
  }
});
