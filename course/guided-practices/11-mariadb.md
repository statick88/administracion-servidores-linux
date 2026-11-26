# Práctica guiada XI — respaldo y restauración aislados de MariaDB

## Introducción

**Estado: S1–S2.** Esta práctica recupera la secuencia histórica de crear, cargar, respaldar y restaurar MariaDB, pero la limita a una VM desechable, datos sintéticos y recursos propios. No ejecuta comandos sobre infraestructura real: los bloques son una guía para ejecutar localmente tras revisarlos.

**Objetivo verificable:** restaurar `ventas_xi` en el esquema distinto `ventas_xi_restaurada` y demostrar que ambos tienen la misma evidencia de datos.

:::{.callout-warning}
## ⚠️ ADVERTENCIA CRÍTICA

**No uses servidores, volúmenes, credenciales, copias ni puertos de trabajo.** No publiques el puerto de MariaDB y no sustituyas los identificadores generados por recursos existentes.

**Lo que podría salir mal:** una restauración puede modificar datos ajenos o una clave puede quedar en el historial.

**Cómo prevenirlo:**
1. Trabaja solo en una VM desechable y en el directorio creado por esta práctica.
2. Usa el contenedor sin nombre generado, sin `-p` y sin volúmenes nombrados.
3. Introduce la clave temporal de forma interactiva; no la copies en archivos ni entregables.
:::

## 1. Prerrequisitos y área aislada

Necesitas Docker y el complemento Compose ya instalados en una VM desechable. Verifica las herramientas antes de crear recursos.

```bash
$ docker --version && docker compose version  # <1>
Docker version 27.x
Docker Compose version v2.x
# <1>
```



1. **Propósito:** confirma que el cliente y Compose están disponibles. **Comprobación esperada:** aparecen ambas versiones. **Evidencia:** anota solo las versiones. **Si falla:** prepara la VM con la guía local de Docker; no instales ni modifiques un servidor compartido.

```bash
$ mkdir -p "$HOME/mariadb-xi-$$" && cd "$HOME/mariadb-xi-$$" && chmod 700 . && export COMPOSE_PROJECT_NAME="mariadb_xi_$$"  # <1>
$ read -rsp 'Clave temporal de root (no se mostrará): ' MARIADB_ROOT_PASSWORD; export MARIADB_ROOT_PASSWORD; printf '\n'  # <2>
$ read -rsp 'Clave temporal para la cuenta de consulta: ' MARIADB_LAB_PASSWORD; export MARIADB_LAB_PASSWORD; printf '\n'  # <3>
# <1>
# <2>
# <3>
```



1. **Propósito:** crea un directorio propio, con permiso privado y nombre/proyecto Compose único. **Comprobación esperada:** `pwd` queda bajo el directorio personal. **Evidencia:** conserva la ruta y el nombre de proyecto, no las claves. **Si falla:** corrige permisos o elige otra VM; no reutilices un directorio de otro alumno.
2. **Propósito:** mantiene la clave root temporal fuera del historial y de la pantalla. **Comprobación esperada:** no se imprime ningún carácter. **Evidencia:** no guardes esta entrada. **Si falla:** cancela con `Ctrl-C`, abre una sesión nueva y vuelve a introducirla.
3. **Propósito:** usa otra clave temporal para la cuenta de lectura, sin incluir una credencial en el material. **Comprobación esperada:** no se imprime ningún carácter. **Evidencia:** no la guardes ni la entregues. **Si falla:** repite en una shell nueva.

## 2. Crear una instancia efímera y esperar con límite

No hay puerto publicado, volumen montado ni nombre fijo. El identificador que devuelve Docker es el único recurso que se administra.

```bash
$ export MARIADB_CONTAINER="$(docker run -d --tmpfs /var/lib/mysql -e MARIADB_ROOT_PASSWORD="$MARIADB_ROOT_PASSWORD" mariadb:11)"  # <1>
$ listo=0; for intento in $(seq 1 30); do if docker exec "$MARIADB_CONTAINER" mariadb -uroot -p"$MARIADB_ROOT_PASSWORD" -e 'SELECT 1' >/dev/null 2>&1; then listo=1; break; fi; if [ "$intento" -lt 30 ]; then sleep 2; fi; done; test "$listo" -eq 1  # <2>
$ docker ps --filter "id=$MARIADB_CONTAINER" --format 'table {{.ID}}\t{{.Status}}\t{{.Ports}}' | tee evidencia-instancia.txt  # <3>
# <1>
# <2>
# <3>
```



