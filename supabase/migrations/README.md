# Migraciones PYCCA

Destino solicitado: **Esteban-Unemi**, pendiente de identificar por referencia de proyecto. Ninguna de estas migraciones se ha aplicado remotamente.

1. Confirmar la referencia exacta y acceso autorizado a ese proyecto.
2. Ejecutar `../preflight.sql` y comprobar tablas, tipos y políticas existentes. Si ya contiene un esquema de comercio, reconciliarlo antes de aplicar: la migración inicial no está diseñada para sobrescribirlo.
3. Aplicar en orden los dos archivos SQL versionados. Cada uno contiene una transacción; un error debe revertir ese archivo completo. No contienen borrados de datos ni importaciones automáticas del navegador.
4. Verificar tablas y RLS en el destino. Estas políticas son la base preparada del prototipo, y deben revisarse por función real antes de habilitar administradores o usuarios.
5. Importar el catálogo mediante IDs estables y correspondencia de UUIDs; no importar clientes/pedidos personales de localStorage sin revisión.
6. Conectar repositorios de lectura/escritura, autenticación, roles y operación de stock/pedido transaccional. Crear tablas no cambia por sí solo la aplicación: todavía usa el repositorio local.

El código Next.js admite servidor con `npm run build` y `npm start`; `build:hosted` es la exportación publicada anterior. Un frontend estático también puede leer datos dinámicos de Supabase, pero las nuevas rutas y operaciones de servidor necesitan adaptar la aplicación o un alojamiento compatible con Next.js. GitHub guarda el código; GitHub Pages no ejecuta un servidor Next.js.

Credenciales de ejecución: `.env.local` ignorado por Git. No colocar tokens de gestión, claves de servicio ni contraseñas en variables `NEXT_PUBLIC_`. No se reutilizarán bases de Iglesia Jerusalén ni del sitio personal como destino de PYCCA.
