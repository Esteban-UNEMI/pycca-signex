import Link from 'next/link';
import { withBasePath } from '@/lib/site-path';
import { Icon } from '@/components/icon';

const documents = [
  {
    number: '01',
    eyebrow: 'Semiótica · Documento de trabajo',
    title: 'Dossier de campaña',
    description: 'Investigación, público, concepto creativo, signos visuales y dirección de arte para la campaña de cunas.',
    label: 'Abrir dossier en Google Docs',
    href: 'https://docs.google.com/document/d/1h9NRaAKduvJgr2ZUdXksWFsfO5isB3WeD9bTPM-ifQw/edit',
    external: true,
  },
  {
    number: '02',
    eyebrow: 'Identidad visual · Archivo editable',
    title: 'Manual de marca · borrador editable',
    description: 'Borrador de presentación con criterios visuales y aplicaciones conceptuales preparados para el proyecto.',
    label: 'Descargar manual editable · PPTX',
    href: withBasePath('/signex/manual-visual-signex.pptx'),
  },
  {
    number: '03',
    eyebrow: 'Equipo · Proyecto integrador',
    title: 'Acta y organización de SIGNEX',
    description: 'Documento base del proyecto grupal y su organización. Los integrantes y responsabilidades se consultan en el documento fuente.',
    label: 'Abrir acta en Google Docs',
    href: 'https://docs.google.com/document/d/11zXD8SDopsmdEryK-xtmF8x2LDoODpQRUciMPEAcKS8/edit',
    external: true,
  },
  {
    number: '04',
    eyebrow: 'Presentación · Archivo editable',
    title: 'Presentación visual',
    description: 'Síntesis visual del reto, la propuesta de campaña y sus piezas principales.',
    label: 'Descargar presentación · PPTX',
    href: withBasePath('/signex/presentacion-signex-pycca.pptx'),
  },
  {
    number: '05',
    eyebrow: 'Narrativa audiovisual · Preproducción',
    title: 'Guion y propuesta del spot',
    description: 'Material de preproducción del spot para la cuna. Es documentación del proceso, no un enlace a un video final.',
    label: 'Abrir guion del spot',
    href: 'https://docs.google.com/document/d/1v18L_AY2HYK_OWNNb3KuMcolIU1U94EP/edit',
    external: true,
  },
  {
    number: '06',
    eyebrow: 'Comunicación · Investigación',
    title: 'Investigación PYCCA',
    description: 'Documento de análisis de audiencia. Las distintas versiones de respuestas no se mezclan en esta página.',
    label: 'Abrir investigación',
    href: 'https://docs.google.com/document/d/1ksZbeKQZNE9Ykk4Q5rbqkuGE8zIq6MwbnumyV4ZYhoQ/edit',
    external: true,
  },
];

