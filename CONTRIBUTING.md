# Contribuir

Gracias por querer mejorar este material.

## Flujo de trabajo

1. Crea un fork y una rama desde `main`.
2. Realiza cambios pequeños y enfocados.
3. Verifica el render:

```bash
$ quarto render --to html  # <1>
Output created: docs/index.html
# <1>
```



1. **quarto render** genera el sitio en `docs/` para validar que no rompes el build.

4. Abre un Pull Request describiendo el cambio y el motivo.

## Estilo de contenido

- Mantener ejemplos realistas (salidas plausibles).
- Para bloques de comandos, seguir el estandar de anotaciones definido en `AGENTS.md`.
