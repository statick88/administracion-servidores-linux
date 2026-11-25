# Servidor de Base de Datos (MariaDB)

## Alcance y aislamiento

Este taller desarrolla la Unidad XI del catálogo: MariaDB, privilegios, respaldo y restauración. Todo ocurre en una carpeta nueva, con datos sintéticos y un contenedor MariaDB desechable en el equipo local. No se usa ningún servidor existente, servicio compartido ni dato real; el único puerto publicado queda ligado a `127.0.0.1`.

## Objetivo medible

Instalar MariaDB en un entorno local desechable, separar el rol administrador del rol de aplicación, crear una base de inventario ficticia, limitar sus privilegios, producir un dump y restaurarlo en una base de verificación. La evidencia final compara el recuento de tres filas y muestra la configuración de ajuste básico elegida.

:::{.callout-note}
Use únicamente datos sintéticos y mantenga el servicio limitado a la máquina de práctica.
:::

## Pasos guiados: preparación local

Cree una carpeta de práctica y un archivo de variables que no reutilizará fuera del laboratorio.

```bash
mkdir -p ~/taller-mariadb-local && cd ~/taller-mariadb-local  # <1>
cat > .env.lab <<'EOF'  # <2>
MARIADB_ROOT_PASSWORD=solo-para-este-laboratorio
MARIADB_DATABASE=inventario_demo
EOF
chmod 600 .env.lab  # <3>
```



1. `mkdir` crea una ubicación descartable bajo el directorio personal para no mezclar archivos de la práctica con datos existentes.
2. El archivo local contiene únicamente una contraseña de demostración; no copie credenciales reales ni lo suba a un repositorio.
3. El permiso limita la lectura del archivo de práctica a su usuario local.

Cree `compose.yaml` con una versión fija, un volumen nombrado y una publicación exclusivamente loopback.

```yaml
services:
  mariadb:
    image: mariadb:11.4  # <4>
    env_file: .env.lab  # <5>
    ports:
      - "127.0.0.1:3307:3306"  # <6>
    volumes:
      - mariadb-lab-data:/var/lib/mysql  # <7>
    command: ["--innodb-buffer-pool-size=64M", "--max-connections=20"]  # <8>
    healthcheck:
      test: ["CMD", "healthcheck.sh", "--connect", "--innodb_initialized"]  # <9>
      interval: 5s
      timeout: 3s
      retries: 12
volumes:
  mariadb-lab-data: {}
```



4. `mariadb:11.4` fija la familia y versión mayor de la imagen de práctica.
5. `env_file` mantiene la variable de demostración fuera del archivo Compose y solo en esta carpeta local.
6. La publicación usa `127.0.0.1`; no acepta conexiones de la red ni publica `0.0.0.0`.
7. El volumen nombrado conserva datos solo para poder demostrar respaldo y restauración durante este taller.
8. El buffer de 64 MiB y el máximo de 20 conexiones son límites deliberadamente pequeños para una práctica; no son valores de producción.
9. El healthcheck ofrece una señal observable de que MariaDB terminó de inicializarse antes de continuar.

## Instalación y evidencia inicial

Ejecute estas acciones solo en el entorno local desechable; no las ejecute contra servicios activos o remotos.

```bash
docker compose --env-file .env.lab up -d  # <10>
docker compose ps  # <11>
docker compose exec -T mariadb sh -c 'mariadb-admin -uroot -p"$MARIADB_ROOT_PASSWORD" ping'  # <12>
```



10. `up -d` instala e inicia únicamente el contenedor definido en este Compose local.
11. `ps` es la primera evidencia: espere `healthy` y confirme que el puerto se muestra como `127.0.0.1:3307->3306/tcp`.
12. `mariadb-admin ping` confirma respuesta desde el propio contenedor; escriba la contraseña de `.env.lab` solo en su terminal local cuando MariaDB la solicite.

> Nota: si prefiere no pasar una contraseña en argumentos, omita `-p"$MARIADB_ROOT_PASSWORD"` y responda al prompt. La cuenta `root` se usa solo para aprovisionar este laboratorio, nunca por la aplicación.

## Roles, datos sintéticos y privilegios mínimos

Abra una sesión administrativa local y cree dos roles separados: `inventario_admin` para cambios controlados y `inventario_app` para las operaciones cotidianas de la aplicación.

```bash
docker compose exec mariadb mariadb -uroot -p  # <13>
```



13. La consola solicita la contraseña del administrador local. Dentro de ella, ejecute el siguiente SQL de ejemplo; no pegue contraseñas reales en el historial.

