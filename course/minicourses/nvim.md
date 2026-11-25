# Neovim: edición modal para principiantes

## Objetivo
Aprender a abrir, modificar y guardar un archivo de texto con Neovim sin perder una configuración local.

## Conceptos clave
- Neovim es un editor de texto modal: el modo normal navega y el modo inserción escribe.
- `i` cambia a inserción; `Esc` vuelve al modo normal.
- `:w` guarda, `:q` sale y `:wq` guarda y sale.
- Neovim es el editor base; LazyVim es una distribución de configuración para Neovim.

## Ejemplo guiado
1. Abra un archivo de práctica que no sea una configuración personal.
2. En modo normal, sitúe el cursor con las flechas o con `h`, `j`, `k` y `l`.
3. Pulse `i`, escriba una línea breve y pulse `Esc`.
4. Revise el cambio antes de escribir `:w`; después use `:q`.

```text
Notas de práctica
La edición modal separa navegación y escritura.
```

El ejemplo es contenido de un archivo, no un comando para ejecutar.

## Ejercicio práctico
Cree una nota de tres líneas sobre una tarea del curso. Inserte una línea en medio, deshaga con `u` y repita el cambio. Guarde solo cuando el contenido sea correcto.

## Criterios de éxito
- Puede identificar los modos normal e inserción.
- Puede guardar y salir de un archivo de práctica.
- No modifica `init.lua` ni otros archivos de configuración sin una copia previa.

## Referencias
- [Documentación oficial de Neovim](https://neovim.io/doc/)
- [Ayuda de modos de Neovim](https://neovim.io/doc/user/intro.html)
