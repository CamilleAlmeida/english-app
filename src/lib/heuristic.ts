/**
 * Attention error humorous phrases
 * Shown when user classifies their error as "Attention"
 */
export const attentionPhrases: string[] = [
  'Seu cérebro foi tomar um café e não voltou ☕',
  'Alô? Tem alguém aí? 🧠💤',
  'Erro de piloto automático detectado 🤖',
  'Até o autocorrect ficou confuso com essa 😅',
  'Seu foco saiu pra passear e esqueceu de voltar 🚶',
  'Respirou fundo? Agora vai! 💪',
  'Esse erro foi tipo tropeçar no chão liso 🫠',
  'O Wi-Fi do seu cérebro caiu por 2 segundos 📡',
  'Calma, Einstein também errava no troco do pão 🍞',
  'Nota mental: café antes de estudar ☕📝',
  'Sua atenção tirou um cochilo relâmpago ⚡😴',
  'Errar sabendo é o equivalente acadêmico de bater o dedinho na mesa 🦶',
];

export function getRandomAttentionPhrase(): string {
  const index = Math.floor(Math.random() * attentionPhrases.length);
  return attentionPhrases[index];
}
