'use client';
import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { ProductCard } from './product-card';
import { Icon } from './icon';
export function BabySpace({catalog,onAdd}:{catalog:Product[];onAdd:(product:Product)=>void}) {
 const cribs=catalog.filter(p=>p.department==='Bebés'&&p.category==='Cunas').slice(0,4);
 return <section className="baby-space container" id="espacio-bebes"><div className="baby-space-banner"><div className="baby-space-copy"><span className="eyebrow"><Icon name="Heart" size={15}/> Su llegada empieza con tu elección</span><h2>Elige con confianza.<br/><em>Tu elección, su tranquilidad.</em></h2><p>Un espacio especial para preparar su habitación y acompañar los primeros días: cunas, textiles, baño y paseo.</p><Link href="/bebes" className="button button-dark">Descubrir espacio bebés <Icon name="ArrowRight" size={17}/></Link><div className="baby-space-tags"><span>Cunas</span><span>Textiles</span><span>Baño</span><span>Paseo</span></div></div><div className="baby-space-image"><Image src="/baby/crib-natural-v2.webp" fill sizes="(max-width:700px) 100vw, 50vw" alt="Imagen conceptual generada con IA de una habitación cálida con cuna de madera"/></div></div><div className="section-heading baby-space-heading"><div><span className="eyebrow">Su primer espacio</span><h2>Cunas para <em>pequeños sueños</em></h2></div><Link href="/bebes" className="text-button">Ver colección bebés <Icon name="ArrowRight" size={16}/></Link></div><div className="product-grid">{cribs.map(p=><ProductCard key={p.id} product={p} onAdd={onAdd}/>)}</div><p className="baby-academic">Colección académica: imágenes conceptuales, productos y precios simulados.</p></section>;
}
