'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Icon } from '@/components/icon';
import { withBasePath } from '@/lib/site-path';

type PieceKind = 'post' | 'ad' | 'carousel' | 'story';
type Piece = { file: string; kind: PieceKind; group: string; title: string; objective: string; note: string; interaction?: string };

const pieces: Piece[] = [
  { file: '01-post-la-espera', kind: 'post', group: 'Publicación', title: 'La espera se llena de ideas', objective: 'Presentar la preparación como un momento compartido y emocional.', note: 'La invitación dirige a explorar la categoría Bebé.' },
  { file: '02-post-primer-rincon', kind: 'post', group: 'Publicación', title: 'Un primer rincón a tu manera', objective: 'Conectar la categoría con la posibilidad de crear un espacio propio.', note: 'Detalles de preparación y una invitación breve para conocer la categoría.' },
  { file: '03-publicidad-espacio', kind: 'ad', group: 'Anuncio conceptual', title: 'Su espacio empieza con una idea', objective: 'Introducir la cuna dentro del contexto de la habitación.', note: 'La composición combina espacio, mensaje emocional y llamado a ver la categoría.' },
  { file: '04-post-detalles', kind: 'post', group: 'Publicación', title: 'Colores, texturas, pequeñas ideas', objective: 'Invitar a pensar en el ambiente y sus elementos visuales.', note: 'La preparación del espacio sigue siendo el tema central.' },
  { file: '05-publicidad-imagina', kind: 'ad', group: 'Anuncio conceptual', title: 'Lo que viene se prepara juntos', objective: 'Asociar la decisión con apoyo y conversación en familia.', note: 'Una escena compartida conduce a explorar Bebé.' },
  { file: '06-post-eleccion', kind: 'post', group: 'Publicación', title: 'Tu elección, su primer rincón', objective: 'Cerrar las publicaciones con el concepto “Elige con confianza”.', note: 'Une la decisión con la preparación del hogar.' },
  { file: '07-carrusel-guia-portada', kind: 'carousel', group: 'Carrusel 1 · Guía para imaginar', title: 'Primero, imagina el espacio', objective: 'Abrir una secuencia para ordenar la decisión.', note: 'La guía recorre espacio, estilo y exploración de opciones.' },
  { file: '08-carrusel-guia-lugar', kind: 'carousel', group: 'Carrusel 1 · Guía para imaginar', title: '¿Dónde irá?', objective: 'Llevar la atención a la habitación disponible.', note: 'Considera el contexto del hogar antes de revisar alternativas.' },
  { file: '09-carrusel-guia-estilo', kind: 'carousel', group: 'Carrusel 1 · Guía para imaginar', title: '¿Qué te hace sentir en casa?', objective: 'Proponer un criterio personal para definir el ambiente.', note: 'Los colores y detalles son una decisión visual, no un atributo técnico del producto.' },
  { file: '10-carrusel-guia-explorar', kind: 'carousel', group: 'Carrusel 1 · Guía para imaginar', title: 'Conoce tus opciones', objective: 'Invitar a comparar la oferta con atención.', note: 'La información técnica debe revisarse en la ficha vigente del producto.' },
  { file: '11-carrusel-ambiente-portada', kind: 'carousel', group: 'Carrusel 2 · Ideas para su habitación', title: 'Una habitación empieza con una idea', objective: 'Abrir una secuencia de inspiración para ambientar el espacio.', note: 'Presenta la habitación como conjunto y prepara los temas de luz, color y estilo.' },
  { file: '12-carrusel-ambiente-luz', kind: 'carousel', group: 'Carrusel 2 · Ideas para su habitación', title: 'Deja que entre la luz', objective: 'Destacar el efecto visual de la luz natural.', note: 'Una pauta de composición adaptable al espacio disponible.' },
  { file: '13-carrusel-ambiente-color', kind: 'carousel', group: 'Carrusel 2 · Ideas para su habitación', title: 'Neutros, suaves o con color', objective: 'Mostrar opciones de paleta sin imponer un estilo único.', note: 'Combina tonos y acentos de la campaña cálida y salvia.' },
  { file: '14-carrusel-ambiente-cierre', kind: 'carousel', group: 'Carrusel 2 · Ideas para su habitación', title: 'Tu estilo, su primer rincón', objective: 'Cerrar la secuencia con una invitación a explorar la categoría.', note: 'Conecta la inspiración con el siguiente paso de navegación.' },
  { file: '15-historia-pregunta', kind: 'story', group: 'Historia · Pregunta', title: '¿Qué te emociona más de preparar su espacio?', objective: 'Abrir una conversación sobre la nueva etapa.', note: 'Propuesta de caja de preguntas; al publicar se debe insertar el sticker nativo.', interaction: 'Sticker de pregunta pendiente de activar en la plataforma.' },
  { file: '16-historia-encuesta-paleta', kind: 'story', group: 'Historia · Encuesta', title: '¿Qué paleta elegirías?', objective: 'Invitar a elegir entre dos direcciones visuales.', note: 'Contrasta tonos naturales y acentos de color.', interaction: 'Sticker de encuesta pendiente de activar en la plataforma.' },
  { file: '17-historia-slider', kind: 'story', group: 'Historia · Slider', title: '¿Cuánto has imaginado su habitación?', objective: 'Invitar a reaccionar de forma sencilla a la propuesta visual.', note: 'Una respuesta de bajo esfuerzo para iniciar la conversación.', interaction: 'Slider de emoji pendiente de activar en la plataforma.' },
  { file: '18-historia-caja-preguntas', kind: 'story', group: 'Historia · Pregunta', title: '¿Qué quieres saber antes de elegir?', objective: 'Identificar dudas para orientar contenido posterior.', note: 'Las respuestas no sustituyen la ficha oficial del producto.', interaction: 'Sticker de pregunta pendiente de activar en la plataforma.' },
  { file: '19-historia-cta', kind: 'story', group: 'Historia · CTA', title: 'Empieza por su espacio', objective: 'Llevar desde la inspiración hacia la categoría Bebé.', note: 'El enlace de destino es un mockup académico.', interaction: 'Enlace pendiente de activar en la plataforma.' },
  { file: '20-historia-cierre', kind: 'story', group: 'Historia · Cierre', title: 'Preparar su espacio es comenzar a darle la bienvenida', objective: 'Cerrar el recorrido con el mensaje emocional de la campaña.', note: 'La frase narrativa refuerza el concepto “Elige con confianza”.' },
];

