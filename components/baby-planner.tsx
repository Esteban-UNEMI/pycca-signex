'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { Product } from '@/lib/types';
import { formatCurrency } from '@/lib/data';

const steps = ['Medir la habitación y el lugar de la cuna', 'Comparar modelos y definir el presupuesto', 'Confirmar medidas, materiales y manual del fabricante', 'Comprobar compatibilidad del colchón y la sábana', 'Revisar montaje, garantía y condiciones de entrega'];

export function BabyPlanner({ catalog }: { catalog: Product[] }) {
  const cribs = catalog.filter(p => p.category === 'Cunas');
  const [selected, setSelected] = useState<string[]>([]);
  const [checked, setChecked] = useState<number[]>([]);
  const [storageNotice, setStorageNotice] = useState('');
  useEffect(() => { try { const saved = JSON.parse(localStorage.getItem('pycca-baby-plan') || '[]'); if (Array.isArray(saved)) setChecked(saved.filter(n => Number.isInteger(n) && n >= 0 && n < steps.length)); } catch { /* Start an empty plan if storage is unavailable. */ } }, []);
  const toggleStep = (index: number) => { const next = checked.includes(index) ? checked.filter(n => n !== index) : [...checked, index]; setChecked(next); try { localStorage.setItem('pycca-baby-plan', JSON.stringify(next)); setStorageNotice(''); } catch { setStorageNotice('Tu avance se conserva durante esta visita; no se pudo guardar en el navegador.'); } };
  const compared = cribs.filter(p => selected.includes(p.id));
  return <div className="container baby-planner">
    <section className="baby-story"><span className="eyebrow">Una nueva etapa, paso a paso</span><h2>Preparar su espacio es comenzar<br />a darle la bienvenida.</h2><div className="baby-story-grid"><article><span>01 · Imagina</span><h3>Su llegada empieza con tu elección.</h3><p>Piensa en el espacio que tienes y en cómo quieres organizarlo.</p></article><article><span>02 · Conoce</span><h3>Prepara un espacio para su llegada.</h3><p>Consulta las características de cada cuna y compara antes de decidir.</p></article><article><span>03 · Elige</span><h3>Tu elección, su tranquilidad.</h3><p>Guarda tus favoritos y comparte las opciones con quien prepara esta etapa contigo.</p></article></div></section>
    <section id="comparar-cunas" className="baby-comparison"><span className="eyebrow">Conoce antes de elegir</span><h2>Encuentra tu próxima cuna</h2><p>Selecciona hasta tres modelos para comparar sus precios y disponibilidad en esta simulación.</p><div className="baby-compare-options">{cribs.map(p => <label key={p.id}><input type="checkbox" checked={selected.includes(p.id)} disabled={!selected.includes(p.id) && selected.length >= 3} onChange={() => setSelected(selected.includes(p.id) ? selected.filter(id => id !== p.id) : [...selected, p.id])} />{p.name}</label>)}</div>{compared.length > 0 ? <div className="baby-compare-grid">{compared.map(p => <article key={p.id}><div className="baby-compare-photo"><Image src={p.image} alt={p.name} fill sizes="(max-width:700px) 90vw, 30vw" /></div><h3>{p.name}</h3><dl><div><dt>Precio simulado</dt><dd>{formatCurrency(p.price)}</dd></div><div><dt>Stock de demostración</dt><dd>{p.stock} unidades</dd></div><div><dt>Medidas y garantía</dt><dd>Por confirmar con ficha real</dd></div></dl><Link href={`/producto/${p.id}`} className="text-button">Ver modelo →</Link></article>)}</div> : <p className="baby-compare-empty">Empieza marcando los modelos que te interesan.</p>}</section>
    <section className="baby-checklist"><div><span className="eyebrow">Mi plan de bienvenida</span><h2>Un espacio pensado<br />con tiempo y cariño.</h2><p>Organiza lo que necesitas revisar antes de elegir. Tu avance se guarda en este navegador.</p><p role="status">{checked.length} de {steps.length} pasos revisados</p><progress value={checked.length} max={steps.length} aria-label="Avance del plan de bienvenida" />{storageNotice && <p role="status">{storageNotice}</p>}</div><div>{steps.map((step, i) => <label key={step}><input type="checkbox" checked={checked.includes(i)} onChange={() => toggleStep(i)} /><span>{step}</span></label>)}</div></section>
    <p className="baby-academic">Proyecto universitario con propósitos académicos · SIGNEX. Imágenes conceptuales generadas con IA; modelos, precios y stock simulados. Las imágenes no acreditan características ni certificaciones de productos reales.</p>
  </div>;
}