```sql
CREATE USER 'inventario_admin'@'%' IDENTIFIED BY 'admin-solo-lab';  -- <14>
CREATE USER 'inventario_app'@'%' IDENTIFIED BY 'app-solo-lab';  -- <15>
CREATE TABLE inventario_demo.articulos (id INT PRIMARY KEY, nombre VARCHAR(40), existencias INT);  -- <16>
INSERT INTO inventario_demo.articulos VALUES (1, 'teclado-demo', 4), (2, 'raton-demo', 7), (3, 'cable-demo', 12);  -- <17>
GRANT ALL PRIVILEGES ON inventario_demo.* TO 'inventario_admin'@'%';  -- <18>
GRANT SELECT, INSERT, UPDATE ON inventario_demo.* TO 'inventario_app'@'%';  -- <19>
SHOW GRANTS FOR 'inventario_app'@'%';  -- <20>
SELECT COUNT(*) AS filas_origen FROM inventario_demo.articulos;  -- <21>
```



14. `inventario_admin` representa un rol de cambios de esquema limitado a la base de práctica.
15. `inventario_app` es una identidad distinta para la aplicación; su contraseña solo sirve en este entorno descartable.
16. `MARIADB_DATABASE=inventario_demo` crea la base vacía al inicializar el contenedor, por lo que no se repite `CREATE DATABASE` en esta sesión.
17. La tabla contiene solo el inventario ficticio del taller.
18. Las tres filas sintéticas dan un resultado observable y fácil de comparar tras la restauración.
19. El rol administrador recibe permisos sobre una sola base, no privilegios globales ni acceso administrativo al servidor.
20. El rol de aplicación no recibe `DELETE`, `DROP`, `ALTER`, `GRANT` ni privilegios globales.
21. Guarde la salida saneada como evidencia de separación de roles; debe mostrar solo `SELECT, INSERT, UPDATE` y el resultado esperado `3` como evidencia de origen.

## Dump, restauración y comprobación

Salga de la consola SQL y genere un dump de la base de prueba. La restauración se hace en una base con otro nombre para no sobrescribir el origen.

```bash
docker compose exec -T mariadb sh -c 'mariadb-dump -uroot -p"$MARIADB_ROOT_PASSWORD" inventario_demo' > inventario_demo.sql  # <22>
if grep -nE '^(CREATE DATABASE|USE )' inventario_demo.sql; then exit 1; else echo 'Dump sin CREATE DATABASE ni USE: verificado'; fi  # <23>
docker compose exec -T mariadb sh -c 'mariadb -uroot -p"$MARIADB_ROOT_PASSWORD" -e "CREATE DATABASE restauracion_ok"'  # <24>
docker compose exec -T mariadb sh -c 'mariadb -uroot -p"$MARIADB_ROOT_PASSWORD" restauracion_ok' < inventario_demo.sql  # <25>
docker compose exec -T mariadb sh -c 'mariadb -uroot -p"$MARIADB_ROOT_PASSWORD" -e "SELECT COUNT(*) AS filas_restauradas FROM restauracion_ok.articulos"'  # <26>
```



22. `mariadb-dump` recibe una sola base, sin `--databases`; así el archivo contiene sus tablas, pero no `CREATE DATABASE` ni `USE inventario_demo`.
23. Esta comprobación debe imprimir `Dump sin CREATE DATABASE ni USE: verificado`; si encuentra una de esas sentencias, termina con error antes de restaurar.
24. `restauracion_ok` es un destino separado y observable para la recuperación de prueba.
25. La entrada redirigida restaura el dump en el destino local sin tocar la base de origen; al no haber `USE`, conserva el esquema de destino indicado en el comando.
26. La salida esperada es `filas_restauradas` igual a `3`; compárela con `filas_origen` antes de dar el respaldo por válido.

## Ajuste básico con evidencia

No adivine valores de producción. Para este contenedor pequeño, confirme los dos límites declarados y anote el resultado junto con el recuento restaurado.

```bash
docker compose exec -T mariadb sh -c 'mariadb -uroot -p"$MARIADB_ROOT_PASSWORD" -e "SHOW VARIABLES WHERE Variable_name IN (\"innodb_buffer_pool_size\", \"max_connections\")"'  # <27>
docker compose config  # <28>
```



27. La consulta muestra valores efectivos de MariaDB; espere un buffer de `67108864` bytes (64 MiB) y un máximo de `20` conexiones en esta práctica.
28. `docker compose config` permite revisar el modelo final y verificar visualmente que el único mapeo de puerto sigue siendo `127.0.0.1:3307:3306`.

## Entregables y cierre

Entregue `compose.yaml`, una versión saneada de `SHOW GRANTS`, el archivo `inventario_demo.sql`, ambos recuentos (`3` y `3`) y la salida de las dos variables. Al terminar, documente que el volumen es descartable y detenga el entorno; no reutilice usuarios, contraseñas ni dump fuera de este taller.
