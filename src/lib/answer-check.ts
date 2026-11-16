/**
 * Answer comparison — tolerant to case, punctuation, accents,
 * curly apostrophes and common contractions (I'm = I am, doesn't = does not).
 */

const CONTRACTIONS: [RegExp, string][] = [
  [/\bdoesn't\b/g, 'does not'],
  [/\bdon't\b/g, 'do not'],
  [/\bisn't\b/g, 'is not'],
  [/\baren't\b/g, 'are not'],
  [/\bcan't\b/g, 'cannot'],
  [/\bi'm\b/g, 'i am'],
  [/\bit's\b/g, 'it is'],
  [/\bhe's\b/g, 'he is'],
  [/\bshe's\b/g, 'she is'],
  [/\bwe're\b/g, 'we are'],
  [/\bthey're\b/g, 'they are'],
  [/\byou're\b/g, 'you are'],
  [/\bwhat's\b/g, 'what is'],
  [/\bwhere's\b/g, 'where is'],
  [/\bwho's\b/g, 'who is'],
  [/\bthere's\b/g, 'there is'],
];

export function normalize(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // remove accents
    .toLowerCase()
    .replace(/[’‘`´]/g, "'")
    .replace(/[.,!?;:"]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function expandContractions(text: string): string {
  return CONTRACTIONS.reduce((acc, [pattern, full]) => acc.replace(pattern, full), text);
}

export function isAnswerCorrect(userAnswer: string, correctAnswer: string): boolean {
  const u = normalize(userAnswer);
  const c = normalize(correctAnswer);
  if (!u) return false;
  if (u === c) return true;
  return expandContractions(u) === expandContractions(c);
}

/** Replaces the first whole-word occurrence of `gap` in `sentence` with a blank. */
export function blankOut(sentence: string, gap: string): string {
  const escaped = gap.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`\\b${escaped}\\b`, 'i');
  return regex.test(sentence) ? sentence.replace(regex, '_____') : `${sentence} (_____)`;
}

export function shuffle<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
