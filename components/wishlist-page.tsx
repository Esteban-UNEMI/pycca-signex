'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { products } from '@/lib/data';
import { useLocalEntity, defaultSite, keys } from '@/lib/local-repository';
import { SiteHeader } from './site-header';
import { ProductCard } from './product-card';
import { CartDrawer } from './cart-drawer';
import { useCart } from './use-cart';
import { useWishlist } from './use-wishlist';
import { useDemoTheme } from './use-demo-theme';
import { Icon } from './icon';
export function WishlistPage() {
 const [theme,setTheme]=useState<'light'|'dark'>('light');
 useEffect(()=>{const saved=localStorage.getItem('casa-viva-theme');if(saved==='light'||saved==='dark')setTheme(saved);},[]);
 const {ids,ready,error}=useWishlist(),catalog=useLocalEntity(keys.products,products).value;const {value:site}=useLocalEntity(keys.site,defaultSite);
 const {cart,cartCount,add,updateQuantity}=useCart();const [open,setOpen]=useState(false),[notice,setNotice]=useState('');useDemoTheme();
 const items=catalog.filter(p=>ids.includes(p.id));
 return <div className="wishlist-page"><SiteHeader cartCount={cartCount} onCartOpen={()=>setOpen(true)} theme={theme} onThemeToggle={()=>{const next=theme==='dark'?'light':'dark';setTheme(next);document.documentElement.dataset.theme=next;localStorage.setItem('casa-viva-theme',next);}}/><main className="container wishlist-main"><div className="wishlist-heading"><span className="eyebrow"><Icon name="Heart" size={15}/> Tu selección personal</span><h1>Mis <em>favoritos</em></h1><p>Guarda lo que te gusta y vuelve cuando quieras. {items.length} productos guardados en {site.name}.</p></div>{error&&<p role="alert" className="manage-error">{error}</p>}{!ready?<p>Cargando favoritos…</p>:items.length?<div className="product-grid">{items.map(p=><ProductCard key={p.id} product={p} onAdd={product=>{setNotice(add(product)?'Producto añadido a tu carrito':'No hay stock suficiente o no se pudo guardar.');setTimeout(()=>setNotice(''),2600);}}/>)}</div>:<section className="wishlist-empty"><Icon name="Heart" size={42}/><h2>Tu próxima selección empieza aquí</h2><p>Toca el corazón de un producto para guardarlo en esta lista.</p><Link href="/buscar" className="button button-dark">Explorar productos <Icon name="ArrowRight" size={16}/></Link></section>}</main><CartDrawer open={open} lines={cart} onClose={()=>setOpen(false)} onChangeQuantity={updateQuantity}/>{notice&&<div className="toast" role="status">{notice}</div>}</div>;
}
