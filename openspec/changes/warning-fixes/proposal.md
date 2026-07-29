# SDD Proposal: Fix All WARNING Issues Across Ebook

## Change Name
`warning-fixes`

## Intent
Eliminate ALL Quarto render warnings across the entire ebook by fixing:
1. Missing bibliography citations
2. Code annotation mismatches
3. Broken external links (linkrot)
4. Fenced div parsing issues
5. Unavailable resource URLs

## Scope

### In Scope
- All `.qmd` files in the project (root + `unidades/` + `lab-practicos/`)
- Bibliography files (`references.bib` in root and per-unit)
- External link verification and replacement
- Code block annotation patterns

### Out of Scope
- Content rewriting beyond what's needed to fix warnings
- Adding new features or sections
- Changing the book structure or navigation

## Approach

### Strategy: Systematic Root-Cause Fixes
Rather than patching each warning individually, we address the systemic issues:

1. **Citation System**: Create a master `references.bib` with all needed entries, ensure each unit references it correctly
2. **Annotation Pattern**: Standardize on unique per-document annotation numbering (block 1: 100+, block 2: 200+, etc.)
3. **Link Management**: Create a link audit script, replace dead URLs with working alternatives or archive.org
4. **Fenced Divs**: Fix syntax errors in panel-tabset usage
5. **Resource URLs**: Update to current, accessible URLs

## Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Breaking existing cross-references | Medium | High | Test render after each file; use git to track changes |
| Missing bibliography keys | Low | Medium | Verify all cited keys exist in bib before commit |
| Link replacement changes meaning | Low | Medium | Use official project pages or archive.org |
| Annotation renumbering breaks explanations | Medium | High | Keep 1:1 mapping; verify explanation text matches command |

## Success Criteria
- `quarto render` exits with **zero WARNING messages**
- All external links in rendered HTML are valid (200 OK or archived)
- All citations resolve in bibliography
- All code annotations have matching explanation list items
- All fenced divs render without parsing warnings

## Effort Estimate
- **Explore**: 1h (completed)
- **Propose**: 0.5h
- **Spec**: 1h
- **Design**: 1h
- **Tasks**: 0.5h
- **Apply**: 4-6h (systematic fixes across ~20 files)
- **Verify**: 1h (full render + link check)
- **Total**: ~8-10h

## Dependencies
- None (independent change)

## Next Phase
Proceed to **Spec** phase to define exact fixes per warning type and per file.