# Laboratorio Linux: guía de uso y mapa curricular

## Introducción

Estas páginas se leen sin conexión y complementan el laboratorio publicado; no requieren GitHub para realizar las prácticas. Trabaja en una VM dedicada, desechable y aislada, con instantánea previa. Las prácticas VI y VIII son análisis **sintéticos** y offline; IX--XII usan únicamente loopback o un contenedor efímero, según se indica en cada guía.

## Guía de uso

1. Lee el alcance y el rollback antes de escribir o iniciar nada.
2. Crea una carpeta de evidencia dentro de la VM; conserva solamente datos inventados.
3. Completa cada comprobación y documenta resultados, incluidos los fallos esperados.
4. Detén únicamente los procesos que hayas iniciado y revierte la instantánea al terminar.

::: {.callout-warning}
## ⚠️ ADVERTENCIA CRÍTICA

No ejecutes estas prácticas en el host, una red de aula, producción ni una VM que contenga datos valiosos. No publiques puertos, no uses adaptador puente y no apuntes comandos a servicios existentes.

**Lo que podría salir mal:**
- Un cambio de red o DHCP podría afectar a terceros.
- Un servicio web o una base de datos podría exponerse fuera del laboratorio.

**Cómo prevenirlo:**
1. Usa una VM desechable y una instantánea previa.
2. Limita toda escucha y petición web a `127.0.0.1`; usa solo datos sintéticos.
:::

## Mapa curricular de 12 unidades

| Unidad oficial | Tema | Material y alcance |
|---|---|---|
| I | Arquitectura, instalación y arranque | Fundamentos del laboratorio interactivo; instalación/arranque requieren VM desechable. |
| II | Paquetes | APT y consulta de paquetes; no acredita repositorios ni firmas. |
| III | Shell, FHS y permisos | Scripts, redirección y permisos en el entorno del laboratorio. |
| IV | Usuarios | Cuentas, grupos y propiedad en entorno aislado. |
| V | Procesos | Observación y control de procesos propios. |
| VI | Redes y almacenamiento | [Diagnóstico de redes](lab-linux/06-redes.md), con entradas RFC 5737 sintéticas. |
| VII | Hardening | Inspección de permisos, servicios y exposición; no sustituye una auditoría. |
| VIII | DHCP | [Diseño DHCP](lab-linux/08-dhcp.md), sin daemon ni tráfico DHCP. |
| IX | Apache | [Apache local](lab-linux/09-apache.md), solo `127.0.0.1`. |
| X | Nginx y Apache | [Proxy local](lab-linux/10-nginx-apache.md), Nginx → Apache por loopback. |
| XI | MariaDB | [MariaDB aislado](lab-linux/11-mariadb.md), datos ficticios y privilegio mínimo. |
| XII | Rescate/proyecto | [Rescate](lab-linux/12-rescate-proyecto.md), observación de solo lectura y plan autorizado. |

Los identificadores internos del repositorio fuente I--XI no son una equivalencia automática con estas doce unidades oficiales. Docker y TLS del laboratorio original son complementos, no sustitutos de DHCP ni de Nginx+Apache.

## Proveniencia y límites de publicación

Contenido adaptado de material publicado por `statick88/lab-linux`, revisión fija [`74eb8c9841bdccc58c03d050ad33aec897334330`](https://github.com/statick88/lab-linux/tree/74eb8c9841bdccc58c03d050ad33aec897334330). Fuentes opcionales: [mapa original](https://raw.githubusercontent.com/statick88/lab-linux/74eb8c9841bdccc58c03d050ad33aec897334330/docs/curriculo.md) y prácticas `docs/practicas/06-redes.md`, `08-dhcp.md`, `09-apache.md`, `10-nginx-apache.md`, `11-mariadb.md` y `12-rescate-proyecto.md` de esa misma revisión.

Estas páginas son contenido para que el constructor del sitio las integre; no declaran que el sitio, CI, despliegue o soporte estén configurados. La evidencia de cada práctica es local y no certifica competencia ni disponibilidad de servicios.
