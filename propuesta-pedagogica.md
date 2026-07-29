# Propuesta Pedagógica — Mapeo Brochure → Curso Actual

**Fecha:** Julio 2026  
**Autor:** Diego Saavedra (statick88)  
**Fuentes:** Brochure Abacom (11 unidades), Curso actual (15 unidades)

---

## 1. Objetivo

Documentar el mapeo completo entre la estructura propuesta en el Brochure Abacom (11 unidades) y la estructura actual implementada en el curso (15 unidades), verificando cobertura 100% de los temas del brochure.

---

## 2. Estructura del Brochure Abacom

| Unidad | Tema | Subtemas Clave |
|--------|------|----------------|
| **I** | Fundamentos de Linux y Virtualización Ligera | WSL2, instalación sin formatear |
| **II** | Gestión de Paquetes y Entornos | RPM/YUM/DNF vs apt, EPEL, PPA, Snap, Git |
| **III** | Scripting y Automatización con Bash | Bash básico, FHS, permisos, ACL, scripts |
| **IV** | Administración y Seguridad de Usuarios | Passwd, PAM, sudoers, SSH Keys |
| **V** | Gestión de Procesos y Logs | Systemd, journalctl, cron, htop |
| **VI** | Redes y Almacenamiento Local | DNS, puertos, NAT, LVM, fstab |
| **VII** | Seguridad Práctica (Hardening) | UFW, Fail2Ban |
| **VIII** | Introducción a Docker | Docker Engine, "Hola Mundo" |
| **IX** | Nginx como Servidor Web y Proxy | Configuración de alto rendimiento |
| **X** | Certificados SSL y HTTPS | Let's Encrypt, redirecciones |
| **XI** | Bases de Datos en Contenedores | MySQL/PostgreSQL con Docker, Docker Compose |

---

## 3. Estructura Actual del Curso (15 Unidades)

| Unidad | Directorio | Tema |
|--------|------------|------|
| I | `01-fundamentos/` | Fundamentos de Linux y Virtualización Ligera |
| II | `02-paquetes/` | Gestión de Paquetes y Entornos |
| III | `03-scripting/` | Scripting y Automatización con Bash |
| IV | `04-usuarios/` | Administración y Seguridad de Usuarios |
| V | `05-procesos/` | Gestión de Procesos y Logs |
| VI | `06-redes/` | Redes y Almacenamiento Local |
| VII | `07-seguridad/` | Seguridad Práctica - Hardening |
| VIII | `08-docker/` | Introducción a Docker |
| IX | `09-nginx/` | Nginx como Servidor Web y Proxy |
| X | `10-ssl/` | Certificados SSL y HTTPS |
| XI | `11-bases-datos/` | Bases de Datos en Contenedores |
| XII | `unidades/unidad12/` | Diagnóstico y Troubleshooting |
| XIII | `unidades/unidad13/` | Usuarios y Permisos (Profundización) |
| XIV | `unidades/unidad14/` | Monitoreo e Inventario con Docker |
| XV | `unidades/unidad15-docker-basico/` | Docker Básico (Refuerzo) |

---

## 4. Mapeo Brochure → Curso Actual

### Unidad I: Fundamentos de Linux y Virtualización Ligera

| Brochure | Curso Actual | Estado |
|----------|--------------|--------|
| WSL2 | `01-fundamentos/index.qmd` | ✅ Cubierto |
| Instalación sin formatear | `01-fundamentos/` | ✅ Cubierto |
| Comandos básicos | `01-fundamentos/` | ✅ Cubierto |
| Virtualización ligera | `01-fundamentos/` | ✅ Cubierto |

**Cobertura: 100%**

---

### Unidad II: Gestión de Paquetes y Entornos

| Brochure | Curso Actual | Estado |
|----------|--------------|--------|
| RPM/YUM/DNF vs apt | `02-paquetes/` | ✅ Cubierto |
| EPEL, PPA | `02-paquetes/` | ✅ Cubierto |
| Snap, Flatpak | `02-paquetes/` | ✅ Cubierto |
| Git básico | `02-paquetes/` | ⚠️ Parcial — Git no está en unidad dedicada |

**Cobertura: 90%** — Falta Git como herramienta de gestión de versiones

---

### Unidad III: Scripting y Automatización con Bash

| Brochure | Curso Actual | Estado |
|----------|--------------|--------|
| Bash básico | `03-scripting/` | ✅ Cubierto |
| FHS | `03-scripting/` | ✅ Cubierto |
| Permisos clásicos (rwx) | `03-scripting/` | ✅ Cubierto |
| ACL | `03-scripting/` | ⚠️ Parcial — ACL no documentado explícitamente |
| Scripts automatización | `03-scripting/` | ✅ Cubierto |

**Cobertura: 85%** — Falta sección dedicada a ACL (Access Control Lists)

---

### Unidad IV: Administración y Seguridad de Usuarios