1. **Propósito:** crea una instancia nueva sin `--name`, `-p` ni `-v`, con `/var/lib/mysql` en `tmpfs` efímero. **Comprobación esperada:** la variable contiene un ID largo. **Evidencia:** conserva solo el ID abreviado si es necesario. **Si falla:** consulta `docker logs "$MARIADB_CONTAINER"`; no pruebes otro contenedor.
2. **Propósito:** espera como máximo 60 segundos a que MariaDB responda. **Comprobación esperada:** termina con estado cero antes del límite. **Evidencia:** registra el resultado, nunca la clave. **Si falla:** recoge los últimos registros del ID y elimina únicamente ese ID en la limpieza.
3. **Propósito:** prueba el aislamiento. **Comprobación esperada:** `PORTS` está vacío y `STATUS` indica ejecución. **Evidencia:** `evidencia-instancia.txt`. **Si aparece un puerto:** detén la práctica y elimina ese contenedor; no continúes con un servicio publicado.

## 3. Sembrar datos sintéticos y una cuenta mínima

Guarda `01-semillado.sql`; los nombres y correos son inventados y el usuario solo puede leer el esquema de práctica.

```sql
CREATE DATABASE ventas_xi CHARACTER SET utf8mb4;
USE ventas_xi;
CREATE TABLE clientes (id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, nombre VARCHAR(80) NOT NULL, correo VARCHAR(120) NOT NULL UNIQUE) ENGINE=InnoDB;
CREATE TABLE pedidos (id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, cliente_id INT UNSIGNED NOT NULL, total DECIMAL(10,2) NOT NULL, CONSTRAINT fk_pedido_cliente FOREIGN KEY (cliente_id) REFERENCES clientes(id)) ENGINE=InnoDB;
INSERT INTO clientes (nombre,correo) VALUES ('Ada Norte','ada@example.test'),('Bruno Rio','bruno@example.test');
INSERT INTO pedidos (cliente_id,total) VALUES (1,120.50),(1,42.00),(2,210.00);
```

```bash
$ docker exec -i "$MARIADB_CONTAINER" mariadb -uroot -p"$MARIADB_ROOT_PASSWORD" < 01-semillado.sql  # <1>
$ docker exec "$MARIADB_CONTAINER" mariadb -uroot -p"$MARIADB_ROOT_PASSWORD" -e "CREATE USER 'consulta_xi'@'localhost' IDENTIFIED BY '$MARIADB_LAB_PASSWORD'; GRANT SELECT ON ventas_xi.* TO 'consulta_xi'@'localhost';"  # <2>
$ docker exec "$MARIADB_CONTAINER" mariadb -uroot -p"$MARIADB_ROOT_PASSWORD" -N -e 'SELECT COUNT(*) FROM ventas_xi.clientes; SELECT COUNT(*) FROM ventas_xi.pedidos; SHOW GRANTS FOR '\''consulta_xi'\''@'\''localhost'\'';' | tee evidencia-semilla.txt  # <3>
$ if docker exec "$MARIADB_CONTAINER" mariadb -uconsulta_xi -p"$MARIADB_LAB_PASSWORD" -e "INSERT INTO ventas_xi.clientes(nombre,correo) VALUES ('No','no@example.test');" > evidencia-rechazo.txt 2>&1; then printf '%s\n' 'ERROR: INSERT permitido; privilegio mínimo incumplido' >&2; exit 1; fi  # <4>
$ grep -Eq 'ERROR 1142|INSERT command denied' evidencia-rechazo.txt || { printf '%s\n' 'ERROR: no se confirmó rechazo 1142; revise disponibilidad/autenticación' >&2; exit 1; }  # <5>
# <1>
# <2>
# <3>
# <4>
# <5>
```



1. **Propósito:** carga solo el modelo y filas inventadas. **Comprobación esperada:** no hay salida de error. **Evidencia:** el archivo SQL es reproducible. **Si falla:** elimina el contenedor identificado y empieza de nuevo; no ejecutes el archivo contra otro host.
2. **Propósito:** crea la única cuenta de laboratorio con la clave temporal no impresa y concede solo lectura. **Comprobación esperada:** el cliente por lotes termina con estado `0` y no imprime filas. **Evidencia:** no guardes el comando expandido. **Si falla:** no concedas `ALL` para resolverlo.
3. **Propósito:** confirma los conteos `2` y `3` y el `GRANT SELECT`. **Comprobación esperada:** no aparece privilegio de escritura ni host `%`. **Evidencia:** `evidencia-semilla.txt` debe incluir el extracto siguiente. **Si falla:** revisa el SQL antes de seguir.
4. **Propósito:** falla cerradamente si la escritura fue permitida. **Comprobación esperada:** el comando devuelve estado distinto de `0`; si inserta, termina la shell con error. **Evidencia:** `evidencia-rechazo.txt`, sin claves. **Si la inserción funciona:** no continúes ni intentes corregir la instancia.
5. **Propósito:** distingue la denegación real (`ERROR 1142`/`INSERT command denied`) de un contenedor caído, un ID erróneo o un fallo de autenticación. **Comprobación esperada:** solo una denegación de INSERT permite continuar. **Evidencia:** el patrón confirmado en `evidencia-rechazo.txt`. **Si falla:** trátalo como fallo de infraestructura/configuración, limpia y crea una instancia nueva.

