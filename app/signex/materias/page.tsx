import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@/components/icon';

export const metadata: Metadata = {
  title: 'Proyecto por materias · SIGNEX × PYCCA Bebé',
  description: 'Recorrido académico de SIGNEX por materias: evidencias disponibles y próximos avances propuestos.',
};

const subjects = [
  {
    number: '01', name: 'Teoría de la Comunicación',
    role: 'Investigar antes de comunicar',
    intro: 'Define el reto, el contexto y el público al que se dirige la propuesta para PYCCA Bebé.',
    evidence: ['Documento de investigación PYCCA', 'Análisis de audiencia y contexto', 'Fuentes del cuestionario conservadas por versión'],
    next: ['Contrastar cada cifra con la hoja de respuestas original.', 'Acordar una sola base y documentar fecha, muestra y método.', 'Convertir los hallazgos validados en una síntesis breve para la exposición.'],
    links: [
      { label: 'Ver investigación en el archivo', href: '/signex/documentos' },
      { label: 'Abrir documento de investigación', href: 'https://docs.google.com/document/d/1ksZbeKQZNE9Ykk4Q5rbqkuGE8zIq6MwbnumyV4ZYhoQ/edit', external: true },
    ],
    tone: 'clay', mark: 'Tc',
  },
  {
    number: '02', name: 'Semiótica',
    role: 'Construir significado con intención',
    intro: 'Relaciona concepto, signos y dirección de arte para expresar cuidado, preparación y confianza.',
    evidence: ['Dossier de campaña en Google Docs', 'Dossier visual compartido en Canva', 'Paleta y lecturas denotativas/connotativas'],
    next: ['Acordar la jerarquía final entre concepto y frase de campaña.', 'Revisar que cada signo visual respalde el mensaje elegido.', 'Cerrar una lámina de síntesis con paleta, tipografía y aplicaciones.'],
    links: [
      { label: 'Ver dossier en el archivo', href: '/signex/documentos' },
      { label: 'Abrir dossier visual en Canva', href: 'https://www.canva.com/d/DPshHPC99XOcnTT', external: true },
    ],
    tone: 'sage', mark: 'S',
  },
  {
    number: '03', name: 'Narrativa Audiovisual',
    role: 'Transformar una idea en relato',
    intro: 'La propuesta de spot articula personaje, recomendación, preparación del espacio y bienvenida.',
    evidence: ['Guion y materiales de preproducción', 'Presentación visual del proyecto', 'Propuesta narrativa para un spot horizontal'],
    next: ['Confirmar producto, utilería y detalles que requieren verificación.', 'Aprobar guion y storyboard con el equipo antes de rodar.', 'Completar rodaje, edición y adaptaciones; publicar el corte cuando esté revisado.'],
    links: [
      { label: 'Ver guion en el archivo', href: '/signex/documentos' },
      { label: 'Consultar preproducción', href: 'https://docs.google.com/document/d/1v18L_AY2HYK_OWNNb3KuMcolIU1U94EP/edit', external: true },
    ],
    tone: 'ochre', mark: 'Na',
  },
];

