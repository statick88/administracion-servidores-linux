# Práctica guiada 06: almacenamiento y montajes aislados

## Propósito

Recupera el flujo histórico de inventario, imagen loop, partición, `ext4`, montaje,
persistencia y diagnóstico de espacio. **Fuente:**
`lab-practicos/lab6b_almacenamiento_montajes.md`. La persistencia se simula en un
archivo privado: nunca se lee ni modifica `/etc/fstab`.

## Límites

Ejecuta solo en una VM offline y desechable con `sudo`, usando exclusivamente la
imagen creada abajo. No reemplaces variables por discos físicos (`/dev/sda`,
`/dev/nvme*`, USB) ni por rutas de producción. `parted` y `mkfs` destruyen su
destino. Requiere `util-linux`, `e2fsprogs`, `parted` y `coreutils`.

> **Advertencia:** si `LOOP` no comienza por `/dev/loop` o una ruta no está bajo
> `$LAB`, detente. No elijas otro dispositivo manualmente.

## Paso 1: inventario y área privada

```bash
set -euo pipefail
LAB="$(mktemp -d /var/tmp/gp06-storage.XXXXXX)"  # <1>
IMAGE="$LAB/disco-laboratorio.img"               # <2>
MNT="$LAB/montaje"                               # <3>
FSTAB_SIM="$LAB/fstab.simulado"                  # <4>
printf 'LAB=%s\n' "$LAB"                         # <5>
lsblk -f                                           # <6>
df -hT                                             # <7>
```

1. `mktemp` crea el único contenedor del ejercicio; las demás rutas deben quedar
   dentro de él. 2. `lsblk -f` y `df -hT` documentan `/` para no tocarlo.

Salida ejemplo: `LAB=/var/tmp/gp06-storage.a1B2c3`; `lsblk` muestra el filesystem
raíz y `df` su tamaño y uso. Conserva estas salidas como evidencia inicial.

## Paso 2: imagen y loop

```bash
truncate -s 64M "$IMAGE"                                      # <1>
test -f "$IMAGE" && test "$(stat -c %s "$IMAGE")" = 67108864 # <2>
assert_owned_loop() {                                           # <3>
  case "$IMAGE" in "$LAB"/*) ;; *) return 1;; esac
  test -f "$IMAGE" && test -n "${LOOP:-}"
  case "$LOOP" in /dev/loop[0-9]*) ;; *) return 1;; esac
  test "$(sudo losetup -n -O BACK-FILE "$LOOP" | xargs -r readlink -f)" = "$(readlink -f "$IMAGE")"
}
LOOP="$(sudo losetup --find --show --partscan "$IMAGE")"     # <4>
printf 'LOOP=%s\n' "$LOOP"                                    # <5>
assert_owned_loop                                                 # <6>
sudo losetup -l -O NAME,BACK-FILE "$LOOP"                      # <7>
lsblk -o NAME,TYPE,SIZE,MOUNTPOINTS "$LOOP"                    # <8>
```

1. La imagen tiene solo 64 MiB. 2. Se comprueba su tamaño. 3. `assert_owned_loop`
verifica de forma fail-closed que la imagen privada aún es el `BACK-FILE` del loop
recibido; se invoca antes de cada escritura o detach posterior. 4. `losetup` devuelve
un loop libre; no lo adivines. La evidencia `BACK-FILE` debe ser exactamente `$IMAGE`.

```text
LOOP=/dev/loop0
NAME       BACK-FILE
/dev/loop0 /var/tmp/gp06-storage.a1B2c3/disco-laboratorio.img
NAME  TYPE SIZE MOUNTPOINTS
loop0 loop  64M
```

## Paso 3: GPT y partición única

```bash
assert_owned_loop                                                     # <1>
sudo parted --script "$LOOP" mklabel gpt                         # <2>
assert_owned_loop                                                     # <3>
sudo parted --script "$LOOP" mkpart primary ext4 1MiB 100%       # <4>
assert_owned_loop                                                     # <5>
sudo partx --update "$LOOP"                                      # <6>
PART="${LOOP}p1"                                                  # <7>
assert_owned_part() { assert_owned_loop && test -b "$PART" && test "$(lsblk -nro PKNAME "$PART")" = "${LOOP#/dev/}"; } # <8>
assert_owned_part                                                     # <9>
lsblk -o NAME,TYPE,SIZE,FSTYPE,MOUNTPOINTS "$LOOP"               # <10>
```

1. Cada cambio de tabla se precede por `assert_owned_loop`. 2. `partx` también
se precede por esa comprobación. 3. `assert_owned_part` vuelve a verificar la imagen→loop
y exige que el padre de `$PART` sea ese loop antes de cualquier formato. Espera
`loopN` (`loop`) y `loopNp1` (`part`).

## Paso 4: ext4, montaje y prueba

