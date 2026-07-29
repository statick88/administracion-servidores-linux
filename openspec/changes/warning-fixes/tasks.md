# SDD Tasks: Fix All WARNING Issues Across Ebook

## Change Name
`warning-fixes`

## Task Breakdown

---

### Phase 1: Bibliography Foundation

#### TASK-001: Update Root Bibliography
- **File**: `references.bib`
- **Action**: Add missing citation entries:
  - `statick_ds` (for about.qmd)
  - `debian2024`, `linux2024`, `ubuntu2024` (for unidad13)
  - `dns_google` or similar (for 06-redes 1.1.1.1 reference)
- **Validation**: `quarto render 2>&1 | grep -i citeproc` → empty

---

### Phase 2: Citation Fixes

#### TASK-002: Fix about.qmd Citation
- **File**: `about.qmd`
- **Action**: 
  - Add `bibliography: ../references.bib` to frontmatter
  - Verify `[@statick_ds]` citation resolves
- **Validation**: Render → no citeproc warning for statick_ds

#### TASK-003: Fix 06-redes/index.qmd Citation
- **File**: `06-redes/index.qmd`
- **Action**: 
  - Add `bibliography: ../../references.bib` to frontmatter
  - Replace `[@1.1.1.1]` with `[@dns_google]` or similar
- **Validation**: Render → no citeproc warning for 1.1.1.1

#### TASK-004: Fix Unidad 13 Files Citations
- **Files**: 
  - `unidades/unidad13/1_usuarios_grupos.qmd`
  - `unidades/unidad13/2_permisos_chmod.qmd`
  - `unidades/unidad13/3_sudo_administracion.qmd`
  - `unidades/unidad13/4_lab_practico_usuarios.qmd`
- **Action**: 
  - Add `bibliography: ../../../references.bib` to each frontmatter
  - Verify all `[@debian2024]`, `[@linux2024]`, `[@ubuntu2024]` resolve
- **Validation**: Render each → no citeproc warnings

---

### Phase 3: Annotation Fixes

#### TASK-005: Fix 01-fundamentos/index.qmd Annotations
- **File**: `01-fundamentos/index.qmd`
- **Action**: Renumber all 9 code blocks with unique ranges:
  - Block 1 (WSL): 101-104
  - Block 2 (WSL verification): 201-203
  - Block 3 (Docker): 301-302
  - Block 4 (Terminal basics): 401-407
  - Block 5 (Navigation): 501-508
  - Block 6 (Permissions/ACLs): 601-611
  - Block 7 (Editors): 701-703
  - Block 8 (Package mgmt): 801-809
  - Block 9 (Lab): 901-902
- **Critical**: Ensure explanation lists immediately follow each code block with matching count
- **Validation**: Render → no "List item X has no corresponding annotation" warnings

#### TASK-006: Fix 02-paquetes/index.qmd Annotations
- **File**: `02-paquetes/index.qmd`
- **Action**: 
  - Block 1 (CRB): 101
  - Block 2 (Snap certbot): 201
- **Validation**: Render → no annotation warnings

#### TASK-007: Fix Unidad 12 Annotation Files
- **Files**:
  - `unidades/unidad12/2_logs_journalctl.qmd` (2 blocks)
  - `unidades/unidad12/3_red_puertos_dns.qmd` (3 blocks)
  - `unidades/unidad12/4_recursos_sistema_storage.qmd` (1 block)
- **Action**: Apply unique numbering per design
- **Validation**: Render each → no annotation warnings

---

### Phase 4: Link Fixes

#### TASK-008: Fix license.qmd
- **File**: `license.qmd`
- **Action**: Update CC BY-SA 3.0 legalcode.es → legalcode
- **Validation**: Link check passes

#### TASK-009: Fix 01-fundamentos/index.qmd Links
- **File**: `01-fundamentos/index.qmd`
- **Action**: Update Ubuntu Noble Numbat release notes URL
- **Validation**: Link check passes

