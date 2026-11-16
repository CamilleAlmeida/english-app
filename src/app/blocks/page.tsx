'use client';

import { useEffect, useState } from 'react';
import NavBottom from '@/components/ui/NavBottom';
import BlockCard from '@/components/ui/BlockCard';
import { BookOpen, Brackets } from 'lucide-react';
import { BlockType } from '@/types/database';
import { getBlockProgress } from '@/lib/progress-store';
import vocabSeed from '@/data/seed/vocab-blocks.json';
import grammarSeed from '@/data/seed/grammar-blocks.json';

interface BlockDisplay {
  id: string;
  name: string;
  type: BlockType;
  totalItems: number;
  completedItems: number;
  unlocked: boolean;
}

// Blocos com seed real
const seededVocabIds = new Set(vocabSeed.map(b => b.name));
const seededGrammarIds = new Set(grammarSeed.map(b => b.name));

const vocabNameIds: [string, number][] = [
  ['Bathroom', 1], ['Kitchen', 2], ['Workplace', 3], ['Daily Routine', 4], ['Shopping', 5],
  ['Health & Body', 6], ['Getting Around', 7], ['Food & Eating Out', 8], ['Feelings & Opinions', 9], ['Tech & Online', 10],
  ['Slang & Idioms', 21],
];

const grammarNameIds: [string, number][] = [
  ['Foundations', 11], ['Daily Habits', 12], ['Right Now', 13], ['Looking Back', 14], ["What's Next", 15],
  ['Describing Things', 16], ['People & Possession', 17], ['Places & Quantities', 18], ['Abilities & Rules', 19], ['Advanced Structures', 20],
];

function buildBlocks(
  nameIds: [string, number][],
  type: BlockType,
  seedData: typeof vocabSeed | typeof grammarSeed,
  seededNames: Set<string>,
): BlockDisplay[] {
  return nameIds.map(([name, id]) => {
    const seed = seedData.find(b => b.name === name);
    const hasContent = seededNames.has(name);
    const blockId = String(id);

    return {
      id: blockId,
      name,
      type,
      totalItems: seed ? seed.items.length : 15,
      completedItems: 0, // will be filled from localStorage
      unlocked: hasContent,
    };
  });
}

type Tab = 'VOCAB' | 'GRAMMAR';

export default function BlocksPage() {
  const [activeTab, setActiveTab] = useState<Tab>('VOCAB');
  const [vocabBlocks, setVocabBlocks] = useState<BlockDisplay[]>([]);
  const [grammarBlocks, setGrammarBlocks] = useState<BlockDisplay[]>([]);

  useEffect(() => {
    const vBlocks = buildBlocks(vocabNameIds, 'VOCAB', vocabSeed, seededVocabIds);
    const gBlocks = buildBlocks(grammarNameIds, 'GRAMMAR', grammarSeed, seededGrammarIds);

    // Load completed counts from localStorage
    for (const block of [...vBlocks, ...gBlocks]) {
      const progress = getBlockProgress(block.id);
      block.completedItems = progress.filter(p => p.state === 'DONE').length;
    }

    setVocabBlocks(vBlocks);
    setGrammarBlocks(gBlocks);
  }, []);

  const blocks = activeTab === 'VOCAB' ? vocabBlocks : grammarBlocks;

  return (
    <div className="px-4 pt-6">
      <h1 className="text-2xl font-semibold font-display">Blocos</h1>
      <p className="text-fg-muted mt-1">Escolha um bloco para estudar</p>

      {/* Tabs */}
      <div className="flex gap-2 mt-4 mb-4">
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
        {blocks.map((block) => (
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
        ))}
      </div>

      <NavBottom />
    </div>
  );
}
