# Taller: Inventario reproducible de software

## Escenario práctico
Un servidor de pruebas debe recibir una utilidad aprobada y dejar evidencia de su origen y versión para que otro administrador pueda repetir el resultado.

## Objetivo medible
Instalar o localizar una utilidad de texto, identificar su repositorio y versión, y producir un inventario reproducible de tres paquetes.

## Entorno aislado y prerrequisitos
Use una VM o WSL2 desechable con conexión a repositorios oficiales y privilegios administrativos. No agregue repositorios de terceros.

## Preparación
1. Identifique el gestor disponible: `apt`, `dnf` o `yum`.
2. Cree `~/taller-paquetes`.
3. Actualice solo los metadatos del gestor, sin realizar una actualización masiva.

## Pasos guiados
1. Busque `tree` o una utilidad equivalente en el repositorio configurado.
2. Consulte antes de instalar el nombre, versión candidata y origen.
3. Instale la utilidad desde el repositorio oficial.
4. Registre en `inventario-paquetes.md` el gestor, la utilidad, versión y repositorio de tres paquetes instalados.
5. Limpie únicamente la caché que el gestor indique como segura y compruebe que la utilidad continúa funcionando.

## Síntesis
Describa por qué conocer el origen y versión es distinto de simplemente saber que un paquete está instalado.

## Entregables
`inventario-paquetes.md` y captura de la consulta de versión de la utilidad instalada.

## Criterios de verificación observables
- El inventario nombra tres paquetes, sus versiones y procedencia.
- La utilidad se ejecuta después de la limpieza de caché.
- No hay repositorios de terceros añadidos durante el taller.
