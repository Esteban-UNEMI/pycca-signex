# Publicación del prototipo académico

La versión Sites exporta el catálogo inicial a HTML estático. `npm run build:hosted` genera `out/`. El servidor Next.js habitual sigue disponible con `npm run build` y `npm start`.

Los cambios del administrador, carrito, clientes, pedidos y progreso pertenecen al navegador. No se comparten entre visitantes; los roles son de demostración y no sustituyen autenticación. No introducir datos personales reales. Los productos y categorías creados después del build requieren un servidor Next.js o una nueva publicación para abrir sus rutas de detalle en esta exportación.

Supabase todavía no está conectado ni su SQL ejecutado. La configuración específica de PYCCA debe guardarse en `.env.local` ignorado por Git. Las claves públicas de Supabase están destinadas al cliente; ninguna clave administrativa debe llevar prefijo `NEXT_PUBLIC_` ni llegar al navegador. No reutilizar la base de otros proyectos.

## GitHub Pages

El workflow `.github/workflows/deploy-pages.yml` compila y publica el sitio al hacer push a `main` (también se puede iniciar manualmente desde GitHub Actions). Para `Esteban-UNEMI/pycca-signex`, la URL esperada es `https://esteban-unemi.github.io/pycca-signex/`. En GitHub configura **Settings → Pages → Build and deployment → Source: GitHub Actions**.

Para actualizar la web, crea un commit y súbelo a `main`. Un commit que solo exista en el equipo no inicia el despliegue. GitHub Pages publica una exportación estática: los cambios del administrador guardados en el navegador siguen siendo locales a ese dispositivo, y para agregar rutas nuevas de producto/categoría se necesita volver a compilar y publicar. La persistencia compartida y Supabase siguen pendientes.

Para activar un backend real: proyecto Supabase específico, autenticación y roles verificados en servidor, repositorios de catálogo y administración, políticas RLS y pruebas con usuarios de distintos roles. El esquema preparado es material de partida, no una garantía de permisos adecuados para producción.
