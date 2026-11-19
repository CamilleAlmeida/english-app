'use client';

import { useEffect, useState } from 'react';
import NavBottom from '@/components/ui/NavBottom';
import BlockCard from '@/components/ui/BlockCard';
import { BookOpen, Brackets, GraduationCap } from 'lucide-react';
import { BlockType, DifficultyLevel } from '@/types/database';
import { getBlockProgress } from '@/lib/progress-store';
import { getUserLevel } from '@/lib/level-store';
import { getBlocksByLevel } from '@/lib/seed-loader';

interface BlockDisplay {
  id: string;
  name: string;
  type: BlockType;
  totalItems: number;
  completedItems: number;
  unlocked: boolean;
}

type Tab = 'VOCAB' | 'GRAMMAR';

const levelLabels: Record<DifficultyLevel, string> = {
  beginner: 'Iniciante',
  intermediate: 'Intermediário',
  advanced: 'Avançado',
};

const levelColors: Record<DifficultyLevel, string> = {
  beginner: 'bg-level-beginner text-level-beginner-fg border-level-beginner',
  intermediate: 'bg-level-intermediate text-level-intermediate-fg border-level-intermediate',
  advanced: 'bg-level-advanced text-level-advanced-fg border-level-advanced',
};

export default function BlocksPage() {
  const [activeTab, setActiveTab] = useState<Tab>('VOCAB');
  const [activeLevel, setActiveLevel] = useState<DifficultyLevel>('beginner');
  const [blocks, setBlocks] = useState<BlockDisplay[]>([]);

  useEffect(() => {
    const userLevel = getUserLevel();
    setActiveLevel(userLevel);
  }, []);

  useEffect(() => {
    const levelBlocks = getBlocksByLevel(activeLevel);
    const displayBlocks: BlockDisplay[] = levelBlocks.map(b => {
      const progress = getBlockProgress(b.id);
      return {
        id: b.id,
        name: b.name,
        type: b.type as BlockType,
        totalItems: b.items.length,
        completedItems: progress.filter(p => p.state === 'DONE').length,
        unlocked: true,
      };
    });
    setBlocks(displayBlocks);
  }, [activeLevel]);

  const filteredBlocks = blocks.filter(b => b.type === activeTab);

  return (
    <div className="px-4 pt-6">
      <h1 className="text-2xl font-semibold font-display">Blocos</h1>
      <p className="text-fg-muted mt-1">Escolha um bloco para estudar</p>

      {/* Level tabs */}
      <div className="flex gap-1.5 mt-4 mb-3">
        {(['beginner', 'intermediate', 'advanced'] as DifficultyLevel[]).map(level => (
          <button
            key={level}
            onClick={() => setActiveLevel(level)}
            className={`flex-1 py-1.5 rounded-[var(--radius-pill)] text-xs font-medium transition-colors flex items-center justify-center gap-1 border ${
              activeLevel === level
                ? levelColors[level]
                : 'bg-surface-2 text-fg-muted border-transparent hover:bg-surface-2/80'
            }`}
          >
            <GraduationCap size={13} />
            {levelLabels[level]}
          </button>
        ))}
      </div>

      {/* Type tabs */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab('VOCAB')}
          className={`flex-1 py-2 rounded-[var(--radius-pill)] text-sm font-medium transition-colors flex items-center justify-center gap-1 ${
            activeTab === 'VOCAB'
              ? 'bg-primary text-primary-fg'
              : 'bg-surface-2 text-fg-muted hover:bg-surface-2/80'
          }`}
        >
          <BookOpen size={16} /> Vocabulário
        </button>
        <button
          onClick={() => setActiveTab('GRAMMAR')}
          className={`flex-1 py-2 rounded-[var(--radius-pill)] text-sm font-medium transition-colors flex items-center justify-center gap-1 ${
            activeTab === 'GRAMMAR'
              ? 'bg-primary text-primary-fg'
              : 'bg-surface-2 text-fg-muted hover:bg-surface-2/80'
          }`}
        >
          <Brackets size={16} /> Gramática
        </button>
      </div>

      {/* Block list */}
      <div className="flex flex-col gap-3">
        {filteredBlocks.length === 0 ? (
          <div className="text-center py-12 text-fg-muted">
            <GraduationCap size={40} className="mx-auto mb-3 opacity-40" />
            <p className="text-sm">Nenhum bloco disponível neste nível ainda.</p>
          </div>
        ) : (
          filteredBlocks.map((block) => (
            <BlockCard
              key={block.id}
              name={block.name}
              type={block.type}
              totalItems={block.totalItems}
              completedItems={block.completedItems}
              unlocked={block.unlocked}
              onClick={() => {
                if (block.unlocked) {
                  window.location.href = `/study/${block.id}`;
                }
              }}
            />
          ))
        )}
      </div>

      <NavBottom />
    </div>
  );
}
