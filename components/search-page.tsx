'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { departments as seedDepartments, formatCurrency, products } from '@/lib/data';
import { CartLine, Product } from '@/lib/types';
import { CartDrawer } from './cart-drawer';
import { Icon } from './icon';
import { ProductCard } from './product-card';
import { SiteHeader } from './site-header';
import { useDemoProducts } from './use-demo-products';
import { useDemoTheme } from './use-demo-theme';
import { useCart } from './use-cart';
import { keys, useLocalEntity } from '@/lib/local-repository';

export function SearchPage({ initialQuery }: { initialQuery: string }) {
  const catalog = useDemoProducts(products);
  const departments = useLocalEntity(keys.departments, seedDepartments).value;
  useDemoTheme();
  const [query, setQuery] = useState(initialQuery);
  useEffect(() => {
    const refresh = () => setQuery(new URLSearchParams(window.location.search).get('q') ?? '');
    refresh(); window.addEventListener('popstate', refresh);
    return () => window.removeEventListener('popstate', refresh);
  }, []);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [cartOpen, setCartOpen] = useState(false);
  const { cart, cartCount, add, updateQuantity } = useCart();
  const [department, setDepartment] = useState('Todos');
  const [sort, setSort] = useState('Relevancia');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('casa-viva-theme') as 'light' | 'dark' | null;
    if (savedTheme) setTheme(savedTheme);
  }, []);
  useEffect(() => { document.documentElement.dataset.theme = theme; window.localStorage.setItem('casa-viva-theme', theme); }, [theme]);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const filtered = catalog.filter((product) => {
      const matchesQuery = !normalized || [product.name, product.department, product.category, product.description, product.seller].join(' ').toLowerCase().includes(normalized);
      return matchesQuery && (department === 'Todos' || product.department === department);
    });
    return [...filtered].sort((a, b) => sort === 'Precio menor' ? a.price - b.price : sort === 'Precio mayor' ? b.price - a.price : Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
  }, [catalog, department, query, sort]);

  const addToCart = (product:Product) => { setNotice(add(product) ? product.name+' se añadió a tu carrito' : 'No hay stock suficiente o no se pudo guardar el carrito.'); setTimeout(() => setNotice(''),2600); };
  return <div className="search-page"><SiteHeader cartCount={cartCount} onCartOpen={() => setCartOpen(true)} theme={theme} onThemeToggle={() => setTheme(theme === 'light' ? 'dark' : 'light')} /><main className="container search-results-page">
    <div className="breadcrumb"><Link href="/">Inicio</Link><Icon name="ChevronRight" size={13} />Búsqueda</div>
    <section className="search-heading"><div><span className="eyebrow"><Icon name="Search" size={14} /> Explora el catálogo</span><h1>{query ? <>Resultados para <em>“{query}”</em></> : <>¿Qué quieres <em>encontrar?</em></>}</h1><p>{results.length} productos disponibles en PYCCA.</p></div><div className="search-inline"><Icon name="Search" size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar por nombre, categoría o marca" aria-label="Buscar en catálogo" /></div></section>
    <section className="search-toolbar"><div className="search-filters"><button className={department === 'Todos' ? 'active' : ''} onClick={() => setDepartment('Todos')}>Todos</button>{departments.slice(0, 7).map((item) => <button key={item.name} className={department === item.name ? 'active' : ''} onClick={() => setDepartment(item.name)}>{item.name}</button>)}</div><select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Ordenar resultados"><option>Relevancia</option><option>Precio menor</option><option>Precio mayor</option></select></section>
    {results.length ? <div className="product-grid search-product-grid">{results.map((product) => <ProductCard key={product.id} product={product} onAdd={addToCart} />)}</div> : <div className="category-empty"><Icon name="SearchX" size={28} /><h3>No encontramos resultados</h3><p>Prueba con otra palabra, una categoría diferente o revisa la ortografía.</p><Link className="button button-outline" href="/">Volver a explorar</Link></div>}
  </main><CartDrawer open={cartOpen} lines={cart} onClose={() => setCartOpen(false)} onChangeQuantity={updateQuantity} />{notice && <div className="toast"><Icon name="Check" size={16} /> {notice}</div>}</div>;
}
