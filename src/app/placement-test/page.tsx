'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, ArrowRight, GraduationCap, Trophy } from 'lucide-react';
import { DifficultyLevel } from '@/types/database';
import { setUserLevel, markLevelTestDone } from '@/lib/level-store';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  /** 1 = beginner, 2 = intermediate, 3 = advanced */
  weight: 1 | 2 | 3;
}

const questions: Question[] = [
  // Beginner (weight 1)
  { id: 1, question: 'Como se diz "obrigado" em inglês?', options: ['Please', 'Sorry', 'Thank you', 'Excuse me'], correctIndex: 2, weight: 1 },
  { id: 2, question: 'Complete: "She ___ a student."', options: ['am', 'is', 'are', 'be'], correctIndex: 1, weight: 1 },
  { id: 3, question: 'Qual é o plural de "child"?', options: ['childs', 'childrens', 'children', 'childes'], correctIndex: 2, weight: 1 },
  { id: 4, question: 'O que significa "breakfast"?', options: ['Almoço', 'Jantar', 'Café da manhã', 'Lanche'], correctIndex: 2, weight: 1 },

  // Intermediate (weight 2)
  { id: 5, question: 'Complete: "If I ___ rich, I would travel the world."', options: ['am', 'was', 'were', 'be'], correctIndex: 2, weight: 2 },
  { id: 6, question: 'Qual a forma correta? "I have been ___ for two hours."', options: ['wait', 'waited', 'waiting', 'to wait'], correctIndex: 2, weight: 2 },
  { id: 7, question: '"She came up with a great idea." O que significa "came up with"?', options: ['Desistiu de', 'Inventou/criou', 'Cancelou', 'Recusou'], correctIndex: 1, weight: 2 },
  { id: 8, question: 'Complete: "The meeting was ___ due to the storm."', options: ['called off', 'called on', 'called up', 'called in'], correctIndex: 0, weight: 2 },

  // Advanced (weight 3)
  { id: 9, question: 'Complete: "The report ___ by the team last week."', options: ['wrote', 'was written', 'has wrote', 'is writing'], correctIndex: 1, weight: 3 },
  { id: 10, question: '"He is said to be very rich." Qual a melhor tradução?', options: ['Ele disse ser muito rico.', 'Diz-se que ele é muito rico.', 'Ele era muito rico.', 'Ele ficou muito rico.'], correctIndex: 1, weight: 3 },
  { id: 11, question: 'Qual frase usa "however" corretamente?', options: ['However I like pizza.', 'The plan was good; however, it failed.', 'However, she is come.', 'I however not agree.'], correctIndex: 1, weight: 3 },
  { id: 12, question: '"I look forward to hearing from you." Quando se usa?', options: ['Em conversas informais', 'Em e-mails formais como despedida', 'Para reclamar de algo', 'Para pedir desculpas'], correctIndex: 1, weight: 3 },
];

function calculateLevel(answers: Record<number, number>): DifficultyLevel {
  let beginnerCorrect = 0;
  let intermediateCorrect = 0;
  let advancedCorrect = 0;
  let beginnerTotal = 0;
  let intermediateTotal = 0;
  let advancedTotal = 0;

  for (const q of questions) {
    if (q.weight === 1) {
      beginnerTotal++;
      if (answers[q.id] === q.correctIndex) beginnerCorrect++;
    } else if (q.weight === 2) {
      intermediateTotal++;
      if (answers[q.id] === q.correctIndex) intermediateCorrect++;
    } else {
      advancedTotal++;
      if (answers[q.id] === q.correctIndex) advancedCorrect++;
    }
  }

  const beginnerPct = beginnerCorrect / beginnerTotal;
  const intermediatePct = intermediateCorrect / intermediateTotal;
  const advancedPct = advancedCorrect / advancedTotal;

  // If strong on advanced questions → advanced
  if (advancedPct >= 0.5 && intermediatePct >= 0.5) return 'advanced';
  // If strong on intermediate → intermediate
  if (intermediatePct >= 0.5 && beginnerPct >= 0.5) return 'intermediate';
  // Otherwise beginner
  return 'beginner';
}

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

