# Práctica XII — Rescate y proyecto integrador

## Introducción

**Objetivo:** demostrar diagnóstico, preservación de evidencia y recuperación planificada en una VM **sin red**, desechable y con snapshot. Esta práctica integra [redes/DHCP](lab-linux/06-redes.md), [Apache](lab-linux/09-apache.md) y [Nginx+Apache](lab-linux/10-nginx-apache.md) sin modificar discos, credenciales ni servicios.

::: {.callout-warning}
## ⚠️ ADVERTENCIA CRÍTICA

No uses `sudo`, `mount`, `fsck` reparador, `systemctl`, `service`, `passwd`, fuerza bruta ni comandos contra una IP, dominio o interfaz. No hay una cuenta que desbloquear.

**Lo que podría salir mal:** reparar o montar una imagen puede destruir evidencia; observar procesos ajenos puede invadir o afectar el sistema.

**Cómo prevenirlo:**
1. Usa una VM sin red, snapshot `XII-inicial` e imagen preexistente sin montar.
2. Ejecuta solo `fsck -n` y observa únicamente el proceso `sleep` que creaste.
:::

## Precondiciones y contrato de evidencia

El docente debe proporcionar la VM, el snapshot `XII-inicial` y una imagen de lectura, por ejemplo `$HOME/xii-material/rescate.img`. Si falta alguno, detente: no crees una imagen con `dd`/`mkfs` ni la descargues.

```bash
export LAB_XII="$HOME/lab-xii"  # <1>
mkdir -p "$LAB_XII"/{evidencia,proyecto}  # <2>
printf 'XII rescate — NOMBRE — FECHA\n' > "$LAB_XII/README-entrega.txt"  # <3>
printf 'Snapshot de partida: XII-inicial\nRed: desconectada\n' > "$LAB_XII/alcance.txt"  # <4>
test -f "$HOME/xii-material/rescate.img" && echo 'imagen presente' | tee "$LAB_XII/evidencia/imagen.txt"  # <5>
```



1. Define el único directorio de escritura de la práctica.
2. Crea evidencia y proyecto separados.
3. Declara identidad y fecha de la entrega.
4. Registra snapshot y aislamiento de red.
5. Confirma que existe material preentregado, sin abrirlo ni modificarlo.

Añade a `alcance.txt` que la imagen no se montó y que toda reparación requiere autorización escrita y una copia.

## Estación 1 — inventario y lectura segura (30 puntos)

```bash
uname -a | tee "$LAB_XII/evidencia/uname.txt"  # <1>
id | tee "$LAB_XII/evidencia/id.txt"  # <2>
printf 'proyecto XII\n' > "$LAB_XII/proyecto/estado.txt"  # <3>
fsck -n "$HOME/xii-material/rescate.img" 2>&1 | tee "$LAB_XII/evidencia/fsck-solo-lectura.txt"  # <4>
printf 'Imagen sin montar; fsck -n solo para observar.\n' >> "$LAB_XII/alcance.txt"  # <5>
```



1. Registra kernel local, sin red.
2. Registra la identidad de la sesión.
3. Crea un artefacto propio inocuo.
4. Observa la imagen con `-n`, que prohíbe escritura; una inconsistencia es un hallazgo, no una orden de reparar.
5. Deja constancia del límite de solo lectura.

En `hallazgos.md`, indica nombre de imagen, resultado literal de `fsck -n` y siguiente acción segura: preservar snapshot e imagen y escalar al responsable. No propongas reparación, montaje ni cambio de contraseña.

## Estación 2 — observación propia y traza acotada (30 puntos)

Crea el proceso de `lsof` justo antes de observarlo. Su PID se usa una sola vez y se espera con `wait`; no se reutiliza ni se le envía señal. La traza ejecuta su comando inocuo como hijo directo de `strace`, sin adjuntarse a ningún PID.

```bash
sh -c 'sleep 2' & LSOF_PID=$!; case "$LSOF_PID" in (*[!0-9]*|'') exit 1;; esac  # <1>
lsof -p "$LSOF_PID" | tee "$LAB_XII/evidencia/lsof-propio.txt"  # <2>
wait "$LSOF_PID"  # <3>
timeout 3 strace -f -tt -e trace=openat,read,close sh -c 'printf "traza propia\\n" >/dev/null; sleep 1' 2> "$LAB_XII/evidencia/strace-propia.txt" || test $? -eq 124  # <4>
printf 'lsof: hijo propio esperado; strace: hijo directo propio finalizado\n' | tee "$LAB_XII/evidencia/correlacion.txt"  # <5>
```



1. Inicia un hijo de shell inocuo, acotado y propio; valida su PID solo antes de usarlo inmediatamente.
2. Observa archivos abiertos de ese hijo propio antes de que termine.
3. Lo recolecta de forma natural; no usa `kill` ni conserva un PID para pasos posteriores.
4. Ejecuta una traza de hasta tres segundos sobre un comando propio como hijo directo de `strace`; no usa adjunción por PID, `ptrace` ni privilegios.
5. Registra la procedencia independiente de ambas evidencias.

Si `strace`, `lsof` o `timeout` no están disponibles, registra literalmente `herramienta no disponible` en la evidencia correspondiente y no instales paquetes. No observes ni traces procesos ajenos o privilegiados.

## Proyecto integrador — informe autorizado (40 puntos)

Crea `proyecto/informe-rescate.md` con:

1. **Alcance y aislamiento:** snapshot, red desconectada, imagen sin montar y solo lectura.
2. **Inventario:** identidad y kernel, con referencia a los archivos de evidencia.
3. **Diagnóstico:** resultado de `fsck-solo-lectura.txt`, procedencia propia e independiente de `lsof`/`strace` y dato faltante para decidir.
4. **Integración previa:** cómo mínima exposición de DHCP/redes y logs correlacionables de Apache/Nginx evitan atribuir una incidencia sin evidencia local.
5. **Plan autorizado:** preservar, comunicar, obtener aprobación escrita y trabajar solo sobre una copia en otra sesión; sin comandos de reparación ni evasión de autenticación.
6. **Resultado y rollback:** conclusión y reversión al snapshot, no alteración de imagen.

## Rúbrica (100 puntos)

| Resultado | Puntos |
|---|---:|
| Aislamiento y límites declarados | 15 |
| Imagen sin montar y solo lectura | 20 |
| Inventario reproducible | 10 |
| Observación inmediata de hijo propio y recolección natural | 15 |
| Traza de hijo directo propio, acotada o indisponibilidad documentada | 15 |
| Informe integra unidades previas | 15 |
| Preservación, autorización y rollback | 10 |

Aprobación: todos los archivos y al menos 70/100. Una herramienta ausente no resta si se documenta; no se sustituye por instalación o acceso a red.

## Cierre

La estación 2 ya recolecta el único hijo temporal con `wait`; no señales procesos ni reutilices PIDs. No borres, formatees ni modifiques la imagen. Guarda la entrega fuera de la VM solo si el docente lo autoriza y revierte el snapshot desde el hipervisor.

## Referencias

Fuente opcional: [revisión publicada](https://raw.githubusercontent.com/statick88/lab-linux/74eb8c9841bdccc58c03d050ad33aec897334330/docs/practicas/12-rescate-proyecto.md).