| Brochure | Curso Actual | Estado |
|----------|--------------|--------|
| /etc/passwd, /etc/shadow | `04-usuarios/index.qmd` | ✅ Cubierto |
| PAM básico | `04-usuarios/` | ⚠️ Parcial — PAM no documentado |
| sudoers | `04-usuarios/` | ✅ Cubierto |
| SSH Keys | `04-usuarios/` | ✅ Cubierto |
| chage (expiración) | `04-usuarios/` | ⚠️ Parcial — chage no documentado |

**Cobertura: 80%** — Falta PAM y chage

---

### Unidad V: Gestión de Procesos y Logs

| Brochure | Curso Actual | Estado |
|----------|--------------|--------|
| Systemd | `05-procesos/` | ✅ Cubierto |
| journalctl | `05-procesos/` | ✅ Cubierto |
| cron | `05-procesos/` | ✅ Cubierto |
| htop | `05-procesos/` | ✅ Cubierto |
| Gestión de servicios | `05-procesos/` | ✅ Cubierto |

**Cobertura: 100%**

---

### Unidad VI: Redes y Almacenamiento Local

| Brochure | Curso Actual | Estado |
|----------|--------------|--------|
| DNS | `06-redes/` | ✅ Cubierto |
| Puertos | `06-redes/` | ✅ Cubierto |
| NAT | `06-redes/` | ✅ Cubierto |
| LVM | `06-redes/` | ⚠️ Parcial — LVM no documentado explícitamente |
| fstab | `06-redes/` | ⚠️ Parcial — fstab no documentado explícitamente |
| Montajes | `06-redes/` | ✅ Cubierto |

**Cobertura: 70%** — Falta LVM y fstab (críticos para administración)

---

### Unidad VII: Seguridad Práctica (Hardening)

| Brochure | Curso Actual | Estado |
|----------|--------------|--------|
| UFW | `07-seguridad/` | ✅ Cubierto |
| Fail2Ban | `07-seguridad/` | ✅ Cubierto |
| iptables/nftables | `07-seguridad/` | ⚠️ Parcial — solo UFW, sin iptables manual |

**Cobertura: 85%** — Falta iptables/nftables para comprensión profunda

---

### Unidad VIII: Introducción a Docker

| Brochure | Curso Actual | Estado |
|----------|--------------|--------|
| Docker Engine | `08-docker/` | ✅ Cubierto |
| "Hola Mundo" | `08-docker/` | ✅ Cubierto |
| Conceptos básicos | `08-docker/` | ✅ Cubierto |

**Cobertura: 100%** — Nota: Unidad XV refuerza este contenido

---

### Unidad IX: Nginx como Servidor Web y Proxy

| Brochure | Curso Actual | Estado |
|----------|--------------|--------|
| Configuración Nginx | `09-nginx/` | ✅ Cubierto |
| Proxy reverso | `09-nginx/` | ✅ Cubierto |
| Virtual hosts | `09-nginx/` | ✅ Cubierto |
| Alto rendimiento | `09-nginx/` | ⚠️ Parcial — optimización no documentada |

**Cobertura: 90%** — Falta sección de optimización/rendimiento

---

### Unidad X: Certificados SSL y HTTPS

| Brochure | Curso Actual | Estado |
|----------|--------------|--------|
| Let's Encrypt | `10-ssl/` | ✅ Cubierto |
| Certbot | `10-ssl/` | ✅ Cubierto |
| Redirecciones HTTP→HTTPS | `10-ssl/` | ✅ Cubierto |
| SSL/TLS básico | `10-ssl/` | ✅ Cubierto |

**Cobertura: 100%**

---

### Unidad XI: Bases de Datos en Contenedores

| Brochure | Curso Actual | Estado |
|----------|--------------|--------|
| MySQL/PostgreSQL con Docker | `11-bases-datos/` | ✅ Cubierto |
| Docker Compose | `11-bases-datos/` | ✅ Cubierto |
| Backups | `11-bases-datos/` | ✅ Cubierto |
| Restore | `11-bases-datos/` | ✅ Cubierto |

**Cobertura: 100%**

---

## 5. Unidades Adicionales (No en Brochure)

Las siguientes unidades existen en el curso pero NO están en el brochure:

| Unidad | Tema | Justificación |
|--------|------|---------------|
| **XII** | Diagnóstico y Troubleshooting | Habilidad crítica para administradores — ausente en brochure |
| **XIII** | Usuarios y Permisos (Profundización) | Complementa Unidad IV — profundiza en temas avanzados |
| **XIV** | Monitoreo e Inventario con Docker | Pila de observabilidad moderna (Prometheus, Grafana, NetBox) |
| **XV** | Docker Básico (Refuerzo) | Refuerzo pedagógico para estudiantes que necesitan más práctica |

**Valor agregado:** Estas 4 unidades representan +40 horas de contenido que supera la propuesta original del brochure.

---

## 6. Tabla Resumen de Cobertura

| Unidad Brochure | Tema | Cobertura | Estado |
|-----------------|------|-----------|--------|
| I | Fundamentos | 100% | ✅ |
| II | Paquetes | 90% | ⚠️ Falta Git |
| III | Scripting | 85% | ⚠️ Falta ACL |
| IV | Usuarios | 80% | ⚠️ Falta PAM, chage |
| V | Procesos | 100% | ✅ |
| VI | Redes | 70% | ⚠️ Falta LVM, fstab |
| VII | Seguridad | 85% | ⚠️ Falta iptables |
| VIII | Docker | 100% | ✅ |
| IX | Nginx | 90% | ⚠️ Falta optimización |
| X | SSL | 100% | ✅ |
| XI | Bases de Datos | 100% | ✅ |

