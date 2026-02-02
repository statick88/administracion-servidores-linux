# Laboratorio 9: MariaDB - Usuarios, Privilegios y Backup/Restore

**Unidad:** 11 - MariaDB  
**Duración Estimada:** 120-150 minutos  
**Dificultad:** Intermedio

## Objetivos

- Instalar y validar MariaDB
- Aplicar hardening basico
- Crear DB + usuario con privilegios minimos
- Generar backup y probar restore

## Requisitos Previos

- VM Ubuntu Server LTS (22.04 o 24.04) con acceso SSH
- Usuario con permisos sudo

## Pasos del Laboratorio

### Paso 1: Instalacion y validacion (20 min)

```bash
$ sudo apt update  # <1>
# <1>

$ sudo apt install -y mariadb-server  # <2>
# <2>

$ systemctl status mariadb --no-pager  # <3>
● mariadb.service - MariaDB database server
     Active: active (running)
# <3>

$ sudo mariadb -e 'SELECT VERSION();'  # <4>
VERSION()
10.11.6-MariaDB
# <4>
```



1. **apt update** actualiza indice.
2. **apt install mariadb-server** instala el motor.
3. **systemctl status** valida servicio.
4. **mariadb -e** valida acceso local.

---

### Paso 2: Hardening inicial (15-25 min)

```bash
$ sudo mariadb-secure-installation  # <1>
# <1>
```



1. **mariadb-secure-installation** aplica hardening basico (root, anonimos, test DB).

---

### Paso 3: Crear DB y usuario (30 min)

```bash
$ sudo mariadb  # <1>
MariaDB [(none)]> CREATE DATABASE appdb;
MariaDB [(none)]> CREATE USER 'appuser'@'localhost' IDENTIFIED BY 'AppPass-ChangeMe';
MariaDB [(none)]> GRANT SELECT,INSERT,UPDATE,DELETE ON appdb.* TO 'appuser'@'localhost';
MariaDB [(none)]> FLUSH PRIVILEGES;
MariaDB [(none)]> USE appdb;
MariaDB [appdb]> CREATE TABLE demo (id INT PRIMARY KEY AUTO_INCREMENT, note VARCHAR(64));
MariaDB [appdb]> INSERT INTO demo(note) VALUES ('hello');
MariaDB [appdb]> SELECT * FROM demo;
MariaDB [appdb]> EXIT;
# <1>
```



1. **mariadb** ejecuta SQL para DB/usuario y crea datos de prueba para validar backup.

---

### Paso 4: Backup y restore (30-40 min)

```bash
$ sudo mysqldump --databases appdb > /tmp/appdb.sql  # <1>
# <1>

$ ls -lh /tmp/appdb.sql  # <2>
-rw-r--r-- 1 root root 12K Feb  2 12:45 /tmp/appdb.sql
# <2>

$ sudo mariadb -e 'DROP DATABASE appdb;'  # <3>
# <3>

$ sudo mariadb < /tmp/appdb.sql  # <4>
# <4>

$ sudo mariadb -e 'SELECT * FROM appdb.demo;'  # <5>
id	note
1	hello
# <5>
```



1. **mysqldump** crea backup SQL.
2. **ls -lh** valida el archivo.
3. **DROP DATABASE** simula perdida de datos.
4. **mariadb < backup** restaura.
5. **SELECT** confirma que los datos volvieron.

## Entregables (Evidencia)

- `systemctl status mariadb --no-pager`
- SQL usado para crear DB/usuario + salida del `SELECT`
- Tamaño de `/tmp/appdb.sql`
- Evidencia de restore (salida de `SELECT * FROM appdb.demo;`)

## Checklist de aceptación

- [ ] MariaDB está activo (evidencia de `systemctl status mariadb --no-pager`)
- [ ] Ejecuté `mariadb-secure-installation` o documenté el estado inicial de seguridad
- [ ] Creé DB + usuario con privilegios mínimos y pude hacer un `SELECT` de prueba
- [ ] Generé un backup con `mysqldump` (evidencia del archivo y tamaño)
- [ ] Probé restore y validé que los datos volvieron (evidencia de `SELECT * FROM appdb.demo;`)
