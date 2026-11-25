# Bandit: guía de pistas seguras para aprender

## Propósito y alcance autorizado

Bandit puede usarse únicamente en el entorno de práctica autorizado por OverTheWire y conforme a sus reglas vigentes. Esta guía no contiene datos de acceso, contraseñas, métodos para descubrirlas, instrucciones para reproducir explotaciones ni soluciones de niveles. Su objetivo es enseñar a formular preguntas, documentar el aprendizaje y pedir ayuda sin exponer información sensible.

## Antes de empezar

1. Confirma que estás en el entorno de práctica autorizado y que conoces sus normas.
2. Define un objetivo de aprendizaje en tus propias palabras: por ejemplo, comprender una opción de una herramienta o interpretar una salida.
3. Anota qué evidencia esperas observar, sin copiar secretos ni identificadores de sesión.
4. Establece un límite de tiempo razonable; si se agota, cambia de estrategia o solicita una pista conceptual.

## Leer manuales con intención

Cuando una herramienta sea nueva, empieza por su documentación oficial o por el manual local. Busca cuatro elementos: la descripción general, las opciones relevantes, los ejemplos inocuos y los códigos de salida. Lee una opción a la vez y explica con tus palabras qué entrada acepta y qué resultado produce.

Una buena nota de estudio responde: «¿qué problema resuelve esta herramienta?», «¿qué significa esta opción?» y «¿cómo sabré que mi interpretación es correcta?». Evita transformar una pista conceptual en una receta para obtener secretos.

## Interpretar errores sin adivinar

Un error es una observación, no una instrucción para repetir acciones a ciegas. Registra el mensaje exacto solo si no contiene datos sensibles; después clasifícalo:

- **Sintaxis:** la herramienta no entendió la forma de la petición.
- **Ruta o recurso:** el recurso esperado no está disponible en el contexto actual.
- **Permiso:** la identidad autorizada no tiene la capacidad requerida.
- **Red o sesión:** la conexión o su contexto no está listo.
- **Estado inesperado:** la hipótesis inicial no coincide con la evidencia.

Para cada categoría, vuelve a la documentación y revisa una sola hipótesis. No publiques capturas, historiales ni salidas que puedan contener acceso, credenciales o información de otras personas.

## Bitácora de aprendizaje

Usa una tabla breve y sin secretos para mantener el progreso reproducible a nivel conceptual:

| Nivel o tema | Objetivo | Evidencia no sensible | Concepto aprendido | Próxima pregunta |
|---|---|---|---|---|
| Tema actual | Entender una herramienta | Tipo de error o comportamiento observado | Opción, permiso o formato | Qué consultar en el manual |

La bitácora sirve para detectar patrones, no para almacenar material de autenticación. Sustituye cualquier dato sensible por una descripción genérica, como «dato reservado».

## Cómo pedir una pista útil

Expón el objetivo, el concepto que ya consultaste, una salida saneada y la pregunta mínima que te bloquea. Pide una explicación del concepto o de cómo leer la documentación, no una secuencia de acciones ni una respuesta del reto. Una buena pista reduce la incertidumbre sin revelar el resultado.

## Cierre responsable

Al terminar, resume el concepto aprendido y una alternativa que descartaste por no ajustarse a las reglas o al alcance autorizado. Borra notas temporales que contengan datos sensibles y conserva solo la bitácora saneada. Si encuentras un comportamiento que parezca afectar sistemas fuera del laboratorio, detente y sigue el canal de reporte responsable correspondiente.