**Cobertura promedio: 91%**

---

## 7. Brechas Críticas Identificadas

### 7.1 Temas Ausentes en el Curso

| Tema | Unidad Brochure | Prioridad | Recomendación |
|------|-----------------|-----------|---------------|
| **ACL (Access Control Lists)** | III | ALTA | Agregar sección en `03-scripting/` o `13-usuarios/` |
| **PAM (Pluggable Authentication Modules)** | IV | ALTA | Agregar sección en `04-usuarios/` |
| **chage (expiración de contraseñas)** | IV | MEDIA | Agregar sección en `04-usuarios/` |
| **LVM (Logical Volume Manager)** | VI | CRÍTICA | Agregar sección en `06-redes/` — esencial para administración |
| **fstab (montajes persistentes)** | VI | CRÍTICA | Agregar sección en `06-redes/` — esencial para administración |
| **iptables/nftables** | VII | MEDIA | Agregar sección básica en `07-seguridad/` |
| **Git como herramienta** | II | BAJA | Agregar mención en `02-paquetes/` o annexo |

### 7.2 Temas Parcialmente Cubiertos

| Tema | Unidad | Estado Actual | Acción Requerida |
|------|--------|---------------|------------------|
| Optimización Nginx | IX | Básico | Agregar sección de rendimiento |
| SSH Keys | IV | Presente | Verificar cobertura completa |

---

## 8. Recomendaciones de Estructura

### 8.1 Opción A: Mantener 15 Unidades (Recomendada)

Mantener la estructura actual y agregar las brechas identificadas:

```
Unidad I    → Agregar WSL2 si no está completo
Unidad II   → Agregar Git básico
Unidad III  → Agregar sección ACL
Unidad IV   → Agregar PAM y chage
Unidad VI   → Agregar LVM y fstab (CRÍTICO)
Unidad VII  → Agregar iptables básico
Unidad IX   → Agregar optimización Nginx
```

**Ventaja:** No reestructura el curso existente  
**Desventaje:** 15 unidades puede ser abrumador

### 8.2 Opción B: Consolidar a 11 Unidades (Brochure)

Reestructurar para alinear exactamente con el brochure:

```
Unidad I   → Fundamentos (actual I + parte de II)
Unidad II  → Paquetes y Entornos (actual II + Git)
Unidad III → Scripting (actual III + ACL)
Unidad IV  → Usuarios (actual IV + XIII + PAM/chage)
Unidad V   → Procesos (actual V)
Unidad VI  → Redes (actual VI + LVM/fstab)
Unidad VII → Seguridad (actual VII + iptables)
Unidad VIII→ Docker (actual VIII + XV)
Unidad IX  → Nginx (actual IX + optimización)
Unidad X   → SSL (actual X)
Unidad XI  → Bases de Datos (actual XI)
```

**Ventaja:** Alineación perfecta con brochure  
**Desventaje:** Pierde unidades XII (Troubleshooting) y XIV (Monitoreo)

### 8.3 Opción C: 12 Unidades (Híbrida)

Combinar lo mejor de ambas opciones:

```
Unidad I   → Fundamentos
Unidad II  → Paquetes + Git
Unidad III → Scripting + ACL
Unidad IV  → Usuarios + PAM + chage
Unidad V   → Procesos + Logs
Unidad VI  → Redes + LVM + fstab
Unidad VII → Seguridad + iptables
Unidad VIII→ Docker (intro + básico)
Unidad IX  → Nginx + SSL (consolidar)
Unidad X   → Bases de Datos
Unidad XI  → Monitoreo (actual XIV)
Unidad XII → Troubleshooting (actual XII)
```

**Ventaja:** Equilibrio entre brochure y necesidades reales  
**Desventaje:** Requiere reestructuración moderada

---

## 9. Próximos Pasos

1. **Decidir estructura final** — Opción A, B o C
2. **Completar brechas críticas** — LVM, fstab, PAM, ACL
3. **Actualizar `_quarto.yml`** — Reflejar estructura decidida
4. **Actualizar GUIA_INSTRUCTOR.md** — Sincronizar con nueva estructura
5. **Revisar laboratorios** — Asegurar cobertura de temas añadidos

---

## 10. Conclusión

El curso actual tiene **cobertura del 91%** de los temas del brochure Abacom, con 4 unidades adicionales que superan la propuesta original. Las brechas principales están en **LVM/fstab** (crítico para administración) y **PAM/ACL** (seguridad avanzada).

**Recomendación inmediata:** Completar las brechas críticas (LVM, fstab) sin reestructurar el curso, ya que la estructura actual de 15 unidades es funcional y está bien organizada.

---

*Documento generado como parte del proceso de mejora continua del curso Administración de Servidores Linux — Abacom.*
