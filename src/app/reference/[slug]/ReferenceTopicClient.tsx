'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Search, X, Lightbulb } from 'lucide-react';
import { referenceTopics } from '@/data/reference-content';

export default function ReferenceTopicClient({ slug }: { slug: string }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const topic = referenceTopics.find((t) => t.slug === slug);

  const filteredSections = useMemo(() => {
    if (!topic) return [];
    if (!searchQuery.trim()) return topic.sections;
    const q = searchQuery.toLowerCase().trim();
    return topic.sections.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.explanation.toLowerCase().includes(q) ||
        s.examples.some(
          (ex) =>
            ex.en.toLowerCase().includes(q) || ex.pt.toLowerCase().includes(q),
        ) ||
        (s.tip && s.tip.toLowerCase().includes(q)),
    );
  }, [topic, searchQuery]);

  if (!topic) {
    return (
      <main className="min-h-screen bg-bg pb-24 pt-6">
        <div className="mx-auto max-w-md px-4 text-center">
          <p className="text-4xl">😕</p>
          <p className="mt-2 text-fg-muted">Tópico não encontrado</p>
          <button
            onClick={() => router.push('/reference')}
            className="mt-4 rounded-[var(--radius-pill)] bg-primary px-6 py-2 text-sm font-medium text-white"
          >
            Voltar para Consulta
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-bg pb-24 pt-6">
      <div className="mx-auto max-w-md px-4">
        {/* Back button + Title */}
        <button
          onClick={() => router.push('/reference')}
          className="flex items-center gap-1.5 text-sm font-medium text-primary"
        >
          <ArrowLeft size={18} />
          Consulta
        </button>

        <div className="mt-3 flex items-center gap-3">
          <span className="text-3xl">{topic.icon}</span>
          <div>
            <h1 className="font-display text-2xl font-bold text-fg">
              {topic.title}
            </h1>
            <p className="text-sm text-fg-muted">{topic.description}</p>
          </div>
        </div>

        {/* In-topic search */}
        <div className="relative mt-4">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-fg-muted"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Buscar em ${topic.title}...`}
            className="w-full rounded-[var(--radius-pill)] border border-border bg-surface py-2 pl-9 pr-9 text-sm text-fg placeholder:text-fg-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-fg-muted hover:text-fg"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Sections */}
        <div className="mt-5 space-y-5">
          {filteredSections.map((section, idx) => (
            <section
              key={idx}
              className="rounded-2xl border border-border bg-surface p-4 shadow-ds-sm"
            >
              <h2 className="font-display text-base font-semibold text-fg">
                {section.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                {section.explanation}
              </p>

              {/* Examples */}
              <div className="mt-3 space-y-2">
                {section.examples.map((ex, i) => (
                  <div
                    key={i}
                    className="rounded-xl bg-primary-soft p-3"
                  >
                    <p className="text-sm font-medium text-fg">{ex.en}</p>
                    <p className="mt-0.5 text-xs text-fg-muted">{ex.pt}</p>
                  </div>
                ))}
              </div>

              {/* Tip */}
              {section.tip && (
                <div className="mt-3 flex gap-2 rounded-xl bg-[var(--color-warning-soft,#FFF8E1)] p-3">
                  <Lightbulb
                    size={16}
                    className="mt-0.5 shrink-0 text-[var(--color-warning,#F59E0B)]"
                  />
                  <p className="text-xs leading-relaxed text-fg">
                    <span className="font-semibold">Dica: </span>
                    {section.tip}
                  </p>
                </div>
              )}
            </section>
          ))}

          {filteredSections.length === 0 && searchQuery.trim() && (
            <div className="mt-4 text-center">
              <p className="text-3xl">🔍</p>
              <p className="mt-2 text-sm text-fg-muted">
                Nenhum conteúdo encontrado para &quot;{searchQuery}&quot;
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
