import { babyDepartment, babyProducts } from './baby-collection';
import { Department, Product } from './types';

export const categories = [
  { id: 'hogar', name: 'Hogar', eyebrow: 'Hazlo tuyo', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=85', accent: '#eef4ef' },
  { id: 'cocina', name: 'Cocina', eyebrow: 'Sabor de casa', image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=900&q=85', accent: '#fff0df' },
  { id: 'tecnologia', name: 'Tecnología', eyebrow: 'Conecta mejor', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=85', accent: '#e9eff8' },
  { id: 'bienestar', name: 'Bienestar', eyebrow: 'Vive ligero', image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=85', accent: '#f4ecf1' },
];

// Departamentos observados en la navegación pública de PYCCA.
export const departments: Department[] = [
  babyDepartment,
  { id: 'tecnologia', name: 'Tecnología', slug: 'tecnologia', eyebrow: 'Conecta mejor', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=500&q=85', subcategories: ['Audio y video', 'Computadoras', 'Impresión', 'Telefonía', 'Juegos de video', 'Zona gamer'] },
  { id: 'electrohogar', name: 'Electrohogar', slug: 'electrohogar', eyebrow: 'Hazlo fácil', image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=500&q=85', subcategories: ['Refrigeración', 'Cocinas', 'Climatización', 'Baño', 'Dormitorio', 'Organización'] },
  { id: 'muebles', name: 'Muebles', slug: 'muebles', eyebrow: 'Espacios con intención', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=500&q=85', subcategories: ['Sala', 'Comedores', 'Dormitorio', 'Oficina', 'Terraza y exteriores', 'Playa y camping'] },
  { id: 'hogar', name: 'Hogar', slug: 'hogar', eyebrow: 'Hazlo tuyo', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=500&q=85', subcategories: ['Cocina', 'Servicio de mesa', 'Servicio de bebidas', 'Baño', 'Decoración', 'Almacenaje'] },
  { id: 'juguetes', name: 'Juguetes', slug: 'juguetes', eyebrow: 'Jugar es crecer', image: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=500&q=85', subcategories: ['Primera infancia', 'Creatividad', 'Juegos de mesa', 'Aire libre'] },
  { id: 'calzado', name: 'Calzado', slug: 'calzado', eyebrow: 'Pisa con estilo', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=85', subcategories: ['Casual', 'Deportivo', 'Sandalias', 'Botines'] },
  { id: 'accesorios', name: 'Accesorios', slug: 'accesorios', eyebrow: 'Lleva tu mundo', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=85', subcategories: ['Relojes', 'Mochilas', 'Bolsos y carteras', 'Viaje'] },
  { id: 'belleza', name: 'Belleza', slug: 'belleza', eyebrow: 'Tu momento', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=500&q=85', subcategories: ['Maquillaje', 'Cuidado facial', 'Cuidado capilar', 'Corporal', 'Perfumería'] },
  { id: 'ferreteria', name: 'Ferretería', slug: 'ferreteria', eyebrow: 'Manos a la obra', image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=500&q=85', subcategories: ['Herramientas', 'Automotriz', 'Cocina', 'Oficina', 'Terraza y exteriores'] },
  { id: 'mascotas', name: 'Mascotas', slug: 'mascotas', eyebrow: 'Amor que acompaña', image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=500&q=85', subcategories: ['Accesorios', 'Descanso', 'Alimentación', 'Juguetes'] },
  { id: 'deportes', name: 'Deportes y Gym', slug: 'deportes-y-gym', eyebrow: 'Muévete mejor', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=500&q=85', subcategories: ['Home gym', 'Deportes y exteriores', 'Yoga', 'Bicicletas'] },
  { id: 'infantil', name: 'Infantil', slug: 'infantil', eyebrow: 'Pequeños grandes días', image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=500&q=85', subcategories: ['Muebles infantiles', 'Coches y andadores', 'Baño e higiene', 'Textiles'] },
  { id: 'instrumentos', name: 'Instrumentos Musicales', slug: 'instrumentos-musicales', eyebrow: 'Que suene a ti', image: 'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?auto=format&fit=crop&w=500&q=85', subcategories: ['Guitarras', 'Teclados', 'Viento', 'Accesorios'] },
  { id: 'libros', name: 'Libros', slug: 'libros', eyebrow: 'Una historia más', image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=500&q=85', subcategories: ['Autoayuda', 'Literatura y ficción', 'Literatura juvenil', 'Literatura infantil', 'Best sellers'] },
];

const image = (url: string) => `https://images.unsplash.com/${url}?auto=format&fit=crop&w=900&q=85`;
const p = (id: string, name: string, department: string, category: string, description: string, price: number, imageUrl: string, extras: Partial<Product> = {}): Product => ({ id, name, department, category, description, seller: 'PYCCA', price, rating: 4.7, reviews: 24, stock: 12, image: image(imageUrl), ...extras });

export const products: Product[] = [
  ...babyProducts,
  p('p-001', 'Televisor Riviera 55” Smart 4K', 'Tecnología', 'Audio y video', 'Pantalla 4K con acceso a tus plataformas favoritas, sonido envolvente y diseño ultradelgado.', 499.9, 'photo-1593359677879-a4bb92f829d1', { compareAt: 579.9, rating: 4.8, reviews: 64, stock: 8, badge: 'Más vendido', featured: true }),
  p('p-002', 'Audífonos inalámbricos Flow', 'Tecnología', 'Audio y video', 'Audífonos Bluetooth con cancelación de ruido, estuche de carga y hasta 32 horas de batería.', 54.9, 'photo-1505740420928-5e560c06d30e', { compareAt: 69.9, rating: 4.5, reviews: 28, stock: 19, badge: 'Oferta' }),
  p('p-003', 'Laptop Nova 14” 8GB + 256GB', 'Tecnología', 'Computadoras', 'Portátil ligera para estudiar, trabajar y crear con fluidez en el día a día.', 649.9, 'photo-1496181133206-80ce9b88a853', { compareAt: 729.9, rating: 4.7, reviews: 21, stock: 5, badge: 'Nuevo' }),
  p('p-004', 'Freidora de aire compacta', 'Electrohogar', 'Cocinas', 'Cocina con menos aceite y más sabor gracias a sus programas rápidos y canasta antiadherente.', 79.9, 'photo-1585515320310-259814833e62', { compareAt: 99.9, rating: 4.7, reviews: 113, stock: 7, badge: 'Más vendido', featured: true }),
  p('p-005', 'Cafetera italiana Siena', 'Electrohogar', 'Comestibles y bebidas', 'Café intenso y ritual sencillo en una cafetera de aluminio para compartir.', 21.9, 'photo-1517256064527-09c73fc73e38', { rating: 4.9, reviews: 74, stock: 16 }),
  p('p-006', 'Ventilador Breeze 16 pulgadas', 'Electrohogar', 'Climatización', 'Tres velocidades, oscilación silenciosa y una brisa fresca para tus espacios.', 59.9, 'photo-1581269909524-7c7c7f35b1f1', { rating: 4.6, reviews: 39, stock: 12 }),
  p('p-007', 'Sofá Lino 3 puestos', 'Muebles', 'Sala', 'Tapizado en lino de tacto natural, cojines amplios y líneas suaves para una sala acogedora.', 499.9, 'photo-1555041469-a586c61ea9bc', { compareAt: 599.9, rating: 4.8, reviews: 17, stock: 3, badge: 'Especial' }),
  p('p-008', 'Mesa de comedor Nórdica', 'Muebles', 'Comedores', 'Mesa de madera clara para seis personas, pensada para conversaciones largas.', 329.9, 'photo-1617806118233-18e1de247200', { rating: 4.7, reviews: 12, stock: 4 }),
  p('p-009', 'Cómoda Aura 6 cajones', 'Muebles', 'Dormitorio', 'Almacenamiento elegante con seis cajones de cierre suave y acabado mate.', 179.9, 'photo-1595428774223-ef52624120d2', { rating: 4.6, reviews: 19, stock: 6 }),
  p('p-010', 'Jarrón artesanal Terracota', 'Hogar', 'Decoración', 'Pieza de cerámica con textura artesanal para darle carácter a cualquier rincón.', 24.9, 'photo-1610701596007-11502861dcfa', { compareAt: 32.9, rating: 4.9, reviews: 42, stock: 18, badge: 'Nuevo', featured: true }),
  p('p-011', 'Lámpara portátil Lumen', 'Hogar', 'Decoración', 'Luz cálida recargable para crear atmósferas bonitas dentro o fuera de casa.', 28.5, 'photo-1507473885765-e6ed057f782c', { rating: 4.6, reviews: 31, stock: 25, featured: true }),
  p('p-012', 'Organizador modular bamboo', 'Hogar', 'Almacenaje', 'Ordena tus espacios con módulos ligeros de bambú que combinan con todo.', 18.9, 'photo-1586023492125-27b2c045efd7', { rating: 4.8, reviews: 55, stock: 34 }),
  p('p-013', 'Set de bloques City 120 piezas', 'Juguetes', 'Creatividad', 'Construcción libre para imaginar ciudades, vehículos y nuevas historias.', 39.9, 'photo-1594787318286-3d835c1d207f', { rating: 4.8, reviews: 46, stock: 14, badge: 'Favorito' }),
  p('p-014', 'Cocina mini Chef', 'Juguetes', 'Primera infancia', 'Cocina de juego con accesorios para aprender, crear y jugar en familia.', 49.9, 'photo-1566454544259-f4b8a57f6e90', { rating: 4.7, reviews: 22, stock: 9 }),
  p('p-015', 'Scooter infantil Glow', 'Juguetes', 'Aire libre', 'Scooter estable de tres ruedas con luces en movimiento para sus primeras aventuras.', 69.9, 'photo-1559333086-bb72f7c8eaa8', { compareAt: 84.9, rating: 4.6, reviews: 18, stock: 6, badge: 'Oferta' }),
  p('p-016', 'Zapatillas Urban Move', 'Calzado', 'Casual', 'Comodidad diaria con suela flexible y una silueta que combina con todo.', 49.9, 'photo-1542291026-7eec264c27ff', { rating: 4.6, reviews: 38, stock: 22 }),
  p('p-017', 'Sandalias Terra', 'Calzado', 'Sandalias', 'Sandalias ligeras con tiras suaves para caminar sin complicaciones.', 29.9, 'photo-1603487742131-4160ec999306', { rating: 4.5, reviews: 29, stock: 31 }),
  p('p-018', 'Botines Street', 'Calzado', 'Botines', 'Botín urbano de acabado mate con plantilla cómoda para todos los días.', 59.9, 'photo-1608256246200-53e635b5b65f', { compareAt: 74.9, rating: 4.7, reviews: 17, stock: 11, badge: 'Oferta' }),
  p('p-019', 'Mochila Commuter 20L', 'Accesorios', 'Mochilas', 'Compartimento acolchado para laptop, bolsillo secreto y espalda transpirable.', 44.9, 'photo-1553062407-98eeb64c6a62', { rating: 4.8, reviews: 51, stock: 26 }),
  p('p-020', 'Reloj Minimal acero', 'Accesorios', 'Relojes', 'Diseño limpio y atemporal con correa de acero para elevar cualquier look.', 34.9, 'photo-1524805444758-089113d48a6d', { rating: 4.5, reviews: 14, stock: 13 }),
  p('p-021', 'Maleta Carry On 20”', 'Accesorios', 'Viaje', 'Equipaje compacto con ruedas 360°, interior organizado y carcasa resistente.', 89.9, 'photo-1565026057447-bc90a3dceb87', { compareAt: 109.9, rating: 4.7, reviews: 33, stock: 8, badge: 'Viaje' }),
  p('p-022', 'Serum Vitamina C 30ml', 'Belleza', 'Cuidado facial', 'Fórmula ligera para iluminar la piel y acompañar tu rutina de cuidado diario.', 24.9, 'photo-1620916566398-39f1143ab7be', { rating: 4.8, reviews: 61, stock: 28 }),
  p('p-023', 'Perfume Ícono 100ml', 'Belleza', 'Perfumería', 'Una fragancia elegante de notas frescas, florales y un fondo cálido.', 49.9, 'photo-1541643600914-78b084683601', { compareAt: 59.9, rating: 4.7, reviews: 44, stock: 17, badge: 'Regalo' }),
  p('p-024', 'Secadora Airflow 2200W', 'Belleza', 'Cuidado capilar', 'Secado rápido con control de temperatura y tecnología anti-frizz.', 39.9, 'photo-1522337360788-8b13dee7a37e', { rating: 4.6, reviews: 36, stock: 15 }),
  p('p-025', 'Taladro inalámbrico 12V', 'Ferretería', 'Herramientas', 'Potencia práctica para proyectos del hogar con batería recargable y luz LED.', 89.9, 'photo-1504148455328-c376907d081c', { compareAt: 109.9, rating: 4.8, reviews: 27, stock: 10, badge: 'Proyecto' }),
  p('p-026', 'Set herramientas hogar 39 piezas', 'Ferretería', 'Herramientas', 'Todo lo esencial para reparaciones, armado y mantenimiento cotidiano.', 44.9, 'photo-1581147036324-c17ac41a34ee', { rating: 4.7, reviews: 48, stock: 18 }),
  p('p-027', 'Organizador de herramientas', 'Ferretería', 'Organización', 'Caja modular con bandejas para mantener tus herramientas siempre a mano.', 32.9, 'photo-1586864387967-d02ef85d93e8', { rating: 4.5, reviews: 16, stock: 21 }),
  p('p-028', 'Cama mascota Nube', 'Mascotas', 'Descanso', 'Cama acolchada y lavable para que tu compañero descanse como merece.', 34.9, 'photo-1583511655857-d19b40a7a54e', { rating: 4.9, reviews: 71, stock: 12 }),
  p('p-029', 'Comedero elevado Duo', 'Mascotas', 'Alimentación', 'Dos bowls de acero sobre una base elevada, fácil de limpiar y mantener.', 19.9, 'photo-1601758228041-f3b2795255f1', { rating: 4.7, reviews: 32, stock: 24 }),
  p('p-030', 'Juguete cuerda Natural', 'Mascotas', 'Juguetes', 'Juego resistente para morder, lanzar y compartir momentos de actividad.', 8.9, 'photo-1535930749574-1399327ce78f', { rating: 4.6, reviews: 41, stock: 35 }),
  p('p-031', 'Mat de yoga Flow', 'Deportes y Gym', 'Yoga', 'Superficie antideslizante de 6 mm para moverte con confianza y comodidad.', 22.9, 'photo-1599447292180-45fd84092ef4', { rating: 4.8, reviews: 52, stock: 29 }),
  p('p-032', 'Mancuernas recubiertas 10kg', 'Deportes y Gym', 'Home gym', 'Par de mancuernas con agarre cómodo para entrenamientos progresivos en casa.', 39.9, 'photo-1583454110551-21f2fa2afe61', { rating: 4.7, reviews: 23, stock: 12 }),
  p('p-033', 'Bicicleta urbana City One', 'Deportes y Gym', 'Bicicletas', 'Bicicleta ligera para moverte por la ciudad con postura cómoda y segura.', 299.9, 'photo-1485965120184-e220f721d03e', { compareAt: 349.9, rating: 4.6, reviews: 9, stock: 4, badge: 'Nuevo' }),
  p('p-034', 'Cuna convertible Nido', 'Infantil', 'Muebles infantiles', 'Cuna que crece con tu bebé y se transforma en cama de primera etapa.', 249.9, 'photo-1516627145497-ae6968895b74', { rating: 4.9, reviews: 13, stock: 3 }),
  p('p-035', 'Mochila escolar Play', 'Infantil', 'Textiles', 'Mochila liviana con compartimentos prácticos para acompañar sus días de escuela.', 29.9, 'photo-1576489922094-1b4f6b9f4f07', { rating: 4.7, reviews: 22, stock: 20 }),
  p('p-036', 'Set sábanas bebé Bosque', 'Infantil', 'Textiles', 'Set suave de algodón para cunas, con estampado delicado inspirado en la naturaleza.', 19.9, 'photo-1519689680058-324335c77eba', { rating: 4.8, reviews: 18, stock: 16 }),
  p('p-037', 'Guitarra acústica Luna', 'Instrumentos Musicales', 'Guitarras', 'Guitarra de tamaño completo con sonido cálido para comenzar a tocar.', 129.9, 'photo-1525201548942-d8732f6617a0', { rating: 4.8, reviews: 16, stock: 7 }),
  p('p-038', 'Teclado 61 teclas Start', 'Instrumentos Musicales', 'Teclados', 'Teclado portátil con ritmos, sonidos integrados y modo de aprendizaje.', 169.9, 'photo-1520523839897-bd0b52f945a0', { compareAt: 199.9, rating: 4.7, reviews: 11, stock: 5, badge: 'Oferta' }),
  p('p-039', 'Ukelele Coral', 'Instrumentos Musicales', 'Cuerdas', 'Ukelele compacto y alegre para llevar la música a cualquier lugar.', 49.9, 'photo-1550291652-6ea9114a47b1', { rating: 4.6, reviews: 24, stock: 13 }),
  p('p-040', 'Hábitos atómicos', 'Libros', 'Autoayuda', 'Una guía práctica para transformar pequeños hábitos en grandes resultados.', 24.9, 'photo-1544947950-fa07a98d237f', { rating: 4.9, reviews: 102, stock: 25, badge: 'Best seller' }),
  p('p-041', 'Cuentos para dormir', 'Libros', 'Literatura infantil', 'Historias cálidas para cerrar el día con imaginación y dulces sueños.', 17.9, 'photo-1512820790803-83ca734da794', { rating: 4.8, reviews: 46, stock: 31 }),
  p('p-042', 'El arte de decorar', 'Libros', 'Best sellers', 'Ideas, recursos y referencias para construir espacios que se sientan tuyos.', 29.9, 'photo-1495446815901-a7297e633e8d', { rating: 4.7, reviews: 27, stock: 13 }),
];

export const navItems = departments.map((department) => ({ label: department.name, slug: department.slug }));
export const formatCurrency = (value: number) => `$${value.toFixed(2)}`;
export const stores = [
  { id: 'matriz-guayaquil', name: 'Matriz Guayaquil', city: 'Guayaquil', address: 'Av. Carlos Julio Arosemena 1205', hours: 'Lun–Sáb · 09:00–20:00', phone: '(04) 390 1205', status: 'Abierta ahora', lat: -2.171, lng: -79.922 },
  { id: 'mall-del-sol', name: 'Mall del Sol', city: 'Guayaquil', address: 'Av. Juan Tanca Marengo · local 108', hours: 'Lun–Dom · 10:00–21:00', phone: '(04) 208 4401', status: 'Abierta ahora', lat: -2.157, lng: -79.895 },
  { id: 'quito-norte', name: 'Quicentro Norte', city: 'Quito', address: 'Av. Naciones Unidas y 6 de Diciembre', hours: 'Lun–Dom · 10:00–20:00', phone: '(02) 398 2210', status: 'Abierta ahora', lat: -0.176, lng: -78.48 },
  { id: 'cuenca-centro', name: 'Gran Piazza Cuenca', city: 'Cuenca', address: 'Av. Hurtado de Mendoza · local 42', hours: 'Lun–Dom · 10:00–20:00', phone: '(07) 284 0930', status: 'Cierra 20:00', lat: -2.9, lng: -79.0 },
];
export const getDepartment = (slug: string) => departments.find((department) => department.slug === slug);
export const getDepartmentByName = (name: string) => departments.find((department) => department.name === name);
export const getProductsByDepartment = (name: string) => products.filter((product) => product.department === name);
