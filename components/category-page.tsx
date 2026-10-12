'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { formatCurrency } from '@/lib/data';
import { Department, Product, CartLine } from '@/lib/types';
import { Icon } from './icon';
import { ProductCard } from './product-card';
import { SiteHeader } from './site-header';
import { CartDrawer } from './cart-drawer';
import { useDemoProducts } from './use-demo-products';
import { useDemoTheme } from './use-demo-theme';
import { useCart } from './use-cart';
import { BabyPlanner } from './baby-planner';

export function CategoryPage({ department, products }: { department: Department; products: Product[] }) {
  const isBaby=department.slug==='bebes';
  const allProducts = useDemoProducts(products);
  const catalog = useMemo(() => allProducts.filter(p => p.department === department.name), [allProducts, department.name]);
  useDemoTheme();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [cartOpen, setCartOpen] = useState(false);
  const { cart, cartCount, add, updateQuantity } = useCart();
  const [subcategory, setSubcategory] = useState('Todas');
  const [sort, setSort] = useState('Recomendados');
  const [search, setSearch] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('casa-viva-theme') as 'light' | 'dark' | null;
    if (savedTheme) setTheme(savedTheme);
  }, []);
  useEffect(() => { document.documentElement.dataset.theme = theme; window.localStorage.setItem('casa-viva-theme', theme); }, [theme]);

  const visibleProducts = useMemo(() => {
    const filtered = catalog.filter((product) => (subcategory === 'Todas' || product.category === subcategory) && product.name.toLowerCase().includes(search.toLowerCase()));
    return [...filtered].sort((a, b) => sort === 'Precio menor' ? a.price - b.price : sort === 'Precio mayor' ? b.price - a.price : Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
  }, [catalog, search, sort, subcategory]);

  const addToCart = (product:Product) => { setNotice(add(product) ? product.name+' se añadió a tu carrito' : 'No hay stock suficiente o no se pudo guardar el carrito.'); setTimeout(() => setNotice(''),2600); };
  return <div className={`category-page ${isBaby?'baby-category':''}`}><SiteHeader cartCount={cartCount} onCartOpen={() => setCartOpen(true)} theme={theme} onThemeToggle={() => setTheme(theme === 'light' ? 'dark' : 'light')} /><main>
    <div className="container breadcrumb"><Link href="/">Inicio</Link><Icon name="ChevronRight" size={13} />{department.name}</div>
    <section className="category-hero container"><div className="category-hero-copy"><span className="eyebrow"><Icon name="Sparkles" size={14} /> {department.eyebrow}</span><h1>{isBaby?<>Elige con <em>confianza.</em></>:<>Todo para <em>{department.name.toLowerCase()}</em></>}</h1><p>{isBaby?'Tu elección, su tranquilidad. Conoce las opciones y comienza a preparar un espacio para su llegada.':'Encuentra piezas pensadas para acompañar tu vida, con entrega nacional y compra segura.'}</p><span className="category-count">{catalog.length} productos seleccionados</span></div><div className="category-hero-image"><Image src={department.image} alt={department.name} fill sizes="(max-width: 700px) 100vw, 50vw" /></div></section>
    {isBaby&&<div className="container baby-intro"><span><Icon name="Heart" size={19}/> Pensado para sus primeros días</span><span><Icon name="Package" size={19}/> Cuatro modelos de cunas</span><span><Icon name="Info" size={19}/> Colección e imágenes académicas</span></div>}
    <section className="container subcategory-rail"><div className="subcategory-title"><span className="eyebrow">Explora dentro de {department.name}</span><span className="rail-hint"><Icon name="ArrowLeft" size={14} /> Desliza <Icon name="ArrowRight" size={14} /></span></div><div className="subcategory-scroll"><button className={subcategory === 'Todas' ? 'active' : ''} onClick={() => setSubcategory('Todas')}>Todas</button>{department.subcategories.map((item) => <button className={subcategory === item ? 'active' : ''} key={item} onClick={() => setSubcategory(item)}>{item}</button>)}</div></section>
    <section className="container category-listing"><div className="listing-toolbar"><div><span className="eyebrow">Catálogo PYCCA</span><h2>{subcategory === 'Todas' ? department.name : subcategory}</h2><p>{visibleProducts.length} resultados</p></div><div className="listing-actions"><div className="listing-search"><Icon name="Search" size={16} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar en esta categoría" /></div><select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Ordenar productos"><option>Recomendados</option><option>Precio menor</option><option>Precio mayor</option></select></div></div>{visibleProducts.length > 0 ? <div className="product-grid category-product-grid">{visibleProducts.map((product) => <ProductCard key={product.id} product={product} onAdd={addToCart} />)}</div> : <div className="category-empty"><Icon name="Search" size={26} /><h3>No encontramos ese producto</h3><p>Prueba con otro término o explora las subcategorías.</p></div>}</section>
    {isBaby && <BabyPlanner catalog={catalog} />}
    <section className="category-benefits"><div className="container service-grid"><div><Icon name="Truck" /><span><strong>Entrega nacional</strong><small>Recibe donde estés</small></span></div><div><Icon name="Store" /><span><strong>Retiro en tienda</strong><small>Elige tu punto cercano</small></span></div><div><Icon name="ShieldCheck" /><span><strong>Compra protegida</strong><small>Tu compra está segura</small></span></div><div><Icon name="CircleHelp" /><span><strong>Te ayudamos</strong><small>Asesoría personalizada</small></span></div></div></section>
  </main><CartDrawer open={cartOpen} lines={cart} onClose={() => setCartOpen(false)} onChangeQuantity={updateQuantity} />{notice && <div className="toast"><Icon name="Check" size={16} /> {notice}</div>}</div>;
}
