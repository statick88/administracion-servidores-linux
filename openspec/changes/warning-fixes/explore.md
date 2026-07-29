# SDD Explore: Fix All WARNING Issues Across Ebook

## Change Name
`warning-fixes`

## Problem Summary
Quarto render produces multiple WARNING types across the entire ebook that need systematic fixing.

## Root Cause Analysis

### 1. Citation Warnings (Citeproc)
**Files affected**: 
- `about.qmd` → `citation statick_ds not found`
- `06-redes/index.qmd` → `citation 1.1.1.1 not found`
- `unidades/unidad13/1_usuarios_grupos.qmd` → `citation debian2024 not found`, `citation linux2024 not found`, `citation ubuntu2024 not found`
- `unidades/unidad13/2_permisos_chmod.qmd` → same 3 citations
- `unidades/unidad13/3_sudo_administracion.qmd` → same 3 citations
- `unidades/unidad13/4_lab_practico_usuarios.qmd` → `citation debian2024 not found`, `citation ubuntu2024 not found`

**Root cause**: Bibliography references in YAML frontmatter (`bibliography: references.bib`) but the cited keys don't exist in any `.bib` file, or there's no `references.bib` file in those directories.

### 2. Code Annotation Warnings
**Files affected**: 
- `01-fundamentos/index.qmd` (multiple warnings for list items 4-11)
- `02-paquetes/index.qmd` (2 warnings)
- `unidades/unidad12/2_logs_journalctl.qmd` (4 warnings)
- `unidades/unidad12/3_red_puertos_dns.qmd` (3 warnings)
- `unidades/unidad12/4_recursos_sistema_storage.qmd` (1 warning)

**Root cause**: Quarto's annotation system (`# <N>` in code blocks matched to numbered explanation lists) gets confused when:
- Multiple code blocks in the same document use the same annotation numbers (1, 2, 3...)
- The explanation list doesn't immediately follow the code block
- There are callout boxes or other content between code block and explanation list

Quarto appears to match annotations globally rather than per-code-block.

### 3. Broken External Links (Linkrot)
**Files affected** (from render output):
- `license.qmd`: CC BY-SA 3.0 legalcode.es → 404
- `01-fundamentos/index.qmd`: Ubuntu discourse noble-numbat → 404
- `04-usuarios/index.qmd`: linux-pam.org → unavailable, sudo.ws → 404
- `06-redes/index.qmd`: netplan.io/docs/ → 404, access.redhat.com → 403
- `07-seguridad/index.qmd`: fail2ban.org wiki → 404
- `09-nginx/index.qmd`: Ubuntu discourse noble-numbat → 404 (duplicate)
- `11-bases-datos/index.qmd`: dev.mysql.com → 403 (two links)
- `unidades/unidad12/5_lab_practico_troubleshooting.qmd`: digitalocean.com → 404, access.redhat.com → 403
- `unidades/unidad13/99_recursos.qmd`: 8 broken links (debian.org, learn.microsoft.com, linuxjourney.com, viemu.com, askubuntu.com, unix.stackexchange.com, linuxquestions.org, gnometerminator.github.io)

**Root cause**: URLs have changed, moved, or require authentication. Need to find working alternatives or archive.org versions.

### 4. Fenced Div Warnings
**Files affected**:
- `unidades/unidad13/1_usuarios_grupos.qmd` (5 warnings)
- `unidades/unidad13/2_permisos_chmod.qmd` (5 warnings)
- `unidades/unidad13/3_sudo_administracion.qmd` (2 warnings)

**Root cause**: The `:::` fenced div syntax is being used but there's a parsing issue - likely unclosed divs or malformed syntax. The warning says "The following string was found in the document: :::" which indicates the parser is seeing raw `:::` strings.

### 5. Missing GNU Bash Manual
**Files affected**: `03-scripting/index.qmd`
**Root cause**: The URL `https://www.gnu.org/software/bash/manual/` returns "unavailable" - need to verify and update.

## Solution Strategy

### For Citation Warnings:
1. Find or create `references.bib` files with the cited keys
2. Or remove unused bibliography references from YAML frontmatter
3. Use standard citation keys that exist in common bibliography files

### For Code Annotation Warnings:
1. Use unique annotation numbers across the entire document (e.g., 101, 102, 103 for first block; 201, 202 for second)
2. OR restructure to ensure each code block's explanation list immediately follows with no intervening content
3. OR switch to a different documentation pattern (inline comments + separate explanation table)

### For Broken Links:
1. Find working alternative URLs
2. Use archive.org for permanently moved content
3. Remove or replace dead links
4. For Red Hat links (403), find public alternatives

### For Fenced Div Warnings:
1. Check for unclosed `:::` divs
2. Fix malformed syntax
3. Ensure proper nesting

### For GNU Bash Manual:
1. Verify correct URL and update

## Files to Modify (Priority Order)
1. `01-fundamentos/index.qmd` - Multiple annotation warnings
2. `unidades/unidad13/1_usuarios_grupos.qmd` - Annotation + fenced div + citations
3. `unidades/unidad13/2_permisos_chmod.qmd` - Fenced div + citations
4. `unidades/unidad13/3_sudo_administracion.qmd` - Fenced div + citations
5. `unidades/unidad13/4_lab_practico_usuarios.qmd` - Citations
6. `unidades/unidad13/99_recursos.qmd` - 8 broken links
7. `02-paquetes/index.qmd` - Annotation warnings
8. `04-usuarios/index.qmd` - Broken links
9. `06-redes/index.qmd` - Citation + broken links
10. `07-seguridad/index.qmd` - Broken link
11. `09-nginx/index.qmd` - Broken link
12. `11-bases-datos/index.qmd` - Broken links
13. `unidades/unidad12/2_logs_journalctl.qmd` - Annotation warnings
14. `unidades/unidad12/3_red_puertos_dns.qmd` - Annotation warnings
15. `unidades/unidad12/4_recursos_sistema_storage.qmd` - Annotation warning
16. `unidades/unidad12/5_lab_practico_troubleshooting.qmd` - Broken links
17. `license.qmd` - Broken link
18. `about.qmd` - Citation warning
19. `03-scripting/index.qmd` - GNU Bash manual link

## Acceptance Criteria
- [ ] `quarto render` produces ZERO warnings
- [ ] All external links return 200 OK (or are archived)
- [ ] All citations resolve to bibliography entries
- [ ] All code annotations match explanation lists
- [ ] All fenced divs parse correctly