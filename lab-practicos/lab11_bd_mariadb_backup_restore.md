# Laboratorio 11: Bases de Datos en Contenedores — MariaDB

**Unidad:** XI - Bases de Datos en Contenedores  
**Duración Estimada:** 90 minutos  
**Dificultad:** Intermedio

## Introducción

En esta unidad desplegamos **MariaDB 11** como contenedor Docker en lugar de instalarlo directamente en el sistema operativo. Usaremos volúmenes persistentes para no perder datos y practicaremos las operaciones de backup y restore con `mysqldump`.

- Contexto: los contenedores de bases de datos se levantan en segundos y se destruyen sin residuos, lo que facilita entornos de desarrollo replicables.
- Por qué es importante: separar la base de datos del sistema host reduce conflictos de versiones y simplifica migraciones entre máquinas.
- Qué aprenderás: levantar MariaDB en Docker, persistir datos con volúmenes, crear backups lógicos y restaurarlos.

## Objetivos

- Desplegar un contenedor MariaDB 11 con Docker
- Persistir datos usando un volumen nombrado
- Crear una base de datos y una tabla de prueba
- Realizar backup con `mysqldump` dentro del contenedor
- Restaurar un backup en un contenedor limpio
- Configurar un `compose.yaml` básico para reutilización

## Requisitos Previos

- Ubuntu 24.04 LTS en WSL2 con Docker Desktop operativo (Laboratorio 1)
- Usuario con permisos sudo
- Al menos 2 GB de espacio libre

:::{.callout-note}
## 📝 NOTA

No instalamos MariaDB con `apt`. Todo funciona dentro de contenedores Docker, por lo que el sistema host permanece limpio. Si eliminas el contenedor y el volumen, no queda rastro de la instalación.
:::

## Pasos del Laboratorio

### Paso 1: Levantar el contenedor MariaDB (15 min)

```bash
$ docker run -d \  # <1>
  --name mariadb \
  -e MYSQL_ROOT_PASSWORD=RootPass123! \
  -e MYSQL_DATABASE=appdb \
  -e MYSQL_USER=appuser \
  -e MYSQL_PASSWORD=AppPass123! \
  -v mariadb_data:/var/lib/mysql \
  -p 3306:3306 \
  mariadb:11
# <1>
```

1. **docker run -d** crea y arranca el contenedor en segundo plano. Las variables `-e` establecen la contraseña root, la base de datos inicial y un usuario de aplicación. El volumen `-v mariadb_data:/var/lib/mysql` persiste los datos más allá del ciclo de vida del contenedor.

```bash
$ docker ps --filter name=mariadb --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"  # <1>
NAMES    STATUS          PORTS
mariadb  Up 2 minutes    0.0.0.0:3306->3306/tcp
# <1>
```

1. **docker ps** confirma que el contenedor está activo y el puerto 3306 está expuesto.

:::{.callout-warning}
## ⚠️ ADVERTENCIA CRÍTICA

**No expongas el puerto 3306 a una red pública ni a Internet.**

**Lo que podría salir mal:**
- Un atacante accede a tu base de datos con credenciales débiles.
- La fuerza bruta contra el puerto 3306 es uno de los vectores más comunes.

**Cómo prevenirlo:**
1. Para desarrollo, únicamente `127.0.0.1:3306:3306` o sin `-p` (solo red interna de Docker).
2. En producción, coloca MariaDB en una red Docker privada y expón únicamente la aplicación.
3. Usa contraseñas robustas y rota las credenciales periódicamente.
:::

### Paso 2: Conectar y crear datos de prueba (15 min)

