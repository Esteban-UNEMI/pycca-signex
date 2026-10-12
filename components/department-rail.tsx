import Image from 'next/image';
import Link from 'next/link';
import { Department } from '@/lib/types';
import { Icon } from './icon';
import { withBasePath } from '@/lib/site-path';

export function DepartmentRail({ departments }: { departments: Department[] }) {
  return <section className="department-rail-section container" aria-label="Todos los departamentos">
    <div className="department-rail-heading"><div><span className="eyebrow">Compra por categoría</span><h2>Un mundo para <em>descubrir</em></h2></div><span className="rail-hint"><Icon name="ArrowLeft" size={14} /> Desliza para explorar <Icon name="ArrowRight" size={14} /></span></div>
    <div className="department-rail">
      {departments.map((department) => <Link href={`/categoria/${department.slug}`} className="department-chip" key={department.id}>
        <span className="department-chip-image"><Image src={withBasePath(department.image)} alt="" fill sizes="120px" /></span>
        <span className="department-chip-copy"><strong>{department.name}</strong><small>{department.subcategories.length} secciones</small></span>
        <Icon name="ArrowUpRight" size={15} />
      </Link>)}
    </div>
  </section>;
}
