# Laboratorio 5: Almacenamiento (Particiones y Montajes)

**Unidad:** 6 - Almacenamiento y Sistemas de Archivos  
**Duración Estimada:** 90-120 minutos  
**Dificultad:** Intermedio

## Objetivos

- Inventariar discos y filesystems
- Crear un disco de laboratorio con loop device
- Crear una partición + filesystem ext4
- Montar el filesystem y dejarlo persistente con fstab
- Diagnosticar uso de espacio con du

## Requisitos Previos

- VM Ubuntu Server LTS (22.04 o 24.04) con acceso SSH
- Usuario con permisos sudo

:::{.callout-warning}
## ⚠️ ADVERTENCIA CRÍTICA

En este laboratorio vas a usar `parted`/`mkfs`.

**Lo que podría salir mal:**
- Si apuntas a un disco real (ej: `/dev/sda`) puedes borrar tu sistema.
- Un cambio incorrecto en `/etc/fstab` puede dejar el sistema sin boot.

**Cómo prevenirlo:**
1. Usa SOLO el disco de laboratorio creado como archivo y su loop device.
2. Verifica 2 veces el dispositivo con `lsblk` antes de formatear.
3. Antes de editar `fstab`, crea un backup.
:::

## Pasos del Laboratorio

### Paso 1: Inventario de discos y montajes (10 min)

```bash
$ lsblk -f  # <1>
NAME   FSTYPE FSVER LABEL UUID                                 FSAVAIL FSUSE% MOUNTPOINTS
sda
├─sda1  ext4   1.0         11111111-2222-3333-4444-555555555555   35G    12% /
└─sda15 vfat   FAT32       AAAA-BBBB                               98M     4% /boot/efi

$ df -hT  # <2>
Filesystem     Type   Size  Used Avail Use% Mounted on
/dev/sda1      ext4    49G  5.4G   41G  12% /
tmpfs          tmpfs  1.9G     0  1.9G   0% /run
# <2>
```



1. **lsblk -f** te confirma qué filesystem está montado como `/` (no lo toques).
2. **df -hT** valida tamaño/uso y el tipo de filesystem montado en `/`.

---

### Paso 2: Crear un disco de laboratorio (loop) (15 min)

```bash
$ sudo fallocate -l 1G /var/tmp/u6-disk.img  # <1>

$ sudo losetup -fP /var/tmp/u6-disk.img  # <2>

$ sudo losetup -a | grep u6-disk.img  # <3>
/dev/loop0: [2065]:12345 (/var/tmp/u6-disk.img)
# <3>

$ lsblk /dev/loop0  # <4>
NAME   MAJ:MIN RM  SIZE RO TYPE MOUNTPOINTS
loop0    7:0    0    1G  0 loop
# <4>
```



1. **fallocate** crea un archivo que actuará como disco.
2. **losetup -fP** asocia el archivo a un loop device y escanea particiones.
3. **losetup -a** valida que el loop device apunta al archivo correcto.
4. **lsblk /dev/loop0** confirma que estás trabajando sobre loop (no un disco real).

---

### Paso 3: Particionar (GPT + 1 partición) (15 min)

```bash
$ sudo parted -s /dev/loop0 mklabel gpt  # <1>

$ sudo parted -s /dev/loop0 mkpart primary ext4 1MiB 100%  # <2>

$ lsblk /dev/loop0  # <3>
NAME      MAJ:MIN RM  SIZE RO TYPE MOUNTPOINTS
loop0       7:0    0    1G  0 loop
└─loop0p1  259:0    0 1023M  0 part
# <3>
```



1. **parted mklabel gpt** crea tabla de particiones GPT en el loop.
2. **parted mkpart** crea una partición que ocupe el disco de laboratorio.
3. **lsblk** confirma que existe `/dev/loop0p1`.

---

### Paso 4: Crear filesystem y montar (20 min)

