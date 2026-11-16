import Link from 'next/link';
import { getAllBlockIds, getBlockById } from '@/lib/seed-loader';
import StudySession from '@/components/exercises/StudySession';

export const instant = false;

export function generateStaticParams() {
  return getAllBlockIds().map((blockId) => ({ blockId }));
}

export default async function StudyPage({ params }: { params: Promise<{ blockId: string }> }) {
  const { blockId } = await params;
  const block = getBlockById(blockId);

  if (!block || block.items.length === 0) {
    return (
      <div className="px-4 pt-16 text-center">
        <p className="text-5xl">🚧</p>
        <h1 className="mt-4 text-xl font-semibold font-display">Bloco em construção</h1>
        <p className="mt-2 text-fg-muted">O conteúdo deste bloco ainda está sendo preparado.</p>
        <Link href="/blocks" className="mt-6 inline-block rounded-[var(--radius-pill)] bg-primary px-6 py-3 font-medium text-primary-fg">
          Voltar aos blocos
        </Link>
      </div>
    );
  }

  return <StudySession block={block} />;
}
