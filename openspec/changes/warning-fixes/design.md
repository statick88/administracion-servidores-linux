# SDD Design: Fix All WARNING Issues Across Ebook

## Change Name
`warning-fixes`

## Technical Design

### Architecture Overview
This change modifies multiple `.qmd` files and bibliography files across the project. Each fix type is independent but follows consistent patterns.

---

## 1. Bibliography Architecture

### 1.1 Centralized Master Bibliography
- **Location**: `/references.bib` (project root)
- **Purpose**: Single source of truth for all citations
- **Inclusion**: Units reference via relative path in YAML frontmatter

### 1.2 YAML Frontmatter Pattern
```yaml
---
title: "Page Title"
author: "Author"
bibliography: ../../references.bib  # Adjust depth per location
biblio-style: apalike
---
```

### 1.3 Citation Key Naming Convention
- Format: `{topic}_{year}` or `{topic}{year}` 
- Examples: `debian2024`, `ubuntu2024`, `linux2024`, `dns_google`, `statick_ds`
- Lowercase with underscores for readability

---

## 2. Code Annotation Architecture

### 2.1 Unique Per-Document Numbering Scheme
```
Block N uses range: N*100 + 1 to N*100 + M
```

Examples:
- Block 1: 101, 102, 103...
- Block 2: 201, 202, 203...
- Block 3: 301, 302, 303...

### 2.2 Implementation Rules
1. **Annotations in code block**: `# <NNN>` format (3 digits minimum)
2. **Explanation list**: Must immediately follow code block (max 1 blank line)
3. **No intervening content**: No callouts, tables, headings between code block and explanation list
4. **Exact count match**: Number of annotations = number of explanation items
5. **Order preservation**: Annotation N matches explanation item N

### 2.3 Validation Pattern
```markdown
```bash
command1  # <101>
command2  # <102>
```

1. **command1**: Explanation for first command
2. **command2**: Explanation for second command
```

---

## 3. Link Management Architecture

### 3.1 Link Categories
| Category | Strategy |
|----------|----------|
| Official project docs | Use current stable version URLs |
| Community resources | Use archive.org if dead; find active alternatives |
| Vendor docs (Red Hat, Microsoft) | Use public equivalents or archive.org |
| Internal cross-refs | Verify relative paths |

### 3.2 Archive.org Pattern for Dead Links
```
https://web.archive.org/web/2024/https://original-url.com/path
```

### 3.3 Red Hat Links (403 Handling)
Since Red Hat docs require subscription:
1. Try CentOS/AlmaLinux/Rocky Linux equivalents (public)
2. Use `https://access.redhat.com/documentation/en-us/...` with correct version
3. Fallback to archive.org snapshot
4. Or replace with freedesktop.org / kernel.org equivalents

---

## 4. Fenced Div Architecture

### 4.1 Correct Panel-Tabset Structure
```markdown
::: {.panel-tabset}

### Tab 1 Title

#### Sub-section
Content for tab 1.

### Tab 2 Title

#### Sub-section
Content for tab 2.

:::
```

### 4.2 Critical Rules
1. **Blank line after opening `:::`**
2. **Blank line before closing `:::`**
3. **Each tab starts with `### ` heading**
4. **Sub-content uses `#### ` or lower**
5. **No raw `:::` strings in content**

### 4.3 Common Issues to Fix
- Missing blank lines around fenced div
- Nested `::: {.callout-*}` inside panel-tabset (use markdown instead)
- Unclosed divs (every `:::` opener needs a `:::` closer)

---

## 5. File Processing Order (Dependencies)

### Phase 1: Bibliography Foundation
1. Update root `references.bib` with all new entries
2. Verify all cited keys exist

### Phase 2: Citation Fixes (depends on Phase 1)
1. `about.qmd` - add bibliography ref
2. `06-redes/index.qmd` - fix citation key
3. `unidades/unidad13/*.qmd` (4 files) - add bibliography refs

### Phase 3: Annotation Fixes (independent)
1. `01-fundamentos/index.qmd` - renumber all 9 blocks
2. `02-paquetes/index.qmd` - renumber 2 blocks
3. `unidades/unidad12/2_logs_journalctl.qmd` - renumber 2 blocks
4. `unidades/unidad12/3_red_puertos_dns.qmd` - renumber 3 blocks
5. `unidades/unidad12/4_recursos_sistema_storage.qmd` - renumber 1 block

### Phase 4: Link Fixes (independent)
1. `license.qmd` - CC BY-SA link
2. `01-fundamentos/index.qmd` - Ubuntu discourse link
3. `04-usuarios/index.qmd` - PAM + sudo links
4. `06-redes/index.qmd` - netplan + redhat links
5. `07-seguridad/index.qmd` - fail2ban link
6. `09-nginx/index.qmd` - Ubuntu discourse link
7. `11-bases-datos/index.qmd` - MySQL links (2)
8. `unidades/unidad12/5_lab_practico_troubleshooting.qmd` - 2 links
9. `unidades/unidad13/99_recursos.qmd` - 8 links
10. `03-scripting/index.qmd` - GNU Bash manual

### Phase 5: Fenced Div Fixes (independent)
1. `unidades/unidad13/1_usuarios_grupos.qmd`
2. `unidades/unidad13/2_permisos_chmod.qmd`
3. `unidades/unidad13/3_sudo_administracion.qmd`

---

## 6. Testing Strategy

### 6.1 Per-File Validation
After each file modification:
```bash
quarto render <file>.qmd --to html 2>&1 | grep -i "warn\|WARN"
```
Should return empty.

### 6.2 Full Build Validation
```bash
quarto render 2>&1 | grep -i "warn\|WARN"
```
Should return empty.

### 6.3 Link Validation
```bash
quarto check links 2>&1 | grep -i "broken\|404\|403"
```
Should return empty.

### 6.4 Citation Validation
```bash
quarto render 2>&1 | grep -i "citeproc"
```
Should return empty.

---

## 7. Rollback Plan
- All changes tracked in git
- `git checkout -- <file>` to revert individual files
- `git reset --hard HEAD~1` to revert entire change
- No database or external dependencies

---

## 8. Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Annotation renumbering breaks explanation matching | Verify each block: count annotations = count explanations; spot-check content |
| Link replacement changes meaning | Use official project pages; verify content matches |
| Bibliography key mismatch | Run `quarto render` after each bibliography update |
| Fenced div syntax error | Validate with `quarto render` per file |