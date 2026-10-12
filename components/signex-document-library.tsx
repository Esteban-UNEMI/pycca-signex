'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Icon } from '@/components/icon';
import { withBasePath } from '@/lib/site-path';

type DocumentItem = {
  id: string;
  title: string;
  type: 'Documento' | 'Presentación' | 'Canva';
  area: string;
  summary: string;
  sourceUrl: string;
  preview: 'google' | 'powerpoint' | 'external';
};

const documents: DocumentItem[] = [
  {
    id: 'dossier-semiotica', title: 'Dossier de campaña · Semiótica', type: 'Documento', area: 'Semiótica',
    summary: 'Público, objetivos, concepto, claim, matriz de signos, paleta cromática y dirección de arte.',
    sourceUrl: 'https://docs.google.com/document/d/1h9NRaAKduvJgr2ZUdXksWFsfO5isB3WeD9bTPM-ifQw/edit', preview: 'google',
  },
  {
    id: 'acta-signex', title: 'Acta y organización del equipo SIGNEX', type: 'Documento', area: 'Equipo',
    summary: 'Documento de organización del proyecto grupal y distribución de responsabilidades.',
    sourceUrl: 'https://docs.google.com/document/d/11zXD8SDopsmdEryK-xtmF8x2LDoODpQRUciMPEAcKS8/edit', preview: 'google',
  },
  {
    id: 'guion-spot', title: 'Guion y preproducción del spot', type: 'Documento', area: 'Narrativa audiovisual',
    summary: 'Historia, personajes y planificación narrativa para la propuesta audiovisual de la cuna.',
    sourceUrl: 'https://docs.google.com/document/d/1v18L_AY2HYK_OWNNb3KuMcolIU1U94EP/edit', preview: 'google',
  },
  {
    id: 'investigacion', title: 'Investigación PYCCA', type: 'Documento', area: 'Investigación',
    summary: 'Análisis de audiencia y contexto. Las versiones de las bases de encuesta se mantienen diferenciadas.',
    sourceUrl: 'https://docs.google.com/document/d/1ksZbeKQZNE9Ykk4Q5rbqkuGE8zIq6MwbnumyV4ZYhoQ/edit', preview: 'google',
  },
  {
    id: 'redes-sociales', title: 'Análisis de redes y concepto creativo', type: 'Documento', area: 'Estrategia',
    summary: 'Revisión de publicaciones y consultas observadas para orientar el contenido de la campaña.',
    sourceUrl: 'https://docs.google.com/document/d/1R8Sl3mqdHexxeirE6tSEs15bDhfPKQ_YJVgVou7eKNE/edit', preview: 'google',
  },
  {
    id: 'presentacion', title: 'Presentación visual SIGNEX × PYCCA', type: 'Presentación', area: 'Proyecto integrador',
    summary: 'Síntesis visual del reto, la propuesta de campaña, sus formatos y piezas principales.',
    sourceUrl: withBasePath('/signex/presentacion-signex-pycca.pptx'), preview: 'powerpoint',
  },
  {
    id: 'manual-visual', title: 'Manual de identidad visual · borrador', type: 'Presentación', area: 'Identidad visual',
    summary: 'Borrador editable con criterios de identidad y aplicaciones visuales conceptuales.',
    sourceUrl: withBasePath('/signex/manual-visual-signex.pptx'), preview: 'powerpoint',
  },
  {
    id: 'dossier-canva', title: 'Dossier visual · Canva', type: 'Canva', area: 'Semiótica',
    summary: 'Versión visual del dossier, con referencias de campaña y dirección de arte.',
    sourceUrl: 'https://www.canva.com/d/DPshHPC99XOcnTT', preview: 'external',
  },
  {
    id: 'piezas-sociales', title: '20 piezas sociales y justificación · Canva', type: 'Canva', area: 'Herramientas digitales',
    summary: 'Publicaciones, carruseles e historias con objetivos y justificación por pieza.',
    sourceUrl: 'https://www.canva.com/d/3zCKKkyzrcLojcz', preview: 'external',
  },
  {
    id: 'campana-canva', title: 'Campaña para PYCCA · Canva', type: 'Canva', area: 'Campaña',
    summary: 'Presentación editable del concepto y las aplicaciones de campaña.',
    sourceUrl: 'https://www.canva.com/d/Ems1bHDnZfcQnjd', preview: 'external',
  },
];

const filters = ['Todos', 'Documento', 'Presentación', 'Canva'] as const;

