'use client';
import { useLocalEntity } from '@/lib/local-repository';
export function useWishlist() {
  const store=useLocalEntity<string[]>('pycca-wishlist',[]);
  const ids=store.value.filter(id=>typeof id==='string');
  const toggle=(id:string)=>store.save(ids.includes(id)?ids.filter(item=>item!==id):[...ids,id]);
  return {ids,toggle,ready:store.ready,error:store.error};
}
