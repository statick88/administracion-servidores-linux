# Práctica XI — MariaDB: datos, privilegios, respaldo y rendimiento

## Introducción

Crearás una base **sintética**, una cuenta de mínimo privilegio, una copia lógica restaurada en otro esquema y dos planes de consulta. Usa únicamente el contenedor efímero de la guía y datos inventados.

::: {.callout-warning}
## ⚠️ ADVERTENCIA CRÍTICA

No apuntes comandos a servidores de trabajo, producción, aulas compartidas, copias reales ni puertos publicados. No uses `GRANT ALL`, `%` como host ni incluyas contraseñas en la entrega.

**Lo que podría salir mal:** se pueden alterar datos reales o conceder acceso excesivo.

**Cómo prevenirlo:**
1. Ejecuta clientes solo con `docker exec` contra un contenedor nuevo.
2. Restaura exclusivamente en `ventas_xi_restaurada`; no sobre el origen.
:::

## Preparación aislada

Crea un directorio local y pide la contraseña local sin mostrarla. El contenedor no publica puertos y no usa volúmenes nombrados.

```bash
mkdir -p "$HOME/mariadb-xi-lab" && cd "$HOME/mariadb-xi-lab"  # <1>
chmod 700 .  # <2>
read -rsp 'Clave root local temporal: ' MARIADB_ROOT_PASSWORD; export MARIADB_ROOT_PASSWORD; printf '\n'  # <3>
export MARIADB_CONTAINER="$(docker run -d -e MARIADB_ROOT_PASSWORD="$MARIADB_ROOT_PASSWORD" mariadb:11)"  # <4>
until docker exec "$MARIADB_CONTAINER" mariadb-admin ping -uroot -p"$MARIADB_ROOT_PASSWORD" --silent; do sleep 2; done  # <5>
docker ps --filter "id=$MARIADB_CONTAINER" --format 'table {{.ID}}\t{{.Status}}' > evidencia-contenedor.txt  # <6>
```



1. Crea el directorio de datos de práctica.
2. Restringe el directorio local.
3. Mantiene la clave fuera del historial y de los entregables.
4. Crea un contenedor nuevo sin publicar un puerto ni montar recursos existentes.
5. Espera disponibilidad del único contenedor identificado.
6. Guarda identificador y estado, sin contraseña.

## Datos sintéticos e integridad

Guarda `01-datos.sql`:

```sql
CREATE DATABASE ventas_xi CHARACTER SET utf8mb4;
USE ventas_xi;
CREATE TABLE clientes (id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, nombre VARCHAR(80) NOT NULL, correo VARCHAR(120) NOT NULL UNIQUE, ciudad VARCHAR(60) NOT NULL) ENGINE=InnoDB;
CREATE TABLE pedidos (id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, cliente_id INT UNSIGNED NOT NULL, creado_en DATE NOT NULL, total DECIMAL(10,2) NOT NULL, estado ENUM('nuevo','pagado','enviado') NOT NULL, CONSTRAINT fk_pedidos_cliente FOREIGN KEY (cliente_id) REFERENCES clientes(id)) ENGINE=InnoDB;
INSERT INTO clientes (nombre,correo,ciudad) VALUES ('Ada Norte','ada.norte@example.test','Sevilla'),('Bruno Río','bruno.rio@example.test','Bilbao'),('Celia Mar','celia.mar@example.test','Sevilla'),('Diego Sol','diego.sol@example.test','Valencia');
INSERT INTO pedidos (cliente_id,creado_en,total,estado) VALUES (1,'2025-01-10',120.50,'pagado'),(1,'2025-02-18',42.00,'enviado'),(2,'2025-02-03',210.00,'pagado'),(3,'2025-03-01',18.75,'nuevo'),(3,'2025-03-12',95.20,'pagado'),(4,'2025-03-20',300.00,'enviado');
```

```bash
docker exec -i "$MARIADB_CONTAINER" mariadb -uroot -p"$MARIADB_ROOT_PASSWORD" < 01-datos.sql  # <1>
docker exec "$MARIADB_CONTAINER" mariadb -uroot -p"$MARIADB_ROOT_PASSWORD" -N -e 'SELECT COUNT(*) FROM ventas_xi.clientes; SELECT COUNT(*) FROM ventas_xi.pedidos;' | tee evidencia-conteos.txt  # <2>
```



1. Carga exclusivamente el esquema sintético.
2. Registra los conteos esperados `4` y `6`; la FK impide pedidos para clientes inexistentes.

## Mínimo privilegio, respaldo y restauración

Guarda estas sentencias exactas como `02-privilegios.sql` (la clave de práctica no se entrega):

```sql
CREATE USER IF NOT EXISTS 'consulta_xi'@'localhost' IDENTIFIED BY 'solo-lab-xi';
GRANT SELECT ON ventas_xi.* TO 'consulta_xi'@'localhost';
```

La segunda sentencia termina exactamente en `TO 'consulta_xi'@'localhost';`; no concede escritura ni acceso remoto.

