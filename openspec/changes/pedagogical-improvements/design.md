# Technical Design: Pedagogical Improvements

**Change ID**: pedagogical-improvements  
**Date**: 2026-07-20  
**Author**: Diego Saavedra  
**Status**: Design Phase

---

## 1. Executive Summary

This design document specifies the implementation of three work streams for the pedagogical improvements change:
1. **WS1**: Update planning documents (GUIA_INSTRUCTOR.md, ANALISIS_CONTENIDOS_FALTANTES.md, PLAN_CREACION_CONTENIDOS.md)
2. **WS2**: Create dedicated Unit 4 (Users & Permissions) by extracting content from existing units
3. **WS3**: Add constructive alignment (learning objectives + alignment map) to all 57 .qmd files

**Dependency Order**: WS2 → WS1 → WS3 (WS2 must complete first; WS3 can run in parallel with WS1)

---

## 2. Implementation Sequence

### Phase 1: WS2 - Users & Permissions Unit (Priority: HIGH)
**Rationale**: Foundational content restructuring that affects all other references.

#### Step 1.1: Relocate Docker Content
Current `unidades/unidad4/` contains Docker content that must move to make room for Users & Permissions.

**Operations**:
```bash
# Create new Docker location
mkdir -p unidades/unidad8_docker

# Move Docker files
git mv unidades/unidad4/1_docker.qmd unidades/unidad8_docker/1_docker_introduccion.qmd
git mv unidades/unidad4/2_docker_compose.qmd unidades/unidad8_docker/2_docker_compose.qmd
git mv unidades/unidad4/3_DevContainers.qmd unidades/unidad8_docker/3_devcontainers.qmd
git mv unidades/unidad4/99_recursos.qmd unidades/unidad8_docker/99_recursos.qmd
git mv unidades/unidad4/images/ unidades/unidad8_docker/images/
```

**Files Affected**:
- `unidades/unidad4/` → `unidades/unidad8_docker/` (4 .qmd files + images/)
- `_quarto.yml` → Update chapter references

#### Step 1.2: Create Unit 4 - Users & Permissions
Create new file `unidades/unidad4_usuarios_permisos.qmd` by extracting content from:

**Content Sources**:
1. `unidades/unidad2/3_configuracion_inicial.qmd` (lines 27-478):
   - Section 1: Users and groups (~150 lines)
   - Section 2: Permissions (chmod, chown) (~300 lines)
   
2. `unidades/unidad3/4_permisos_archivos.qmd` (full file, 512 lines):
   - Advanced permissions (setuid, setgid, sticky bit)
   - Permission examples and exercises
   
3. `unidades/unidad8/1_ssh_fundamentos_keys.qmd` (lines 56-368):
   - SSH key generation and management (~312 lines)

**Extraction Pattern**:
```
For each source file:
1. Identify sections to extract (by line ranges)
2. Copy content to new file
3. Add proper headers and transitions
4. Insert learning objectives section (from WS3)
5. Update cross-references to point to new location
6. Add `# <N>` annotations if missing
```

**Target File Structure** (`unidades/unidad4_usuarios_permisos.qmd`):
```yaml
---
title: "Unidad 4: Gestión de Usuarios y Permisos"
description: "Administración de usuarios, grupos, permisos Unix y claves SSH en servidores Linux"
author: "Diego Saavedra"
date: "2026-07-20"
format:
  html:
    toc: true
    toc-depth: 3
    number-sections: false
    highlight-style: github
bibliography: references.bib
biblio-style: apalike
---

# 🎯 Gestión de Usuarios y Permisos

## Introducción
[Content explaining why this unit matters]

