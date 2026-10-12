import Link from 'next/link';
import type { Metadata } from 'next';
import { withBasePath } from '@/lib/site-path';
import { Icon } from '@/components/icon';
import { SignexCampaignGallery } from '@/components/signex-campaign-gallery';
import { SignexStoryboard } from '@/components/signex-storyboard';

export const metadata: Metadata = {
  title: 'SIGNEX · Portafolio académico PYCCA Bebé',
  description: 'Caso de estudio académico de SIGNEX: investigación, semiótica, campaña audiovisual y piezas digitales para PYCCA Bebé.',
};

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
    eyebrow: 'Semiótica · Archivo de Canva',
    title: 'Dossier visual',
    description: 'Investigación, concepto, matriz de signos, paleta y dirección de arte consultados para el caso.',
    label: 'Ver dossier en Canva',
    href: 'https://www.canva.com/d/DPshHPC99XOcnTT',
    external: true,
  },
  {
    number: '03',
    eyebrow: 'Identidad visual · Archivo editable',
    title: 'Manual de marca · borrador editable',
    description: 'Borrador de presentación con criterios visuales y aplicaciones conceptuales preparados para el proyecto.',
    label: 'Descargar manual editable · PPTX',
    href: withBasePath('/signex/manual-visual-signex.pptx'),
  },
  {
    number: '04',
    eyebrow: 'Equipo · Proyecto integrador',
    title: 'Acta y organización de SIGNEX',
    description: 'Documento base del proyecto grupal y su organización. Los integrantes y responsabilidades se consultan en el documento fuente.',
    label: 'Abrir acta en Google Docs',
    href: 'https://docs.google.com/document/d/11zXD8SDopsmdEryK-xtmF8x2LDoODpQRUciMPEAcKS8/edit',
    external: true,
  },
  {
    number: '05',
    eyebrow: 'Presentación · Archivo editable',
    title: 'Presentación visual',
    description: 'Síntesis visual del reto, la propuesta de campaña y sus piezas principales.',
    label: 'Descargar presentación · PPTX',
    href: withBasePath('/signex/presentacion-signex-pycca.pptx'),
  },
  {
    number: '06',
    eyebrow: 'Narrativa audiovisual · Preproducción',
    title: 'Guion y propuesta del spot',
    description: 'Material de preproducción del spot para la cuna. Es documentación del proceso, no un enlace a un video final.',
    label: 'Abrir guion del spot',
    href: 'https://docs.google.com/document/d/1v18L_AY2HYK_OWNNb3KuMcolIU1U94EP/edit',
    external: true,
  },
  {
    number: '07',
    eyebrow: 'Comunicación · Investigación',
    title: 'Investigación PYCCA',
    description: 'Documento de análisis de audiencia. Las distintas versiones de respuestas no se mezclan en esta página.',
    label: 'Abrir investigación',
    href: 'https://docs.google.com/document/d/1ksZbeKQZNE9Ykk4Q5rbqkuGE8zIq6MwbnumyV4ZYhoQ/edit',
    external: true,
  },
  {
    number: '08',
    eyebrow: 'Herramientas digitales · Canva',
    title: 'Piezas sociales y justificación',
    description: 'Objetivos y justificación de las 20 propuestas: publicaciones, dos carruseles e historias interactivas.',
    label: 'Ver las piezas y su estrategia',
    href: 'https://www.canva.com/d/3zCKKkyzrcLojcz',
    external: true,
  },
  {
    number: '09',
    eyebrow: 'Campaña social · Canva',
    title: 'Campaña para PYCCA',
    description: 'Archivo visual de campaña con las propuestas sociales y su continuidad entre formatos.',
    label: 'Abrir presentación en Canva',
    href: 'https://www.canva.com/d/Ems1bHDnZfcQnjd',
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

      <nav className="signex-anchor-nav container" aria-label="Secciones del portafolio">
        <a href="#proceso">Proceso</a><a href="#sistema-visual">Sistema visual</a><a href="#narrativa">Spot</a><a href="#piezas">Piezas sociales</a><a href="#aprendizajes">Carrera y créditos</a>
      </nav>

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

      <section className="signex-process container" id="proceso">
        <div className="signex-section-label"><span>03 / DEL ANÁLISIS A LA CAMPAÑA</span><i /></div>
        <div className="signex-process-heading"><div><h2>Un proyecto que conecta<br /><em>varias áreas de la carrera.</em></h2></div><p>El recorrido une investigación, estrategia, lectura semiótica y producción de contenidos para llegar a una experiencia digital complementaria.</p></div>
        <div className="signex-process-grid">
          <article><b>01</b><span>Teoría de la Comunicación</span><h3>Comprender el reto</h3><p>Explorar la necesidad de preparar el hogar y ordenar la información relevante para comunicar la categoría Bebé.</p></article>
          <article><b>02</b><span>Público y contexto</span><h3>Definir a quién hablar</h3><p>El dossier plantea como microsegmento a jóvenes de 27 a 29 años que se preparan para la llegada de su primer bebé.</p></article>
          <article><b>03</b><span>Estrategia creativa</span><h3>Dar forma al mensaje</h3><p>“Elige con confianza” aparece como concepto en Semiótica; “Tu elección, su tranquilidad” funciona como claim del dossier.</p></article>
          <article><b>04</b><span>Semiótica y diseño</span><h3>Construir significado</h3><p>La cuna, la habitación, la recomendación y la paleta neutra se articulan para representar cuidado y preparación.</p></article>
          <article><b>05</b><span>Narrativa audiovisual</span><h3>Contar una historia</h3><p>La preproducción plantea personajes, guion, storyboard técnico, dirección de arte, sonido y cronograma de rodaje.</p></article>
          <article><b>06</b><span>Herramientas digitales</span><h3>Extender la experiencia</h3><p>La campaña social y el prototipo web llevan la idea a formatos de descubrimiento, inspiración y exploración.</p></article>
        </div>
        <div className="signex-message-variants"><span>MENSAJES QUE APARECEN EN LAS FUENTES</span><p><strong>Concepto en el dossier:</strong> “Elige con confianza”. <strong>Frase narrativa del spot:</strong> “Preparar su espacio es comenzar a darle la bienvenida”.</p><small>Se conservan diferenciados porque los documentos consultados presentan variantes de jerarquía creativa.</small></div>
        <details className="signex-research-note"><summary>Nota sobre las cifras de investigación</summary><p>Las fuentes consultadas contienen versiones distintas de la base (49 y 50 respuestas) y denominadores diferentes para el microsegmento. Esta página no publica porcentajes hasta que el equipo consolide los datos con la hoja original.</p></details>
      </section>

      <section className="signex-identity container" id="sistema-visual">
        <div className="signex-section-label"><span>04 / SISTEMA VISUAL Y SEMIÓTICA</span><i /></div>
        <div className="signex-identity-grid">
          <div><h2>Una atmósfera<br /><em>cálida y serena.</em></h2><p>La dirección de arte del dossier propone una habitación luminosa, ordenada y natural. Poppins y una paleta suave ayudan a mantener el foco en el espacio del bebé.</p><div className="signex-type-specimen"><span>POPPINS · TIPOGRAFÍA PRINCIPAL</span><strong>Elige con confianza.</strong><small>Pesos Regular y SemiBold para lectura y jerarquía.</small></div></div>
          <div className="signex-palette-card"><div className="signex-palette-title"><span>PALETA DE CAMPAÑA</span><span>REFERENCIA DEL DOSSIER</span></div><div className="signex-palette">{[['#F7F5EF','Marfil'],['#DCCBB5','Arena'],['#9CAF88','Salvia'],['#F1DF9B','Amarillo'],['#D7E8C8','Verde claro'],['#D6D4CF','Gris']].map(([color,label])=><div key={color}><i style={{backgroundColor:color}}/><span>{label}</span><small>{color}</small></div>)}</div><small className="signex-palette-note">La identidad de PYCCA se mantiene como referencia de marca; esta paleta se usa para el ambiente visual de la campaña.</small></div>
        </div>
        <div className="signex-reading-grid">
          <article><span>01 · SIGNO PRINCIPAL</span><h3>La cuna</h3><p><b>Denota:</b> un lugar para el descanso del bebé.</p><p><b>Connota:</b> cuidado, preparación y un espacio propio.</p></article>
          <article><span>02 · ESCENARIO</span><h3>La habitación</h3><p><b>Denota:</b> un ambiente del hogar organizado.</p><p><b>Connota:</b> preparación y bienvenida a una nueva etapa.</p></article>
          <article><span>03 · RECURSO NARRATIVO</span><h3>La recomendación</h3><p><b>Denota:</b> una conversación entre personas cercanas.</p><p><b>Connota:</b> confianza y acompañamiento en la decisión.</p></article>
          <article><span>04 · CÓDIGO VISUAL</span><h3>Luz y tonos naturales</h3><p><b>Denota:</b> iluminación suave y una paleta neutra.</p><p><b>Connota:</b> calma, cercanía y un ambiente acogedor.</p></article>
        </div>
        <p className="signex-concept-note">Lecturas denotativas y connotativas resumidas de la matriz semiótica del dossier. Son interpretaciones de la campaña, no especificaciones del producto.</p>
      </section>

      <SignexStoryboard />
      <SignexCampaignGallery />

      <section className="signex-learning container" id="aprendizajes">
        <div className="signex-section-label"><span>07 / FORMACIÓN Y CRÉDITOS</span><i /></div>
        <div className="signex-learning-heading"><div><span className="signex-kicker">MULTIMEDIA EN PRÁCTICA</span><h2>De la idea al<br /><em>prototipo navegable.</em></h2></div><p>Una misma propuesta permite trabajar pensamiento estratégico, lenguaje visual, narrativa, edición de contenidos y experiencia digital.</p></div>
        <div className="signex-learning-grid"><article><Icon name="Search" size={18} /><h3>Investigar y sintetizar</h3><p>Plantear preguntas, organizar hallazgos y convertirlos en una oportunidad de comunicación.</p></article><article><Icon name="Palette" size={18} /><h3>Diseñar con intención</h3><p>Relacionar signos, color, tipografía y composición con un mensaje reconocible.</p></article><article><Icon name="Play" size={18} /><h3>Planificar lo audiovisual</h3><p>Conectar guion, personajes, encuadre, arte y sonido en una secuencia narrativa.</p></article><article><Icon name="LayoutDashboard" size={18} /><h3>Prototipar en digital</h3><p>Dar continuidad al concepto mediante piezas sociales y una experiencia web adaptable.</p></article></div>
        <div className="signex-credits"><div><span className="signex-kicker">CRÉDITO DE PROYECTO</span><h3>SIGNEX × PYCCA · Categoría Bebé</h3><p>Proyecto académico grupal de Producción Multimedia y Audiovisual. El portafolio enlaza el acta de organización como fuente para consultar la nómina y los créditos individuales.</p><small>Los documentos de preproducción consultados presentan diferencias en la nómina; por ello aquí no se asignan cargos individuales.</small></div><a href="https://docs.google.com/document/d/11zXD8SDopsmdEryK-xtmF8x2LDoODpQRUciMPEAcKS8/edit" target="_blank" rel="noreferrer">Consultar acta del equipo <Icon name="ArrowUpRight" size={16} /></a></div>
      </section>

      <section className="signex-documents" id="documentos">
        <div className="container">
          <div className="signex-section-label"><span>08 / ARCHIVO DEL PROYECTO</span><i /></div>
          <div className="signex-doc-heading"><div><h2>Explora el trabajo<br /><em>de SIGNEX.</em></h2></div><p>Dossier, identidad, equipo y preproducción reunidos en un solo lugar.</p></div>
          <div className="signex-doc-grid">{documents.map((doc) => <article className="signex-doc-card" key={doc.number}><div className="signex-doc-card-top"><span>{doc.eyebrow}</span><b>{doc.number}</b></div><h3>{doc.title}</h3><p>{doc.description}</p><a href={doc.href} target={doc.external ? '_blank' : undefined} rel={doc.external ? 'noreferrer' : undefined} download={doc.external ? undefined : true}>{doc.label}<Icon name={doc.external ? 'ArrowUpRight' : 'ArrowRight'} size={16} /></a></article>)}</div>
          <p className="signex-source-note">Los documentos de Google Drive pueden pedir acceso con la cuenta autorizada. Los archivos PPTX se descargan desde esta página y son editables.</p>
        </div>
      </section>

      <section className="signex-outro container"><span className="signex-kicker">SIGNEX × PYCCA</span><h2>Elige con confianza.<br /><em>Tu elección, su tranquilidad.</em></h2><Link className="signex-primary" href="/bebes">Ver el espacio Bebés <Icon name="ArrowRight" size={17} /></Link></section>
    </main>
  );
}
