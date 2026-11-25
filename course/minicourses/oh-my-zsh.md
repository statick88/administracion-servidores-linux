# Oh My Zsh: organizar la configuración de Zsh

## Objetivo
Comprender cómo Oh My Zsh amplía una sesión de Zsh mediante temas y complementos, manteniendo el control de la configuración local.

## Conceptos clave
- Oh My Zsh es un marco de configuración; requiere Zsh como shell subyacente.
- Los temas modifican el aspecto del prompt.
- Los complementos añaden funciones interactivas a la terminal.
- Su configuración principal se declara en `~/.zshrc`.

## Ejemplo guiado
Seleccione un único tema de la documentación y anote su nombre antes de cambiar nada. En la sección de configuración, la elección se representa así:

```sh
ZSH_THEME="tema-ejemplo"
plugins=(git)
```

Mantenga pocos complementos al principio. Tras abrir una nueva sesión, observe el prompt y compruebe que el historial y las órdenes habituales siguen funcionando. Si no, vuelva a la copia previa de `~/.zshrc`.

## Ejercicio práctico
Compare dos temas en una lista de ventajas: legibilidad, información de Git y velocidad percibida. Elija uno solo y describa cómo revertiría el cambio.

## Criterios de éxito
- Distingue Zsh de Oh My Zsh.
- Sabe que temas y complementos se configuran en `~/.zshrc`.
- Puede revertir un cambio usando una copia local conocida.

## Referencias
- [Wiki oficial de Oh My Zsh](https://github.com/ohmyzsh/ohmyzsh/wiki)
- [Uso de temas](https://github.com/ohmyzsh/ohmyzsh/wiki/Themes)
