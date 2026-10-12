'use client';
import { useEffect, useState, useCallback } from 'react';
import { babyDepartment, babyProducts } from './baby-collection';
import type { Department, DemoOrder, Product, ThemeSettings } from './types';
export type Customer = { id: string; name: string; email: string; phone: string; city: string; notes: string };
export type Staff = { id: string; name: string; email: string; role: string; active: boolean };
export type StockMovement = { id: string; productId: string; productName: string; before: number; after: number; reason: string; createdAt: string };
export type SiteSettings = { name: string; logo: string; heroTitle: string; heroAccent: string; heroDescription: string; heroImage: string; shippingThreshold: number; shippingFee: number; contactEmail: string };
export const defaultTheme: ThemeSettings = { brand: '#00539f', accent: '#e73137', surface: '#f5f6f8', radius: 'soft', density: 'comfortable' };
export const defaultSite: SiteSettings = { name: 'PYCCA', logo: '/brand/pycca-logo.svg', heroTitle: 'Todo para tu hogar.', heroAccent: 'Todo para ti.', heroDescription: 'Hogar, muebles, tecnología y mucho más. Encuentra tus favoritos y dale un nuevo aire a cada espacio.', heroImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1300&q=90', shippingThreshold: 50, shippingFee: 4.99, contactEmail: 'proyecto@example.com' };
export const keys = { products:'casa-viva-products', departments:'pycca-departments', customers:'pycca-customers', staff:'pycca-staff', orders:'casa-viva-orders', movements:'pycca-stock-movements', theme:'casa-viva-admin-theme', site:'pycca-site-settings' } as const;
export type LocalEntities = { products: Product[]; departments: Department[]; customers: Customer[]; staff: Staff[]; orders: DemoOrder[]; movements: StockMovement[]; theme: ThemeSettings; site: SiteSettings };
/** Browser-only demo repository. Replace with authenticated Supabase queries later. */
export const localRepository = {
  read<T>(key: string, fallback: T): T {
    try { const raw = localStorage.getItem(key); if (raw === null) return fallback; const value = JSON.parse(raw); if (Array.isArray(fallback) ? !Array.isArray(value) : !value || typeof value !== 'object' || Array.isArray(value)) return fallback; return Array.isArray(fallback) ? value : { ...fallback, ...value }; } catch { return fallback; }
  },
  write<T>(key: string, value: T) { localStorage.setItem(key, JSON.stringify(value)); window.dispatchEvent(new CustomEvent('pycca-data-change', { detail: key })); },
};
export function useLocalEntity<T>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(fallback); const [ready, setReady] = useState(false); const [error, setError] = useState('');
  useEffect(() => {
    ensureBabyCollection();
    ensureBabyImages();
    const refresh = () => { setValue(localRepository.read(key, fallback)); setReady(true); }; refresh();
    const changed = (event: Event) => { if (!(event instanceof CustomEvent) || event.detail === key) refresh(); };
    const stored = (event: StorageEvent) => { if (!event.key || event.key === key) refresh(); };
    window.addEventListener('pycca-data-change', changed); window.addEventListener('storage', stored);
    return () => { window.removeEventListener('pycca-data-change', changed); window.removeEventListener('storage', stored); };
  // Seeds are initial fallbacks; the key controls repository subscriptions.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  const save = useCallback((next: T) => { try { localRepository.write(key, next); setValue(next); setError(''); return true; } catch { setError('No se pudo guardar. Revisa el espacio disponible o los permisos del navegador.'); return false; } }, [key]);
  return { value, save, ready, error };
}
export function validImage(value: string) { try { if (value.startsWith('/') && !value.startsWith('//')) return true; return ['https:', 'http:'].includes(new URL(value).protocol); } catch { return false; } }
export function downloadJson(name: string, data: unknown) { const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type:'application/json' })); const link = document.createElement('a'); link.href = url; link.download = name; link.click(); URL.revokeObjectURL(url); }
/** Commit related local entities together; rollback if browser storage rejects a write. */
export function commitLocal(changes: Record<string, unknown>) {
  const previous = Object.fromEntries(Object.keys(changes).map(key => [key, localStorage.getItem(key)]));
  try { for (const [key,value] of Object.entries(changes)) localStorage.setItem(key, JSON.stringify(value)); }
  catch (error) { for (const [key,value] of Object.entries(previous)) { if(value===null) localStorage.removeItem(key); else localStorage.setItem(key,value); } throw error; }
  for (const key of Object.keys(changes)) window.dispatchEvent(new CustomEvent('pycca-data-change',{ detail:key }));
}

/** Add the new academic collection once without replacing an edited local catalog. */
function ensureBabyCollection() {
 const marker='pycca-baby-collection-v1';
 try {
  if(localStorage.getItem(marker))return;
  const changes:Record<string,unknown>={[marker]:true};
  const savedProducts=localStorage.getItem(keys.products),savedDepartments=localStorage.getItem(keys.departments);
  if(savedProducts){const list=JSON.parse(savedProducts);if(Array.isArray(list))changes[keys.products]=[...list,...babyProducts.filter(p=>!list.some(item=>item.id===p.id))];}
  if(savedDepartments){const list=JSON.parse(savedDepartments);if(Array.isArray(list)&&!list.some(item=>item.slug==='bebes'))changes[keys.departments]=[babyDepartment,...list];}
  commitLocal(changes);
 }catch { /* Keep existing data when storage is unavailable or malformed. */ }
}

/** Upgrade only our original illustrations; keep administrator image changes. */
function ensureBabyImages() {
 const marker='pycca-baby-images-v2';
 try {
  if(localStorage.getItem(marker)) return;
  const changes:Record<string,unknown>={[marker]:true};
  const raw=localStorage.getItem(keys.products);
  if(raw){const list=JSON.parse(raw);if(Array.isArray(list)) changes[keys.products]=list.map((p:Product)=>{const seed=babyProducts.find(item=>item.id===p.id);const original=seed?.image.replace('-v2.webp','.svg');return seed && p.image===original ? {...p,image:seed.image}:p;});}
  const rawDepartments=localStorage.getItem(keys.departments);
  if(rawDepartments){const list=JSON.parse(rawDepartments);if(Array.isArray(list))changes[keys.departments]=list.map((d:Department)=>d.slug==='bebes'?{...d,image:d.image==='/baby/nursery.svg'?babyDepartment.image:d.image,eyebrow:d.eyebrow==='Pequeños comienzos, grandes momentos'?babyDepartment.eyebrow:d.eyebrow}:d);}
  commitLocal(changes);
 } catch { /* Preserve current catalog on storage failure. */ }
}
