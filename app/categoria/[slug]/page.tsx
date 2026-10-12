import { ManagedCategory } from '@/components/managed-category';
import { departments } from '@/lib/data';
export function generateStaticParams() { return departments.map(d => ({slug:d.slug})); }
export default function DepartmentRoute({ params }: { params: { slug:string } }) { return <ManagedCategory slug={params.slug} />; }
