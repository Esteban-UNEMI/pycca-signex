'use client';
import { withBasePath } from '@/lib/site-path';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { categories, products, formatCurrency } from '@/lib/data';
import { CartLine, Product } from '@/lib/types';
import { departments } from '@/lib/data';
import { Icon } from './icon';
import { SiteHeader } from './site-header';
import { ProductCard } from './product-card';
import { CartDrawer } from './cart-drawer';
import { DepartmentRail } from './department-rail';
import { BabySpace } from './baby-space';
import { BabyPromoPopup } from './baby-promo-popup';
import { useDemoProducts } from './use-demo-products';
import { useDemoTheme } from './use-demo-theme';
import { useCart } from './use-cart';
import { defaultSite, keys, useLocalEntity } from '@/lib/local-repository';

export function Storefront() {
  const catalog = useDemoProducts(products);
  const { value: site } = useLocalEntity(keys.site, defaultSite);
  const managedDepartments = useLocalEntity(keys.departments, departments).value;
  useDemoTheme();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [cartOpen, setCartOpen] = useState(false);
  const { cart, cartCount, add, updateQuantity } = useCart();
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [showAll, setShowAll] = useState(false);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('casa-viva-theme') as 'light' | 'dark' | null;
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('casa-viva-theme', theme);
  }, [theme]);

  const visibleProducts = useMemo(() => {
    const filtered = activeFilter === 'Todos' ? catalog.filter((product) => product.featured) : catalog.filter((product) => product.department === activeFilter);
    return showAll ? filtered : filtered.slice(0, 4);
  }, [activeFilter, catalog, showAll]);

  const addToCart = (product:Product) => { setNotice(add(product) ? product.name+' se añadió a tu carrito' : 'No hay stock suficiente o no se pudo guardar el carrito.'); setTimeout(() => setNotice(''),2600); };

  return (
    <div className="storefront">
      <SiteHeader cartCount={cartCount} onCartOpen={() => setCartOpen(true)} theme={theme} onThemeToggle={() => setTheme(theme === 'light' ? 'dark' : 'light')} />
      <main>
        <section className="hero container">
          <div className="hero-copy"><span className="eyebrow hero-eyebrow"><Icon name="Sparkles" size={15} /> PYCCA · Disfruta la vida</span><h1>{site.heroTitle}<br /><em>{site.heroAccent}</em></h1><p>{site.heroDescription}</p><div className="hero-actions"><button className="button button-dark" onClick={() => document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' })}>Comprar ahora <Icon name="ArrowRight" size={17} /></button><button className="text-button" onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}>Ver categorías <Icon name="ChevronRight" size={16} /></button></div><div className="hero-trust"><span><Icon name="ShieldCheck" size={16} /> Compra segura</span><span><Icon name="Truck" size={16} /> Entrega nacional</span></div></div>
          <div className="hero-visual"><div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" /><Image src={withBasePath(site.heroImage)} alt="Sala cálida decorada" fill priority sizes="(max-width: 900px) 100vw, 56vw" /><div className="hero-caption"><span>01 — Colección</span><strong>Calma natural</strong><small>Materiales honestos · tonos que respiran</small></div></div>
        </section>

        <section className="service-strip"><div className="container service-grid"><div><Icon name="Truck" /><span><strong>Envío gratis</strong><small>En compras desde {formatCurrency(site.shippingThreshold)}</small></span></div><div><Icon name="Store" /><span><strong>Retira en tienda</strong><small>Elige tu punto más cercano</small></span></div><div><Icon name="CreditCard" /><span><strong>Compra segura</strong><small>Paga como prefieras</small></span></div><div><Icon name="CircleHelp" /><span><strong>Estamos para ayudarte</strong><small>Asesoría por WhatsApp</small></span></div></div></section>

        <DepartmentRail departments={managedDepartments} />
        {managedDepartments.some(d=>d.slug==='bebes')&&<BabySpace catalog={catalog} onAdd={addToCart}/>}

        <section id="categories" className="section container"><div className="section-heading"><div><span className="eyebrow">Explora por ambiente</span><h2>Encuentra tu próximo <em>favorito</em></h2></div><Link href="/buscar?q=" className="text-button">Ver todo <Icon name="ArrowRight" size={16} /></Link></div><div className="category-grid">{managedDepartments.slice(0, 4).map((category) => { return <Link className="category-card" href={`/categoria/${category.slug}`} key={category.id} style={{ '--category-accent': 'var(--surface)' } as React.CSSProperties}><div className="category-copy"><span>{category.eyebrow}</span><strong>{category.name}</strong><Icon name="ArrowUpRight" size={18} /></div><Image src={withBasePath(category.image)} alt={category.name} fill sizes="(max-width: 700px) 50vw, 25vw" /></Link>; })}</div></section>

        <section id="featured" className="section section-soft"><div className="container"><div className="section-heading"><div><span className="eyebrow">Favoritos de la temporada</span><h2>Descubre nuestros <em>destacados</em></h2></div><div className="filter-tabs">{['Todos', ...managedDepartments.slice(0, 4).map(d => d.name)].map((filter) => <button className={activeFilter === filter ? 'active' : ''} key={filter} onClick={() => { setActiveFilter(filter); setShowAll(false); }}>{filter}</button>)}</div></div><div className="product-grid">{visibleProducts.map((product) => <ProductCard key={product.id} product={product} onAdd={addToCart} />)}</div><div className="center-action"><button className="button button-outline" onClick={() => setShowAll(!showAll)}>{showAll ? 'Ver menos' : 'Ver todos los productos'} <Icon name="ArrowRight" size={17} /></button></div></div></section>

        <section className="editorial container"><div className="editorial-image"><Image src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85" alt="Detalle de hogar" fill sizes="(max-width: 800px) 100vw, 55vw" /></div><div className="editorial-copy"><span className="eyebrow">Ideas para vivir mejor</span><h2>Pequeños cambios.<br /><em>Gran diferencia.</em></h2><p>Una mesa bien puesta, una luz cálida, ese objeto que te recuerda a un viaje. Te ayudamos a crear espacios que se sienten tuyos.</p><button className="button button-dark" onClick={() => document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" })}>Inspirarme <Icon name="ArrowRight" size={17} /></button><div className="editorial-note"><span>Inspiración PYCCA</span><span>Historias para tu hogar <Icon name="ArrowRight" size={14} /></span></div></div></section>

        <section className="newsletter"><div className="container newsletter-inner"><div><span className="eyebrow">El correo más bonito de tu bandeja</span><h2>Ideas, ofertas y <em>cosas bonitas.</em></h2></div><form className="newsletter-form" onSubmit={(event) => { event.preventDefault(); setNotice("¡Gracias! Suscripción simulada para el proyecto académico."); setTimeout(() => setNotice(""), 4000); }}><input placeholder="Tu correo electrónico" aria-label="Correo para novedades" type="email" required /><button type="submit" className="button button-dark">Suscribirme <Icon name="ArrowRight" size={16} /></button><small>Suscripción de demostración académica.</small></form></div></section>
      </main>
      <footer className="site-footer"><div className="container footer-grid"><div><div className="brand footer-brand"><img className="pycca-logo" src={withBasePath(site.logo)} alt={site.name} width="150" height="48" /></div><p>Diseño para disfrutar la vida,<br />todos los días.</p></div><div><strong>Comprar</strong><a href="#featured">Novedades</a><a href="#featured">Más vendidos</a><a href="#categories">Categorías</a><a href="#featured">Ofertas</a></div><div><strong>Ayuda</strong><a href="#">Preguntas frecuentes</a><a href="#">Envíos y devoluciones</a><Link href="/tiendas">Encuentra una tienda</Link><a href="#">Contáctanos</a></div><div><strong>PYCCA</strong><a href="#">Nuestra historia</a><a href="#">Trabaja con nosotros</a><a href="#">Club PYCCA</a><a href="#">Sostenibilidad</a></div></div><div className="container footer-bottom"><span>© 2026 · Proyecto universitario. Catálogo y compras simulados.</span><span className="academic-reference">Proyecto académico inspirado en <Image src={withBasePath("/brand/pycca-logo.svg")} alt="PYCCA" width={72} height={19} /></span><span>Privacidad · Términos · Ecuador</span></div></footer>
      <BabyPromoPopup />
      {notice && <div className="toast"><Icon name="Check" size={16} /> {notice}</div>}
      <CartDrawer open={cartOpen} lines={cart} onClose={() => setCartOpen(false)} onChangeQuantity={updateQuantity} />
    </div>
  );
}