## 📚 Objetivos de Aprendizaje
[To be added in WS3 - Bloom's taxonomy verbs]

## 1. Usuarios y Grupos
[Extracted from unidad2/3_configuracion_inicial.qmd lines 27-150]

## 2. Permisos Unix (chmod, chown)
[Extracted from unidad2/3_configuracion_inicial.qmd lines 416-478]

## 3. Permisos Avanzados
[Extracted from unidad3/4_permisos_archivos.qmd - setuid, setgid, sticky bit]

## 4. Claves SSH
[Extracted from unidad8/1_ssh_fundamentos_keys.qmd lines 56-368]

## Resumen
[Summary of key concepts]

## Ejercicios
[Practice exercises]

## Referencias
[Bibliography]
```

#### Step 1.3: Update Unit 8 Title
Change `unidades/unidad8/1_ssh_fundamentos_keys.qmd` title to reflect SSH-only content:
- Remove "SSH keys" section (extracted to Unit 4)
- Keep SSH connection and configuration content
- Update title to "Unidad 8.1: Conexión SSH y Configuración"

#### Step 1.4: Update _quarto.yml
```yaml
# Before:
chapters:
  - unidades/unidad4/1_docker.qmd
  - unidades/unidad4/2_docker_compose.qmd
  - ...

# After:
chapters:
  - unidades/unidad4_usuarios_permisos.qmd
  - unidades/unidad8_docker/1_docker_introduccion.qmd
  - unidades/unidad8_docker/2_docker_compose.qmd
  - ...
```

#### Step 1.5: Update Lab References
Update `lab-practicos/lab2_usuarios_permisos.md`:
- Line 3: Change "Unidad: 4" → already correct
- Verify lab exercises align with extracted content
- Add cross-references to unit sections

---

### Phase 2: WS1 - Update Planning Documents (Priority: MEDIUM)
**Rationale**: Must run after WS2 because references change.

#### Step 2.1: Update GUIA_INSTRUCTOR.md
**File**: `GUIA_INSTRUCTOR.md`

**Changes**:
1. Line 46: Update unit count from "12" to "13" (new Unit 4)
2. Line 52: Update "Contenido" section - add Unit 4 description
3. Line 156: Update "Unidades y Contenido" table - add row for Unit 4
4. Line 234: Update "Laboratorios" section - ensure Lab 2 references Unit 4
5. Line 312: Update "Evaluación" section - ensure quizzes reference Unit 4

**Format**:
```markdown
| Unidad | Título | Laboratorio | Quiz |
|--------|--------|-------------|------|
| 4 | Gestión de Usuarios y Permisos | Lab 2 | Quiz 2 |
```

#### Step 2.2: Update ANALISIS_CONTENIDOS_FALTANTES.md
**File**: `ANALISIS_CONTENIDOS_FALTANTES.md`

**Changes**:
1. Line 8: Update "Archivos existentes" count from "4" to reflect new structure
2. Line 15: Remove "Unidad 4: Gestión de Usuarios y Permisos" from "Faltantes" list
3. Line 28: Update "Contenido Docker" section - now in Unit 8
4. Line 45: Update completion percentage (currently "9.5%")

#### Step 2.3: Update PLAN_CREACION_CONTENIDOS.md
**File**: `PLAN_CREACION_CONTENIDOS.md`

**Changes**:
1. Line 5: Update "Unidades completadas" count
2. Line 12: Add Unit 4 to "Unidades existentes" list
3. Line 34: Update "Progreso actual" percentage
4. Line 56: Update "Próximos pasos" - remove Unit 4 from pending

---

### Phase 3: WS3 - Constructive Alignment (Priority: HIGH, can parallel WS1)
**Rationale**: Independent of WS1, can run in parallel.

#### Step 3.1: Create Alignment Map
**New File**: `ALIGNMENT_MAP.md`

**Structure**:
```markdown
# Mapa de Alineación Curricular

## Unidad 1: Introducción a Sistemas Operativos
- **Objetivo**: Comprender los fundamentos de sistemas operativos
- **Actividades**: Lectura, ejercicios prácticos
- **Evaluación**: Quiz 1
- **Taxonomía Bloom**: Recordar, Comprender

## Unidad 2: Instalación de Ubuntu Server
- **Objetivo**: Instalar y configurar Ubuntu Server
- **Actividades**: Lab 1, ejercicios de instalación
- **Evaluación**: Lab 1, Quiz 1
- **Taxonomía Bloom**: Aplicar, Analizar

[... for all 13 units]
```

#### Step 3.2: Add Learning Objectives to All .qmd Files
**57 files** need `## Objetivos de Aprendizaje` or `## 📚 Objetivos de Aprendizaje` section.

**Format Standardization**:
```markdown
## 📚 Objetivos de Aprendizaje

Al finalizar esta unidad, serás capaz de:

1. **[Verbo Bloom]** [acción específica]
2. **[Verbo Bloom]** [acción específica]
3. **[Verbo Bloom]** [acción específica]
```

**Bloom's Taxonomy Verbs by Unit**:

| Unidad | Verbs (Bloom's Level) |
|--------|------------------------|
| 1 | Recordar, Comprender |
| 2 | Aplicar, Analizar |
| 3 | Aplicar, Evaluar |
| 4 | **[NEW]** Aplicar, Analizar, Evaluar |
| 5 | Analizar, Evaluar |
| 6 | Aplicar, Evaluar |
| 7 | Analizar, Crear |
| 8 | Aplicar, Analizar |
| 9 | Analizar, Crear |
| 10 | Analizar, Evaluar |
| 11 | Aplicar, Evaluar |
| 12 | Analizar, Crear |
| 13 | Crear, Evaluar |

**Files to Update** (complete list):
- `unidades/unidad1/1_introduccion_sistemas_operativos.qmd`
- `unidades/unidad1/2_historia_linux.qmd`
- `unidades/unidad1/3_arquitectura_software.qmd`
- `unidades/unidad1/4_gestion_recursos.qmd`
- `unidades/unidad2/1_requisitos_preparacion.qmd`
- `unidades/unidad2/2_instalacion_ubuntu.qmd`
- `unidades/unidad2/3_configuracion_inicial.qmd`
- `unidades/unidad2/4_actualizacion_seguridad.qmd`
- `unidades/unidad2/5_primeros_pasos_terminal.qmd`
- `unidades/unidad3/1_sistema_archivos_linux.qmd`
- `unidades/unidad3/2_navegacion_directorios.qmd`
- `unidades/unidad3/3_gestion_archivos.qmd`
- `unidades/unidad3/4_permisos_archivos.qmd`
- `unidades/unidad4_usuarios_permisos.qmd` **[NEW]**
- `unidades/unidad5/1_procesos_comandos.qmd`
- `unidades/unidad5/2_gestion_procesos.qmd`
- `unidades/unidad5/3_servicios_systemd.qmd`
- `unidades/unidad6/1_fundamentos_red.qmd`
- `unidades/unidad6/2_configuracion_red.qmd`
- `unidades/unidad6/3_firewall_ufw.qmd`
- `unidades/unidad7/1_apache.qmd`
- `unidades/unidad7/2_nginx.qmd`
- `unidades/unidad7/3_ssl_certificados.qmd`
- `unidades/unidad8_docker/1_docker_introduccion.qmd`
- `unidades/unidad8_docker/2_docker_compose.qmd`
- `unidades/unidad8_docker/3_devcontainers.qmd`
- `unidades/unidad8_docker/99_recursos.qmd`
- `unidades/unidad9/1_bash_scripts.qmd`
- `unidades/unidad9/2_automatizacion.qmd`
- `unidades/unidad9/3_cron_jobs.qmd`
- `unidades/unidad10/1_monitorizacion.qmd`
- `unidades/unidad10/2_logs.qmd`
- `unidades/unidad10/3_backup.qmd`
- `unidades/unidad11/1_seguridad_base.qmd`
- `unidades/unidad11/2_hardenning.qmd`
- `unidades/unidad11/3_auditoria.qmd`
- `unidades/unidad12/1_caso_practico1.qmd`
- `unidades/unidad12/2_caso_practico2.qmd`
- `unidades/unidad12/3_caso_practico3.qmd`
- `unidades/unidad13/1_resumen_curso.qmd`
- `unidades/unidad13/2_proyecto_final.qmd`
- `unidades/unidad13/3_recursos_adicionales.qmd`

**Note**: Some files already have objectives (e.g., unit1, unit2). These need standardization to use Bloom's verbs.

---

## 3. Content Extraction Details

### Source 1: unidad2/3_configuracion_inicial.qmd
**Lines 27-150** → Unit 4 Section 1 (Users & Groups)

**Content to Extract**:
- User management commands (useradd, usermod, userdel)
- Group management (groupadd, groupmod, groupdel)
- /etc/passwd and /etc/group structure
- Practical examples

**Lines 416-478** → Unit 4 Section 2 (Permissions Basics)

**Content to Extract**:
- Permission notation (rwx)
- chmod numeric and symbolic modes
- chown and chgrp commands

### Source 2: unidad3/4_permisos_archivos.qmd
**Full file (512 lines)** → Unit 4 Section 3 (Advanced Permissions)

**Content to Extract**:
- setuid, setgid, sticky bit
- Permission examples and exercises
- Special permission cases

### Source 3: unidad8/1_ssh_fundamentos_keys.qmd
**Lines 56-368** → Unit 4 Section 4 (SSH Keys)

**Content to Extract**:
- SSH key generation (ssh-keygen)
- Public/private key concepts
- ssh-copy-id and authorized_keys
- SSH config file and aliases
- rsync for file transfers

---

## 4. Cross-Reference Update List

After creating Unit 4, update these files:

| File | Line | Change |
|------|------|--------|
| `_quarto.yml` | 45-60 | Update chapter list |
| `GUIA_INSTRUCTOR.md` | 46, 52, 156, 234, 312 | Update unit references |
| `ANALISIS_CONTENIDOS_FALTANTES.md` | 8, 15, 28, 45 | Update inventory |
| `PLAN_CREACION_CONTENIDOS.md` | 5, 12, 34, 56 | Update progress |
| `lab-practicos/lab2_usuarios_permisos.md` | 3, 7 | Verify alignment |
| `unidades/unidad1/1_introduccion_sistemas_operativos.qmd` | - | Add objectives |
| `unidades/unidad1/2_historia_linux.qmd` | - | Add objectives |
| `unidades/unidad1/3_arquitectura_software.qmd` | - | Add objectives |
| `unidades/unidad1/4_gestion_recursos.qmd` | - | Add objectives |
| `unidades/unidad2/1_requisitos_preparacion.qmd` | - | Add objectives |
| `unidades/unidad2/2_instalacion_ubuntu.qmd` | - | Add objectives |
| `unidades/unidad2/3_configuracion_inicial.qmd` | - | Add objectives, update references |
| `unidades/unidad2/4_actualizacion_seguridad.qmd` | - | Add objectives |
| `unidades/unidad2/5_primeros_pasos_terminal.qmd` | - | Add objectives |
| `unidades/unidad3/1_sistema_archivos_linux.qmd` | - | Add objectives |
| `unidades/unidad3/2_navegacion_directorios.qmd` | - | Add objectives |
| `unidades/unidad3/3_gestion_archivos.qmd` | - | Add objectives |
| `unidades/unidad3/4_permisos_archivos.qmd` | - | Add objectives, update references |
| `unidades/unidad5/1_procesos_comandos.qmd` | - | Add objectives |
| `unidades/unidad5/2_gestion_procesos.qmd` | - | Add objectives |
| `unidades/unidad5/3_servicios_systemd.qmd` | - | Add objectives |
| `unidades/unidad6/1_fundamentos_red.qmd` | - | Add objectives |
| `unidades/unidad6/2_configuracion_red.qmd` | - | Add objectives |
| `unidades/unidad6/3_firewall_ufw.qmd` | - | Add objectives |
| `unidades/unidad7/1_apache.qmd` | - | Add objectives |
| `unidades/unidad7/2_nginx.qmd` | - | Add objectives |
| `unidades/unidad7/3_ssl_certificados.qmd` | - | Add objectives |
| `unidades/unidad8/1_ssh_fundamentos_keys.qmd` | - | Add objectives, update title |
| `unidades/unidad9/1_bash_scripts.qmd` | - | Add objectives |
| `unidades/unidad9/2_automatizacion.qmd` | - | Add objectives |
| `unidades/unidad9/3_cron_jobs.qmd` | - | Add objectives |
| `unidades/unidad10/1_monitorizacion.qmd` | - | Add objectives |
| `unidades/unidad10/2_logs.qmd` | - | Add objectives |
| `unidades/unidad10/3_backup.qmd` | - | Add objectives |
| `unidades/unidad11/1_seguridad_base.qmd` | - | Add objectives |
| `unidades/unidad11/2_hardenning.qmd` | - | Add objectives |
| `unidades/unidad11/3_auditoria.qmd` | - | Add objectives |
| `unidades/unidad12/1_caso_practico1.qmd` | - | Add objectives |
| `unidades/unidad12/2_caso_practico2.qmd` | - | Add objectives |
| `unidades/unidad12/3_caso_practico3.qmd` | - | Add objectives |
| `unidades/unidad13/1_resumen_curso.qmd` | - | Add objectives |
| `unidades/unidad13/2_proyecto_final.qmd` | - | Add objectives |
| `unidades/unidad13/3_recursos_adicionales.qmd` | - | Add objectives |

---

## 5. Testing Strategy

### 5.1 Unit Testing
After each work stream, run:
```bash
# Test individual file rendering
quarto render unidades/unidad4_usuarios_permisos.qmd --to html

# Test all units render without errors
for file in unidades/unidad*/*.qmd; do
  quarto render "$file" --to html 2>&1 | grep -i "error" && echo "FAILED: $file"
done
```

### 5.2 Integration Testing
```bash
# Test full book rendering
quarto render

# Verify no broken cross-references
grep -r "\[.*\](.*\.qmd)" unidades/ | while read line; do
  # Extract referenced file and check if it exists
  echo "$line" | grep -oP '\(.*\.qmd\)' | tr -d '()' | xargs test -f
done
```

### 5.3 Content Validation
```bash
# Verify learning objectives present in all units
for file in unidades/unidad*/*.qmd; do
  grep -q "Objetivos de Aprendizaje" "$file" || echo "MISSING objectives: $file"
done

# Verify Bloom's verbs used
grep -r "Objetivos de Aprendizaje" unidades/ | grep -v "Bloom\|Recordar\|Comprender\|Aplicar\|Analizar\|Evaluar\|Crear" && echo "WARNING: Some objectives may not use Bloom's taxonomy"
```

### 5.4 Rollback Testing
```bash
# Create backup before implementation
git stash

# After testing, restore if needed
git stash pop
```

---

## 6. Rollback Plan

### 6.1 Pre-Implementation Backup
```bash
# Create branch for safe rollback
git checkout -b pedagogical-improvements-backup

# Stash current state
git stash save "Pre-pedagogical-improvements backup"
```

### 6.2 Per-Work-Stream Rollback

**WS2 Rollback**:
```bash
# If Docker relocation fails
git checkout HEAD -- unidades/unidad4/
rm -rf unidades/unidad8_docker/

# If new Unit 4 creation fails
git checkout HEAD -- unidades/unidad4_usuarios_permisos.qmd
```

**WS1 Rollback**:
```bash
# Restore planning documents
git checkout HEAD -- GUIA_INSTRUCTOR.md ANALISIS_CONTENIDOS_FALTANTES.md PLAN_CREACION_CONTENIDOS.md
```

**WS3 Rollback**:
```bash
# Remove added objectives (careful - may affect many files)
git checkout HEAD -- unidades/unidad*/*.qmd
git checkout HEAD -- ALIGNMENT_MAP.md
```

### 6.3 Full Rollback
```bash
# Return to pre-implementation state
git checkout main
git branch -D pedagogical-improvements-backup
```

---

## 7. Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Content extraction misses sections | Medium | High | Manual review of each extracted section |
| Cross-references break | High | Medium | Automated testing script |
| Docker relocation causes _quarto.yml errors | Low | High | Test rendering after each move |
| Learning objectives don't match content | Medium | Medium | Review with Bloom's taxonomy reference |
| Lab exercises misalign with new unit | Low | Medium | Verify lab-practicos/lab2 references |

---

## 8. Success Criteria

- [ ] All 57 .qmd files have `## Objetivos de Aprendizaje` with Bloom's verbs
- [ ] Unit 4 exists with extracted content from 3 source files
- [ ] Docker content successfully relocated to Unit 8
- [ ] GUIA_INSTRUCTOR.md reflects 13 units
- [ ] ANALISIS_CONTENIDOS_FALTANTES.md reflects new structure
- [ ] PLAN_CREACION_CONTENIDOS.md shows updated progress
- [ ] ALIGNMENT_MAP.md created with all unit objectives
- [ ] `quarto render` completes without errors
- [ ] All cross-references valid
- [ ] Lab 2 exercises align with Unit 4 content

---

## 9. Next Steps

1. **Approve design** - User reviews and approves this technical design
2. **Execute WS2** - Implement Unit 4 creation (highest priority)
3. **Execute WS1** - Update planning documents
4. **Execute WS3** - Add learning objectives to all files
5. **Run tests** - Execute testing strategy
6. **Verify** - SDD verify phase

---

**Document Version**: 1.0  
**Last Updated**: 2026-07-20  
**Status**: Ready for Review
