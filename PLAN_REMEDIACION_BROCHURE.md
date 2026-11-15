# PLAN DE REMEDIACIÓN — Alineación Curso ↔ Brochure

**Fecha:** 2026-11-14
**Fuente de verdad:** `Brochure_Administración_de_Servidores_Linux.pdf` — temario oficial de 12 unidades
**Base:** Auditoría de alineación del 2026-11-14 (hallazgos verificados con evidencia en el repositorio)
**Rama sugerida al ejecutar:** `feature/alineacion-brochure` (worktree dedicado, nunca en `main`)

---

## Principios

1. **El brochure es el contrato mínimo con el estudiante**: todo su temario (12 unidades) debe tener cobertura publicada en el libro.
2. **El contenido extra se conserva** (Docker, monitoreo, labs avanzados, anexos): es valor agregado, no rompe el contrato. Se declara explícitamente como "Unidades extra" fuera del temario oficial.
3. **Una sola numeración**: la del brochure (12 unidades). La numeración vieja (`unidades/`) y la actual del libro se unifican.
4. **Primero publicar lo que existe, después crear lo que falta** (quick wins antes que contenido nuevo).

---

## Decisiones pendientes (bloquean la ejecución)

| ID | Decisión | Opción recomendada |
|----|----------|--------------------|
| **D1** | Dirección de la alineación: el curso se adapta al brochure, o el brochure se actualiza al curso | **Curso → brochure**: el brochure es el documento comercial entregado al estudiante |
| **D2** | Destino de las unidades extra (Docker VIII/XIV/XV, Monitoreo XIV, labs OpenClaw/OpenCode) | **Mantener como unidades extra** declaradas al final del libro |
| **D3** | Renumerar el libro completo al brochure (12 unidades) o solo agregar contenido sin renumerar | **Renumerar**: sin esto, "Quiz Unidad 8" seguirá evaluando Web mientras la unidad 8 enseña Docker |

---

## Fase 1 — Publicar contenido existente (quick wins, ~4h)

No crear nada: solo incluir en `_quarto.yml` material ya escrito y colgado.

| # | Tarea | Acción | Esfuerzo |
|---|-------|--------|----------|
| 1.1 | Publicar Apache | Añadir `unidades/unidad9/*.qmd` (6 archivos: introducción, config/logs, virtualhosts, seguridad, lab, recursos) como **Unidad IX** del libro | 0.5h |
| 1.2 | Publicar instalación | Añadir `unidades/unidad2/*.qmd` (requisitos/BIOS, instalación Ubuntu, config inicial) a **Unidad I** para cubrir BIOS/UEFI e instalación | 0.5h |
| 1.3 | Decidir destino de `unidades/unidad10` (Nginx/SSL, 6 archivos) | Solapa con `09-nginx/` y `10-ssl/`: fusionar lo mejor en esas unidades o publicarlas como refuerzo | 1h |
| 1.4 | Reparar enlaces rotos | `presentaciones/unidad9.qmd` enlaza a `../unidades/unidad9/*.html` que no está en el libro → reescribir rutas tras 1.1 | 0.5h |
| 1.5 | Verificar render | `quarto render` completo + filtro `linkrot` sin enlaces internos rotos nuevos | 1.5h |

## Fase 2 — Contenido faltante a CREAR (~14–18h)

