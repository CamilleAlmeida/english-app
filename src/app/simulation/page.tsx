'use client';

import { useEffect, useState } from 'react';
import { LoadedBlock, getAllBlockIds, getBlockById } from '@/lib/seed-loader';
import SimulationSession from '@/components/exercises/SimulationSession';
import NavBottom from '@/components/ui/NavBottom';

export default function SimulationPage() {
  const [blocks, setBlocks] = useState<LoadedBlock[] | null>(null);

  useEffect(() => {
    const ids = getAllBlockIds();
    const loaded: LoadedBlock[] = [];
    for (const id of ids) {
      const block = getBlockById(id);
      if (block) loaded.push(block);
    }
    setBlocks(loaded);
  }, []);

  if (!blocks) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <p className="text-fg-muted">Carregando...</p>
      </div>
    );
  }

  if (blocks.length === 0) {
    return (
      <div className="min-h-screen bg-bg">
        <div className="mx-auto max-w-md px-4 pt-10 text-center">
          <p className="text-4xl">📭</p>
          <h1 className="mt-3 text-xl font-semibold font-display">Nenhum bloco disponível</h1>
          <p className="mt-1 text-fg-muted text-sm">Estude pelo menos um bloco antes de fazer o simulado.</p>
        </div>
        <NavBottom />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg pb-24">
      <div className="mx-auto max-w-md">
        <SimulationSession blocks={blocks} />
      </div>
      <NavBottom />
    </div>
  );
}
