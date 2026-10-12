import type { Metadata } from 'next';
import { ManagedCategory } from '@/components/managed-category';
export const metadata:Metadata={title:'Espacio Bebés · Cunas y primeros momentos | PYCCA',description:'Colección académica de cunas, textiles, baño y paseo para bebés.'};
export default function Page(){return <ManagedCategory slug="bebes"/>;}