| # | Tema del brochure | Destino | Contenido | Esfuerzo |
|---|-------------------|---------|-----------|----------|
| 2.1 | **VIII — Servidor DHCP** (8.1 ISC dhcpd y scopes, 8.2 opciones y reservaciones, 8.3 lease file y firewall) | Nueva carpeta de unidad (publicar en Fase 3) + lab | No existe NADA en el repo: crear desde cero. 4–5 archivos `.qmd` + 1 lab (`dhcpd`, scopes, reservas, opciones, `/var/lib/dhcp/dhcpd.leases`, regla de firewall) | 6–8h |
| 2.2 | **I — Arquitectura y arranque**: 1.3 GRUB2, 1.4 Runlevels, 1.5 Systemd targets | `01-fundamentos/index.qmd` (+ material de 1.2) | Secciones nuevas: GRUB2 (entrada, parámetros, `grub-mkconfig`), runlevels vs targets (`systemctl isolate`) | 2–3h |
| 2.3 | **VII — Hardening**: SELinux/AppArmor modos (7.3), umask en profundidad (7.2) | `07-seguridad/index.qmd` | Sección nueva: modos SELinux (enforcing/permissive/disabled), `aa-status`, perfiles AppArmor. Hoy auditd y Lynis ya están ✅ | 2h |
| 2.4 | **VI — Redes**: nmcli (6.1), firewall-cmd/ufw (6.3) | `06-redes/index.qmd` | nmcli no existe (0 menciones); firewalld no existe (el curso usa nftables/ufw) → añadir nmcli y una sección comparativa firewalld vs ufw | 1.5h |
| 2.5 | **XII — Proyecto Final**: boot single-user, rescue mode, fsck (12.1) + competencias integradoras (12.2) | `unidades/unidad12/` + archivo nuevo `proyecto_final.qmd` | rescue/single-user hoy 0 menciones; strace/lsof/fsck ya están ✅. Añadir arranque de rescate + **Proyecto Final con rúbrica** (hoy solo una fila en una tabla) | 3–4h |
| 2.6 | **XI — MariaDB**: tuning básico (11.2) | `11-bases-datos/index.qmd` | Refuerzo: `EXPLAIN`, índices, variables clave. Instalación/usuarios/dumps ya están ✅ | 1–2h |

## Fase 3 — Renumeración y evaluación (~6h)

| # | Tarea | Detalle |
|---|-------|---------|
| 3.1 | Unificar numeración | Estructura objetivo = brochure: I–VII (ya existentes, con Fase 2 completada), **VIII=DHCP**, **IX=Apache** (unidad9 publicada), **X=Nginx + Apache** (09-nginx + SSL como soporte), **XI=MariaDB**, **XII=Proyecto Final**. Docker/Monitoreo → "Unidades extra" al final |
| 3.2 | Re-mapear quizzes | Hoy siguen la numeración vieja: `quiz_unidad8`="Servidores Web", `quiz_unidad9`="Apache", `quiz_unidad7`="Redes", `quiz_unidad11`="MariaDB". Renombrar/ajustar para que cada `quiz_unidadN` evalúe la unidad N del libro |
| 3.3 | Actualizar índices | `practicas/`, `lab-practicos/` (los labs ya usan numeración propia lab0–lab14: solo verificar coherencia), `presentaciones/` |
| 3.4 | Re-render y verificación | `quarto render` + `linkrot` + revisión manual de navegación |

## Fase 4 — Higiene (~2h)

| # | Tarea |
|---|-------|
| 4.1 | Marcar `ANALISIS_CONTENIDOS_FALTANTES.md` como obsoleto (describe el estado del 29-ene-2026: "4 archivos existentes") o actualizarlo |
| 4.2 | Resolver `unidades/` huérfanas (1, 3–8, 10, 11): publicar lo útil, archivar lo duplicado con las unidades 01–11 |
| 4.3 | Actualizar `PROXIMOS_PASOS.md` y `PLAN_CREACION_CONTENIDOS.md` con el estado real |
| 4.4 | Actualizar `Readme.md`/`index.qmd` si la estructura de unidades cambia |

---

## Criterios de aceptación (verificación)

1. **Matriz de cobertura 100%**: los 12 temas del brochure con cobertura publicada — la tabla de la auditoría pasa de ❌/⚠️ a ✅ en todas las filas.
2. **Unidad VIII (DHCP) publicada** con lab, no solo menciones incidentales.
3. **Apache publicado** en el libro (no solo en carpeta huérfana).
4. **Proyecto Final existente** con entregable y rúbrica.
5. `quarto render` completo sin errores; `linkrot` sin enlaces internos rotos.
6. Cada `quiz_unidadN` coincide con el título de la unidad N publicada.
7. Ningún enlace del libro apunta a `unidades/` fuera del índice.

