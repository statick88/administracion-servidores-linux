# Users & Permissions Unit Specification

## Purpose

Create a new Unit 4 "Gestión de Usuarios y Permisos" that consolidates scattered user/permission content from Units 2, 3, and 8 into a dedicated, progressive learning unit. Current Unit 4 (Docker) moves to a later position.

## Requirements

### Requirement: Unit 4 Directory Structure

The system SHALL create `unidades/unidad4/` containing .qmd files covering user/permission topics from foundational to advanced. The unit MUST contain at minimum: user concepts, user management commands, file permissions, advanced permissions (SUID/SGID/Sticky/ACLs), and sudo/privilege escalation.

#### Scenario: Unit 4 files exist

- GIVEN the proposal defines Unit 4 scope
- WHEN the unit is created
- THEN `unidades/unidad4/` contains at least 5 content .qmd files + 99_recursos.qmd
- AND files follow naming convention: `1_usuarios_conceptos.qmd`, `2_gestion_comandos.qmd`, etc.

#### Scenario: Each file has proper Quarto header

- GIVEN a .qmd file in the new Unit 4
- WHEN the file is opened
- THEN it contains YAML frontmatter with title, author ("Diego Saavedra"), date
- AND it includes learning objectives section
- AND it follows the existing unit file format (see Unidad 1 headers)

### Requirement: Content Consolidation from Existing Sources

The system SHALL consolidate user/permission content currently scattered across:
- Unidad 2/3 (`3_configuracion_inicial.qmd` — useradd, usermod, userdel sections)
- Unidad 3 (`4_permisos_archivos.qmd` — chmod, chown, rwx content)
- Unidad 8 (`1_ssh_fundamentos_keys.qmd` — SSH key auth as it relates to user access)

The consolidated unit MUST NOT simply copy-paste — it MUST reorganize content into a logical learning progression.

#### Scenario: No content duplication across units

- GIVEN Unit 4 now covers users/permissions
- WHEN Unidad 2/3/8 are audited
- THEN each topic appears in exactly ONE primary location
- AND cross-references point to Unit 4 for detailed coverage

#### Scenario: Progressive difficulty

- GIVEN the unit has 5+ files
- WHEN content is ordered
- THEN file 1 covers concepts (what are users/groups)
- AND file 2 covers management commands (useradd/usermod/userdel)
- AND file 3 covers basic permissions (rwx, chmod, chown)
- AND file 4 covers advanced permissions (SUID, SGID, Sticky, ACLs, umask)
- AND file 5 covers sudo and privilege escalation

### Requirement: _quarto.yml Integration

The system SHALL update `_quarto.yml` to replace Docker chapter references in Unit 4 with the new Users/Permissions chapter references. Docker content MUST be relocated to a new unit (e.g., unidad4b or renumbered).

#### Scenario: _quarto.yml reflects new Unit 4

- GIVEN `_quarto.yml` currently lists Docker files under Unidad 4
- WHEN the update is applied
- THEN Unidad 4 part lists the new Users/Permissions .qmd files
- AND Docker files are listed under a relocated unit
- AND `quarto render` succeeds with no broken references

#### Scenario: Docker content accessible

- GIVEN Docker content was in Unidad 4
- WHEN the restructure is complete
- THEN Docker files exist at their new location
- AND no .qmd files are orphaned (every file in filesystem has a _quarto.yml entry)

### Requirement: Lab Alignment

The system SHALL verify that `lab-practicos/lab2_usuarios_permisos.md` aligns with the new Unit 4 content. The lab SHOULD reference Unit 4 topics, not the scattered Units 2/3/8.

#### Scenario: Lab references updated

- GIVEN lab2_usuarios_permisos.md exists
- WHEN the unit restructure is complete
- THEN lab content references Unit 4 topics
- AND lab prerequisites point to Unit 4 (not Unit 2/3/8)

## Rationale

Users/permissions is a foundational topic that deserves dedicated coverage. Current placement across 3 units forces instructors to jump between units and students to piece together knowledge.
