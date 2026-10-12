# PYCCA / SIGNEX · Revisión del proyecto integrador

Revisión del 7 de octubre de 2026. Proyecto universitario con propósitos académicos. La web es un prototipo complementario de la campaña, con catálogo, compras e inventario simulados y persistencia local; no sustituye el entregable audiovisual ni constituye un servicio de PYCCA.

## Fuentes examinadas y alcance

Se revisó el texto accesible de los documentos siguientes y la implementación actual del catálogo, administrador y espacio Bebés. No se ha auditado la entrega de Moodle ni validado el contenido gráfico de las imágenes incrustadas en los documentos; las tablas y gráficos extraídos como texto pueden omitir detalles visuales.

1. [Dossier — Semiótica](https://docs.google.com/document/d/1h9NRaAKduvJgr2ZUdXksWFsfO5isB3WeD9bTPM-ifQw/edit): público, objetivos, concepto y claim; apartados 30–35 sobre signos, paleta, Poppins y dirección de arte.
2. [Plantilla Proyecto Integrador / acta SIGNEX](https://docs.google.com/document/d/11zXD8SDopsmdEryK-xtmF8x2LDoODpQRUciMPEAcKS8/edit): apartado 3 confirma un spot publicitario para una cuna; distribución de responsabilidades.
3. [Spot PYCCA Cuna — Corrección](https://drive.google.com/file/d/1v18L_AY2HYK_OWNNb3KuMcolIU1U94EP/view): spot de aproximadamente un minuto, horizontal 16:9; preparación del espacio, recomendación de una amiga, consulta en celular, elección y habitación terminada.
4. [Investigación PYCCA](https://docs.google.com/document/d/1ksZbeKQZNE9Ykk4Q5rbqkuGE8zIq6MwbnumyV4ZYhoQ/edit): análisis de 39 registros y subgrupo de 18 de 27–29 años; limitaciones, contenido demostrativo y piloto de medición.
5. [Análisis de redes sociales y concepto creativo](https://docs.google.com/document/d/1R8Sl3mqdHexxeirE6tSEs15bDhfPKQ_YJVgVou7eKNE/edit): diez publicaciones analizadas; consultas sobre precio, disponibilidad, ubicación, montaje y compra online. La observación de comentarios no demuestra conversión de ventas.
6. [Preguntas para encuesta](https://docs.google.com/document/d/1M6FaQMJSZi11uEE-WIgt7bQD6k8Ri2LlYTtDqpr2nbE/edit): cuestionario con filtro de edad y referencias a gráficos de 49 respuestas; no constituye por sí solo una base depurada.
7. [PYCCA BEBES.pdf](https://drive.google.com/file/d/1cOmYpf5nRY1iGpU7m8_mg7ePsvo8gtD6/view): ficha de **coche cuna Ebaby Fazio Deluxe Azul EV125AZ**. No identifica una cuna de dormitorio ni valida las dimensiones de los modelos ficticios de la web.
8. [GuiaDossier.pdf](https://drive.google.com/file/d/1Ojw5FlijAeHaEjTjUOE3s2-yxiOFuhLS/view): guía general para ayudas de animación digital; referencias de estructura, técnica, presupuesto y atribución. Sus límites de 23 páginas/10 MB no deben tratarse como consigna UNEMI sin confirmación del docente.
9. Borrador local `C:\Users\Nicola\Esteban Nicola\MULTIMEDIA\outputs\tareas-2026-10-07\S7_PYCCA_brief_y_textos_borrador.md`: carrusel de tres piezas 1080×1350, PSD, exportaciones y PDF con evidencias reales de proceso. Es un borrador de preproducción, no evidencia de una entrega realizada.

## Diagnóstico

La necesidad principal es ayudar a futuros padres a conocer y comparar una cuna mientras preparan la llegada del bebé. La tienda genérica ya cubría productos, categorías y carrito, pero el espacio Bebés necesitaba una relación explícita con el discurso del integrador. La web cumple una función narrativa concreta: es la pantalla del celular mediante la que los personajes descubren el producto.

La cuna debe conservar mayor jerarquía que promociones o accesorios. El dosier establece blanco #F7F5EF, beige #DCCBB5, verde claro #D7E8C8, salvia #9CAF88, amarillo #F1DF9B y gris #D6D4CF; Poppins; iluminación natural y una habitación ordenada. Los colores de la marca pueden convivir con esta ambientación sin convertir la habitación en una escena azul.

## Cambios implementados

| Necesidad del proyecto | Respuesta en la web | Alcance |
|---|---|---|
| Coherencia del concepto y claim del dosier | Portada y Bebés: «Elige con confianza» / «Tu elección, su tranquilidad» | Mensajes de la campaña |
| Cuna como signo principal | Cuatro cunas protagonistas y fotografía conceptual cálida en la cabecera | Modelos ficticios |
| Dirección de arte y tipografía | Paleta del dosier y Poppins en el espacio Bebés | Colección y módulos de campaña |
| Comparación antes de elegir | Selección de hasta tres cunas; precio, stock y enlace a ficha | Datos vivos del catálogo local; medidas y garantía pendientes |
| Preparación del espacio | Lista de cinco revisiones con progreso y guardado local | Organización personal, sin promesas de seguridad |
| Secuencia impacto / experiencia / acción | Tres momentos editoriales basados en los textos del brief S7 | Complemento web; no reemplaza carrusel PSD |
| Mejor presentación de productos | Ocho imágenes individuales generadas con IA y optimizadas a WebP | Conceptos visuales, no fotos oficiales ni evidencia de prestaciones |
| Transparencia de simulación | Aviso académico y ausencia de estrellas cuando hay cero reseñas | Evita presentar testimonios inexistentes |
| Personalización existente | Actualización de imágenes originales conservando precios, stock y personalizaciones | Persistencia local; Supabase pendiente |

## Diferencias que conviene resolver antes de entregar

1. **Mensaje creativo:** el dosier usa «Elige con confianza», el guion corregido «Preparar su espacio es comenzar a darle la bienvenida» y «Encuentra la cuna ideal en PYCCA»; otros apartados utilizan variaciones como «Todo en un solo lugar». Propuesta: concepto principal del dosier, preparación como idea narrativa y frase de producto como CTA. Revisar esta jerarquía con todo el equipo, sin alterar silenciosamente los archivos originales.
2. **Producto real:** la referencia PDF corresponde a un coche cuna. Falta definir marca, modelo/SKU y fotografía de la cuna de dormitorio del spot. No trasladar la garantía, rango de uso ni medidas del coche a una cuna.
3. **Muestras de encuesta:** Investigación informa 39 registros y 18 del grupo de edad; Preguntas incluye gráficos con 49 respuestas y el dosier utiliza otra base. Identificar fecha, versión del instrumento, fuente y depuración de cada conjunto. Revisar duplicados, correos faltantes y salto por edad antes de unificar cifras. No publicar porcentajes de estas bases como si fueran una única investigación representativa.
4. **Canales:** el dosier prioriza Instagram y el análisis de investigación destaca TikTok. Mantener versión horizontal del spot y adaptaciones verticales; justificar prioridad con una misma base de resultados verificada.
5. **Guion:** aparece «Valentina y Daniel» en una composición, mientras el personaje definido es Jorge. Corregir consistencia de nombres en el documento fuente.
6. **Evidencias:** las imágenes de IA son recursos conceptuales. No acreditan montaje real, capturas de Photoshop, participación de actores, testimonios ni investigación de campo.

## Siguientes entregables, en orden de utilidad

- Confirmar cuna protagonista y ficha real: medidas, materiales, instrucciones, compatibilidad de colchón, garantía y fuente/fecha. Sustituir el modelo conceptual y su imagen cuando exista esa referencia.
- Producir y exportar el spot horizontal del guion; preparar versiones verticales para redes y subtítulos. Integrar un reproductor en Bebés al disponer del archivo final; no simular un video terminado.
- Terminar las tres piezas de carrusel en Photoshop con archivos editables, atribución de recursos y evidencias auténticas del proceso. Las imágenes generadas aquí pueden usarse como referencias de ambiente, identificadas como IA.
- Ensayar los planos del celular con la página Bebés, comparación y ficha, manteniendo continuidad de nombre, precio y modelo entre spot, carrusel y web.
- Incorporar un breve portafolio de campaña con piezas finales, making-of autorizado y créditos. Evitar publicar datos personales de los integrantes o participantes de encuestas.
- Conectar Supabase con autenticación real, permisos por rol y catálogo compartido cuando se proporcione el proyecto. El navegador actual no es una base central ni una autorización de administrador.
- Medir un piloto real: visitas a Bebés, selección de comparación, aperturas de ficha y clics en CTA. Documentar denominadores, período y consentimiento; el prototipo todavía no envía analítica ni demuestra ventas.

## Registro de imágenes

Generadas individualmente para este prototipo el 7 de octubre de 2026: `crib-natural-v2.webp`, `crib-white-v2.webp`, `crib-bedside-v2.webp`, `crib-travel-v2.webp`, `mattress-v2.webp`, `textiles-v2.webp`, `bath-v2.webp` y `stroller-v2.webp`, en `public/baby/`. Originales PNG conservados en la carpeta de imágenes generadas de Codex. Conversión WebP para reducir peso, sin cambiar composición. Imagen de cuna natural reutilizada como ambiente de portada. Las ilustraciones anteriores se conservan.
