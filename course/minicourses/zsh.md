# Zsh: una shell interactiva

## Objetivo
Reconocer qué aporta Zsh como intérprete de órdenes y practicar una configuración mínima sin reemplazar archivos locales.

## Conceptos clave
- Zsh es una shell: interpreta órdenes y administra el entorno de la sesión.
- Su archivo de inicio habitual es `~/.zshrc`.
- Las variables, alias y funciones cambian el comportamiento de la terminal.
- Zsh no es Oh My Zsh: este último es un marco opcional de configuración para Zsh.

## Ejemplo guiado
Antes de cambiar preferencias, lea su archivo de inicio y haga una copia manual en una ubicación conocida. Añada una sola variable descriptiva de práctica:

```sh
export CURSO_LINUX="administracion-basica"
```

Abra una terminal nueva y compruebe visualmente que la variable está disponible. Si el resultado no es el esperado, retire únicamente la línea añadida o restaure la copia.

## Ejercicio práctico
Documente en una nota qué diferencia hay entre una shell, una variable de entorno y un alias. Diseñe un alias para recordar una tarea, pero no lo aplique a comandos destructivos ni a archivos de sistema.

## Criterios de éxito
- Explica que Zsh procesa órdenes, no es un editor.
- Localiza el propósito de `~/.zshrc`.
- Conserva una copia de su configuración antes de editarla.

## Referencias
- [Documentación oficial de Zsh](https://zsh.sourceforge.io/Doc/)
- [Guía de archivos de inicio de Zsh](https://zsh.sourceforge.io/Doc/Release/Files.html)