export function SignexDocumentLibrary() {
  const [filter, setFilter] = useState<(typeof filters)[number]>('Todos');
  const [activeId, setActiveId] = useState(documents[0].id);
  useEffect(() => {
    const requestedId = new URLSearchParams(window.location.search).get('doc');
    if (requestedId && documents.some((document) => document.id === requestedId)) setActiveId(requestedId);
  }, []);
  const visibleDocuments = useMemo(
    () => documents.filter((document) => filter === 'Todos' || document.type === filter),
    [filter],
  );
  const active = documents.find((document) => document.id === activeId) ?? documents[0];

  function selectFilter(nextFilter: (typeof filters)[number]) {
    setFilter(nextFilter);
    if (nextFilter !== 'Todos') {
      const firstMatch = documents.find((document) => document.type === nextFilter);
      if (firstMatch) setActiveId(firstMatch.id);
    }
  }

  const previewUrl = active.preview === 'google'
    ? active.sourceUrl.replace(/\/edit(?:\?.*)?$/, '/preview')
    : active.preview === 'powerpoint'
      ? `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(new URL(active.sourceUrl, 'https://esteban-unemi.github.io').href)}`
      : null;

  return (
    <main className="signex-library">
      <header className="signex-topbar">
        <div className="container signex-topbar-inner">
          <Link className="signex-back" href="/signex"><Icon name="ArrowLeft" size={16} /> Volver al portafolio</Link>
          <span>UNEMI · Producción Multimedia y Audiovisual</span>
        </div>
      </header>

      <section className="signex-library-hero">
        <div className="container signex-library-hero-grid">
          <div>
            <span className="signex-kicker"><i /> SIGNEX · PROYECTO INTEGRADOR</span>
            <h1>Un proyecto.<br /><em>Muchas miradas.</em></h1>
            <p>Consulta los documentos que acompañan el desarrollo de la campaña para PYCCA Bebé. Los archivos de Google Docs y las presentaciones se pueden revisar aquí; Canva conserva los enlaces a sus versiones visuales editables.</p>
            <div className="signex-library-count"><strong>10</strong><span>materiales del equipo<br />reunidos para revisión docente</span></div>
          </div>
          <aside className="signex-library-note"><span>ARCHIVO ACADÉMICO</span><strong>Proceso, decisiones<br />y entregables</strong><p>De la investigación y la semiótica a la narrativa audiovisual y las piezas digitales.</p><Link href="/signex/materias">Ver el recorrido por materias <Icon name="ArrowRight" size={16} /></Link><Link href="/signex#proceso">Conocer el proceso <Icon name="ArrowRight" size={16} /></Link></aside>
        </div>
      </section>

      <section className="container signex-library-main" aria-label="Biblioteca de documentos">
        <div className="signex-library-heading"><div><span className="signex-kicker">ARCHIVO DEL PROYECTO</span><h2>Materiales para <em>explorar.</em></h2></div><p>Selecciona un documento para verlo en el panel. Puedes abrir la fuente en otra pestaña cuando necesites consultar o editar el original.</p></div>
        <div className="signex-library-filters" role="group" aria-label="Filtrar documentos">
          {filters.map((option) => <button key={option} type="button" aria-pressed={filter === option} className={filter === option ? 'active' : ''} onClick={() => selectFilter(option)}>{option}<span>{option === 'Todos' ? documents.length : documents.filter((document) => document.type === option).length}</span></button>)}
        </div>
        <div className="signex-library-layout">
          <nav className="signex-library-list" aria-label="Documentos disponibles">
            {visibleDocuments.map((document) => <button key={document.id} type="button" className={active.id === document.id ? 'active' : ''} aria-current={active.id === document.id ? 'true' : undefined} onClick={() => setActiveId(document.id)}><span className="signex-library-list-number">{String(documents.indexOf(document) + 1).padStart(2, '0')}</span><span className="signex-library-list-copy"><small>{document.type} · {document.area}</small><strong>{document.title}</strong></span><Icon name="ArrowRight" size={16} /></button>)}
          </nav>
          <article className="signex-library-viewer" aria-live="polite">
            <div className="signex-library-viewer-head"><div><span>{active.type} · {active.area}</span><h3>{active.title}</h3></div><a href={active.sourceUrl} target="_blank" rel="noreferrer">Abrir fuente <Icon name="ArrowUpRight" size={15} /></a></div>
            <p className="signex-library-summary">{active.summary}</p>
            {previewUrl ? <iframe key={active.id} className="signex-document-frame" src={previewUrl} title={`Vista previa: ${active.title}`} loading="lazy" allowFullScreen /> : <div className="signex-external-preview"><div className="signex-external-preview-mark">S</div><span>DOCUMENTO VISUAL EN CANVA</span><h4>La versión editable vive en su fuente original.</h4><p>Abre Canva para consultar la presentación completa y sus páginas. En este portafolio también puedes explorar las piezas sociales como imágenes en la galería.</p><a className="signex-primary" href={active.sourceUrl} target="_blank" rel="noreferrer">Ver en Canva <Icon name="ArrowUpRight" size={16} /></a></div>}
            <div className="signex-library-viewer-foot"><span>{active.preview === 'google' ? 'Vista previa de Google Docs' : active.preview === 'powerpoint' ? 'Vista web de la presentación editable' : 'Fuente editables alojada en Canva'}</span>{active.preview === 'powerpoint' && <a href={active.sourceUrl} download>Descargar PPTX</a>}</div>
          </article>
        </div>
        <aside className="signex-library-disclosure"><strong>Sobre las fuentes y el acceso</strong><p>El visor de Google Docs y las presentaciones web requiere conexión a internet. Si un documento solicita permisos, usa “Abrir fuente” e inicia sesión con la cuenta autorizada o pide al equipo que habilite el acceso de lectura. Los originales de Canva dependen de sus permisos de compartir. Las escenas del spot son conceptuales y el cuestionario no representa una base de respuestas depurada.</p></aside>
      </section>

      <footer className="signex-footer"><div className="container"><Link href="/signex">SIGNEX · Proyecto integrador</Link><span>Archivo académico · SIGNEX × PYCCA Bebé</span><Link href="/signex#documentos">Volver a la página del proyecto <Icon name="ArrowRight" size={15} /></Link></div></footer>
    </main>
  );
}

