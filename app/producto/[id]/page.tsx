import { ProductPage } from '@/components/product-page';
import { products } from '@/lib/data';
export function generateStaticParams() { return products.map(p => ({id:p.id})); }

export default function ProductRoute({ params }: { params: { id: string } }) {
  const product = products.find((item) => item.id === params.id);
  if (!product) return <ProductPage product={products[0]} productId={params.id} />;
  return <ProductPage product={product} productId={params.id} />;
}