```bash
$ docker exec -it mariadb mariadb -u root -p'RootPass123!' appdb  # <1>
Welcome to the MariaDB monitor.
Server version: 11.4.2-MariaDB-ubu2404
# <1>

MariaDB [(none)]> USE appdb;  # <2>
Reading table information for completion of table and column names
Database changed
# <2>

MariaDB [appdb]> CREATE TABLE usuarios (  # <3>
    ->   id INT AUTO_INCREMENT PRIMARY KEY,
    ->   nombre VARCHAR(100) NOT NULL,
    ->   email VARCHAR(150) NOT NULL UNIQUE,
    ->   creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    -> );
Query OK, 0 rows affected
# <3>

MariaDB [appdb]> INSERT INTO usuarios (nombre, email) VALUES  # <4>
    ->   ('Ana García', 'ana@ejemplo.com'),
    ->   ('Luis Pérez', 'luis@ejemplo.com');
Query OK, 2 rows affected
# <4>

MariaDB [appdb]> SELECT * FROM usuarios;  # <5>
+----+------------+------------------+---------------------+
| id | nombre     | email            | creado_en           |
+----+------------+------------------+---------------------+
|  1 | Ana García | ana@ejemplo.com  | 2026-02-02 10:00:00 |
|  2 | Luis Pérez | luis@ejemplo.com | 2026-02-02 10:00:00 |
+----+------------+------------------+---------------------+
# <5>

MariaDB [appdb]> EXIT;
# <6>
```

1. **docker exec -it** abre una sesión interactiva de MariaDB dentro del contenedor, conectando directamente a la base `appdb`.
2. **USE** selecciona la base de datos de trabajo.
3. **CREATE TABLE** define una tabla `usuarios` con clave primaria autoincremental y campos básicos.
4. **INSERT** agrega dos registros de prueba.
5. **SELECT** verifica que los datos se insertaron correctamente.
6. **EXIT** cierra la sesión de MariaDB.

### Paso 3: Backup con mysqldump (15 min)

```bash
$ docker exec mariadb mysqldump -u root -p'RootPass123!' appdb > ~/backup_appdb.sql  # <1>
# <1>

$ ls -lh ~/backup_appdb.sql  # <2>
-rw-r--r-- 1 alumno alumno 2.1K Feb  2 10:05 ~/backup_appdb.sql
# <2>

$ head -20 ~/backup_appdb.sql  # <3>
-- MariaDB dump 11.4
-- Host: localhost    Database: appdb
--
-- Server version   11.4.2-MariaDB-ubu2404
# <3>
```

1. **docker exec mariadb mysqldump** ejecuta `mysqldump` dentro del contenedor y redirige la salida al host. El archivo contiene el DDL y los datos de todas las tablas de `appdb`.
2. **ls -lh** confirma que el archivo se creó con un tamaño razonable.
3. **head** verifica que el encabezado del dump corresponde a MariaDB 11.

:::{.callout-tip}
## 💡 RECOMENDACIÓN

Para backups automáticos, programa un cron job en el host:

```bash
# crontab -e
0 2 * * * docker exec mariadb mysqldump -u root -p'RootPass123!' appdb > ~/backups/appdb_$(date +\%Y\%m\%d).sql
```

Esto genera un backup diario a las 2:00 AM con la fecha en el nombre del archivo.
:::

### Paso 4: Restore del backup (20 min)

```bash
$ docker stop mariadb && docker rm mariadb  # <1>
mariadb
# <1>

$ docker volume rm mariadb_data  # <2>
mariadb_data
# <2>

$ docker run -d \  # <3>
  --name mariadb \
  -e MYSQL_ROOT_PASSWORD=RootPass123! \
  -e MYSQL_DATABASE=appdb \
  -v mariadb_data:/var/lib/mysql \
  -p 3306:3306 \
  mariadb:11
# <3>

$ docker exec -i mariadb mariadb -u root -p'RootPass123!' appdb < ~/backup_appdb.sql  # <4>
# <4>

$ docker exec mariadb mariadb -u root -p'RootPass123!' -e "SELECT COUNT(*) FROM appdb.usuarios;"  # <5>
COUNT(*)
2
# <5>
```

1. **docker stop + rm** detiene y elimina el contenedor original para simular una pérdida total.
2. **docker volume rm** elimina el volumen persistente, borrando todos los datos.
3. **docker run** crea un contenedor nuevo con el mismo volumen (vacío) y la misma base de datos.
4. **docker exec -i + redirección** restaura el backup dentro del contenedor. El flag `-i` permite lectura desde stdin.
5. **SELECT COUNT(*)** verifica que los dos registros originales se restauraron correctamente.

