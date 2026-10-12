'use client';
import { withBasePath } from '@/lib/site-path';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { formatCurrency, products } from '@/lib/data';
import { commitLocal, defaultSite, keys, localRepository, useLocalEntity, type Customer, type StockMovement } from '@/lib/local-repository';
import { useDemoTheme } from '@/components/use-demo-theme';
import { CartLine, DemoOrder } from '@/lib/types';
import { Icon } from '@/components/icon';

type Fulfillment = 'delivery' | 'pickup';

export default function CheckoutPage() {
  useDemoTheme();
  const { value: site } = useLocalEntity(keys.site, defaultSite);
  const [error, setError] = useState('');
  const [lines, setLines] = useState<CartLine[]>([]);
  const [fulfillment, setFulfillment] = useState<Fulfillment>('delivery');
  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [orderNumber, setOrderNumber] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '', city: 'Guayaquil', address: '', card: '' });

  useEffect(() => {
    const savedCart = window.sessionStorage.getItem('casa-viva-cart');
    if (savedCart) setLines(JSON.parse(savedCart));
  }, []);

  const subtotal = useMemo(() => lines.reduce((sum, line) => sum + line.price * line.quantity, 0), [lines]);
  const shipping = fulfillment === 'pickup' || subtotal >= site.shippingThreshold ? 0 : site.shippingFee;
  const total = subtotal + shipping;
  const update = (field: keyof typeof form, value: string) => setForm((current) => ({ ...current, [field]: value }));

  const next = (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    const catalog = localRepository.read(keys.products, products);
    const unavailable = lines.find(line => { const product = catalog.find(p => p.id === line.id); return !product || !Number.isInteger(line.quantity) || line.quantity < 1 || line.quantity > product.stock; });
    if (unavailable) return setError('Uno de los productos ya no tiene stock suficiente. Vuelve a la tienda y actualiza el carrito.');
    if (lines.some(line => line.price !== catalog.find(p => p.id === line.id)?.price)) {
      setLines(lines.map(line => ({ ...line, ...catalog.find(p => p.id === line.id), quantity:line.quantity })));
      return setError('Los precios cambiaron. Revisa el nuevo total y vuelve a confirmar.');
    }
    if (step === 'details') setStep('payment');
    else {
      const id = `PY-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,6)}`;
      const order: DemoOrder = { id, createdAt: new Date().toISOString(), customer: { name: form.name, email: form.email, phone: form.phone }, fulfillment, city: form.city, address: form.address, total, status: fulfillment === 'pickup' ? 'ready_for_pickup' : 'preparing', items: lines };
      const previous = localRepository.read<DemoOrder[]>(keys.orders, []);
      const customers = localRepository.read<Customer[]>(keys.customers, []);
      const email = form.email.trim().toLowerCase();
      const existing = customers.find(c => c.email.toLowerCase() === email);
      const customer: Customer = { id:existing?.id ?? id, name:form.name.trim(), email, phone:form.phone, city:form.city, notes:existing?.notes ?? '' };
      const movements = localRepository.read<StockMovement[]>(keys.movements, []);
      const updatedCatalog = catalog.map(product => { const line = lines.find(item => item.id === product.id); return line ? { ...product, stock:product.stock-line.quantity } : product; });
      const newMovements: StockMovement[] = lines.map(line => { const p = catalog.find(p => p.id === line.id)!; return { id:id+'-'+p.id, productId:p.id, productName:p.name, before:p.stock, after:p.stock-line.quantity, reason:'Pedido '+id, createdAt:order.createdAt }; });
      try { commitLocal({ [keys.orders]:[order,...previous], [keys.products]:updatedCatalog, [keys.customers]:existing?customers.map(c=>c.id===customer.id?customer:c):[customer,...customers], [keys.movements]:[...newMovements,...movements] }); }
      catch { return setError('No se pudo guardar el pedido en este navegador. Intenta de nuevo.'); }
      setOrderNumber(id);
      window.sessionStorage.removeItem('casa-viva-cart');
      setStep('success');
    }
  };

  if (step === 'success') return <main className="checkout-shell"><div className="checkout-success"><div className="success-icon"><Icon name="Check" size={30} /></div><span className="eyebrow">Pedido confirmado</span><h1>Gracias, {form.name.split(' ')[0] || 'por tu compra'}.</h1><p>Tu pedido <strong>#{orderNumber}</strong> está siendo preparado. Compra académica simulada. Consulta el estado en el panel de administración.</p><div className="success-summary"><span>{fulfillment === 'pickup' ? 'Retiro en tienda' : 'Entrega a domicilio'}</span><strong>{formatCurrency(total)}</strong></div><Link className="button button-dark" href="/">Seguir explorando <Icon name="ArrowRight" size={17} /></Link></div></main>;

  if (!lines.length) return <main className="checkout-shell"><div className="checkout-empty"><Icon name="ShoppingBag" size={34} /><h1>Tu carrito está vacío</h1><p>Agrega productos antes de continuar con tu compra.</p><Link className="button button-dark" href="/">Explorar productos</Link></div></main>;

  return <main className="checkout-shell"><header className="checkout-header"><Link href="/" className="brand" aria-label="PYCCA inicio"><img className="pycca-logo" src={withBasePath(site.logo)} alt={site.name} width="150" height="48" /></Link><span><Icon name="ShieldCheck" size={15} /> Compra segura</span></header><div className="checkout-progress"><span className={step === 'details' ? 'active' : 'done'}>1. Entrega</span><i /><span className={step === 'payment' ? 'active' : ''}>2. Pago</span><i /><span>3. Confirmación</span></div><div className="checkout-layout"><form className="checkout-form" onSubmit={next}>{error && <p role="alert" className="manage-error">{error}</p>}<div className="checkout-card"><div className="checkout-card-heading"><div><span className="eyebrow">Paso {step === 'details' ? '1' : '2'} de 2</span><h1>{step === 'details' ? '¿Cómo quieres recibirlo?' : 'Confirma tu pago'}</h1></div><Link href="/" className="back-link"><Icon name="ArrowLeft" size={15} /> Seguir comprando</Link></div>{step === 'details' ? <><div className="fulfillment-options"><button type="button" className={fulfillment === 'delivery' ? 'selected' : ''} onClick={() => setFulfillment('delivery')}><Icon name="Truck" size={20} /><strong>Entrega a domicilio</strong><small>Recibe en 2–5 días hábiles</small></button><button type="button" className={fulfillment === 'pickup' ? 'selected' : ''} onClick={() => setFulfillment('pickup')}><Icon name="Store" size={20} /><strong>Retiro en tienda</strong><small>Listo en 24 horas · gratis</small></button></div><div className="checkout-fields"><label>Nombre completo<input required value={form.name} onChange={(event) => update('name', event.target.value)} placeholder="Ana Belén" /></label><label>Correo electrónico<input required type="email" value={form.email} onChange={(event) => update('email', event.target.value)} placeholder="ana@correo.com" /></label><label>Teléfono<input required value={form.phone} onChange={(event) => update('phone', event.target.value)} placeholder="099 000 0000" /></label><label>Ciudad<select value={form.city} onChange={(event) => update('city', event.target.value)}><option>Guayaquil</option><option>Quito</option><option>Cuenca</option><option>Manta</option><option>Machala</option></select></label>{fulfillment === 'delivery' ? <label className="field-wide">Dirección de entrega<input required value={form.address} onChange={(event) => update('address', event.target.value)} placeholder="Calle, número y referencia" /></label> : <div className="pickup-note field-wide"><Icon name="MapPin" size={18} /><span><strong>Matriz Guayaquil</strong><small>Av. Carlos Julio Arosemena 1205 · Te avisaremos cuando esté listo.</small></span></div>}</div></> : <><div className="payment-method selected"><div className="payment-icon"><Icon name="CreditCard" size={20} /></div><div><strong>Tarjeta de crédito o débito</strong><small>Simulación académica · no se realiza ningún cobro</small></div><span className="card-logos">VISA · MC</span></div><label className="checkout-label">Número de tarjeta<input required minLength={12} value={form.card} onChange={(event) => update('card', event.target.value)} placeholder="4111 1111 1111 1111" /></label><div className="checkout-fields"><label>Vencimiento<input required placeholder="MM / AA" /></label><label>CVV<input required minLength={3} placeholder="123" /></label></div><p className="academic-payment"><Icon name="Info" size={15} /> Esta demo guarda el pedido, pero no almacena datos de tarjeta ni realiza cobros.</p></>}</div><button className="button button-primary checkout-submit" type="submit">{step === 'details' ? 'Continuar al pago' : 'Confirmar pedido'} <Icon name="ArrowRight" size={17} /></button></form><aside className="checkout-summary"><div className="checkout-card"><div className="checkout-card-heading"><div><span className="eyebrow">Tu selección</span><h2>Resumen del pedido</h2></div><span>{lines.reduce((sum, line) => sum + line.quantity, 0)} artículos</span></div><div className="checkout-lines">{lines.map((line) => <div className="checkout-line" key={line.id}><img src={withBasePath(line.image)} alt="" /><div><strong>{line.name}</strong><small>Cantidad: {line.quantity}</small></div><b>{formatCurrency(line.price * line.quantity)}</b></div>)}</div><div className="summary-totals"><span>Subtotal <b>{formatCurrency(subtotal)}</b></span><span>{fulfillment === 'pickup' ? 'Retiro en tienda' : 'Envío'} <b>{shipping ? formatCurrency(shipping) : 'Gratis'}</b></span><strong>Total <b>{formatCurrency(total)}</b></strong></div></div><div className="checkout-trust"><Icon name="ShieldCheck" size={18} /><span><strong>Compra protegida</strong><small>Compra académica simulada.</small></span></div></aside></div></main>;
}