export default function SignexSubjectsPage() {
  return (
    <main className="signex-subjects">
      <header className="signex-subject-nav">
        <div className="container">
          <Link href="/signex"><Icon name="ArrowLeft" size={16} /> Volver al proyecto</Link>
          <span>UNEMI · Producción Multimedia y Audiovisual</span>
          <Link href="/signex/documentos">Archivo de documentos <Icon name="ArrowUpRight" size={15} /></Link>
        </div>
      </header>

      <section className="subject-hero">
        <div className="container subject-hero-grid">
          <div>
            <span className="subject-eyebrow"><i /> BITÁCORA INTERDISCIPLINARIA · SIGNEX × PYCCA</span>
            <h1>Una idea,<br /><em>tres materias.</em></h1>
            <p>Recorre cómo la investigación, la semiótica y la narrativa audiovisual aportan al proyecto integrador. Cada materia reúne lo que aparece en el archivo y una ruta posible para seguir avanzando.</p>
            <a className="subject-hero-link" href="#recorrido">Explorar el recorrido <Icon name="ArrowRight" size={16} /></a>
          </div>
          <div className="subject-orbit" aria-label="Ruta del proyecto: investigar, significar, narrar">
            <div className="subject-orbit-ring" />
            <span className="subject-orbit-label orbit-top">01 · INVESTIGAR</span>
            <span className="subject-orbit-label orbit-right">02 · SIGNIFICAR</span>
            <span className="subject-orbit-label orbit-bottom">03 · NARRAR</span>
            <div className="subject-orbit-center"><small>PROYECTO</small><strong>Un espacio<br />para recibir.</strong><span>SIGNEX × PYCCA Bebé</span></div>
          </div>
        </div>
        <div className="subject-hero-bottom"><div className="container"><span>DEL HALLAZGO</span><i /><span>A LA IDEA</span><i /><span>HASTA LA EXPERIENCIA</span></div></div>
      </section>

      <section className="subject-intro container" id="recorrido">
        <div><span className="subject-index">01 — 03 / RECORRIDO POR MATERIA</span><h2>El proyecto se<br /><em>construye en capas.</em></h2></div>
        <p>Las materias grupales se presentan como partes conectadas de un mismo proceso. Los avances descritos abajo son propuestas para organizar el trabajo; no representan calificaciones, fechas acordadas ni entregas confirmadas.</p>
      </section>

      <section className="subject-list container" aria-label="Materias del proyecto integrador">
        {subjects.map((subject) => (
          <article className={`subject-card subject-${subject.tone}`} key={subject.number}>
            <div className="subject-card-head">
              <div className="subject-mark"><span>{subject.mark}</span></div>
              <div className="subject-card-title"><span>MATERIA {subject.number}</span><h3>{subject.name}</h3><p>{subject.role}</p></div>
              <div className="subject-card-index">{subject.number}<i /></div>
            </div>
            <p className="subject-card-intro">{subject.intro}</p>
            <div className="subject-columns">
              <section className="subject-evidence"><div className="subject-column-title"><span className="subject-dot dot-file" /><div><small>EN EL ARCHIVO</small><h4>Evidencias identificadas</h4></div></div><ul>{subject.evidence.map((item) => <li key={item}><Icon name="Check" size={15} />{item}</li>)}</ul><div className="subject-links">{subject.links.map((link) => <Link key={link.label} href={link.href} target={'external' in link ? '_blank' : undefined} rel={'external' in link ? 'noreferrer' : undefined}>{link.label}<Icon name={'external' in link ? 'ArrowUpRight' : 'ArrowRight'} size={14} /></Link>)}</div></section>
              <section className="subject-proposal"><div className="subject-column-title"><span className="subject-dot dot-proposal" /><div><small>PROPUESTA · SIGUIENTE AVANCE</small><h4>Una ruta para continuar</h4></div></div><ol>{subject.next.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, '0')}</span><p>{item}</p></li>)}</ol></section>
            </div>
          </article>
        ))}
      </section>

      <section className="subject-bridge">
        <div className="container subject-bridge-grid"><div><span className="subject-index">UNA LÍNEA DE TRABAJO</span><h2>De comprender<br />a <em>contar.</em></h2></div><div className="subject-bridge-steps"><article><span>01</span><strong>Investigar</strong><small>Contexto y audiencia</small></article><i /><article><span>02</span><strong>Significar</strong><small>Concepto y lenguaje visual</small></article><i /><article><span>03</span><strong>Narrar</strong><small>Guion y experiencia</small></article></div><p>La web, la campaña social y el spot funcionan como aplicaciones relacionadas de una misma propuesta académica. Su integración final puede revisarse en la presentación del equipo.</p><Link href="/signex/documentos">Explorar documentos del proyecto <Icon name="ArrowRight" size={16} /></Link></div>
      </section>

      <section className="subject-digital container">
        <div className="subject-digital-tag">ACTIVIDAD COMPLEMENTARIA</div>
        <div><span className="subject-index">HERRAMIENTAS DIGITALES</span><h2>La propuesta también<br /><em>vive en pantalla.</em></h2><p>Como extensión del proyecto se encuentran reunidas las piezas sociales y su justificación en Canva. Esta actividad aparece separada de las tres materias grupales para conservar el alcance que muestran los archivos.</p><Link href="/signex/documentos">Consultar piezas sociales y presentaciones <Icon name="ArrowUpRight" size={15} /></Link></div>
        <div className="subject-digital-card"><small>PIEZAS SOCIALES · CANVA</small><strong>Una campaña<br />en distintos<br /><em>formatos.</em></strong><span>Archivo visual editable</span><a href="https://www.canva.com/d/3zCKKkyzrcLojcz" target="_blank" rel="noreferrer">Abrir Canva <Icon name="ArrowUpRight" size={14} /></a></div>
      </section>

      <aside className="subject-caveat container"><Icon name="Info" size={17} /><p><strong>Nota de lectura.</strong> La carpeta contiene versiones de investigación y mensajes creativos con diferencias entre documentos. Antes de presentar cifras, concepto o claim como definitivos, conviene acordar una versión final con el equipo y referenciar el archivo fuente. Las propuestas de avance de esta página son orientativas.</p></aside>

      <footer className="signex-footer"><div className="container"><Link href="/signex">SIGNEX · Proyecto integrador</Link><span>Producción Multimedia y Audiovisual · UNEMI</span><Link href="/signex/documentos">Ver archivo académico <Icon name="ArrowRight" size={15} /></Link></div></footer>
    </main>
  );
}
