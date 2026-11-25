# Taller XII: Rescate offline y proyecto integrador basado en evidencia

## Escenario práctico

Una VM desechable presenta un arranque de práctica fallido. El estudiante prepara una instantánea, inspecciona de forma offline el recorrido de rescate y reúne evidencia de logs y de un proceso local benigno. No se usan discos físicos, servicios de producción ni redes externas.

## Objetivo medible

Construir un informe reproducible que separe observación, diagnóstico, reversión y validación: modo rescate/single-user, comprobación no destructiva de una imagen sin montar, logs y observabilidad local.

## Entorno aislado y prerrequisitos

Use una **VM desechable con instantánea** inicial y una imagen creada solo para el ejercicio (`rescate-prueba.img`). La instantánea es el punto de reversión; la imagen no representa un disco del anfitrión ni un volumen compartido.

:::{.callout-warning}
## ⚠️ ADVERTENCIA CRÍTICA

No seleccione discos físicos, particiones del anfitrión ni volúmenes montados. El procedimiento describe evidencia offline; no incluye reparaciones automáticas, cambios de contraseña ni acciones en producción.

**Lo que podría salir mal:**
- Ejecutar fsck sobre un sistema de archivos montado o un dispositivo equivocado.
- Confundir una demostración de rescate con autorización para cambiar un servidor real.

**Cómo prevenirlo:**
1. Confirme la instantánea y el nombre de la imagen desechable antes de inspeccionar.
2. Use `fsck -n` únicamente sobre la imagen sin montar y descarte la VM al terminar.
:::

## Pasos guiados: rescate y single-user (inspección offline)

Documente el parámetro temporal de GRUB, sin hacerlo persistente: `systemd.unit=rescue.target`. En la consola de rescate, el objetivo es observar, no corregir: registrar `findmnt /`, el estado esperado de `systemctl is-system-running` y los mensajes del arranque. Si se requiere comparar el modo single-user, anote que `rescue.target` conserva systemd y que el alcance de la práctica termina antes de remontar o editar archivos.

| Evidencia | Resultado esperado |
|---|---|
| Instantánea inicial | Nombre, fecha y VM desechable identificados |
| Parámetro temporal | `systemd.unit=rescue.target` anotado en el informe |
| Inspección | Estado de montaje y mensajes del arranque, sin modificación |
| Reversión | Restaurar la instantánea o descartar la VM |

## Comprobación de sistema de archivos sin escritura

La imagen `rescate-prueba.img` debe permanecer **sin montar**. El ejemplo es de solo lectura: no repara, no responde afirmativamente a cambios y no apunta a `/dev/sd*`.

```bash
$ fsck -n laboratorio/rescate-prueba.img
rescate-prueba.img: clean, 12/128 files, 44/512 blocks
```

Registre el código de salida y la confirmación de que la imagen estaba sin montar. Si el resultado muestra un problema, se conserva como evidencia y se revierte a la instantánea; no se ejecuta `fsck -y`.

## Evidencia de logs y proceso local benigno

Use solo datos de la VM de práctica y procesos creados para este ejercicio, sin conectarse a una red. Las siguientes muestras forman parte del informe; no se adjuntan secretos ni datos de otros usuarios.

```bash
$ journalctl -b -p err --no-pager  # <1>
```



1. **journalctl** muestra únicamente los errores del arranque actual para incluirlos como evidencia saneada.

```bash
$ strace -f -o strace-proceso-local.log -- sh -c 'sleep 30'  # <2>
```



2. **strace** inicia y observa su propio comando local `sleep`; el registro queda en `strace-proceso-local.log` y no se adjunta si contiene información no necesaria.

```bash
$ sleep 30 &  # <3>
[1] 12345
$ proceso_local_pid=$!  # <4>
$ lsof -nP -p "$proceso_local_pid"  # <5>
COMMAND   PID USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
sleep   12345 alumno  cwd    DIR  0,42     4096    2 /home/alumno/taller-rescate
$ kill "$proceso_local_pid"  # <6>
$ wait "$proceso_local_pid"  # <7>
```



3. **sleep** crea un proceso local y desechable, sin conexiones de red.
4. **proceso_local_pid** conserva el PID numérico del proceso que acaba de crear el intérprete.
5. **lsof** enumera los archivos abiertos de ese PID local; `-nP` evita resolver nombres de red o servicios.
6. **kill** finaliza exclusivamente el proceso creado para la práctica.
7. **wait** confirma que el proceso temporal terminó antes de cerrar la evidencia.

`journalctl` aporta la ventana de arranque; `strace` muestra llamadas de un comando que inicia la propia práctica; `lsof` enumera archivos abiertos del PID temporal. No se adjunta `strace` de procesos ajenos ni se inspeccionan servicios de producción.

## Entregables: proyecto integrador y rúbrica integrada

La entrega es un único `plan-rescate.md` con inventario ficticio, capturas saneadas y la decisión de reversión.

| Área | Evidencia requerida | Puntos |
|---|---|---:|
| Preparación y aislamiento | VM desechable, instantánea e imagen identificadas | 20 |
| Diagnóstico de rescate | `rescue.target`, montaje y logs documentados | 25 |
| Sistema de archivos | `fsck -n` sobre `rescate-prueba.img` sin montar | 20 |
| Observabilidad local | Salidas saneadas de `journalctl`, `strace` y `lsof` | 20 |
| Evidencia, validación y reversión | Informe reproduce hallazgo y retorno a instantánea | 15 |
| **Total** | | **100** |

## Criterios de verificación observables

- La práctica declara una VM desechable, una instantánea y ningún disco físico.
- El diagnóstico de rescate es offline y no remonta ni modifica el sistema.
- La imagen de fsck está sin montar y el ejemplo usa `-n`.
- Las evidencias de logs, `strace` y `lsof` corresponden a un proceso local benigno.
- El informe integra Evidencia, Diagnóstico, Validación y Reversión con la rúbrica.