:::{.callout-warning}
## ⚠️ ADVERTENCIA CRÍTICA

**El restore sobrescribe completamente la base de datos de destino.**

**Lo que podría salir mal:**
- Si apuntas al contenedor de producción, destruyes los datos actuales.
- Un backup parcial o corrupto genera pérdida silenciosa de datos.

**Cómo prevenirlo:**
1. Verifica siempre el contenido del `.sql` antes de restaurar.
2. Restaura primero en un contenedor de pruebas aislado.
3. Usa `--force` solo si estás seguro de que el archivo es válido.
:::

### Paso 5: compose.yaml para reutilización (15 min)

```bash
$ cat > ~/compose.yaml <<'EOF'  # <1>
services:
  mariadb:
    image: mariadb:11
    container_name: mariadb
    restart: unless-stopped
    environment:
      MYSQL_ROOT_PASSWORD: RootPass123!
      MYSQL_DATABASE: appdb
      MYSQL_USER: appuser
      MYSQL_PASSWORD: AppPass123!
    ports:
      - "127.0.0.1:3306:3306"
    volumes:
      - mariadb_data:/var/lib/mysql

volumes:
  mariadb_data:
    driver: local
EOF
# <1>

$ docker compose -f ~/compose.yaml up -d  # <2>
[+] Running 2/2
 ✔ Network compose_default  Created
 ✔ Container mariadb         Started
# <2>
```

1. **cat + heredoc** crea el archivo `compose.yaml` con todas las variables de entorno, el volumen y el puerto expuesto solo en `127.0.0.1`.
2. **docker compose up -d** levanta el servicio definido en el compose; Docker gestiona la red, el volumen y las dependencias automáticamente.

:::{.callout-tip}
## 💡 RECOMENDACIÓN

Un `compose.yaml` con `restart: unless-stopped` asegura que el contenedor se reinicie automáticamente tras un reinicio del sistema o un crash, sin necesidad de intervenir manualmente.
:::

### Paso 6: Monitoreo y limpieza (10 min)

```bash
$ docker stats mariadb --no-stream  # <1>
CONTAINER ID  NAME     CPU %   MEM USAGE / LIMIT   MEM %   NET I/O
a1b2c3d4e5f6  mariadb  0.05%   145MiB / 1GiB        14.1%   1.2kB / 0B
# <1>

$ docker logs mariadb --tail 10  # <2>
2026-02-02 10:10:05 0 [Note] Starting MariaDB ...
2026-02-02 10:10:06 0 [Note] Ready for connections
# <2>

$ docker system prune -f  # <3>
Total reclaimed space: 0B
# <3>
```

1. **docker stats** muestra el consumo de CPU y memoria del contenedor en tiempo real.
2. **docker logs --tail** revisa las últimas líneas del log para detectar errores de conexión o arranque.
3. **docker system prune** limpia contenedores detenidos, redes huérfanas e imágenes sin usar; liberando espacio en disco.

## Entregables (Evidencia)

- `docker ps` mostrando el contenedor MariaDB activo
- Resultado de `SELECT * FROM appdb.usuarios`
- Contenido del archivo `backup_appdb.sql` (primeras 20 líneas)
- Resultado del `SELECT COUNT(*)` tras el restore
- Contenido de `~/compose.yaml`

## Checklist de aceptación

- [ ] El contenedor MariaDB 11 está corriendo con volumen persistente
- [ ] Puedo conectarme con `docker exec` y crear/tablas datos
- [ ] El backup con `mysqldump` genera un archivo `.sql` válido
- [ ] El restore en un contenedor limpio recupera los datos correctamente
- [ ] El `compose.yaml` levanta el servicio con `docker compose up -d`
- [ ] El puerto 3306 no está expuesto públicamente (solo en `127.0.0.1`)

## Referencias

- Documentación MariaDB: https://mariadb.com/kb/en/documentation/
- Docker Hub — MariaDB: https://hub.docker.com/_/mariadb
- Docker Compose: https://docs.docker.com/compose/
- mysqldump: https://mariadb.com/kb/en/mysqldump/
