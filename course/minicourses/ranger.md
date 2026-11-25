# Ranger: navegar archivos desde la terminal

## Objetivo
Explorar directorios con Ranger y practicar operaciones seguras sobre archivos de ejemplo.

## Conceptos clave
- Ranger es un administrador de archivos basado en texto para la terminal.
- Su vista por columnas muestra directorio padre, selección y contenido.
- Las teclas `j` y `k` desplazan la selección; `l` entra y `h` vuelve.
- Las acciones de copia, renombrado o borrado requieren atención a la ruta seleccionada.

## Ejemplo guiado
Abra Ranger en un directorio de práctica sin datos importantes. Recorra una estructura ficticia y observe cómo cambia la columna central:

```text
practica/
├── notas/
│   └── objetivo.txt
└── ejemplos/
    └── lista.txt
```

Entre en `notas`, vuelva al directorio padre y localice `lista.txt` sin modificarlo. Antes de cualquier acción, confirme el nombre y la ruta mostrados por Ranger.

## Ejercicio práctico
Cree previamente una carpeta de práctica con dos archivos no importantes. Navegue entre ellos, anote la ruta de cada uno y explique qué comprobación haría antes de renombrar un archivo.

## Criterios de éxito
- Navega hacia dentro y hacia arriba en una estructura de práctica.
- Identifica la ruta del elemento seleccionado.
- Evita borrar o mover archivos sin una copia y una verificación visual.

## Referencias
- [Repositorio oficial de Ranger](https://github.com/ranger/ranger)
- [Documentación de Ranger](https://github.com/ranger/ranger/wiki)