Extractos de evidencia esperados (el texto exacto del servidor puede variar):

```text
2
3
GRANT USAGE ON *.* TO `consulta_xi`@`localhost`
GRANT SELECT ON `ventas_xi`.* TO `consulta_xi`@`localhost`
ERROR 1142 (42000): INSERT command denied to user 'consulta_xi'@'localhost' for table `clientes`
```

## 4. Dump portable, destino distinto y comparación real

El dump no contiene `CREATE DATABASE` ni `USE`, por lo que se puede cargar explícitamente en otro esquema sin editar nombres con sustituciones frágiles.

```bash
$ docker exec "$MARIADB_CONTAINER" mariadb-dump -uroot -p"$MARIADB_ROOT_PASSWORD" --single-transaction --no-create-db --skip-add-drop-table ventas_xi > ventas_xi-portable.sql && chmod 600 ventas_xi-portable.sql  # <1>
$ docker exec "$MARIADB_CONTAINER" mariadb -uroot -p"$MARIADB_ROOT_PASSWORD" -e 'CREATE DATABASE ventas_xi_restaurada CHARACTER SET utf8mb4;'  # <2>
$ docker exec -i "$MARIADB_CONTAINER" mariadb -uroot -p"$MARIADB_ROOT_PASSWORD" ventas_xi_restaurada < ventas_xi-portable.sql  # <3>
$ docker exec "$MARIADB_CONTAINER" mariadb -uroot -p"$MARIADB_ROOT_PASSWORD" -N -e "SELECT 'origen_clientes',COUNT(*),COALESCE(SUM(id),0) FROM ventas_xi.clientes UNION ALL SELECT 'restaurada_clientes',COUNT(*),COALESCE(SUM(id),0) FROM ventas_xi_restaurada.clientes UNION ALL SELECT 'origen_pedidos',COUNT(*),COALESCE(SUM(total),0) FROM ventas_xi.pedidos UNION ALL SELECT 'restaurada_pedidos',COUNT(*),COALESCE(SUM(total),0) FROM ventas_xi_restaurada.pedidos;" | tee evidencia-restauracion.txt  # <4>
# <1>
# <2>
# <3>
# <4>
```



1. **Propósito:** produce una copia lógica portátil del esquema de origen y restringe su lectura local. **Comprobación esperada:** archivo no vacío y permiso `600`. **Evidencia:** tamaño y permisos, no su contenido completo. **Si falla:** verifica espacio y el ID del contenedor; no uses una copia de producción.
2. **Propósito:** crea exclusivamente el destino distinto. **Comprobación esperada:** el cliente por lotes termina con estado `0` y no imprime filas. **Evidencia:** nombre exacto `ventas_xi_restaurada`. **Si ya existe:** abandona el contenedor y crea uno nuevo; no borres esquemas para reutilizarlo.
3. **Propósito:** restaura hacia el destino indicado en el cliente. **Comprobación esperada:** termina con estado `0` sin salida de error. **Evidencia:** código de salida y el dump local. **Si falla:** conserva el mensaje y empieza en un contenedor nuevo; no añadas `--force`.
4. **Propósito:** compara filas y agregados de ambos esquemas. **Comprobación esperada:** `2,3` para clientes y `3,372.50` para pedidos en pares origen/restaurada. **Evidencia:** `evidencia-restauracion.txt`. **Si difieren:** no declares éxito; revisa el error de restauración y repite desde una instancia nueva.

Extracto esperado de `evidencia-restauracion.txt`:

```text
origen_clientes	2	3
restaurada_clientes	2	3
origen_pedidos	3	372.50
restaurada_pedidos	3	372.50
```

## 5. Reproducibilidad con Compose

Este Compose replica el aislamiento: no publica puertos, usa almacenamiento temporal `tmpfs` y toma la clave solo de la variable de sesión. Guárdalo como `compose.yaml`.

```yaml
services:
  mariadb:
    image: mariadb:11
    environment:
      MARIADB_ROOT_PASSWORD: ${MARIADB_ROOT_PASSWORD:?defina una clave temporal}
    tmpfs:
      - /var/lib/mysql
    healthcheck:
      test: ["CMD-SHELL", "mariadb-admin ping -uroot -p$$MARIADB_ROOT_PASSWORD --silent"]
      interval: 2s
      timeout: 2s
      retries: 30
```