```bash
docker exec -i "$MARIADB_CONTAINER" mariadb -uroot -p"$MARIADB_ROOT_PASSWORD" < 02-privilegios.sql  # <1>
docker exec "$MARIADB_CONTAINER" mariadb -uroot -p"$MARIADB_ROOT_PASSWORD" -e "SHOW GRANTS FOR 'consulta_xi'@'localhost';" | tee evidencia-grants.txt  # <2>
docker exec "$MARIADB_CONTAINER" mariadb -uconsulta_xi -psolo-lab-xi -e 'SELECT COUNT(*) FROM ventas_xi.pedidos;'  # <3>
docker exec "$MARIADB_CONTAINER" mariadb -uconsulta_xi -psolo-lab-xi -e "INSERT INTO ventas_xi.clientes(nombre,correo,ciudad) VALUES ('Prueba','prueba@example.test','Lugo');" 2> evidencia-rechazo.txt || true  # <4>
docker exec "$MARIADB_CONTAINER" mariadb-dump -uroot -p"$MARIADB_ROOT_PASSWORD" --databases --single-transaction ventas_xi > ventas_xi.sql  # <5>
chmod 600 ventas_xi.sql; docker exec "$MARIADB_CONTAINER" mariadb -uroot -p"$MARIADB_ROOT_PASSWORD" -e 'CREATE DATABASE ventas_xi_restaurada;'  # <6>
sed 's/`ventas_xi`/`ventas_xi_restaurada`/g' ventas_xi.sql | docker exec -i "$MARIADB_CONTAINER" mariadb -uroot -p"$MARIADB_ROOT_PASSWORD"  # <7>
```



1. Aplica el archivo corregido de privilegio mínimo.
2. Conserva la concesión observable.
3. Demuestra lectura permitida.
4. Conserva el rechazo esperado de escritura como evidencia; no elimina la protección.
5. Genera una copia lógica local con datos de laboratorio.
6. Protege la copia y crea solo el destino nuevo.
7. Restaura en el destino, nunca sobre `ventas_xi`.

## Rendimiento y entrega

Primero compara origen y restauración. Después genera datos adicionales **solo en el origen** para que el plan sea observable; no vuelvas a usar esa carga como prueba del respaldo.

```bash
docker exec "$MARIADB_CONTAINER" mariadb -uroot -p"$MARIADB_ROOT_PASSWORD" -N -e 'SELECT "origen",COUNT(*) FROM ventas_xi.pedidos UNION ALL SELECT "restaurada",COUNT(*) FROM ventas_xi_restaurada.pedidos;' | tee evidencia-restauracion.txt  # <1>
docker exec "$MARIADB_CONTAINER" mariadb -uroot -p"$MARIADB_ROOT_PASSWORD" -e 'INSERT INTO ventas_xi.pedidos (cliente_id,creado_en,total,estado) SELECT 1, DATE_ADD("2024-01-01", INTERVAL n DAY), 10.00, "pagado" FROM (SELECT a.n + 10*b.n + 100*c.n AS n FROM (SELECT 0 n UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) a CROSS JOIN (SELECT 0 n UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) b CROSS JOIN (SELECT 0 n UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) c) serie;'  # <2>
docker exec "$MARIADB_CONTAINER" mariadb -uroot -p"$MARIADB_ROOT_PASSWORD" -e 'ANALYZE TABLE ventas_xi.pedidos; EXPLAIN FORMAT=JSON SELECT id,total FROM ventas_xi.pedidos WHERE cliente_id=3 AND creado_en >= "2026-01-01";' > plan-antes.json  # <3>
docker exec "$MARIADB_CONTAINER" mariadb -uroot -p"$MARIADB_ROOT_PASSWORD" -e 'CREATE INDEX idx_pedidos_cliente_fecha ON ventas_xi.pedidos (cliente_id,creado_en); ANALYZE TABLE ventas_xi.pedidos; EXPLAIN FORMAT=JSON SELECT id,total FROM ventas_xi.pedidos WHERE cliente_id=3 AND creado_en >= "2026-01-01";' > plan-despues.json  # <4>
```



1. Comprueba que ambos esquemas tienen `6` pedidos antes de la carga adicional.
2. Inserta mil filas inventadas solo para observar un plan; no toca la restauración.
3. Conserva el plan previo al índice.
4. Crea el índice compuesto y conserva el plan equivalente posterior.

Entrega ambos planes y esta tabla; no afirmes rendimiento de producción con el conjunto pequeño.

| Momento | access type | key | filas estimadas |
|---|---|---|---|
| Antes | observado | observado | observado |
| Después | observado | `idx_pedidos_cliente_fecha` u observado | observado |

Además, compara conteos de `ventas_xi.pedidos` y `ventas_xi_restaurada.pedidos`; ambos deben ser `6` antes de cualquier carga de rendimiento.

## Limpieza

```bash
docker rm -f "$MARIADB_CONTAINER"  # <1>
unset MARIADB_ROOT_PASSWORD MARIADB_CONTAINER  # <2>
```



1. Elimina únicamente el contenedor identificado; no usa `-v` ni elimina volúmenes nombrados.
2. Elimina variables de esta sesión; revisa el archivo local antes de borrarlo manualmente si ya no necesitas evidencia.

## Rúbrica

| Criterio | Puntos |
|---|---:|
| Aislamiento y datos sintéticos | 2 |
| Modelo, FK y conteos | 2 |
| Privilegio mínimo y rechazo de INSERT | 2 |
| Copia/restauración en destino distinto | 2 |
| Dos planes interpretados | 2 |

Fuente opcional: [revisión publicada](https://raw.githubusercontent.com/statick88/lab-linux/74eb8c9841bdccc58c03d050ad33aec897334330/docs/practicas/11-mariadb.md).