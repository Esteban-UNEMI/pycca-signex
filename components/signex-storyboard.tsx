import Image from 'next/image';
import { withBasePath } from '@/lib/site-path';

const beats = [
  { number: '01', label: 'Inicio', title: 'Un espacio por preparar', text: 'Valentina y Jorge organizan la habitación y descubren que todavía falta elegir una cuna.', image: 'escena-02-ropa-dobladita', alt: 'Ropa de bebé doblada en una habitación cálida', shot: 'Plano general del espacio y detalles de preparación', sound: 'Sonidos de organización; piano suave.' },
  { number: '02', label: 'Conflicto', title: 'La decisión genera dudas', text: 'La pareja busca opciones y considera qué necesita para preparar el espacio.', image: 'escena-01-pareja-tablet', alt: 'Pareja consulta opciones en una tablet junto a la cuna', shot: 'Plano medio de la pareja y detalle del dispositivo', sound: 'Ambiente tranquilo y sonido del celular.' },
  { number: '03', label: 'Recomendación', title: 'Una conversación abre caminos', text: 'Camila visita a la pareja y comparte su recomendación de explorar PYCCA.', image: 'escena-05-amigas', alt: 'Amigas conversan en una habitación luminosa', shot: 'Plano medio para la conversación entre personajes', sound: 'Diálogo natural; la música gana esperanza.' },
  { number: '04', label: 'Elección', title: 'Explorar antes de elegir', text: 'La pareja revisa las opciones y la información disponible para tomar su decisión.', image: 'escena-03-cuna-interior', alt: 'Cuna de madera dentro de una habitación infantil conceptual', shot: 'Planos de contexto y detalles sujetos a la ficha real', sound: 'Sonido de navegación; piano progresivamente esperanzador.' },
  { number: '05', label: 'Preparación', title: 'El hogar recibe una nueva pieza', text: 'La cuna llega y la habitación comienza a transformarse con textiles y detalles.', image: 'escena-04-detalle-textil', alt: 'Textiles suaves y detalles de una habitación de bebé', shot: 'Planos detalle de manos, textiles y preparación', sound: 'Timbre, entrega y sonidos del espacio.' },
  { number: '06', label: 'Bienvenida', title: 'Un espacio listo para recibirle', text: 'La habitación terminada muestra la cuna como parte de la bienvenida al bebé.', image: 'escena-06-revelacion', alt: 'Habitación conceptual terminada con una cuna como protagonista', shot: 'Plano general final y cierre de campaña', sound: 'Piano emotivo y mensaje final.' },
];

export function SignexStoryboard() {
  return (
    <section className="signex-storyboard" id="narrativa">
      <div className="container">
        <div className="signex-section-label"><span>05 / NARRATIVA AUDIOVISUAL</span><i /></div>
        <div className="signex-storyboard-heading"><div><span className="signex-kicker">GUION · PLANOS · SONIDO</span><h2>De una habitación<br /><em>a una bienvenida.</em></h2></div><p>La propuesta acompaña a Valentina y Jorge desde la preparación del hogar hasta la elección de una cuna, con la recomendación de su amiga Camila.</p></div>
        <div className="signex-storyboard-grid">
          {beats.map((beat) => <details className="signex-beat" key={beat.number}>
            <summary>
              <span className="signex-beat-image"><Image src={withBasePath(`/signex/campaign/${beat.image}.jpg`)} alt={beat.alt} width={540} height={675} sizes="(max-width: 700px) 88vw, 30vw" unoptimized loading="lazy" /></span>
              <span className="signex-beat-label"><b>{beat.number}</b><small>{beat.label}</small></span>
              <strong>{beat.title}</strong><span className="signex-beat-more">Ver propuesta <i>+</i></span>
            </summary>
            <div className="signex-beat-detail"><p>{beat.text}</p><dl><div><dt>Imagen sugerida</dt><dd>{beat.shot}</dd></div><div><dt>Sonido sugerido</dt><dd>{beat.sound}</dd></div></dl></div>
          </details>)}
        </div>
        <div className="signex-sound-note"><span>DISEÑO SONORO</span><p>El guion propone piano instrumental y una evolución musical desde la inquietud hacia la esperanza, junto a sonidos cotidianos de organización, celular, timbre y entrega.</p></div>
        <p className="signex-concept-note">Previsualización conceptual basada en el guion de preproducción. Estas imágenes no son fotogramas grabados ni reemplazan el storyboard técnico final; el producto y sus atributos deben verificarse con una ficha vigente.</p>
      </div>
    </section>
  );
}
