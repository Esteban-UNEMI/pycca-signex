import type { Metadata } from 'next';
import { WishlistPage } from '@/components/wishlist-page';
export const metadata:Metadata={title:'Mis favoritos | PYCCA'};
export default function Page(){return <WishlistPage/>;}
