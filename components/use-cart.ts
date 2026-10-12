'use client';
import { useEffect, useMemo, useState } from 'react';
import { products } from '@/lib/data';
import type { CartLine, Product } from '@/lib/types';
import { keys, useLocalEntity } from '@/lib/local-repository';
const cartKey = 'casa-viva-cart';
function readCart(): CartLine[] {
  try { const data=JSON.parse(sessionStorage.getItem(cartKey)??'[]'); return Array.isArray(data)?data.filter(p=>p&&typeof p.id==='string'&&Number.isInteger(p.quantity)&&p.quantity>0):[]; } catch { return []; }
}
export function useCart() {
  const [raw,setRaw]=useState<CartLine[]>([]),[ready,setReady]=useState(false);
  const catalog=useLocalEntity(keys.products,products).value;
  useEffect(()=>{const refresh=()=>{setRaw(readCart());setReady(true);};refresh();window.addEventListener('pycca-cart-change',refresh);return()=>window.removeEventListener('pycca-cart-change',refresh);},[]);
  const cart=useMemo(()=>raw.map(line=>{const current=catalog.find(p=>p.id===line.id);return current?{...current,quantity:line.quantity}:{...line,stock:0};}),[raw,catalog]);
  const write=(next:CartLine[])=>{try{sessionStorage.setItem(cartKey,JSON.stringify(next));setRaw(next);window.dispatchEvent(new Event('pycca-cart-change'));return true;}catch{return false;}};
  const add=(product:Product,quantity=1)=>{const current=catalog.find(p=>p.id===product.id);const saved=readCart();const existing=saved.find(p=>p.id===product.id);if(!current||!Number.isInteger(quantity)||quantity<1||(existing?.quantity??0)+quantity>current.stock)return false;return write(existing?saved.map(p=>p.id===product.id?{...current,quantity:p.quantity+quantity}:p):[...saved,{...current,quantity}]);};
  const updateQuantity=(id:string,quantity:number)=>{const current=catalog.find(p=>p.id===id);if(quantity<=0)return write(readCart().filter(p=>p.id!==id));if(!current||!Number.isInteger(quantity)||quantity>current.stock)return false;return write(readCart().map(p=>p.id===id?{...current,quantity}:p));};
  return {cart,cartCount:cart.reduce((sum,p)=>sum+p.quantity,0),add,updateQuantity,ready};
}
