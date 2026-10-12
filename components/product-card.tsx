'use client';

import Image from 'next/image';
import Link from 'next/link';
import { formatCurrency } from '@/lib/data';
import { Product } from '@/lib/types';
import { Icon } from './icon';
import { useWishlist } from './use-wishlist';

type ProductCardProps = { product: Product; onAdd: (product: Product) => void; };

export function ProductCard({ product, onAdd }: ProductCardProps) {
  const { ids,toggle,ready } = useWishlist();
  const saved = ids.includes(product.id);
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        {product.badge && <span className={`product-badge ${product.badge.startsWith('-') || product.badge === 'Oferta' ? 'discount-badge' : ''}`}>{product.badge}</span>}
        <button className="favorite-button" aria-label={`${saved?'Quitar':'Añadir'} ${product.name} ${saved?'de':'a'} favoritos`} aria-pressed={saved} disabled={!ready} onClick={()=>toggle(product.id)}><Icon name="Heart" size={18} fill={saved?'currentColor':'none'} /></button>
        <Link href={`/producto/${product.id}`} aria-label={`Ver ${product.name}`}><Image className="product-image" src={product.image} alt={product.name} fill sizes="(max-width: 700px) 50vw, 25vw" /></Link>
        <button className="quick-add" disabled={product.stock <= 0} onClick={() => onAdd(product)}><Icon name="ShoppingBag" size={16} /> {product.stock <= 0 ? 'Agotado' : 'Añadir'}</button>
      </div>
      <div className="product-info">
        <p className="product-category">{product.category}</p>
        <h3><Link href={`/producto/${product.id}`}>{product.name}</Link></h3>
        <div className="product-rating">{product.reviews > 0 ? <><span><Icon name="Star" size={13} fill="currentColor" /> {product.rating}</span><small>({product.reviews})</small></> : <small>Sin reseñas todavía</small>}</div>
        <div className="price-row"><strong>{formatCurrency(product.price)}</strong>{product.compareAt && <del>{formatCurrency(product.compareAt)}</del>}</div>
      </div>
    </article>
  );
}