```bash
assert_owned_part                                          # <1>
sudo mkfs.ext4 -F "$PART"                              # <2>
mkdir -p "$MNT"                                        # <3>
assert_owned_part                                          # <4>
sudo mount "$PART" "$MNT"                             # <5>
assert_owned_part                                          # <6>
printf 'evidencia de montaje aislado\n' | sudo tee "$MNT/prueba.txt" >/dev/null # <7>
findmnt --target "$MNT"                                # <5>
df -hT "$MNT"                                          # <6>
sudo cat "$MNT/prueba.txt"                             # <7>
```

1. Antes de formato, montaje y escritura se verifica imagen→loop→partición. 2.
El montaje y el archivo de prueba quedan bajo `$LAB`. 3. `findmnt` debe indicar
`$PART`, `df -hT` debe indicar `ext4` (~63 MiB) y la lectura debe devolver la evidencia.

```text
TARGET                               SOURCE       FSTYPE
.../gp06-storage.a1B2c3/montaje      /dev/loop0p1 ext4
Filesystem     Type  Size  Used Avail Use% Mounted on
/dev/loop0p1   ext4   55M   24K   51M   1% .../montaje
```

## Paso 5: persistencia simulada

El laboratorio histórico hacía backup de `/etc/fstab` y usaba `mount -a`. Aquí
`-T` usa solo `$FSTAB_SIM`; no hay backup ni cambios del archivo de sistema.

```bash
UUID="$(sudo blkid -s UUID -o value "$PART")"                       # <1>
test -n "$UUID"                                                        # <2>
printf 'UUID=%s %s ext4 defaults,nofail 0 0\n' "$UUID" "$MNT" > "$FSTAB_SIM" # <3>
cat "$FSTAB_SIM"                                                       # <4>
findmnt --verify --tab-file "$FSTAB_SIM"                              # <5>
sudo umount "$MNT"                                                     # <6>
assert_owned_part                                                        # <7>
sudo mount -a -T "$FSTAB_SIM"                                         # <8>
findmnt --target "$MNT"                                                # <9>
```

1. Se obtiene el UUID real y se rechaza vacío. 2. La única entrada apunta a `$MNT`.
3. `findmnt --verify` valida la tabla privada. 4. Tras desmontar, `mount -a -T`
prueba su recuperación sin consultar `/etc/fstab`. Evidencia esperada:

```text
UUID=01234567-89ab-cdef-0123-456789abcdef .../montaje ext4 defaults,nofail 0 0
.../fstab.simulado: success
.../montaje /dev/loop0p1 ext4
```

## Paso 6: uso de espacio y evidencias

```bash
sudo du -xh --max-depth=1 "$MNT" | sort -hr | head -n 10  # <1>
```

1. Aplica el diagnóstico histórico `du` solo al montaje privado. Entrega: inventario
inicial; `BACK-FILE`; partición; `findmnt`/`df`; tabla simulada y su verificación;
y el top de `du` con una frase sobre el elemento mayor.

## Cierre y limpieza

Ejecuta aun si un paso falló, solo para las variables que sí se crearon.

```bash
[[ "${LAB:-}" =~ ^/var/tmp/gp06-storage\.[a-zA-Z0-9]{6}$ && -d "$LAB" && -O "$LAB" && ! -L "$LAB" ]] || exit 1  # <1>
IMAGE="$LAB/disco-laboratorio.img"; MNT="$LAB/montaje"  # <2>
if mountpoint -q "$MNT"; then assert_owned_part && sudo umount -- "$MNT" || exit 1; fi  # <3>
if [ -n "${LOOP:-}" ]; then assert_owned_loop && sudo losetup -d "$LOOP" || exit 1; fi  # <4>
if [ -e "$IMAGE" ]; then mapping=$(sudo losetup -j "$IMAGE") && test -z "$mapping" || exit 1; fi  # <5>
if [ -d "$MNT" ]; then rmdir -- "$MNT" || exit 1; fi  # <6>
rm -f -- "$IMAGE" "$LAB/fstab.simulado" && rmdir -- "$LAB"  # <7>
test ! -e "$LAB"  # <8>
```

Las guardas limitan la limpieza al directorio privado y validan la propiedad
antes de desmontar o desligar. Si todavía no se asignó `LOOP`, se omite el
detach, pero cualquier asociación existente con la imagen detiene el borrado.
Si la consulta falla o quedan archivos no previstos, detente y conserva el directorio. Lista final: [ ] solo loop propio;
[ ] `ext4` montado; [ ] `fstab.simulado` validado; [ ] `du` privado; [ ] asociación
de imagen ausente y directorio eliminado.

## Verificación de esta guía

No se ejecutaron operaciones de disco, `sudo`, loop ni montaje durante la redacción.
La prueba práctica queda omitida y debe hacerse únicamente en la VM descrita.
