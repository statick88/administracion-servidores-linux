# Planning Documents Update Specification

## Purpose

Update three obsolete planning documents to reflect the actual course state (12 units, ~57 files, >80% completion). These documents currently reference 8 units, 4 files, and 9.5% completion — they mislead instructors and prevent accurate project tracking.

## Requirements

### Requirement: GUIA_INSTRUCTOR.md Unit Table

The system SHALL update GUIA_INSTRUCTOR.md section "2. Estructura del Curso" to list all 12 units (not 8) with correct topics and hour estimates. The unit table MUST match the actual _quarto.yml chapter structure.

#### Scenario: Unit table reflects 12 units

- GIVEN GUIA_INSTRUCTOR.md has a unit table showing 8 units (U1–U8 + Proyectos)
- WHEN the update is applied
- THEN the table lists 12 units: U1 Introducción, U2 Instalación, U3 Comandos, U4 Usuarios y Permisos, U5 Procesos, U6 Almacenamiento, U7 Redes, U8 SSH, U9 Apache, U10 Nginx, U11 MariaDB, U12 Troubleshooting
- AND total hours sum to ~40–50h contact + 80–100h lab

#### Scenario: Unit names match brochure

- GIVEN the Abacom brochure defines specific unit names
- WHEN the table is updated
- THEN unit names align with the brochure terminology (e.g., "Gestión de Usuarios y Permisos" not "Usuarios y Docker")

### Requirement: ANALISIS_CONTENIDOS_FALTANTES.md Completion Status

The system SHALL update ANALISIS_CONTENIDOS_FALTANTES.md to reflect actual file counts. The document MUST show >80% completion and list the ~57 existing .qmd files across all 12 units.

#### Scenario: File count matches reality

- GIVEN the document states "4 archivos existentes" and "26 archivos faltantes"
- WHEN the update is applied
- THEN "Archivos existentes" shows ~57
- AND "Archivos faltantes" shows remaining gaps (if any)
- AND completion percentage shows >80%

#### Scenario: Unit status reflects actual content

- GIVEN the document marks most units as "0 de N archivos ❌"
- WHEN the update is applied
- THEN each unit shows actual count of existing files
- AND status icons reflect real state (✅ for complete, 🟡 for partial, ❌ for missing)

### Requirement: PLAN_CREACION_CONTENIDOS.md Current State

The system SHALL update PLAN_CREACION_CONTENIDOS.md summary table to show actual numbers. The "38 archivos faltantes" and "9.5% completitud" MUST be corrected.

#### Scenario: Summary table accurate

- GIVEN the summary shows 4 existing / 38 missing / 9.5%
- WHEN the update is applied
- THEN "Archivos existentes" shows ~57
- AND "Completitud actual" shows >80%
- AND remaining work items are listed (if any)

#### Scenario: Phase breakdown reflects actual gaps

- GIVEN the 4-phase plan references creating 32 files
- WHEN the update is applied
- THEN phases are restructured to address only remaining gaps
- AND time estimates reflect actual remaining work

## Rationale

These three documents are the authoritative references for course state. Outdated documents cause instructors to misallocate effort and misrepresent progress to stakeholders.