export default function PlacementTestPage() {
  const router = useRouter();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<DifficultyLevel>('beginner');

  const question = questions[currentQ];
  const totalQuestions = questions.length;
  const progress = ((currentQ) / totalQuestions) * 100;

  function handleSelect(optionIndex: number) {
    if (selectedOption !== null) return; // already selected
    setSelectedOption(optionIndex);
    const newAnswers = { ...answers, [question.id]: optionIndex };
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentQ < totalQuestions - 1) {
        setCurrentQ(currentQ + 1);
        setSelectedOption(null);
      } else {
        const level = calculateLevel(newAnswers);
        setResult(level);
        setShowResult(true);
      }
    }, 600);
  }

  function handleFinish(chosenLevel: DifficultyLevel) {
    setUserLevel(chosenLevel);
    markLevelTestDone();
    try {
      localStorage.setItem('english-app-onboarded', 'true');
    } catch {}
    router.push('/');
  }

  if (showResult) {
    const totalCorrect = questions.filter(q => answers[q.id] === q.correctIndex).length;
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-splash">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-white/15 mx-auto mb-4 flex items-center justify-center">
            <Trophy size={40} className="text-accent" />
          </div>
          <h1 className="text-2xl font-bold font-display text-white">Resultado do Teste</h1>
          <p className="text-white/90 mt-2">
            Você acertou <span className="font-bold text-white">{totalCorrect}</span> de {totalQuestions} questões
          </p>

          <div className={`mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-[var(--radius-pill)] border text-lg font-bold ${levelColors[result]}`}>
            <GraduationCap size={24} />
            {levelLabels[result]}
          </div>

          <p className="text-white/90 text-sm mt-4">
            Recomendamos que você comece pelo nível <strong>{levelLabels[result]}</strong>.
            Você pode mudar o nível a qualquer momento.
          </p>

          <button
            onClick={() => handleFinish(result)}
            className="flex items-center justify-center gap-2 w-full mt-6 bg-accent text-accent-fg font-semibold py-4 rounded-[var(--radius-pill)] text-lg hover:opacity-90 active:scale-[0.98] transition-all shadow-ds-md"
          >
            Começar como {levelLabels[result]} <ArrowRight size={20} />
          </button>

          {/* Allow choosing a different level */}
          <div className="mt-4 space-y-2">
            {(['beginner', 'intermediate', 'advanced'] as DifficultyLevel[])
              .filter(l => l !== result)
              .map(l => (
                <button
                  key={l}
                  onClick={() => handleFinish(l)}
                  className="block w-full text-sm text-white/90 hover:text-white py-2 transition-colors"
                >
                  Prefiro começar como {levelLabels[l]}
                </button>
              ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-splash">
      <div className="max-w-md w-full">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-white/90 mb-1">
            <span>Questão {currentQ + 1} de {totalQuestions}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-2 bg-white/25 rounded-full overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question card */}
        <div className="bg-surface rounded-[var(--radius-lg)] border border-border p-6 shadow-ds-md">
          <div className="mb-1">
            <span className={`text-xs px-2 py-0.5 rounded-full border ${
              question.weight === 1 ? 'bg-level-beginner text-level-beginner-fg border-level-beginner' :
              question.weight === 2 ? 'bg-level-intermediate text-level-intermediate-fg border-level-intermediate' :
              'bg-level-advanced text-level-advanced-fg border-level-advanced'
            }`}>
              {question.weight === 1 ? 'Básico' : question.weight === 2 ? 'Intermediário' : 'Avançado'}
            </span>
          </div>
          <h2 className="text-lg font-semibold text-fg mt-3 mb-5">{question.question}</h2>

          <div className="space-y-3">
            {question.options.map((option, i) => {
              const isSelected = selectedOption === i;
              const isCorrect = i === question.correctIndex;
              let optionClass = 'bg-surface-2 border-border hover:border-primary';

              if (selectedOption !== null) {
                if (isCorrect) {
                  optionClass = 'bg-success-soft border-success text-fg';
                } else if (isSelected && !isCorrect) {
                  optionClass = 'bg-danger-soft border-danger text-fg';
                } else {
                  optionClass = 'bg-surface-2 border-border opacity-50';
                }
              }

              return (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  disabled={selectedOption !== null}
                  className={`w-full text-left px-4 py-3 rounded-[var(--radius-md)] border transition-all ${optionClass} flex items-center gap-3`}
                >
                  <span className="w-7 h-7 rounded-full border flex items-center justify-center text-xs font-medium flex-shrink-0">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="text-sm">{option}</span>
                  {selectedOption !== null && isCorrect && (
                    <CheckCircle2 size={18} className="ml-auto text-success" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
