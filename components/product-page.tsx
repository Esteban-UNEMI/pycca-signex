'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { formatCurrency, getDepartmentByName } from '@/lib/data';
import { CartLine, Product } from '@/lib/types';
import { CartDrawer } from './cart-drawer';
import { Icon } from './icon';
import { SiteHeader } from './site-header';
import { useDemoProducts } from './use-demo-products';
import { useDemoTheme } from './use-demo-theme';
import { useCart } from './use-cart';
import { useWishlist } from './use-wishlist';
import { departments } from '@/lib/data';
import { keys, useLocalEntity } from '@/lib/local-repository';

export function ProductPage({ product, productId }: { product: Product; productId?: string }) {
  const {ids,toggle,ready:wishlistReady}=useWishlist();
  const catalog = useDemoProducts([product]);
  const categoryStore = useLocalEntity(keys.departments, departments);
  const loaded = useLocalEntity(keys.products, [product]).ready;
  const displayProduct = catalog.find((item) => item.id === (productId ?? product.id)) ?? product;
  useDemoTheme();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [cartOpen, setCartOpen] = useState(false);
  const { cart, cartCount, add, updateQuantity } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [notice, setNotice] = useState('');
  useEffect(() => { const savedTheme = window.localStorage.getItem('casa-viva-theme') as 'light' | 'dark' | null; if (savedTheme) setTheme(savedTheme); }, []);
  useEffect(() => { document.documentElement.dataset.theme = theme; window.localStorage.setItem('casa-viva-theme', theme); }, [theme]);
  const addToCart = () => { setNotice(add(displayProduct,quantity) ? 'Producto añadido a tu carrito' : 'No hay stock suficiente o no se pudo guardar el carrito.'); setTimeout(() => setNotice(''),2600); };
  const departmentSlug = categoryStore.value.find(d => d.name === displayProduct.department)?.slug ?? displayProduct.department.toLowerCase().replaceAll(' ', '-');
  if (loaded && !catalog.some(p => p.id === (productId ?? product.id))) return <main className="container manage-empty"><h1>Producto no disponible</h1><Link href="/">Volver a la tienda</Link></main>;
  return <div className="product-page"><SiteHeader cartCount={cartCount} onCartOpen={() => setCartOpen(true)} theme={theme} onThemeToggle={() => setTheme(theme === 'light' ? 'dark' : 'light')} /><main className="container"><div className="breadcrumb"><Link href="/">Inicio</Link><Icon name="ChevronRight" size={13} /><Link href={`/categoria/${departmentSlug}`}>{displayProduct.department}</Link><Icon name="ChevronRight" size={13} />{displayProduct.name}</div><section className="product-detail"><div className="product-detail-image"><Image src={displayProduct.image} alt={displayProduct.name} fill sizes="(max-width: 700px) 100vw, 55vw" /><button className="favorite-button" disabled={!wishlistReady} aria-pressed={ids.includes(displayProduct.id)} aria-label={`${ids.includes(displayProduct.id)?'Quitar de':'Añadir a'} favoritos`} onClick={()=>toggle(displayProduct.id)}><Icon name="Heart" size={19} fill={ids.includes(displayProduct.id)?'currentColor':'none'} /></button>{displayProduct.badge && <span className="product-badge">{displayProduct.badge}</span>}</div><div className="product-detail-copy"><span className="eyebrow">{displayProduct.department} · {displayProduct.category}</span><h1>{displayProduct.name}</h1><div className="product-detail-rating"><span>{displayProduct.reviews > 0 ? <><Icon name="Star" size={14} fill="currentColor" /> {displayProduct.rating} · {displayProduct.reviews} reseñas</> : 'Sin reseñas todavía'}</span><span className="seller-label">Vendido por <strong>{displayProduct.seller}</strong></span></div><p className="product-description">{displayProduct.description}</p><div className="product-detail-price"><strong>{formatCurrency(displayProduct.price)}</strong>{displayProduct.compareAt && <del>{formatCurrency(displayProduct.compareAt)}</del>}<span>{displayProduct.department === 'Bebés' ? 'Precio simulado · Imagen conceptual de IA' : 'Hasta 6 cuotas disponibles'}</span></div><div className="stock-note"><Icon name="Check" size={15} /> En stock · {displayProduct.stock} unidades disponibles</div><div className="buy-row"><div className="detail-quantity"><button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button><span>{quantity}</span><button disabled={quantity >= displayProduct.stock} onClick={() => setQuantity(Math.min(displayProduct.stock, quantity + 1))}>+</button></div><button className="button button-primary" disabled={displayProduct.stock <= 0} onClick={addToCart}>{displayProduct.stock <= 0 ? 'Agotado' : 'Añadir al carrito'} <Icon name="ShoppingBag" size={17} /></button></div><div className="detail-benefits"><span><Icon name="Truck" size={17} /><strong>Envío nacional</strong><small>Calcula al pagar</small></span><span><Icon name="Store" size={17} /><strong>Retiro en tienda</strong><small>Disponible en 24 h</small></span><span><Icon name="ShieldCheck" size={17} /><strong>Compra segura</strong><small>Protección garantizada</small></span></div></div></section></main><CartDrawer open={cartOpen} lines={cart} onClose={() => setCartOpen(false)} onChangeQuantity={updateQuantity} />{notice && <div className="toast"><Icon name="Check" size={16} /> {notice}</div>}</div>;
}
