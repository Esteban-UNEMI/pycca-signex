# PYCCA · SIGNEX · Prototipo académico

Proyecto universitario con propósitos académicos. Catálogo, pagos, inventario, perfiles y roles de demostración; los datos se guardan en el navegador. No introducir información personal real.

Publicación y límites: [docs/publicacion.md](docs/publicacion.md). Exportación alojada: `npm run build:hosted`. Sitio Sites registrado en `.openai/hosting.json`; no crear otro sitio para futuras actualizaciones.

Base moderna y modular para una experiencia de comercio unificado inspirada en los mejores patrones de retail ecuatoriano: tienda pública, carrito, contenido editorial y back office para operación.

## Ejecutar localmente

```bash
npm install
npm run dev
```

Rutas principales:

- `/` — tienda pública responsive.
- `/categoria/[slug]` — landing funcional para cada uno de los 14 departamentos.
- `/producto/[id]` — ficha de producto con descripción, vendedor, stock, cantidad y carrito.
- `/buscar?q=...` — búsqueda global por nombre, departamento, subcategoría y descripción, con filtros y ordenamiento.
- `/checkout` — checkout responsive de dos pasos con delivery/retiro en tienda y pago simulado académico.
- `/admin` — panel demo con roles, catálogo, inventario, tiendas/POS, CRM, finanzas y apariencia.

## Stack

- Next.js App Router + React + TypeScript.
- CSS con variables de diseño para tema claro/oscuro y personalización.
- Supabase client preparado en `lib/supabase.ts`.
- Esquema modular en `supabase/schema.sql` con catálogo, variantes, atributos, reseñas, wishlist, cupones, pedidos, fulfillment, inventario, tiendas, cajas POS y RLS base.
- Compatible con Git y Vercel.

## Próximo paso de producción

1. Crear el proyecto de Supabase y ejecutar `supabase/schema.sql`.
2. Copiar `.env.example` a `.env.local` y completar las variables.
3. Sustituir `lib/data.ts` por consultas a Supabase en una capa de repositorios.
4. Conectar autenticación y políticas de roles con `profiles.role`.
5. Integrar proveedor de pagos, facturación electrónica, WhatsApp y logística.

El contenido de la tienda demo vive separado de los componentes para que sea sencillo reemplazarlo por un CMS o Supabase. Las ediciones del catálogo en el admin se guardan en `localStorage` y se reflejan en la tienda pública durante la demo; al conectar Supabase deben sustituirse por repositorios server-side.

## Catálogo demo

La primera carga contiene 14 departamentos y 42 productos demo (3 por departamento), con precio, precio comparativo, descripción, calificación, stock, vendedor y subcategoría. La navegación por departamentos usa una rail horizontal con desbordamiento táctil en móvil y una navegación completa en escritorio.

## Identidad PYCCA y acceso desde celular

Adaptación académica de https://www.pycca.com/: logo SVG oficial, azul #00539f, rojo #e73137, cabecera blanca y barra superior gris. El catálogo, promociones, cuenta y pagos son demostraciones académicas.

Para abrir en un celular conectado a la misma red Wi-Fi:

```bash
npm run dev:mobile
```

Abre `http://192.168.1.11:3000` en el navegador del teléfono (IP local verificada durante esta sesión; puede cambiar). Mantén encendida la computadora y el servidor en ejecución. Si Windows solicita acceso, permite Node.js en la red privada. Para abrir desde otras redes se necesita publicar el proyecto.

### Instalar la web en el celular

La publicación HTTPS incluye manifiesto e íconos de aplicación, registro de service worker y una pantalla de respaldo sin conexión. En Android, abre el sitio y usa **Instalar aplicación** o **Añadir a pantalla principal** desde el menú del navegador. En iPhone, abre el sitio en Safari y usa **Compartir → Añadir a pantalla de inicio**. La tienda sigue siendo una demo: instalarla no conecta Supabase ni sincroniza los datos locales entre dispositivos.

## Administración personalizable

El panel `/admin` permite:
- Crear, editar y eliminar productos; seleccionar departamento y subcategoría, imagen, vendedor y destacados.
- Ajustar stock con motivo e historial; consultar stock bajo y agotado.
- Editar precios de venta y precios anteriores.
- Crear, editar y eliminar categorías. Su navegación y páginas se actualizan; una categoría con productos no se puede eliminar.
- Gestionar clientes y registros de usuarios con roles y estado activo.
- Consultar detalles de pedidos y actualizar estados. El checkout simulado guarda pedidos y clientes, y descuenta stock.
- Personalizar nombre, logo, portada, colores, bordes, densidad y tarifas de envío.
- Descargar un respaldo JSON y exportar inventario, precios y pedidos.

La persistencia local está centralizada en `lib/local-repository.ts`, con sincronización entre pestañas del mismo origen. No requiere credenciales ni conexión a Supabase todavía. Los datos de `localhost` y la IP de red pertenecen a orígenes distintos; cada navegador mantiene su propia demo. No hay autenticación efectiva en `/admin`: los usuarios y roles son registros académicos, no cuentas de acceso.

El resumen del panel indica este modo local y permite abrir Configuración para revisar el estado de conexión.

Cuando se conecte Supabase, aplicar `supabase/schema.sql` y después `supabase/admin-extension.sql` en un proyecto preparado, implementar repositorios autenticados, mapear los identificadores locales a UUID y ejecutar checkout/inventario con una transacción de base de datos. Las credenciales del servidor no deben ir en variables `NEXT_PUBLIC_*`. El esquema se ha preparado pero no se ha ejecutado en una base de datos remota.

El panel conserva Tiendas/POS con ventas simuladas que descuentan stock, y Finanzas con totales de pedidos, ticket promedio y desglose online/mostrador. La verificación automatizada de los flujos está en `output/verify-admin.cjs`; usa Playwright con Edge y un contexto aislado para no alterar los datos de tu navegador.

## Mejoras de navegación y compra

- `/favoritos`: productos guardados localmente, con corazones activos en tarjetas y ficha de producto.
- Búsqueda con sugerencias de productos y enlaces directos a sus fichas.
- Barra de navegación móvil para inicio, búsqueda, favoritos, cuenta y carrito.
- Carrito compartido entre páginas de la misma pestaña, sin sobrescribir la selección durante la carga; precios y stock se leen del catálogo vigente.
- Cantidades limitadas por existencias, eliminación de líneas y progreso para envío gratis.
- Carrito accesible con Escape, control de foco por teclado y bloqueo del scroll de fondo.

La comprobación del flujo está en `output/verify-shopping.cjs`. Los favoritos se conservan en el navegador; el carrito mantiene la sesión de la pestaña. La sincronización entre dispositivos sigue pendiente de Supabase.

## Espacio Bebés

La portada destaca `/bebes`, también disponible en `/categoria/bebes`. Incluye cuatro cunas y cuatro productos de textiles, baño y paseo, con ilustraciones SVG propias y precios académicos. La colección puede editarse en Admin. La migración `pycca-baby-collection-v1` añade únicamente los nuevos registros a los catálogos locales existentes; conserva las ediciones y no repone productos eliminados después de la actualización. Verificación: `output/verify-baby.cjs`.

