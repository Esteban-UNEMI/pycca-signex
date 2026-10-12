'use client';
import { useEffect, useRef, type RefObject } from 'react';
/** Keyboard focus stays in a modal; Escape closes it and focus returns to the trigger. */
export function useDialog(open:boolean,ref:RefObject<HTMLElement>,onClose:()=>void) {
  const close=useRef(onClose);close.current=onClose;
  useEffect(()=>{if(!open)return;const previous=document.activeElement as HTMLElement|null;const overflow=document.body.style.overflow;document.body.style.overflow='hidden';
    const controls=()=>Array.from(ref.current?.querySelectorAll<HTMLElement>('button:not(:disabled),a[href],input:not(:disabled),select,textarea,[tabindex="0"]')??[]).filter(el=>el.getClientRects().length>0);
    controls()[0]?.focus();
    const keydown=(event:KeyboardEvent)=>{if(event.key==='Escape'){event.preventDefault();close.current();}if(event.key==='Tab'){const items=controls(),first=items[0],last=items[items.length-1];if(!first){event.preventDefault();return;}if(event.shiftKey&&(document.activeElement===first||!ref.current?.contains(document.activeElement))){event.preventDefault();last.focus();}else if(!event.shiftKey&&(document.activeElement===last||!ref.current?.contains(document.activeElement))){event.preventDefault();first.focus();}}};
    document.addEventListener('keydown',keydown);return()=>{document.body.style.overflow=overflow;document.removeEventListener('keydown',keydown);if(previous?.isConnected)previous.focus();};
  },[open,ref]);
}