```bash
$ docker compose config --no-interpolate | grep -E 'MARIADB_ROOT_PASSWORD|tmpfs:|/var/lib/mysql|healthcheck:|retries:' > evidencia-compose.txt && ! docker compose config --no-interpolate | grep -Eq '^[[:space:]]*(ports|volumes):'  # <1>
$ docker compose up -d --wait --wait-timeout 70  # <2>
$ docker compose ps --format 'table {{.Name}}\t{{.State}}\t{{.Publishers}}' | tee -a evidencia-compose.txt  # <3>
# <1>
# <2>
# <3>
```



1. **Propósito:** valida la configuración sin interpolar ni guardar valores de entorno. **Comprobación esperada:** evidencia literal `${MARIADB_ROOT_PASSWORD...}`, `tmpfs`, `/var/lib/mysql`, `healthcheck` y `retries: 30`; la segunda comprobación no encuentra `ports:` ni `volumes:`. **Evidencia:** `evidencia-compose.txt` no contiene una clave. **Si falla:** corrige el YAML; no redirijas `docker compose config` sin `--no-interpolate`.
2. **Propósito:** inicia una réplica y espera como máximo 70 segundos al estado saludable. **Comprobación esperada:** Compose informa que el servicio está saludable. **Evidencia:** resultado y hora de ejecución, sin logs con entorno. **Si vence el plazo:** ejecuta `docker compose logs` solo para este proyecto y luego bájalo; no incrementes esperas sin diagnóstico.
3. **Propósito:** confirma el estado saludable y la ausencia de publicaciones. **Comprobación esperada:** una fila `running`/`healthy` y `Publishers` vacío. **Evidencia:** anexa el resultado a `evidencia-compose.txt`. **Si aparece un puerto:** ejecuta la limpieza del proyecto y corrige el archivo antes de reintentar.

Extracto seguro esperado de la evidencia Compose (sin valor de clave):

```text
MARIADB_ROOT_PASSWORD: ${MARIADB_ROOT_PASSWORD:?defina una clave temporal}
tmpfs:
  - /var/lib/mysql
healthcheck:
retries: 30
NAME                 STATE       PUBLISHERS
mariadb_xi_123_...   running     <vacío>
```

## 6. Limpieza segura y solución de problemas

Limpia únicamente el ID generado y el proyecto Compose del directorio actual. No hay `prune`, eliminación global, ni borrado de recursos sin identificar.

```bash
$ docker rm -f "$MARIADB_CONTAINER"  # <1>
$ docker compose down --remove-orphans  # <2>
$ test -z "$(docker ps -aq --filter "id=$MARIADB_CONTAINER")" && test -z "$(docker compose ps -aq)" && printf 'Instancia y proyecto propios eliminados; tmpfs no persiste\n' | tee evidencia-limpieza.txt  # <3>
$ unset MARIADB_ROOT_PASSWORD MARIADB_LAB_PASSWORD MARIADB_CONTAINER COMPOSE_PROJECT_NAME  # <4>
# <1>
# <2>
# <3>
# <4>
```



1. **Propósito:** elimina solo la instancia cuyo ID guardó la práctica; sus datos estaban en `tmpfs`. **Comprobación esperada:** Docker imprime ese ID. **Evidencia:** salida del comando. **Si el ID está vacío:** no ejecutes el comando; abre una sesión nueva y localiza únicamente el ID anotado en esta práctica.
2. **Propósito:** detiene y borra solo recursos del `COMPOSE_PROJECT_NAME` generado en este directorio. **Comprobación esperada:** elimina el contenedor/red propios, sin volúmenes. **Evidencia:** salida de Compose. **Si señala otro proyecto:** detente y revisa el directorio y la variable antes de aceptar acciones.
3. **Propósito:** prueba que no queda ni el ID independiente ni contenedor del proyecto propio. **Comprobación esperada:** `Instancia y proyecto propios eliminados; tmpfs no persiste`. **Evidencia:** `evidencia-limpieza.txt`. **Si falla:** no uses comandos globales; revisa exactamente el ID y proyecto.
4. **Propósito:** retira las variables temporales y el nombre de proyecto de la shell. **Comprobación esperada:** no hay salida. **Evidencia:** ninguna clave se conserva. **Si necesitas repetir:** pide claves temporales nuevas.

## Resumen y referencias

La evidencia mínima es: estado sin puertos, conteos/privilegios de semilla, rechazo de escritura, comparación de origen y restauración, validación Compose y prueba de limpieza. El tiempo de ejecución está **omitido**: esta página no ejecutó Docker, MariaDB ni comandos de base de datos.

- Guía relacionada: [Lab Linux — MariaDB](../lab-linux/11-mariadb.md)
- [MariaDB Dump](https://mariadb.com/kb/en/mariadb-dump/)
- [Docker Compose](https://docs.docker.com/compose/)