const filters: Array<{ id: 'all' | PieceKind; label: string }> = [
  { id: 'all', label: 'Todas' }, { id: 'post', label: 'Publicaciones' }, { id: 'ad', label: 'Anuncios' },
  { id: 'carousel', label: 'Carruseles' }, { id: 'story', label: 'Historias' },
];

const imageUrl = (file: string) => withBasePath(`/signex/campaign/${file}.jpg`);
const imageHeight = (piece: Piece) => piece.kind === 'story' ? 960 : 675;

export function SignexCampaignGallery() {
  const [filter, setFilter] = useState<(typeof filters)[number]['id']>('all');
  const [active, setActive] = useState<Piece | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const shownPieces = useMemo(() => filter === 'all' ? pieces : pieces.filter((piece) => piece.kind === filter), [filter]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (active && !dialog.open) dialog.showModal();
    if (!active && dialog.open) dialog.close();
  }, [active]);

  return (
    <section className="signex-gallery-section" id="piezas">
      <div className="container">
        <div className="signex-section-label"><span>06 / CAMPAÑA DIGITAL</span><i /></div>
        <div className="signex-gallery-heading">
          <div><span className="signex-kicker">20 PIEZAS · 3 FORMATOS</span><h2>Una idea que vive<br /><em>en distintos formatos.</em></h2></div>
          <p>Publicaciones, carruseles e historias diseñados para acompañar la exploración del espacio del bebé y la consideración de opciones.</p>
        </div>
        <div className="signex-gallery-filters" aria-label="Filtrar piezas por formato">
          {filters.map((item) => {
            const count = item.id === 'all' ? pieces.length : pieces.filter((piece) => piece.kind === item.id).length;
            return <button aria-pressed={filter === item.id} className={filter === item.id ? 'active' : ''} key={item.id} onClick={() => setFilter(item.id)}>{item.label}<span>{count}</span></button>;
          })}
        </div>
        {filter === 'all' && <div className="signex-gallery-groups"><span>6 publicaciones y anuncios</span><i /><span>2 carruseles · 8 láminas</span><i /><span>6 historias</span></div>}
        <div className="signex-gallery-grid" aria-live="polite">
          {shownPieces.map((piece) => (
            <article className="signex-gallery-card" data-format={piece.kind} key={piece.file}>
              <button className="signex-gallery-open" onClick={() => setActive(piece)} aria-label={`Ver pieza: ${piece.title}`}>
                <span className="signex-gallery-image">
                  <Image src={imageUrl(piece.file)} alt={`Pieza académica: ${piece.title}`} width={540} height={imageHeight(piece)} sizes="(max-width: 520px) 46vw, (max-width: 900px) 30vw, 23vw" unoptimized loading="lazy" />
                  <span className="signex-gallery-zoom"><Icon name="Plus" size={18} /></span>
                </span>
                <span className="signex-gallery-card-copy"><small>{piece.group}</small><strong>{piece.title}</strong><span>Ver objetivo y pieza <Icon name="ArrowRight" size={14} /></span></span>
              </button>
            </article>
          ))}
        </div>
        <p className="signex-gallery-note">Propuesta académica, no publicación oficial. Las fotografías son escenas conceptuales y no representan productos, precios, disponibilidad ni características verificadas de PYCCA. Los stickers y enlaces de historias son mockups.</p>
      </div>
      <dialog ref={dialogRef} className="signex-piece-dialog" aria-labelledby="signex-piece-title" onClose={() => setActive(null)} onClick={(event) => { if (event.target === dialogRef.current) setActive(null); }}>
        {active && <div className="signex-piece-dialog-inner">
          <button className="signex-piece-close" aria-label="Cerrar detalle" onClick={() => setActive(null)}><Icon name="X" size={20} /></button>
          <div className="signex-piece-preview"><Image src={imageUrl(active.file)} alt={`Pieza completa: ${active.title}`} width={1080} height={imageHeight(active)} sizes="(max-width: 760px) 90vw, 46vw" unoptimized /></div>
          <div className="signex-piece-info"><span className="signex-kicker">{active.group}</span><h3 id="signex-piece-title">{active.title}</h3><span className="signex-piece-label">OBJETIVO</span><p>{active.objective}</p><span className="signex-piece-label">JUSTIFICACIÓN</span><p>{active.note}</p>{active.interaction && <small>{active.interaction}</small>}<a className="signex-primary" href="https://www.canva.com/d/Ems1bHDnZfcQnjd" target="_blank" rel="noreferrer">Ver originales en Canva <Icon name="ArrowUpRight" size={16} /></a></div>
        </div>}
      </dialog>
    </section>
  );
}
