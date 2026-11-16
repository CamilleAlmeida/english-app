'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, X, ChevronRight } from 'lucide-react';
import { referenceTopics } from '@/data/reference-content';

export default function ReferencePage() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return referenceTopics;
    const q = query.toLowerCase().trim();
    return referenceTopics.filter((topic) => {
      // search title, description, keywords
      if (topic.title.toLowerCase().includes(q)) return true;
      if (topic.description.toLowerCase().includes(q)) return true;
      if (topic.keywords.some((k) => k.toLowerCase().includes(q))) return true;
      // search inside sections content
      return topic.sections.some(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.explanation.toLowerCase().includes(q) ||
          s.examples.some(
            (ex) =>
              ex.en.toLowerCase().includes(q) || ex.pt.toLowerCase().includes(q),
          ),
      );
    });
  }, [query]);

  return (
    <main className="min-h-screen bg-bg pb-24 pt-6">
      <div className="mx-auto max-w-md px-4">
        {/* Header */}
        <h1 className="font-display text-2xl font-bold text-fg">
          📖 Consulta
        </h1>
        <p className="mt-1 text-sm text-fg-muted">
          Pesquise qualquer dúvida de inglês
        </p>

        {/* Search */}
        <div className="relative mt-4">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-fg-muted"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar: verbo, pronome, gíria..."
            className="w-full rounded-[var(--radius-pill)] border border-border bg-surface py-2.5 pl-10 pr-10 text-sm text-fg placeholder:text-fg-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-fg-muted hover:text-fg"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Results count when searching */}
        {query.trim() && (
          <p className="mt-3 text-xs text-fg-muted">
            {filtered.length === 0
              ? 'Nenhum resultado encontrado'
              : `${filtered.length} tópico${filtered.length !== 1 ? 's' : ''} encontrado${filtered.length !== 1 ? 's' : ''}`}
          </p>
        )}

        {/* Topic cards */}
        <div className="mt-4 space-y-3">
          {filtered.map((topic) => (
            <Link
              key={topic.slug}
              href={`/reference/${topic.slug}`}
              className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4 shadow-ds-sm transition-all hover:shadow-ds-md active:scale-[0.98]"
            >
              <span className="text-2xl">{topic.icon}</span>
              <div className="flex-1 min-w-0">
                <h2 className="font-display text-base font-semibold text-fg">
                  {topic.title}
                </h2>
                <p className="mt-0.5 text-xs text-fg-muted truncate">
                  {topic.description}
                </p>
              </div>
              <ChevronRight size={18} className="shrink-0 text-fg-muted" />
            </Link>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && query.trim() && (
          <div className="mt-8 text-center">
            <p className="text-4xl">🔍</p>
            <p className="mt-2 text-sm text-fg-muted">
              Tente buscar por outro termo, como &quot;verbo&quot;, &quot;porque&quot; ou &quot;gíria&quot;
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
