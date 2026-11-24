# 🤖 AGENTS.md — Estándares de Corrección

> **TLDR:** Este archivo define los 8 estándares que TODOS los archivos `.qmd` del proyecto deben cumplir. Cada corrección se valida contra el checklist final.

**Versión:** 2.0 | **Fecha:** 2024-01-30 | **Historial:** [docs/SESSION_LOG.md](docs/SESSION_LOG.md)

---

## Inicialización

```bash
/init
```

Carga este archivo al inicio de cada sesión de correcciones.

---

## Estándares

### 1. Comentarios en Código

**Formato:** Cada comando nuevo lleva `# <N>` inline + explicación numerada después del bloque.

```bash
$ systeminfo  # <1>
Computer Name: MI-PC
System Type: x86-64 based PC
Total Physical Memory: 16384 MB
# <1>
```

1. **systeminfo** muestra detalles del sistema en Windows (procesador, RAM, BIOS)

**Reglas:**
- Cada comando nuevo = nuevo número
- Explicaciones SIEMPRE después de 3 líneas en blanco
- Aplica a todos los bloques (bash, powershell, python, etc.)

---

### 2. Cajas de Advertencia

| Tipo | Sintaxis | Uso |
|------|----------|-----|
| **Advertencia** | `:::{.callout-warning}` | Errores catastróficos, borrado de datos |
| **Recomendación** | `:::{.callout-tip}` | Mejores prácticas, atajos |
| **Nota** | `:::{.callout-note}` | Información adicional no crítica |

**Estructura requerida para warning:**
```markdown
:::{.callout-warning}
## ⚠️ ADVERTENCIA CRÍTICA

**Descripción del problema**

**Lo que podría salir mal:**
- Punto 1
- Punto 2

**Cómo prevenirlo:**
1. Paso 1
2. Paso 2
:::
```

**Aplica a:**
- `⚠️ ADVERTENCIA` → `callout-warning`
- `Recomendación:` → `callout-tip`
- `📝 Nota:` → `callout-note`
- Secciones "Mejores Prácticas" → `callout-tip`

---

### 3. Hipervisores macOS

Tabla requerida en todo archivo que mencione hipervisores:

| Arquitectura | Opciones |
|---|---|
| **Intel Mac** | VirtualBox (gratis), Parallels (pagado), VMware Fusion (pagado) |
| **Apple Silicon (M1/M2/M3)** | UTM (gratis), Parallels (pagado), VMware Fusion (pagado) |

**Recomendación:**
- Principiantes: VirtualBox (Intel) o UTM (Apple Silicon)
- Profesionales: Parallels o VMware Fusion

---

### 4. Referencias y Enlaces

`SETUP.md` SIEMPRE como enlace:

```markdown
Ver guía completa de configuración en: [**SETUP.md**](../../SETUP.md)
```

❌ **NO:** `**SETUP.md**` sin enlace

---

### 5. Formato de Salida de Comandos

**systeminfo (Windows):**
```powershell
PS> systeminfo

Computer Name:          USUARIO-PC
Processor(s):           1 Logical Processor
System Type:            x86-64-based PC
Total Physical Memory:  16384 MB
```

**system_profiler (macOS):**
```bash
$ system_profiler SPHardwareDataType

Hardware Overview:
  Model Name: MacBook Pro
  Model Identifier: MacBookPro18,3
  Processor Name: Apple M3 Pro
  Number of Cores: 12 core CPU
  Memory: 16 GB
```

**uname + free (Linux):**
```bash
$ uname -m
x86_64

$ free -h
total        used        free      shared  buff/cache   available
Mem:           15Gi       4.2Gi       8.2Gi       412Mi       3.1Gi      10Gi
```

---

### 6. Tablas Comparativas

```markdown
| Aspecto | Linux | macOS | Windows |
|---------|-------|-------|---------|
| **Comando** | `ls` | `ls` | `Get-ChildItem` |
| **Sintaxis** | `ls -la` | `ls -la` | `ls -l` o `dir` |
| **Salida** | Similar | Idéntica | Diferente (tabular) |
| **Disponibilidad** | ✅ Nativo | ✅ Nativo | ⚠️ Alias en PS |
```

---

### 7. Ejemplos Multi-SO

**Estructura requerida (orden fijo: Linux → macOS → Windows):**

```markdown
::: {.panel-tabset}

#### Linux
\`\`\`bash
$ comando linux
output linux
# <1>
\`\`\`
1. Explicación específica de Linux

#### macOS
\`\`\`bash
$ comando macos
output macos
# <1>
\`\`\`
1. Explicación específica de macOS

#### Windows
\`\`\`powershell
PS> Comando-Windows
output windows
# <1>
\`\`\`
1. Explicación específica de Windows

:::
```

**Reglas:**
- Prompt correcto: `$` para Unix, `PS>` para PowerShell
- Output realista
- Comentarios inline con `# <N>`
- Explicaciones numeradas después

---

### 8. Estructura de Archivos

Cada archivo `.qmd` debe tener:

```
# Título Principal

## Introducción
- Contexto, por qué importa, qué aprenderás

## Secciones de Contenido
- Explicaciones claras + ejemplos prácticos

## Ejemplos Prácticos Multi-SO
::: {.panel-tabset} ... :::

## Mejores Prácticas

## Resumen/Conclusión

## Referencias
```

---

## Checklist de Validación

Antes de finalizar cualquier corrección:

### Code Comments
- [ ] Todos los comandos tienen `# <1>`, `# <2>`, etc.
- [ ] Las explicaciones están en formato numerado después del código

### Callout Boxes
- [ ] `⚠️ ADVERTENCIA` → `:::{.callout-warning}`
- [ ] `Recomendación:` → `:::{.callout-tip}`
- [ ] Las cajas tienen estructura completa (encabezado + contenido)

### Multi-SO
- [ ] Orden: Linux → macOS → Windows
- [ ] Cada SO tiene ejemplo práctico
- [ ] Prompts correctos (`$` vs `PS>`)

### Hipervisores (si aplica)
- [ ] VirtualBox: Intel Mac
- [ ] VMware Fusion: ambas arquitecturas
- [ ] UTM: Apple Silicon
- [ ] Parallels: ambas arquitecturas

### Enlaces
- [ ] SETUP.md es enlace `[**SETUP.md**](../../SETUP.md)`

### Output
- [ ] systeminfo: Processor, System Type, Total Physical Memory
- [ ] system_profiler: Processor Name, Number of Cores, Memory
- [ ] uname -m + free -h: output realista

---

## Referencias Rápidas

```bash
# Buscar advertencias sin callout
grep -n "⚠️ ADVERTENCIA" unidades/**/*.qmd

# Buscar recomendaciones sin callout
grep -n "Recomendación:" unidades/**/*.qmd

# Contar comentarios en código
grep -c "# <[0-9]" archivo.qmd

# Buscar código sin comentarios
grep -n "^$ \|^PS> \|^# " archivo.qmd | grep -v "<"
```

---

**Meta de cobertura:** 80-100% comentarios por archivo, 100% callouts, 3+ ejemplos multi-SO por sección.
