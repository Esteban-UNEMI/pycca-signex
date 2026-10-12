'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { products, formatCurrency } from '@/lib/data';
import { useWishlist } from './use-wishlist';
import { departments } from '@/lib/data';
import { defaultSite, keys, useLocalEntity } from '@/lib/local-repository';
import { Icon } from './icon';

type SiteHeaderProps = {
  cartCount: number;
  onCartOpen: () => void;
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
};

export function SiteHeader({ cartCount, onCartOpen, theme, onThemeToggle }: SiteHeaderProps) {
  const [search, setSearch] = useState('');
  const router = useRouter();
  const pathname = usePathname();
  const { ids: wishlist } = useWishlist();
  const catalog = useLocalEntity(keys.products,products).value;
  const [searchFocused,setSearchFocused] = useState(false);
  const suggestions = search.trim().length >= 2 ? catalog.filter(p => `${p.name} ${p.department}`.toLowerCase().includes(search.trim().toLowerCase())).slice(0,5) : [];
  const { value: site } = useLocalEntity(keys.site, defaultSite);
  const navItems = useLocalEntity(keys.departments, departments).value.map(d => ({ slug:d.slug, label:d.name }));

  const [categoriesOpen, setCategoriesOpen] = useState(false);

  const submitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = search.trim();
    setSearchFocused(false);
    if (query) router.push(`/buscar?q=${encodeURIComponent(query)}`);
  };

  return (
    <>
      <div className="announcement">
        <div className="container announcement-inner">
          <span><Icon name="Truck" size={15} /> Envíos a todo Ecuador</span>
          <span className="announcement-center">Proyecto universitario · Simulación académica</span>
          <span className="announcement-link">Disfruta la vida <Icon name="ArrowRight" size={14} /></span>
        </div>
      </div>
      <header className="site-header">
        <div className="container header-main">
          <button className="icon-button mobile-menu" onClick={() => setCategoriesOpen((open) => !open)} aria-label={categoriesOpen ? "Cerrar menú" : "Abrir menú"} aria-controls="category-mega-menu" aria-expanded={categoriesOpen}><Icon name={categoriesOpen ? "X" : "Menu"} /></button>
          <Link href="/" className="brand" aria-label={`${site.name} inicio`}>
            <img className="pycca-logo" src={site.logo} alt={site.name} width="150" height="48" />
          </Link>
          <div className="header-search" onBlur={event=>{if(!event.currentTarget.contains(event.relatedTarget as Node))setSearchFocused(false);}}><form className="search-box" onSubmit={submitSearch} role="search">
            <Icon name="Search" size={19} />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="¿Qué estás buscando hoy?" aria-label="Buscar productos" onFocus={()=>setSearchFocused(true)} aria-controls={searchFocused&&search.trim().length>=2?"search-suggestions":undefined} onKeyDown={event=>{if(event.key==='Escape')setSearchFocused(false);}} />
            <button type="submit">Buscar</button>
          </form>
          {searchFocused&&search.trim().length>=2&&<div id="search-suggestions" className="search-suggestions" onPointerDown={event=>event.preventDefault()} aria-label="Sugerencias de productos">{suggestions.length?suggestions.map(p=><Link key={p.id} href={'/producto/'+p.id} onClick={()=>setSearchFocused(false)}><img src={p.image} alt=""/><span><strong>{p.name}</strong><small>{p.department} · {formatCurrency(p.price)}</small></span><Icon name="ArrowUpRight" size={15}/></Link>):<p>No encontramos coincidencias. Prueba otro nombre.</p>}<Link className="all-results" href={'/buscar?q='+encodeURIComponent(search.trim())} onClick={()=>setSearchFocused(false)}>Ver todos los resultados <Icon name="ArrowRight" size={15}/></Link></div>}</div>
          <div className="header-actions">
            <button className="icon-button theme-toggle" onClick={onThemeToggle} aria-label="Cambiar tema">
              <Icon name={theme === 'light' ? 'Moon' : 'SunMedium'} size={19} />
            </button>
            <Link href="/favoritos" className="header-wishlist" aria-label="Mis favoritos"><Icon name="Heart" size={20}/>{wishlist.length>0&&<span>{wishlist.length}</span>}</Link>
            <Link href="/cuenta" className="account-action" aria-label="Mi cuenta"><span className="action-icon"><Icon name="Users" size={19} /></span><span>Mi cuenta</span></Link>
            <button className="bag-action" onClick={onCartOpen} aria-label="Abrir carrito"><span className="action-icon"><Icon name="ShoppingBag" size={20} /></span><span className="bag-count">{cartCount}</span></button>
          </div>
        </div>
        <nav className="category-nav" aria-label="Categorías principales">
          <div className="container category-nav-inner">
            <button className="category-menu" onClick={() => setCategoriesOpen((open) => !open)} aria-expanded={categoriesOpen} aria-controls="category-mega-menu"><Icon name="Menu" size={18} /> Departamentos <Icon name="ChevronDown" size={16} /></button>
            {navItems.map((item) => <Link key={item.slug} href={`/categoria/${item.slug}`}>{item.label}</Link>)}
            <Link href="/admin" className="admin-link"><Icon name="Settings2" size={15} /> Panel demo</Link>
          </div>
        </nav>
        {categoriesOpen && <div id="category-mega-menu" className="category-mega-menu"><div className="container category-mega-grid"><div className="category-mega-intro"><span className="eyebrow">Compra por categoría</span><h2>Todo lo que hace<br /><em>vivir mejor.</em></h2><p>Explora departamentos, encuentra inspiración y compra en pocos pasos.</p><Link href="/buscar?q=" className="text-button" onClick={() => setCategoriesOpen(false)}>Ver todo <Icon name="ArrowRight" size={16} /></Link></div><div className="category-mega-links">{navItems.map((item) => <Link key={item.slug} href={`/categoria/${item.slug}`} onClick={() => setCategoriesOpen(false)}><span>{item.label}</span><Icon name="ArrowUpRight" size={15} /></Link>)}</div><Link href="/admin" className="mega-admin" onClick={()=>setCategoriesOpen(false)}><Icon name="Settings2" size={16}/> Administrar tienda</Link></div></div>}
      </header>
      <nav className="mobile-bottom-nav" aria-label="Navegación móvil"><Link href="/" aria-current={pathname==='/'?'page':undefined}><Icon name="Store" size={21}/><span>Inicio</span></Link><Link href="/buscar" aria-current={pathname==='/buscar'?'page':undefined}><Icon name="Search" size={21}/><span>Buscar</span></Link><Link href="/favoritos" aria-current={pathname==='/favoritos'?'page':undefined}><Icon name="Heart" size={21}/><span>Favoritos</span></Link><Link href="/cuenta"><Icon name="Users" size={21}/><span>Cuenta</span></Link><button onClick={onCartOpen} aria-label="Abrir carrito móvil"><span className="mobile-bag"><Icon name="ShoppingBag" size={21}/>{cartCount>0&&<b>{cartCount}</b>}</span><span>Carrito</span></button></nav>
    </>
  );
}
