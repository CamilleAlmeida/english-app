export interface ReferenceExample {
  en: string;
  pt: string;
}

export interface ReferenceSection {
  title: string;
  explanation: string;
  examples: ReferenceExample[];
  tip?: string;
}

export interface ReferenceTopic {
  slug: string;
  title: string;
  icon: string;
  description: string;
  keywords: string[];
  sections: ReferenceSection[];
}

export const referenceTopics: ReferenceTopic[] = [
  // ───────────────────────────────────────
  // 1. VERBO TO BE
  // ───────────────────────────────────────
  {
    slug: 'verb-to-be',
    title: 'Verbo To Be',
    icon: '🔤',
    description: 'Am, is, are — como dizer "ser" e "estar" em inglês',
    keywords: [
      'am', 'is', 'are', 'was', 'were', 'ser', 'estar', 'to be',
      'sou', 'estou', 'é', 'está', 'somos', 'estamos',
    ],
    sections: [
      {
        title: 'O que é o verbo To Be?',
        explanation:
          'O verbo "to be" é o mais importante do inglês. Ele significa "ser" e "estar" ao mesmo tempo. Em português são dois verbos diferentes, mas em inglês é um só.',
        examples: [
          { en: 'I am a student.', pt: 'Eu sou um estudante.' },
          { en: 'I am tired.', pt: 'Eu estou cansado(a).' },
        ],
        tip: 'O contexto da frase diz se é "ser" ou "estar". Não precisa decorar — com a prática fica natural.',
      },
      {
        title: 'Presente (am / is / are)',
        explanation:
          'No presente, o verbo to be muda conforme a pessoa. Decore estas três formas e você já cobre tudo.',
        examples: [
          { en: 'I am (I\'m) happy.', pt: 'Eu estou feliz.' },
          { en: 'You are (You\'re) smart.', pt: 'Você é inteligente.' },
          { en: 'He is (He\'s) a doctor.', pt: 'Ele é médico.' },
          { en: 'She is (She\'s) at home.', pt: 'Ela está em casa.' },
          { en: 'It is (It\'s) cold today.', pt: 'Está frio hoje.' },
          { en: 'We are (We\'re) friends.', pt: 'Nós somos amigos.' },
          { en: 'They are (They\'re) busy.', pt: 'Eles estão ocupados.' },
        ],
        tip: 'As formas contraídas (I\'m, you\'re, he\'s…) são as mais usadas no dia a dia. Prefira elas na fala.',
      },
      {
        title: 'Passado (was / were)',
        explanation:
          'No passado, "am" e "is" viram "was", e "are" vira "were".',
        examples: [
          { en: 'I was at school yesterday.', pt: 'Eu estava na escola ontem.' },
          { en: 'They were happy.', pt: 'Eles estavam felizes.' },
          { en: 'She was a teacher.', pt: 'Ela era professora.' },
        ],
      },
      {
        title: 'Negativa e Pergunta',
        explanation:
          'Para negar, coloque "not" depois. Para perguntar, inverta a ordem.',
        examples: [
          { en: 'I am not (I\'m not) ready.', pt: 'Eu não estou pronto(a).' },
          { en: 'He is not (He isn\'t) here.', pt: 'Ele não está aqui.' },
          { en: 'Are you Brazilian?', pt: 'Você é brasileiro(a)?' },
          { en: 'Was she at the party?', pt: 'Ela estava na festa?' },
        ],
        tip: 'Perceba: na pergunta o verbo vem ANTES do sujeito. É o oposto do português!',
      },
    ],
  },

  // ───────────────────────────────────────
  // 2. PRONOMES
  // ───────────────────────────────────────
  {
    slug: 'pronouns',
    title: 'Pronomes',
    icon: '👤',
    description: 'Pessoais, possessivos, demonstrativos e reflexivos',
    keywords: [
      'I', 'you', 'he', 'she', 'it', 'we', 'they',
      'me', 'him', 'her', 'us', 'them',
      'my', 'your', 'his', 'her', 'its', 'our', 'their',
      'mine', 'yours', 'ours', 'theirs',
      'this', 'that', 'these', 'those',
      'pronome', 'pronomes', 'eu', 'ele', 'ela', 'nós', 'eles',
      'meu', 'minha', 'seu', 'sua', 'nosso', 'deles',
      'possessivo', 'pessoal', 'demonstrativo', 'reflexivo',
    ],
    sections: [
      {
        title: 'Pronomes Pessoais (Subject)',
        explanation:
          'São os pronomes que fazem a ação na frase — equivalem a "eu, tu, ele, ela, nós, vocês, eles".',
        examples: [
          { en: 'I like coffee.', pt: 'Eu gosto de café.' },
          { en: 'She speaks English.', pt: 'Ela fala inglês.' },
          { en: 'They live in Brazil.', pt: 'Eles moram no Brasil.' },
        ],
        tip: '"You" serve tanto para "você" quanto para "vocês". O inglês não tem essa diferença.',
      },
      {
        title: 'Pronomes Objeto (Object)',
        explanation:
          'Usados quando o pronome recebe a ação (depois do verbo ou de preposição): me, you, him, her, it, us, them.',
        examples: [
          { en: 'Call me later.', pt: 'Me liga depois.' },
          { en: 'I saw him at the store.', pt: 'Eu vi ele na loja.' },
          { en: 'This is for us.', pt: 'Isso é pra nós.' },
        ],
      },
      {
        title: 'Possessivos (Adjetivos e Pronomes)',
        explanation:
          'Adjetivos possessivos vêm antes do substantivo (my, your, his, her, its, our, their). Pronomes possessivos substituem o substantivo (mine, yours, his, hers, ours, theirs).',
        examples: [
          { en: 'This is my book.', pt: 'Este é o meu livro.' },
          { en: 'That car is hers.', pt: 'Aquele carro é dela.' },
          { en: 'Our house is big.', pt: 'Nossa casa é grande.' },
        ],
        tip: 'Em inglês NUNCA se usa artigo antes de possessivo. "The my book" está ERRADO. É só "my book".',
      },
      {
        title: 'Demonstrativos',
        explanation:
          'This/these (perto) e that/those (longe). This/that = singular, these/those = plural.',
        examples: [
          { en: 'This is my phone.', pt: 'Este é meu celular.' },
          { en: 'Those are expensive.', pt: 'Aqueles são caros.' },
        ],
      },
    ],
  },

  // ───────────────────────────────────────
  // 3. SUBSTANTIVOS
  // ───────────────────────────────────────
  {
    slug: 'nouns',
    title: 'Substantivos',
    icon: '📝',
    description: 'Contáveis, incontáveis e regras de plural',
    keywords: [
      'substantivo', 'noun', 'plural', 'singular', 'contável', 'incontável',
      'countable', 'uncountable', 'many', 'much', 'a', 'an', 'some',
      'plurais', 's', 'es', 'ies',
    ],
    sections: [
      {
        title: 'O que são substantivos?',
        explanation:
          'Substantivos são palavras que nomeiam coisas, pessoas, lugares ou ideias. Em inglês, eles podem ser contáveis (que você pode contar: 1 book, 2 books) ou incontáveis (que não se contam diretamente: water, money).',
        examples: [
          { en: 'I need a chair. (contável)', pt: 'Eu preciso de uma cadeira.' },
          { en: 'I need water. (incontável)', pt: 'Eu preciso de água.' },
        ],
      },
      {
        title: 'Regras de plural',
        explanation:
          'A maioria dos substantivos ganha -s no plural. Mas há exceções importantes.',
        examples: [
          { en: 'book → books, car → cars', pt: 'Regra geral: adicione -s' },
          { en: 'box → boxes, bus → buses', pt: 'Termina em -x, -s, -sh, -ch: adicione -es' },
          { en: 'baby → babies, city → cities', pt: 'Termina em consoante + y: troque y por -ies' },
          { en: 'child → children, man → men', pt: 'Irregulares: mude a forma toda' },
          { en: 'fish → fish, sheep → sheep', pt: 'Alguns não mudam no plural' },
        ],
        tip: 'Os plurais irregulares mais comuns: man→men, woman→women, child→children, person→people, tooth→teeth, foot→feet.',
      },
      {
        title: 'A / An / Some',
        explanation:
          'Use "a" antes de som de consoante, "an" antes de som de vogal, e "some" para plurais ou incontáveis.',
        examples: [
          { en: 'a dog, a university', pt: '"a" antes de som de consoante (university começa com som de /j/)' },
          { en: 'an apple, an hour', pt: '"an" antes de som de vogal (hour: o H é mudo)' },
          { en: 'I need some help.', pt: 'Preciso de alguma ajuda.' },
        ],
        tip: 'O que importa é o SOM, não a letra. "An hour" (H mudo = som de vogal). "A university" (U soa como /ju/).',
      },
    ],
  },

  // ───────────────────────────────────────
  // 4. ADJETIVOS
  // ───────────────────────────────────────
  {
    slug: 'adjectives',
    title: 'Adjetivos',
    icon: '🎨',
    description: 'Posição na frase, comparativos e superlativos',
    keywords: [
      'adjetivo', 'adjective', 'comparativo', 'superlativo', 'comparative',
      'superlative', 'more', 'most', 'than', 'er', 'est',
      'big', 'bigger', 'biggest', 'beautiful', 'good', 'better', 'best',
      'bad', 'worse', 'worst',
    ],
    sections: [
      {
        title: 'Posição do adjetivo',
        explanation:
          'Em inglês, o adjetivo vem ANTES do substantivo. É o contrário do português em muitos casos.',
        examples: [
          { en: 'a red car', pt: 'um carro vermelho (red vem antes de car)' },
          { en: 'a beautiful day', pt: 'um dia bonito' },
          { en: 'The tall man is my brother.', pt: 'O homem alto é meu irmão.' },
        ],
      },
      {
        title: 'Comparativo (comparar dois)',
        explanation:
          'Adjetivos curtos (1-2 sílabas): adicione -er + than. Adjetivos longos (3+ sílabas): use more + than.',
        examples: [
          { en: 'She is taller than me.', pt: 'Ela é mais alta que eu.' },
          { en: 'This is cheaper than that.', pt: 'Isso é mais barato que aquilo.' },
          { en: 'English is more interesting than I thought.', pt: 'Inglês é mais interessante do que eu pensava.' },
        ],
      },
      {
        title: 'Superlativo (o mais de todos)',
        explanation:
          'Curtos: the + adjetivo + -est. Longos: the most + adjetivo.',
        examples: [
          { en: 'He is the tallest in the class.', pt: 'Ele é o mais alto da turma.' },
          { en: 'This is the most expensive one.', pt: 'Este é o mais caro.' },
        ],
      },
      {
        title: 'Irregulares',
        explanation:
          'Alguns adjetivos têm formas próprias no comparativo e superlativo.',
        examples: [
          { en: 'good → better → the best', pt: 'bom → melhor → o melhor' },
          { en: 'bad → worse → the worst', pt: 'mau → pior → o pior' },
          { en: 'far → farther → the farthest', pt: 'longe → mais longe → o mais longe' },
        ],
        tip: 'Os irregulares mais usados são good/better/best e bad/worse/worst. Decore esses primeiro.',
      },
    ],
  },

  // ───────────────────────────────────────
  // 5. CONECTIVOS
  // ───────────────────────────────────────
  {
    slug: 'connectives',
    title: 'Conectivos',
    icon: '🔗',
    description: 'And, but, so, because, however e mais',
    keywords: [
      'conectivo', 'connective', 'conjunction', 'conjunção',
      'and', 'but', 'so', 'because', 'however', 'although', 'therefore',
      'e', 'mas', 'então', 'porque', 'porém', 'embora', 'portanto',
      'moreover', 'furthermore', 'nevertheless', 'in addition',
      'first', 'then', 'finally', 'for example', 'in conclusion',
    ],
    sections: [
      {
        title: 'O que são conectivos?',
        explanation:
          'Conectivos são palavras que ligam ideias dentro de uma frase ou entre frases. Eles deixam seu texto fluido e organizado.',
        examples: [
          { en: 'I like tea and coffee.', pt: 'Eu gosto de chá e café.' },
          { en: 'She is smart, but lazy.', pt: 'Ela é inteligente, mas preguiçosa.' },
        ],
      },
      {
        title: 'Adição (adicionar ideias)',
        explanation:
          'Usados para somar informação.',
        examples: [
          { en: 'and — I speak English and Portuguese.', pt: 'e — Eu falo inglês e português.' },
          { en: 'also — I also like French.', pt: 'também — Eu também gosto de francês.' },
          { en: 'moreover / furthermore — Moreover, it\'s free.', pt: 'além disso — Além disso, é grátis.' },
          { en: 'in addition — In addition, we have snacks.', pt: 'adicionalmente — Adicionalmente, temos lanches.' },
        ],
      },
      {
        title: 'Contraste (ideias opostas)',
        explanation:
          'Usados quando há oposição ou surpresa.',
        examples: [
          { en: 'but — I tried, but I failed.', pt: 'mas — Eu tentei, mas falhei.' },
          { en: 'however — However, it was expensive.', pt: 'porém — Porém, era caro.' },
          { en: 'although — Although it rained, we went out.', pt: 'embora — Embora tenha chovido, saímos.' },
          { en: 'on the other hand — On the other hand, it\'s safe.', pt: 'por outro lado — Por outro lado, é seguro.' },
        ],
      },
      {
        title: 'Causa e Consequência',
        explanation:
          'Conectam motivo e resultado.',
        examples: [
          { en: 'because — I stayed home because I was sick.', pt: 'porque — Fiquei em casa porque estava doente.' },
          { en: 'so — It was late, so I left.', pt: 'então — Era tarde, então eu saí.' },
          { en: 'therefore — Therefore, we cancelled.', pt: 'portanto — Portanto, cancelamos.' },
        ],
      },
      {
        title: 'Sequência e Conclusão',
        explanation:
          'Organizam a ordem das ideias.',
        examples: [
          { en: 'first / then / finally', pt: 'primeiro / depois / finalmente' },
          { en: 'for example — For example, running is healthy.', pt: 'por exemplo — Por exemplo, correr é saudável.' },
          { en: 'in conclusion — In conclusion, it was a great trip.', pt: 'em conclusão — Em conclusão, foi uma ótima viagem.' },
        ],
        tip: 'No B2/C1, usar conectivos variados (however, moreover, therefore) vale muitos pontos em provas de escrita.',
      },
    ],
  },

  // ───────────────────────────────────────
  // 6. TEMPOS VERBAIS
  // ───────────────────────────────────────
  {
    slug: 'verb-tenses',
    title: 'Tempos Verbais',
    icon: '⏰',
    description: 'Present, past, future — simple e continuous',
    keywords: [
      'tempo verbal', 'tense', 'present simple', 'present continuous',
      'past simple', 'past continuous', 'future', 'will', 'going to',
      'do', 'does', 'did', 'ing', 'ed', 'verbo', 'verb',
      'presente', 'passado', 'futuro',
    ],
    sections: [
      {
        title: 'Present Simple',
        explanation:
          'Para hábitos, rotinas e fatos. Com he/she/it, adicione -s ou -es ao verbo.',
        examples: [
          { en: 'I work every day.', pt: 'Eu trabalho todo dia.' },
          { en: 'She likes music.', pt: 'Ela gosta de música.' },
          { en: 'Do you speak English?', pt: 'Você fala inglês?' },
          { en: 'He doesn\'t eat meat.', pt: 'Ele não come carne.' },
        ],
        tip: 'Negativa e pergunta: use DO/DOES + verbo sem -s. "She doesn\'t like" (NÃO "doesn\'t likes").',
      },
      {
        title: 'Present Continuous',
        explanation:
          'Para ações acontecendo agora ou planos próximos. Fórmula: am/is/are + verbo-ing.',
        examples: [
          { en: 'I am studying right now.', pt: 'Estou estudando agora.' },
          { en: 'They are watching TV.', pt: 'Eles estão assistindo TV.' },
          { en: 'She is leaving tomorrow.', pt: 'Ela vai embora amanhã.' },
        ],
      },
      {
        title: 'Past Simple',
        explanation:
          'Para ações que acabaram no passado. Verbos regulares ganham -ed. Irregulares têm formas próprias.',
        examples: [
          { en: 'I worked yesterday.', pt: 'Eu trabalhei ontem.' },
          { en: 'She went to Paris. (go → went)', pt: 'Ela foi a Paris.' },
          { en: 'Did you see that?', pt: 'Você viu aquilo?' },
          { en: 'I didn\'t know.', pt: 'Eu não sabia.' },
        ],
        tip: 'Os 20 verbos irregulares mais usados: go→went, have→had, do→did, say→said, make→made, get→got, see→saw, come→came, take→took, give→gave, find→found, think→thought, tell→told, know→knew, buy→bought, eat→ate, drink→drank, write→wrote, read→read, run→ran.',
      },
      {
        title: 'Future (will / going to)',
        explanation:
          '"Will" para decisões do momento e previsões. "Going to" para planos já decididos.',
        examples: [
          { en: 'I will help you. (decisão agora)', pt: 'Eu vou te ajudar.' },
          { en: 'I am going to travel next month. (plano)', pt: 'Vou viajar mês que vem.' },
          { en: 'It will rain tomorrow. (previsão)', pt: 'Vai chover amanhã.' },
        ],
      },
    ],
  },

  // ───────────────────────────────────────
  // 7. PERGUNTAS
  // ───────────────────────────────────────
  {
    slug: 'questions',
    title: 'Perguntas',
    icon: '❓',
    description: 'Como montar perguntas e as question words',
    keywords: [
      'pergunta', 'question', 'question word', 'what', 'where', 'when',
      'who', 'why', 'how', 'which', 'whose', 'how much', 'how many',
      'o que', 'onde', 'quando', 'quem', 'por que', 'como', 'qual',
      'quanto', 'quantos',
    ],
    sections: [
      {
        title: 'Question Words',
        explanation:
          'São as palavras que começam perguntas abertas (que não são respondidas com sim/não).',
        examples: [
          { en: 'What — What is your name?', pt: 'O que / Qual — Qual é o seu nome?' },
          { en: 'Where — Where do you live?', pt: 'Onde — Onde você mora?' },
          { en: 'When — When is the meeting?', pt: 'Quando — Quando é a reunião?' },
          { en: 'Who — Who is that?', pt: 'Quem — Quem é aquele?' },
          { en: 'Why — Why are you late?', pt: 'Por que — Por que você está atrasado?' },
          { en: 'How — How are you?', pt: 'Como — Como você está?' },
          { en: 'Which — Which one do you prefer?', pt: 'Qual (escolha) — Qual você prefere?' },
          { en: 'How much — How much is this?', pt: 'Quanto (incontável/preço) — Quanto custa?' },
          { en: 'How many — How many brothers do you have?', pt: 'Quantos (contável) — Quantos irmãos você tem?' },
        ],
      },
      {
        title: 'Como montar uma pergunta',
        explanation:
          'A ordem é: Question Word + Auxiliar + Sujeito + Verbo principal. Se não há question word, começa direto pelo auxiliar.',
        examples: [
          { en: 'Where do you work?', pt: 'Onde + do + you + work?' },
          { en: 'What did she say?', pt: 'O que + did + she + say?' },
          { en: 'Do you like pizza?', pt: 'do + you + like + pizza? (sim/não)' },
          { en: 'Is he coming?', pt: 'is + he + coming? (sim/não)' },
        ],
        tip: 'Erro comum: "Where you work?" — FALTA o auxiliar "do". Sempre use: Where DO you work?',
      },
    ],
  },

  // ───────────────────────────────────────
  // 8. PREPOSIÇÕES
  // ───────────────────────────────────────
  {
    slug: 'prepositions',
    title: 'Preposições',
    icon: '📌',
    description: 'In, on, at, to, for — tempo, lugar e movimento',
    keywords: [
      'preposição', 'preposition', 'in', 'on', 'at', 'to', 'for',
      'with', 'from', 'about', 'by', 'between', 'among',
      'em', 'no', 'na', 'para', 'por', 'com', 'de', 'entre',
      'tempo', 'lugar', 'time', 'place',
    ],
    sections: [
      {
        title: 'In, On, At — Tempo',
        explanation:
          'AT para horas e momentos. ON para dias e datas. IN para meses, anos e períodos longos.',
        examples: [
          { en: 'at 3 o\'clock / at night / at Christmas', pt: 'às 3 horas / à noite / no Natal' },
          { en: 'on Monday / on July 4th / on my birthday', pt: 'na segunda / em 4 de julho / no meu aniversário' },
          { en: 'in January / in 2024 / in the morning', pt: 'em janeiro / em 2024 / de manhã' },
        ],
        tip: 'Macete: AT = ponto específico, ON = superfície/dia, IN = dentro de um período.',
      },
      {
        title: 'In, On, At — Lugar',
        explanation:
          'AT para locais específicos. ON para superfícies. IN para espaços fechados.',
        examples: [
          { en: 'at the bus stop / at school / at home', pt: 'no ponto de ônibus / na escola / em casa' },
          { en: 'on the table / on the wall / on the floor', pt: 'na mesa / na parede / no chão' },
          { en: 'in the room / in Brazil / in the box', pt: 'no quarto / no Brasil / na caixa' },
        ],
      },
      {
        title: 'To, For, With, From, About, By',
        explanation:
          'Outras preposições essenciais do dia a dia.',
        examples: [
          { en: 'to — I\'m going to the store.', pt: 'para — Estou indo para a loja.' },
          { en: 'for — This gift is for you.', pt: 'para — Este presente é para você.' },
          { en: 'with — I live with my family.', pt: 'com — Moro com minha família.' },
          { en: 'from — I\'m from Brazil.', pt: 'de — Sou do Brasil.' },
          { en: 'about — Tell me about your day.', pt: 'sobre — Me conta sobre o seu dia.' },
          { en: 'by — The book was written by her.', pt: 'por — O livro foi escrito por ela.' },
        ],
        tip: '"To" é direção/destino. "For" é propósito/para quem. "I go TO school FOR education."',
      },
    ],
  },

  // ───────────────────────────────────────
  // 9. EXPRESSÕES COMUNS
  // ───────────────────────────────────────
  {
    slug: 'common-expressions',
    title: 'Expressões Comuns',
    icon: '🗣️',
    description: 'Frases do dia a dia, cumprimentos e pedidos',
    keywords: [
      'expressão', 'expression', 'frase', 'cumprimento', 'greeting',
      'hello', 'hi', 'bye', 'goodbye', 'thanks', 'thank you',
      'please', 'sorry', 'excuse me', 'how are you',
      'oi', 'tchau', 'obrigado', 'por favor', 'desculpa', 'com licença',
      'dia a dia', 'cotidiano', 'pedido', 'restaurante', 'loja',
    ],
    sections: [
      {
        title: 'Cumprimentos',
        explanation:
          'Formas comuns de cumprimentar e se despedir.',
        examples: [
          { en: 'Hi! / Hey! / Hello!', pt: 'Oi! / E aí! / Olá!' },
          { en: 'How are you? — I\'m fine, thanks.', pt: 'Como vai? — Estou bem, obrigado(a).' },
          { en: 'What\'s up? — Not much.', pt: 'E aí? — Nada demais.' },
          { en: 'Nice to meet you!', pt: 'Prazer em conhecer!' },
          { en: 'See you later! / Bye!', pt: 'Até mais! / Tchau!' },
          { en: 'Take care!', pt: 'Se cuida!' },
        ],
      },
      {
        title: 'Pedidos e Educação',
        explanation:
          'Como pedir coisas e ser educado em inglês.',
        examples: [
          { en: 'Can I have a coffee, please?', pt: 'Posso pedir um café, por favor?' },
          { en: 'Could you help me?', pt: 'Você poderia me ajudar?' },
          { en: 'Excuse me, where is the bathroom?', pt: 'Com licença, onde é o banheiro?' },
          { en: 'I\'m sorry, I didn\'t understand.', pt: 'Desculpe, não entendi.' },
          { en: 'Thank you so much!', pt: 'Muito obrigado(a)!' },
          { en: 'You\'re welcome! / No problem!', pt: 'De nada! / Sem problema!' },
        ],
        tip: '"Could you…?" é mais educado que "Can you…?". Use "could" com pessoas que você não conhece.',
      },
      {
        title: 'Situações do Dia a Dia',
        explanation:
          'Frases úteis para conversas informais.',
        examples: [
          { en: 'I don\'t know.', pt: 'Não sei.' },
          { en: 'I think so. / I don\'t think so.', pt: 'Acho que sim. / Acho que não.' },
          { en: 'That\'s a good idea!', pt: 'Boa ideia!' },
          { en: 'Let me check.', pt: 'Deixa eu verificar.' },
          { en: 'It doesn\'t matter.', pt: 'Não importa.' },
          { en: 'Never mind.', pt: 'Esquece. / Deixa pra lá.' },
        ],
      },
    ],
  },

  // ───────────────────────────────────────
  // 10. GÍRIAS E DITADOS POPULARES
  // ───────────────────────────────────────
  {
    slug: 'slang-and-sayings',
    title: 'Gírias e Ditados',
    icon: '🔥',
    description: 'Expressões idiomáticas, gírias modernas e provérbios em inglês',
    keywords: [
      'gíria', 'slang', 'ditado', 'provérbio', 'saying', 'proverb',
      'idiom', 'expressão idiomática', 'informal', 'cool',
      'gonna', 'wanna', 'gotta', 'chill', 'vibe', 'lit', 'ghost',
      'break a leg', 'piece of cake', 'hit the road', 'under the weather',
      'popular', 'coloquial',
    ],
    sections: [
      {
        title: 'Contrações Informais (fala do dia a dia)',
        explanation:
          'Na conversa real, os americanos/britânicos falam rápido e juntam palavras. Essas formas aparecem em filmes, músicas e conversas, mas NÃO são usadas na escrita formal.',
        examples: [
          { en: 'gonna = going to — I\'m gonna eat.', pt: 'Vou comer.' },
          { en: 'wanna = want to — I wanna go home.', pt: 'Quero ir pra casa.' },
          { en: 'gotta = got to / have to — I gotta go.', pt: 'Tenho que ir.' },
          { en: 'lemme = let me — Lemme see.', pt: 'Deixa eu ver.' },
          { en: 'kinda = kind of — It\'s kinda cold.', pt: 'Tá meio frio.' },
          { en: 'dunno = don\'t know — I dunno.', pt: 'Sei lá.' },
        ],
        tip: 'Essas formas são para FALA e textos informais (WhatsApp, amigos). Em provas e e-mails, escreva a forma completa.',
      },
      {
        title: 'Gírias Modernas',
        explanation:
          'Expressões usadas no dia a dia, redes sociais e entre jovens.',
        examples: [
          { en: 'chill — Let\'s just chill tonight.', pt: 'Relaxar, curtir de boa — Vamos só relaxar hoje.' },
          { en: 'vibe — This place has a good vibe.', pt: 'Energia, clima — Esse lugar tem uma boa energia.' },
          { en: 'lit — The party was lit!', pt: 'Muito bom, incrível — A festa foi incrível!' },
          { en: 'ghost (someone) — She ghosted me.', pt: 'Sumir, dar um gelo — Ela sumiu/deu um gelo em mim.' },
          { en: 'salty — Why are you so salty?', pt: 'Irritado, amargo — Por que você tá tão irritado?' },
          { en: 'no cap — No cap, this is the best.', pt: 'Sem mentira, verdade — Sem mentira, é o melhor.' },
          { en: 'lowkey — I lowkey want pizza.', pt: 'Secretamente, meio que — Meio que eu quero pizza.' },
          { en: 'GOAT — She\'s the GOAT.', pt: 'O melhor de todos (Greatest Of All Time) — Ela é a melhor de todas.' },
        ],
      },
      {
        title: 'Expressões Idiomáticas (Idioms)',
        explanation:
          'Frases cujo significado não vem das palavras individuais. Decorar é o caminho — elas não fazem sentido traduzidas ao pé da letra.',
        examples: [
          { en: 'Break a leg! — Good luck!', pt: 'Quebre a perna! → Boa sorte!' },
          { en: 'Piece of cake — The test was a piece of cake.', pt: 'Pedaço de bolo → Muito fácil.' },
          { en: 'Hit the road — We need to hit the road.', pt: 'Bater na estrada → Precisamos ir embora.' },
          { en: 'Under the weather — I\'m feeling under the weather.', pt: 'Embaixo do tempo → Estou me sentindo mal.' },
          { en: 'Cost an arm and a leg — That car costs an arm and a leg.', pt: 'Custar um braço e uma perna → Muito caro.' },
          { en: 'Once in a blue moon — I go there once in a blue moon.', pt: 'Uma vez na lua azul → Raramente.' },
          { en: 'Spill the beans — Come on, spill the beans!', pt: 'Derramar os feijões → Conta o segredo!' },
          { en: 'The ball is in your court.', pt: 'A bola está na sua quadra → A decisão é sua.' },
        ],
      },
      {
        title: 'Ditados e Provérbios',
        explanation:
          'Frases de sabedoria popular em inglês — muitas têm equivalentes em português.',
        examples: [
          { en: 'Actions speak louder than words.', pt: 'Ações falam mais alto que palavras. (≈ "Falar é fácil")' },
          { en: 'Better late than never.', pt: 'Melhor tarde do que nunca.' },
          { en: 'Don\'t judge a book by its cover.', pt: 'Não julgue um livro pela capa. (≈ "As aparências enganam")' },
          { en: 'Practice makes perfect.', pt: 'A prática leva à perfeição.' },
          { en: 'Every cloud has a silver lining.', pt: 'Toda nuvem tem um forro de prata. (≈ "Há males que vêm para o bem")' },
          { en: 'When in Rome, do as the Romans do.', pt: 'Em Roma, faça como os romanos. (≈ "Em terra de sapo, de cócoras com ele")' },
          { en: 'The early bird catches the worm.', pt: 'O pássaro madrugador pega a minhoca. (≈ "Deus ajuda quem cedo madruga")' },
          { en: 'You can\'t have your cake and eat it too.', pt: 'Não dá pra ter o bolo e comê-lo. (≈ "Não dá pra ter tudo")' },
          { en: 'Where there\'s a will, there\'s a way.', pt: 'Onde há vontade, há um caminho. (≈ "Querer é poder")' },
          { en: 'Kill two birds with one stone.', pt: 'Matar dois pássaros com uma pedra. (≈ "Matar dois coelhos com uma cajadada")' },
        ],
        tip: 'Usar um idiom ou provérbio na hora certa impressiona muito nativos. Comece com 2-3 que fazem sentido pra você e vá adicionando.',
      },
    ],
  },
];