export default function SignexPage() {
  return (
    <main className="signex-page">
      <header className="signex-topbar">
        <div className="container signex-topbar-inner">
          <Link className="signex-back" href="/"><Icon name="ArrowLeft" size={16} /> Volver a la tienda</Link>
          <span>UNEMI · Producción Multimedia y Audiovisual</span>
        </div>
      </header>

      <section className="signex-hero">
        <div className="container signex-hero-inner">
          <div className="signex-hero-copy">
            <span className="signex-kicker"><i /> PORTAFOLIO ACADÉMICO · SIGNEX</span>
            <h1>Ideas que se convierten<br /><em>en experiencias.</em></h1>
            <p>Un vistazo al trabajo interdisciplinario de SIGNEX: estrategia, semiótica, identidad visual y narrativa audiovisual para una campaña académica de PYCCA.</p>
            <a className="signex-primary" href="#documentos">Explorar los materiales <Icon name="ArrowRight" size={17} /></a>
          </div>
          <div className="signex-hero-art" aria-label="Paleta visual conceptual de la campaña">
            <span className="signex-art-note">PYCCA · BEBÉ</span>
            <div className="signex-art-orbit orbit-a" />
            <div className="signex-art-orbit orbit-b" />
            <div className="signex-art-card"><span>CONCEPTO DE CAMPAÑA</span><strong>Elige con<br /><em>confianza.</em></strong><small>Tu elección, su tranquilidad.</small><div className="signex-swatches"><i /><i /><i /><i /><i /></div></div>
            <span className="signex-art-index">01 — 06</span>
          </div>
        </div>
      </section>

      <section className="signex-intro container">
        <div className="signex-section-label"><span>01 / FORMACIÓN</span><i /></div>
        <div className="signex-intro-grid">
          <h2>Producción Multimedia<br /><em>y Audiovisual.</em></h2>
          <div><p>La carrera reúne comunicación, diseño y producción de contenidos para distintos medios. En este proyecto, el equipo conectó investigación y estrategia con identidad gráfica, una propuesta de spot y una experiencia web complementaria.</p><span className="signex-class-chip"><Icon name="Sparkles" size={15} /> Proyecto integrador · Categoría Bebé</span></div>
        </div>
      </section>

      <section className="signex-project-band">
        <div className="container signex-project-grid">
          <div><span className="signex-kicker">02 / EL PROYECTO</span><h2>Preparar un espacio.<br /><em>Dar la bienvenida.</em></h2></div>
          <p>La propuesta explora cómo presentar una cuna a personas jóvenes que se preparan para la llegada de un bebé. La web acompaña el concepto con una categoría de productos, comparación y recursos de planificación; es un prototipo académico y no un servicio comercial de PYCCA.</p>
        </div>
      </section>

      <section className="signex-identity container">
        <div className="signex-section-label"><span>03 / SISTEMA VISUAL</span><i /></div>
        <div className="signex-identity-grid">
          <div><h2>Una atmósfera<br /><em>cálida y serena.</em></h2><p>La dirección de arte del dossier propone una habitación luminosa, ordenada y natural. Poppins y una paleta suave ayudan a mantener el foco en el espacio del bebé.</p></div>
          <div className="signex-palette-card"><div className="signex-palette-title"><span>PALETA DE CAMPAÑA</span><span>REFERENCIA DEL DOSSIER</span></div><div className="signex-palette">{[['#F7F5EF','Marfil'],['#DCCBB5','Arena'],['#9CAF88','Salvia'],['#F1DF9B','Amarillo'],['#D7E8C8','Verde claro'],['#D6D4CF','Gris']].map(([color,label])=><div key={color}><i style={{backgroundColor:color}}/><span>{label}</span><small>{color}</small></div>)}</div><small className="signex-palette-note">La identidad de PYCCA se mantiene como referencia de marca; esta paleta se usa para el ambiente visual de la campaña.</small></div>
        </div>
      </section>

      <section className="signex-documents" id="documentos">
        <div className="container">
          <div className="signex-section-label"><span>04 / ARCHIVO DEL PROYECTO</span><i /></div>
          <div className="signex-doc-heading"><div><h2>Explora el trabajo<br /><em>de SIGNEX.</em></h2></div><p>Dossier, identidad, equipo y preproducción reunidos en un solo lugar.</p></div>
          <div className="signex-doc-grid">{documents.map((doc) => <article className="signex-doc-card" key={doc.number}><div className="signex-doc-card-top"><span>{doc.eyebrow}</span><b>{doc.number}</b></div><h3>{doc.title}</h3><p>{doc.description}</p><a href={doc.href} target={doc.external ? '_blank' : undefined} rel={doc.external ? 'noreferrer' : undefined} download={doc.external ? undefined : true}>{doc.label}<Icon name={doc.external ? 'ArrowUpRight' : 'ArrowRight'} size={16} /></a></article>)}</div>
          <p className="signex-source-note">Los documentos de Google Drive pueden pedir acceso con la cuenta autorizada. Los archivos PPTX se descargan desde esta página y son editables.</p>
        </div>
      </section>

      <section className="signex-outro container"><span className="signex-kicker">SIGNEX × PYCCA</span><h2>Elige con confianza.<br /><em>Tu elección, su tranquilidad.</em></h2><Link className="signex-primary" href="/bebes">Ver el espacio Bebés <Icon name="ArrowRight" size={17} /></Link></section>
    </main>
  );
}
