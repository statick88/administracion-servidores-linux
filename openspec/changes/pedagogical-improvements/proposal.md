# Proposal: Pedagogical Improvements

## Intent

The course has excellent technical content (~57 .qmd files, 12 units, 16 labs) but critical pedagogical gaps: Unit 4 is Docker instead of Users/Permissions, planning documents are outdated (reference 8 units / 9.5% completion), and there's no constructive alignment. This moves the course from "Technical-High / Pedagogical-Medium" to "Technical-High / Pedagogical-High".

## Scope

### In Scope
- Restructure Unit 4: Replace Docker content with "Gestión de Usuarios y Permisos" (consolidating scattered content from Units 2, 3, 8)
- Move current Docker content (unidades/unidad4/) to a later position or integrate into existing flow
- Update GUIA_INSTRUCTOR.md, ANALISIS_CONTENIDOS_FALTANTES.md, PLAN_CREACION_CONTENIDOS.md to reflect actual state
- Add explicit learning objectives to all 12 unit .qmd headers
- Create constructive alignment mapping per unit: Objectives → Activities → Assessments

### Out of Scope
- Rewriting existing content (already good)
- AI pedagogy integration (lower priority)
- Gamification system (lower priority)
- Quiz system changes (lower priority)
- Cognitive load optimization / content segmentation (lower priority)

## Capabilities

### New Capabilities
- `users-permissions-unit`: New Unit 4 "Gestión de Usuarios y Permisos" — consolidated content from scattered sources (passwd, shadow, group, useradd/usermod/userdel, rwx, SUID/SGID/Sticky, ACLs, PAM basics, sudoers, chage)
- `constructive-alignment`: Alignment mapping document linking learning objectives → activities → assessments for all 12 units

### Modified Capabilities
- `course-structure`: Unit reordering in _quarto.yml (Docker moves from U4 to later position, Users/Permissions becomes U4), chapter references updated
- `planning-documents`: GUIA_INSTRUCTOR.md (8→12 units), ANALISIS_CONTENIDOS_FALTANTES.md (9.5%→actual), PLAN_CREACION_CONTENIDOS.md (38 missing→actual)

## Approach

1. **Phase A (Planning Docs)**: Update the 3 planning documents to reflect actual course state — this informs all other work
2. **Phase B (Unit Restructure)**: Create new unidades/unidad4/ for Users/Permissions, move Docker content to new folder (e.g., unidades/unidad4b/ or renumber), update _quarto.yml
3. **Phase C (Alignment)**: Add learning objectives to each unit header, create alignment mapping document

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `unidades/unidad4/` | Removed/Replaced | Docker content replaced with Users/Permissions |
| `unidades/unidad4b/` (new) | Created | Docker content relocated here |
| `_quarto.yml` | Modified | Unit 4 chapter paths updated, Docker moved |
| `GUIA_INSTRUCTOR.md` | Modified | 8→12 unit structure |
| `ANALISIS_CONTENIDOS_FALTANTES.md` | Modified | Reflect actual completion % |
| `PLAN_CREACION_CONTENIDOS.md` | Modified | Reflect actual file count |
| All `unidades/unidad*/` headers | Modified | Learning objectives added |
| `openspec/changes/pedagogical-improvements/alignment-mapping.md` | Created | Objectives→Activities→Assessments |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Broken internal links after unit reorder | Medium | Audit all cross-references before/after move |
| Duplicate content during transition | Low | Use git mv, verify no orphaned files |
| Planning doc updates inaccurate | Low | Cross-reference with actual file listing |

## Rollback Plan

Git revert of all changes. Unit restructure uses `git mv` so history is preserved. All files remain in version control.

## Dependencies

- Work Stream 2 (planning docs) must complete first
- Work Stream 1 (unit restructure) depends on updated _quarto.yml
- Work Stream 3 (alignment) can parallel Work Stream 1

## Success Criteria

- [ ] Unit 4 contains Users/Permissions content (not Docker)
- [ ] Docker content accessible at new location
- [ ] GUIA_INSTRUCTOR.md reflects 12 units
- [ ] ANALISIS_CONTENIDOS_FALTANTES.md shows >80% completion
- [ ] PLAN_CREACION_CONTENIDOS.md shows ~57 existing files
- [ ] All 12 unit headers include explicit learning objectives
- [ ] Alignment mapping document covers all 12 units
- [ ] `quarto render` succeeds with no broken references
