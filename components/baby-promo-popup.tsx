'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { withBasePath } from '@/lib/site-path';
import { Icon } from './icon';
import { useDialog } from './use-dialog';

const dismissedKey = 'pycca-baby-promo-dismissed';

export function BabyPromoPopup() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLElement>(null);
  const close = () => {
    window.sessionStorage.setItem(dismissedKey, '1');
    setOpen(false);
  };
  useDialog(open, dialogRef, close);

  useEffect(() => {
    if (window.sessionStorage.getItem(dismissedKey)) return;
    const timer = window.setTimeout(() => setOpen(true), 4200);
    return () => window.clearTimeout(timer);
  }, []);

  if (!open) return null;

  return (
    <div className="baby-promo-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}>
      <section ref={dialogRef} className="baby-promo-dialog" role="dialog" aria-modal="true" aria-labelledby="baby-promo-title" aria-describedby="baby-promo-description">
        <button className="baby-promo-close" type="button" onClick={close} aria-label="Cerrar aviso de promociones"><Icon name="X" size={19}/></button>
        <div className="baby-promo-image"><Image src={withBasePath('/baby/crib-natural-v2.webp')} alt="Imagen conceptual de un espacio cálido para el bebé" fill sizes="(max-width: 700px) 100vw, 42vw" priority/></div>
        <div className="baby-promo-copy">
          <span className="baby-promo-kicker"><Icon name="Sparkles" size={15}/> ESPACIO BEBÉS · SIGNEX</span>
          <h2 id="baby-promo-title">Descuentos para<br/><em>sus primeros sueños.</em></h2>
          <p id="baby-promo-description">Explora ideas y productos para preparar su primer espacio. En este prototipo, el aviso promocional es una propuesta académica.</p>
          <Link href="/bebes" className="button baby-promo-cta" onClick={close}>Descubrir espacio Bebés <Icon name="ArrowRight" size={17}/></Link>
          <small>Los precios y descuentos de este prototipo son simulados; no representan ofertas comerciales vigentes de PYCCA.</small>
        </div>
      </section>
    </div>
  );
}