#### TASK-010: Fix 04-usuarios/index.qmd Links
- **File**: `04-usuarios/index.qmd`
- **Action**: Update PAM docs URL and sudoers man page URL
- **Validation**: Link check passes

#### TASK-011: Fix 06-redes/index.qmd Links
- **File**: `06-redes/index.qmd`
- **Action**: Update netplan.io docs URL; find Red Hat LVM alternative or archive.org
- **Validation**: Link check passes (or 403 documented)

#### TASK-012: Fix 07-seguridad/index.qmd Links
- **File**: `07-seguridad/index.qmd`
- **Action**: Update fail2ban wiki URL to GitHub wiki
- **Validation**: Link check passes

#### TASK-013: Fix 09-nginx/index.qmd Links
- **File**: `09-nginx/index.qmd`
- **Action**: Update Ubuntu Noble Numbat release notes URL
- **Validation**: Link check passes

#### TASK-014: Fix 11-bases-datos/index.qmd Links
- **File**: `11-bases-datos/index.qmd`
- **Action**: Update MySQL mysqldump and GRANT URLs (may need archive.org for 403)
- **Validation**: Link check passes

#### TASK-015: Fix Unidad 12 Troubleshooting Lab Links
- **File**: `unidades/unidad12/5_lab_practico_troubleshooting.qmd`
- **Action**: Update DigitalOcean and Red Hat monitoring guide URLs
- **Validation**: Link check passes

#### TASK-016: Fix Unidad 13 Recursos Links
- **File**: `unidades/unidad13/99_recursos.qmd`
- **Action**: Fix all 8 broken links per spec replacements
- **Validation**: Link check passes

#### TASK-017: Fix 03-scripting/index.qmd Link
- **File**: `03-scripting/index.qmd`
- **Action**: Update GNU Bash manual URL to bash.html
- **Validation**: Link check passes

---

### Phase 5: Fenced Div Fixes

#### TASK-018: Fix Unidad 13 Fenced Divs
- **Files**:
  - `unidades/unidad13/1_usuarios_grupos.qmd`
  - `unidades/unidad13/2_permisos_chmod.qmd`
  - `unidades/unidad13/3_sudo_administracion.qmd`
- **Action**: 
  - Ensure blank lines around all `::: {.panel-tabset}` divs
  - Verify each tab uses `### ` heading
  - Verify proper closing `:::` with blank line before
  - Remove any raw `:::` strings in content
- **Validation**: Render each → no "The following string was found in the document: :::" warnings

---

### Phase 6: Final Verification

#### TASK-019: Full Build Validation
- **Action**: Run full `quarto render` and verify zero warnings
- **Validation**: 
  - No WARNING lines in output
  - `quarto check links` → 0 broken
  - All HTML files generated in `docs/`

#### TASK-020: Production Deploy Verification
- **Action**: Push to main, verify GitHub Pages deploy
- **Validation**: https://statick88.github.io/administracion-servidores-linux/ loads correctly

---

## Task Dependencies

```
TASK-001
  ↓
TASK-002, TASK-003, TASK-004  (can run in parallel after TASK-001)
  ↓
TASK-005 through TASK-018  (all independent, can run in parallel)
  ↓
TASK-019 (depends on all above)
  ↓
TASK-020
```

---

## Estimated Effort

| Phase | Tasks | Est. Time |
|-------|-------|-----------|
| Bibliography | 1 | 15 min |
| Citations | 3 | 30 min |
| Annotations | 3 | 60 min |
| Links | 10 | 45 min |
| Fenced Divs | 1 | 30 min |
| Verification | 2 | 30 min |
| **Total** | **20** | **~3.5 hours** |

---

## Quality Gates

Each task must pass:
1. `quarto render <file>.qmd --to html 2>&1 | grep -i warn` → empty
2. File renders without error
3. Visual inspection of output HTML for correctness

Full build gate (TASK-019):
1. `quarto render 2>&1 | grep -i "warn\|WARN"` → empty
2. `quarto check links 2>&1 | grep -i "broken\|404\|403"` → empty (or only documented 403s)
3. All 94 files rendered to `docs/`