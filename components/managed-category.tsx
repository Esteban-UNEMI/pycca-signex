'use client';
import Link from 'next/link';
import { departments, products } from '@/lib/data';
import { keys, useLocalEntity } from '@/lib/local-repository';
import { CategoryPage } from './category-page';
export function ManagedCategory({ slug }: { slug:string }) {
  const { value, ready } = useLocalEntity(keys.departments, departments);
  const department = value.find(d => d.slug === slug);
  if (!ready) return <main className="manage-loading">Cargando categoría…</main>;
  if (!department) return <main className="container manage-empty"><h1>Categoría no disponible</h1><Link href="/">Volver a la tienda</Link></main>;
  return <CategoryPage key={department.id} department={department} products={products} />;
}