## Orden de ejecución

```
D1–D3 (decisiones) → Fase 1 (publicar, 1 día) → Fase 2 (crear, 2–3 días)
→ Fase 3 (renumerar, 1 día) → Fase 4 (higiene, media jornada)
```

**Esfuerzo total estimado: 26–30 horas** (mayormente Fase 2: la unidad DHCP completa y el Proyecto Final).

---

## Log

- **L1** (2026-11-14): "Analiza el estado actual del curso, verifica que este alineado con el brochedure del mismo" → auditoría completada; gaps críticos: DHCP, Apache no publicado, Proyecto Final inexistente, 3 numeraciones incompatibles.
- **L2** (2026-11-14): "prepara el plan de remediacion" → este documento.
- **L3** (2026-11-14): "procede" → D1–D3 confirmados (curso→brochure, extras declarados, renumerar). Fase 1 ejecutada en worktree `feature/alineacion-brochure`:
  - **1.1 ✅** 6 capítulos de `unidades/unidad9/` publicados como parte "Servidor Web (Apache) — Brochure Unidad IX" (insertada tras Nginx; el número definitivo se asigna en Fase 3).
  - **1.2 ✅** 6 capítulos de `unidades/unidad2/` añadidos a la parte UNIDAD I (requisitos/BIOS, instalación, config inicial, actualización, terminal, recursos).
  - **1.3 ✅** Decidido: `unidades/unidad10` **no** se publica como parte separada — su contenido está mayormente duplicado en `09-nginx/`, `10-ssl/` y `lab9_*`. Minar secciones únicas ("balanceo de carga", "security headers") durante Fase 3.
  - **1.4 ✅** Los 4 enlaces de `presentaciones/unidad9.qmd` a `../unidades/unidad9/*.html` ahora resuelven a capítulos del libro (eran rotos antes).
  - **1.5 ⚠️** `quarto render` **NO DISPONIBLE**: quarto no está instalado en esta máquina (proyecto desarrollado en Mac). Verificación estructural alternativa: YAML válido, 110 capítulos listados / 0 inexistentes, 0 imágenes rotas en los 12 archivos nuevos, 4/4 enlaces OK. **Pendiente:** ejecutar `quarto render` + `linkrot` en un entorno con quarto.
  - **Seguimiento Fase 3:** los títulos internos de `unidades/unidad2` dicen "Unidad 2:" y los de `unidades/unidad9` dicen "Unidad 9:" (numeración vieja) — corregir al renumerar.
- **L4** (2026-11-15): "si" (push) + "raliza la fusion con main y deploy en gh-pages" + cierre Fase 2.1:
  - **Fase 2 ✅ completa (6/6):** 2.1 DHCP (5 archivos nuevos,1525 líneas, parte "Servidor DHCP — Brochure Unidad VIII" cableada), 2.2 GRUB2/runlevels/targets, 2.3 umask/GPG/SELinux/AppArmor, 2.4 nmcli/firewalld, 2.5 modo rescate + Proyecto Final, 2.6 tuning MariaDB. Decisión: `clean_leases` documentado como ejemplo autoral (no existe upstream). Lab DHCP usa netns+veth porque el NAT de WSL2 bloquea el broadcast.
  - **Entrega slice Fases 1–2:** push de `feature/alineacion-brochure` → PR #6 → **build de CI pasó (6m50s): primera validación `quarto render` real con 112 capítulos (cierra el pendiente L1.5, ahora117)** → merge a `main` (`9214945`) → **deploy GitHub Pages success** (run `43684421975`, https://statick88.github.io/administracion-servidores-linux/).
  - **RDD:** assess `medium/under_budget` (1774 líneas, base `49ea504`) — sin review requerida para el slice; commit DHCP (`660dc24`) evalúa aparte.
  - **Pendiente:** Fase 3 (renumerar libro al brochure, incluye títulos "Unidad 2:"/"Unidad 9:" y re-mapeo de quizzes) y Fase 4 (higiene). Worktree y rama se conservan hasta cerrar la feature.
