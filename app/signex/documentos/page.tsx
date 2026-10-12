import type { Metadata } from 'next';
import { SignexDocumentLibrary } from '@/components/signex-document-library';

export const metadata: Metadata = {
  title: 'Archivo del proyecto · SIGNEX × PYCCA Bebé',
  description: 'Dossier, documentos de investigación y presentaciones del proyecto integrador SIGNEX para consulta docente.',
};

export default function SignexDocumentsPage() {
  return <SignexDocumentLibrary />;
}