```bash
$ sudo mkfs.ext4 -F /dev/loop0p1  # <1>

$ sudo mkdir -p /mnt/u6-data  # <2>

$ sudo mount /dev/loop0p1 /mnt/u6-data  # <3>

$ df -hT /mnt/u6-data  # <4>
Filesystem     Type  Size  Used Avail Use% Mounted on
/dev/loop0p1   ext4  990M   24K  923M   1% /mnt/u6-data
# <4>
```



1. **mkfs.ext4** formatea la particion con ext4 (solo en loop).
2. **mkdir -p** crea punto de montaje.
3. **mount** monta el filesystem.
4. **df -hT** valida el montaje y tipo de FS.

---

### Paso 5: Persistencia con fstab (20 min)

Nota: este paso valida persistencia con `mount -a` (sin reiniciar). En un reboot real, tendrías que volver a asociar el archivo a un loop device o quitar la entrada del lab.

```bash
$ sudo blkid /dev/loop0p1  # <1>
/dev/loop0p1: UUID="66666666-7777-8888-9999-aaaaaaaaaaaa" TYPE="ext4" PARTUUID="bbbbbbbb-cccc-dddd-eeee-ffffffffffff"
# <1>

$ sudo cp /etc/fstab /etc/fstab.bak  # <2>
# <2>

$ printf '\n# Lab 5: loop mount\nUUID=66666666-7777-8888-9999-aaaaaaaaaaaa /mnt/u6-data ext4 defaults 0 2\n' | sudo tee -a /etc/fstab >/dev/null  # <3>
# <3>

$ sudo umount /mnt/u6-data  # <4>
# <4>

$ sudo mount -a  # <5>
# <5>

$ df -hT /mnt/u6-data  # <6>
Filesystem     Type  Size  Used Avail Use% Mounted on
/dev/loop0p1   ext4  990M   24K  923M   1% /mnt/u6-data
# <6>
```



1. **blkid** obtiene el UUID para montar de forma estable.
2. **cp /etc/fstab** crea backup antes de tocar persistencia.
3. **tee -a /etc/fstab** agrega la entrada (usa tu UUID real).
4. **umount** desmonta para probar persistencia.
5. **mount -a** valida que fstab es correcto (sin reiniciar).
6. **df -hT** confirma que el montaje se recupera via fstab.

---

### Paso 6: Diagnóstico de espacio (15 min)

```bash
$ sudo du -xh --max-depth=1 /var 2>/dev/null | sort -hr | head -n 10  # <1>
1.2G	/var
620M	/var/lib
210M	/var/log
...
# <1>
```



1. **du + sort** identifica directorios mas grandes para diagnosticar espacio.

## Entregables (Evidencia)

- `lsblk -f` y `df -hT`
- `losetup -a | grep u6-disk.img`
- `lsblk /dev/loop0`
- `df -hT /mnt/u6-data` (antes y despues de `mount -a`)
- Top 3 de `du` en `/var` (con breve interpretacion)

## Cierre y limpieza (5 min)

```bash
$ sudo umount /mnt/u6-data  # <1>

$ sudo losetup -d /dev/loop0  # <2>

$ sudo rm -f /var/tmp/u6-disk.img  # <3>

$ sudo cp /etc/fstab.bak /etc/fstab  # <4>

$ sudo mount -a  # <5>
# <5>
```



1. **umount** desmonta el punto.
2. **losetup -d** libera el loop device.
3. **rm** borra el archivo-disco de laboratorio.
4. **cp /etc/fstab.bak** revierte el cambio de persistencia (evita errores futuros de montaje).
5. **mount -a** valida que `fstab` quedó limpio.

## Checklist de aceptación

- [ ] Trabajé únicamente sobre un loop device (evidencia de `losetup -a | grep u6-disk.img` y `lsblk /dev/loop0`)
- [ ] Puedo mostrar el filesystem montado en `/mnt/u6-data` con `df -hT /mnt/u6-data`
- [ ] Probé persistencia con `mount -a` sin errores (evidencia incluida)
- [ ] Incluí un top 3 de uso de espacio en `/var` con interpretación breve
- [ ] Hice limpieza: desmonté, liberé loop, borré imagen y restauré `/etc/fstab` (evidencia de `mount -a` final)
