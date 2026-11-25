# LazyVim: una distribución para Neovim

## Objetivo
Entender LazyVim como una configuración preparada para Neovim y reconocer dónde personalizarla con prudencia.

## Conceptos clave
- Neovim es el editor; LazyVim es una distribución de configuración sobre Neovim.
- LazyVim organiza complementos y valores predeterminados para acelerar el inicio.
- La personalización vive en archivos Lua del usuario, no en archivos del programa.
- Un cambio pequeño y reversible es más seguro que copiar una configuración completa.

## Ejemplo guiado
Imagine una preferencia de interfaz almacenada en un archivo Lua de usuario:

```lua
return {
  { "folke/tokyonight.nvim", opts = { style = "night" } },
}
```

Lea primero la guía correspondiente y conserve una copia del archivo que va a modificar. Abra un archivo de práctica, confirme que el editor inicia y revierta el cambio si aparecen errores de carga.

## Ejercicio práctico
Escriba un plan de tres pasos para cambiar un tema: localizar el archivo de usuario, guardar una copia y comprobar el arranque con un archivo de texto sencillo.

## Criterios de éxito
- Explica que LazyVim no sustituye a Neovim.
- Identifica Lua como formato habitual de personalización.
- Puede describir una reversión de configuración sin borrar archivos ajenos.

## Referencias
- [Documentación oficial de LazyVim](https://www.lazyvim.org/)
- [Guía de configuración de LazyVim](https://www.lazyvim.org/configuration)
