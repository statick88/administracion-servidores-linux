# Zero Trust para administración Linux

## Objetivo
Aplicar los principios de Zero Trust a un entorno Linux de práctica mediante decisiones de acceso explícitas y verificables.

## Conceptos clave
- Zero Trust no concede confianza permanente por estar dentro de una red determinada.
- Cada solicitud se evalúa con identidad, contexto y una política de mínimo privilegio.
- La segmentación limita el alcance de un error o compromiso.
- La observabilidad y la revisión continua ayudan a detectar accesos que no corresponden al uso previsto.

## Ejemplo guiado
Escenario: dos equipos usan una aplicación interna ficticia en un laboratorio aislado.

1. Identifique las identidades: persona administradora, aplicación y persona usuaria.
2. Defina qué recurso necesita cada identidad y durante cuánto tiempo.
3. Dibuje una política: la aplicación solo accede a su base de datos; la administración requiere autenticación reforzada.
4. Añada un registro de decisiones de acceso y una revisión periódica de permisos.
5. Pruebe el diseño con datos ficticios y confirme que un rol no recibe permisos de otro.

No configure controles de acceso ni intente eludirlos desde este minicurso. El ejercicio es defensivo y se limita a un entorno aislado.

## Ejercicio práctico
Redacte una matriz de tres identidades y tres recursos. Marque permitir, denegar o revisar, y justifique cada decisión con mínimo privilegio y necesidad operativa.

## Criterios de éxito
- Explica por qué la ubicación de red por sí sola no autoriza un acceso.
- Asigna permisos mínimos a cada identidad de la matriz.
- Incluye registro y revisión como parte de la política, no solo autenticación.

## Referencias oficiales
- [NIST SP 800-207: Zero Trust Architecture](https://csrc.nist.gov/pubs/sp/800/207/final)
- [NIST: guía de Zero Trust](https://www.nist.gov/publications/zero-trust-architecture)
- [CISA: Zero Trust Maturity Model](https://www.cisa.gov/resources-tools/resources/zero-trust-maturity-model)
