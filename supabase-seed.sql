-- ============================================
-- SEED DATA: 3 Vocabulary + 2 Grammar blocks
-- Run AFTER supabase-schema.sql
-- ============================================

-- ========================
-- VOCAB BLOCK 1: Bathroom
-- ========================
INSERT INTO blocks (id, name, type, "order", intro_card, unlock_after)
VALUES (
  'b0000001-0000-0000-0000-000000000001',
  'Bathroom', 'VOCAB', 1, NULL, NULL
);

INSERT INTO items (block_id, type, content_pt, content_en, hint, difficulty, exercises) VALUES
('b0000001-0000-0000-0000-000000000001', 'WORD', 'torneira', 'faucet', 'Não confunda com fountain (fonte) ou drain (ralo)', 1, '[{"type":"MULTIPLE_CHOICE","options":["faucet","shower","drain","sink"],"correct_answer":"faucet"},{"type":"TRANSLATE","correct_answer":"faucet"}]'),
('b0000001-0000-0000-0000-000000000001', 'WORD', 'chuveiro', 'shower', 'Shower também pode significar chuva leve', 1, '[{"type":"MULTIPLE_CHOICE","options":["shower","bathtub","faucet","towel"],"correct_answer":"shower"},{"type":"TRANSLATE","correct_answer":"shower"}]'),
('b0000001-0000-0000-0000-000000000001', 'WORD', 'toalha', 'towel', NULL, 1, '[{"type":"MULTIPLE_CHOICE","options":["towel","tissue","cloth","rag"],"correct_answer":"towel"},{"type":"TRANSLATE","correct_answer":"towel"}]'),
('b0000001-0000-0000-0000-000000000001', 'WORD', 'pia', 'sink', 'Sink também significa afundar', 1, '[{"type":"MULTIPLE_CHOICE","options":["sink","tub","basin","drain"],"correct_answer":"sink"},{"type":"TRANSLATE","correct_answer":"sink"}]'),
('b0000001-0000-0000-0000-000000000001', 'WORD', 'espelho', 'mirror', NULL, 1, '[{"type":"MULTIPLE_CHOICE","options":["mirror","window","glass","screen"],"correct_answer":"mirror"},{"type":"TRANSLATE","correct_answer":"mirror"}]'),
('b0000001-0000-0000-0000-000000000001', 'WORD', 'sabonete', 'soap', 'Bar of soap = barra de sabonete', 1, '[{"type":"MULTIPLE_CHOICE","options":["soap","shampoo","lotion","cream"],"correct_answer":"soap"},{"type":"TRANSLATE","correct_answer":"soap"}]'),
('b0000001-0000-0000-0000-000000000001', 'WORD', 'banheira', 'bathtub', 'Bath = banho, tub = bacia → bathtub', 1, '[{"type":"MULTIPLE_CHOICE","options":["bathtub","shower","pool","bucket"],"correct_answer":"bathtub"},{"type":"TRANSLATE","correct_answer":"bathtub"}]'),
('b0000001-0000-0000-0000-000000000001', 'WORD', 'escova de dentes', 'toothbrush', 'Tooth (dente) + brush (escova)', 1, '[{"type":"MULTIPLE_CHOICE","options":["toothbrush","toothpaste","hairbrush","comb"],"correct_answer":"toothbrush"},{"type":"TRANSLATE","correct_answer":"toothbrush"}]'),
('b0000001-0000-0000-0000-000000000001', 'PHRASE', 'O chuveiro está quebrado', 'The shower is broken', 'broken = quebrado/estragado', 2, '[{"type":"TRANSLATE","correct_answer":"The shower is broken"},{"type":"ORDER_SENTENCE","scrambled_words":["The","shower","is","broken"],"correct_answer":"The shower is broken"}]'),
('b0000001-0000-0000-0000-000000000001', 'PHRASE', 'Passe a toalha, por favor', 'Pass me the towel, please', 'Pass me = me passe', 2, '[{"type":"TRANSLATE","correct_answer":"Pass me the towel, please"},{"type":"FILL_GAP","correct_answer":"towel","options":["towel","soap","mirror","brush"]}]'),
('b0000001-0000-0000-0000-000000000001', 'PHRASE', 'A água está quente demais', 'The water is too hot', 'too = demais (excessivo)', 2, '[{"type":"TRANSLATE","correct_answer":"The water is too hot"},{"type":"ORDER_SENTENCE","scrambled_words":["The","water","is","too","hot"],"correct_answer":"The water is too hot"}]'),
('b0000001-0000-0000-0000-000000000001', 'PHRASE', 'Onde está a pasta de dentes?', 'Where is the toothpaste?', 'toothpaste = tooth (dente) + paste (pasta)', 2, '[{"type":"TRANSLATE","correct_answer":"Where is the toothpaste?"},{"type":"FILL_GAP","correct_answer":"toothpaste","options":["toothpaste","toothbrush","soap","shampoo"]}]'),
('b0000001-0000-0000-0000-000000000001', 'PHRASE', 'Eu preciso de uma toalha limpa', 'I need a clean towel', 'clean = limpo/limpa', 2, '[{"type":"TRANSLATE","correct_answer":"I need a clean towel"},{"type":"ORDER_SENTENCE","scrambled_words":["I","need","a","clean","towel"],"correct_answer":"I need a clean towel"}]'),
('b0000001-0000-0000-0000-000000000001', 'PHRASE', 'O ralo está entupido', 'The drain is clogged', 'clogged = entupido', 3, '[{"type":"TRANSLATE","correct_answer":"The drain is clogged"},{"type":"MULTIPLE_CHOICE","options":["The drain is clogged","The drain is broken","The drain is open","The drain is clean"],"correct_answer":"The drain is clogged"}]'),
('b0000001-0000-0000-0000-000000000001', 'PHRASE', 'Tem alguém no banheiro?', 'Is anyone in the bathroom?', 'anyone = alguém (em perguntas)', 3, '[{"type":"TRANSLATE","correct_answer":"Is anyone in the bathroom?"},{"type":"ORDER_SENTENCE","scrambled_words":["Is","anyone","in","the","bathroom"],"correct_answer":"Is anyone in the bathroom?"}]');

-- ========================
-- VOCAB BLOCK 2: Kitchen
-- ========================
INSERT INTO blocks (id, name, type, "order", intro_card, unlock_after)
VALUES (
  'b0000001-0000-0000-0000-000000000002',
  'Kitchen', 'VOCAB', 2, NULL, 'b0000001-0000-0000-0000-000000000001'
);

INSERT INTO items (block_id, type, content_pt, content_en, hint, difficulty, exercises) VALUES
('b0000001-0000-0000-0000-000000000002', 'WORD', 'geladeira', 'fridge', 'Forma curta de refrigerator', 1, '[{"type":"MULTIPLE_CHOICE","options":["fridge","oven","freezer","microwave"],"correct_answer":"fridge"},{"type":"TRANSLATE","correct_answer":"fridge"}]'),
('b0000001-0000-0000-0000-000000000002', 'WORD', 'fogão', 'stove', NULL, 1, '[{"type":"MULTIPLE_CHOICE","options":["stove","oven","grill","toaster"],"correct_answer":"stove"},{"type":"TRANSLATE","correct_answer":"stove"}]'),
('b0000001-0000-0000-0000-000000000002', 'WORD', 'panela', 'pot', 'Pot = panela grande; Pan = frigideira', 1, '[{"type":"MULTIPLE_CHOICE","options":["pot","pan","bowl","plate"],"correct_answer":"pot"},{"type":"TRANSLATE","correct_answer":"pot"}]'),
('b0000001-0000-0000-0000-000000000002', 'WORD', 'frigideira', 'frying pan', 'Frying = fritando; Pan = panela rasa', 1, '[{"type":"MULTIPLE_CHOICE","options":["frying pan","pot","saucepan","wok"],"correct_answer":"frying pan"},{"type":"TRANSLATE","correct_answer":"frying pan"}]'),
('b0000001-0000-0000-0000-000000000002', 'WORD', 'faca', 'knife', 'O K é mudo: pronuncia-se naif', 1, '[{"type":"MULTIPLE_CHOICE","options":["knife","fork","spoon","blade"],"correct_answer":"knife"},{"type":"TRANSLATE","correct_answer":"knife"}]'),
('b0000001-0000-0000-0000-000000000002', 'WORD', 'garfo', 'fork', NULL, 1, '[{"type":"MULTIPLE_CHOICE","options":["fork","knife","spoon","chopstick"],"correct_answer":"fork"},{"type":"TRANSLATE","correct_answer":"fork"}]'),
('b0000001-0000-0000-0000-000000000002', 'WORD', 'colher', 'spoon', NULL, 1, '[{"type":"MULTIPLE_CHOICE","options":["spoon","fork","ladle","scoop"],"correct_answer":"spoon"},{"type":"TRANSLATE","correct_answer":"spoon"}]'),
('b0000001-0000-0000-0000-000000000002', 'WORD', 'prato', 'plate', 'Plate = prato (objeto); dish = prato (comida ou para lavar)', 1, '[{"type":"MULTIPLE_CHOICE","options":["plate","dish","bowl","tray"],"correct_answer":"plate"},{"type":"TRANSLATE","correct_answer":"plate"}]'),
('b0000001-0000-0000-0000-000000000002', 'PHRASE', 'Posso usar o micro-ondas?', 'Can I use the microwave?', 'Can I = Posso/Eu posso', 2, '[{"type":"TRANSLATE","correct_answer":"Can I use the microwave?"},{"type":"ORDER_SENTENCE","scrambled_words":["Can","I","use","the","microwave"],"correct_answer":"Can I use the microwave?"}]'),
('b0000001-0000-0000-0000-000000000002', 'PHRASE', 'A comida está no fogão', 'The food is on the stove', 'on = em cima de (superfície)', 2, '[{"type":"TRANSLATE","correct_answer":"The food is on the stove"},{"type":"FILL_GAP","correct_answer":"on","options":["on","in","at","under"]}]'),
('b0000001-0000-0000-0000-000000000002', 'PHRASE', 'Não tem mais leite na geladeira', 'There is no more milk in the fridge', 'no more = não tem mais', 2, '[{"type":"TRANSLATE","correct_answer":"There is no more milk in the fridge"},{"type":"ORDER_SENTENCE","scrambled_words":["There","is","no","more","milk","in","the","fridge"],"correct_answer":"There is no more milk in the fridge"}]'),
('b0000001-0000-0000-0000-000000000002', 'PHRASE', 'Eu preciso lavar os pratos', 'I need to wash the dishes', 'wash the dishes = lavar a louça', 2, '[{"type":"TRANSLATE","correct_answer":"I need to wash the dishes"},{"type":"FILL_GAP","correct_answer":"dishes","options":["dishes","plates","cups","pots"]}]'),
('b0000001-0000-0000-0000-000000000002', 'PHRASE', 'Cuidado, a panela está quente', 'Be careful, the pot is hot', 'Be careful = tome cuidado', 2, '[{"type":"TRANSLATE","correct_answer":"Be careful, the pot is hot"},{"type":"ORDER_SENTENCE","scrambled_words":["Be","careful","the","pot","is","hot"],"correct_answer":"Be careful, the pot is hot"}]'),
('b0000001-0000-0000-0000-000000000002', 'PHRASE', 'Você sabe cozinhar arroz?', 'Do you know how to cook rice?', 'know how to = saber como (habilidade)', 3, '[{"type":"TRANSLATE","correct_answer":"Do you know how to cook rice?"},{"type":"ORDER_SENTENCE","scrambled_words":["Do","you","know","how","to","cook","rice"],"correct_answer":"Do you know how to cook rice?"}]'),
('b0000001-0000-0000-0000-000000000002', 'PHRASE', 'A cozinha precisa de uma limpeza', 'The kitchen needs a cleaning', 'needs a cleaning = precisa de uma limpeza', 3, '[{"type":"TRANSLATE","correct_answer":"The kitchen needs a cleaning"},{"type":"MULTIPLE_CHOICE","options":["The kitchen needs a cleaning","The kitchen needs a cooking","The kitchen needs a washing","The kitchen needs a fixing"],"correct_answer":"The kitchen needs a cleaning"}]');

-- ========================
-- VOCAB BLOCK 3: Workplace
-- ========================
INSERT INTO blocks (id, name, type, "order", intro_card, unlock_after)
VALUES (
  'b0000001-0000-0000-0000-000000000003',
  'Workplace', 'VOCAB', 3, NULL, 'b0000001-0000-0000-0000-000000000002'
);

INSERT INTO items (block_id, type, content_pt, content_en, hint, difficulty, exercises) VALUES
('b0000001-0000-0000-0000-000000000003', 'WORD', 'reunião', 'meeting', NULL, 1, '[{"type":"MULTIPLE_CHOICE","options":["meeting","deadline","report","schedule"],"correct_answer":"meeting"},{"type":"TRANSLATE","correct_answer":"meeting"}]'),
('b0000001-0000-0000-0000-000000000003', 'WORD', 'prazo', 'deadline', 'Dead (morto) + line (linha) = limite final', 1, '[{"type":"MULTIPLE_CHOICE","options":["deadline","timeline","schedule","target"],"correct_answer":"deadline"},{"type":"TRANSLATE","correct_answer":"deadline"}]'),
('b0000001-0000-0000-0000-000000000003', 'WORD', 'relatório', 'report', NULL, 1, '[{"type":"MULTIPLE_CHOICE","options":["report","receipt","record","review"],"correct_answer":"report"},{"type":"TRANSLATE","correct_answer":"report"}]'),
('b0000001-0000-0000-0000-000000000003', 'WORD', 'chefe', 'boss', NULL, 1, '[{"type":"MULTIPLE_CHOICE","options":["boss","employee","manager","partner"],"correct_answer":"boss"},{"type":"TRANSLATE","correct_answer":"boss"}]'),
('b0000001-0000-0000-0000-000000000003', 'WORD', 'funcionário', 'employee', 'Employee = quem trabalha; Employer = quem contrata', 1, '[{"type":"MULTIPLE_CHOICE","options":["employee","employer","manager","intern"],"correct_answer":"employee"},{"type":"TRANSLATE","correct_answer":"employee"}]'),
('b0000001-0000-0000-0000-000000000003', 'WORD', 'salário', 'salary', 'Salary = mensal; Wage = por hora', 1, '[{"type":"MULTIPLE_CHOICE","options":["salary","wage","bonus","income"],"correct_answer":"salary"},{"type":"TRANSLATE","correct_answer":"salary"}]'),
('b0000001-0000-0000-0000-000000000003', 'WORD', 'tarefa', 'task', NULL, 1, '[{"type":"MULTIPLE_CHOICE","options":["task","job","project","goal"],"correct_answer":"task"},{"type":"TRANSLATE","correct_answer":"task"}]'),
('b0000001-0000-0000-0000-000000000003', 'PHRASE', 'A reunião é às três horas', 'The meeting is at three o''clock', 'at = para horários específicos', 2, '[{"type":"TRANSLATE","correct_answer":"The meeting is at three o''clock"},{"type":"FILL_GAP","correct_answer":"at","options":["at","in","on","by"]}]'),
('b0000001-0000-0000-0000-000000000003', 'PHRASE', 'Posso trabalhar de casa hoje?', 'Can I work from home today?', 'work from home = trabalhar de casa (home office)', 2, '[{"type":"TRANSLATE","correct_answer":"Can I work from home today?"},{"type":"ORDER_SENTENCE","scrambled_words":["Can","I","work","from","home","today"],"correct_answer":"Can I work from home today?"}]'),
('b0000001-0000-0000-0000-000000000003', 'PHRASE', 'O prazo é sexta-feira', 'The deadline is on Friday', 'on = para dias da semana', 2, '[{"type":"TRANSLATE","correct_answer":"The deadline is on Friday"},{"type":"FILL_GAP","correct_answer":"on","options":["on","in","at","by"]}]'),
('b0000001-0000-0000-0000-000000000003', 'PHRASE', 'Eu preciso terminar esse relatório', 'I need to finish this report', 'finish = terminar', 2, '[{"type":"TRANSLATE","correct_answer":"I need to finish this report"},{"type":"ORDER_SENTENCE","scrambled_words":["I","need","to","finish","this","report"],"correct_answer":"I need to finish this report"}]'),
('b0000001-0000-0000-0000-000000000003', 'PHRASE', 'Meu chefe pediu uma atualização', 'My boss asked for an update', 'asked for = pediu', 2, '[{"type":"TRANSLATE","correct_answer":"My boss asked for an update"},{"type":"FILL_GAP","correct_answer":"asked for","options":["asked for","told to","said to","wanted to"]}]'),
('b0000001-0000-0000-0000-000000000003', 'PHRASE', 'Estamos contratando novos funcionários', 'We are hiring new employees', 'hiring = contratando', 3, '[{"type":"TRANSLATE","correct_answer":"We are hiring new employees"},{"type":"ORDER_SENTENCE","scrambled_words":["We","are","hiring","new","employees"],"correct_answer":"We are hiring new employees"}]'),
('b0000001-0000-0000-0000-000000000003', 'PHRASE', 'Ela foi promovida mês passado', 'She was promoted last month', 'was promoted = foi promovida (voz passiva)', 3, '[{"type":"TRANSLATE","correct_answer":"She was promoted last month"},{"type":"MULTIPLE_CHOICE","options":["She was promoted last month","She promoted last month","She is promoted last month","She has promoted last month"],"correct_answer":"She was promoted last month"}]'),
('b0000001-0000-0000-0000-000000000003', 'PHRASE', 'Qual é o seu cargo na empresa?', 'What is your position at the company?', 'position = cargo/posição', 3, '[{"type":"TRANSLATE","correct_answer":"What is your position at the company?"},{"type":"ORDER_SENTENCE","scrambled_words":["What","is","your","position","at","the","company"],"correct_answer":"What is your position at the company?"}]');

-- ============================
-- GRAMMAR BLOCK 1: Foundations
-- ============================
INSERT INTO blocks (id, name, type, "order", intro_card, unlock_after)
VALUES (
  'b0000001-0000-0000-0000-000000000011',
  'Foundations', 'GRAMMAR', 11,
  '{"title":"Fundações do Inglês","explanation":"Neste bloco você vai praticar a ordem básica das frases em inglês (Sujeito + Verbo + Objeto), os pronomes pessoais (I, you, he, she, it, we, they), o verbo TO BE (am, is, are) e os artigos (a, an, the). Tudo dentro de frases do dia a dia!","examples":["I am a student. (Eu sou um estudante.)","She is an engineer. (Ela é uma engenheira.)","They are at the office. (Eles estão no escritório.)"]}',
  NULL
);

INSERT INTO items (block_id, type, content_pt, content_en, hint, difficulty, exercises) VALUES
('b0000001-0000-0000-0000-000000000011', 'PHRASE', 'Eu sou estudante', 'I am a student', 'am = sou/estou (usado com I)', 1, '[{"type":"ORDER_SENTENCE","scrambled_words":["I","am","a","student"],"correct_answer":"I am a student"},{"type":"TRANSLATE","correct_answer":"I am a student"}]'),
('b0000001-0000-0000-0000-000000000011', 'PHRASE', 'Ela é médica', 'She is a doctor', 'is = é/está (usado com he, she, it)', 1, '[{"type":"FILL_GAP","correct_answer":"is","options":["is","am","are","be"]},{"type":"TRANSLATE","correct_answer":"She is a doctor"}]'),
('b0000001-0000-0000-0000-000000000011', 'PHRASE', 'Nós somos brasileiros', 'We are Brazilian', 'are = somos/estamos (usado com we, you, they)', 1, '[{"type":"FILL_GAP","correct_answer":"are","options":["are","is","am","be"]},{"type":"TRANSLATE","correct_answer":"We are Brazilian"}]'),
('b0000001-0000-0000-0000-000000000011', 'PHRASE', 'Ele é um engenheiro', 'He is an engineer', 'an = um/uma (antes de vogal: a, e, i, o, u)', 1, '[{"type":"FILL_GAP","correct_answer":"an","options":["an","a","the","one"]},{"type":"ORDER_SENTENCE","scrambled_words":["He","is","an","engineer"],"correct_answer":"He is an engineer"}]'),
('b0000001-0000-0000-0000-000000000011', 'PHRASE', 'O gato está na mesa', 'The cat is on the table', 'the = o/a/os/as (artigo definido, único em inglês)', 1, '[{"type":"ORDER_SENTENCE","scrambled_words":["The","cat","is","on","the","table"],"correct_answer":"The cat is on the table"},{"type":"TRANSLATE","correct_answer":"The cat is on the table"}]'),
('b0000001-0000-0000-0000-000000000011', 'PHRASE', 'Eles são meus amigos', 'They are my friends', 'They = eles/elas (para pessoas e coisas)', 1, '[{"type":"FILL_GAP","correct_answer":"They","options":["They","We","He","It"]},{"type":"TRANSLATE","correct_answer":"They are my friends"}]'),
('b0000001-0000-0000-0000-000000000011', 'PHRASE', 'Eu não estou cansado', 'I am not tired', 'am not = não estou/não sou (negativa do TO BE)', 2, '[{"type":"ORDER_SENTENCE","scrambled_words":["I","am","not","tired"],"correct_answer":"I am not tired"},{"type":"CORRECT_ERROR","incorrect_sentence":"I not am tired","correct_answer":"I am not tired"}]'),
('b0000001-0000-0000-0000-000000000011', 'PHRASE', 'Ela não está em casa', 'She is not at home', 'is not = isn''t (forma contraída)', 2, '[{"type":"TRANSLATE","correct_answer":"She is not at home"},{"type":"CORRECT_ERROR","incorrect_sentence":"She not is at home","correct_answer":"She is not at home"}]'),
('b0000001-0000-0000-0000-000000000011', 'PHRASE', 'Você está pronto?', 'Are you ready?', 'Perguntas com TO BE: inverte a ordem → Are you...?', 2, '[{"type":"ORDER_SENTENCE","scrambled_words":["Are","you","ready"],"correct_answer":"Are you ready?"},{"type":"CORRECT_ERROR","incorrect_sentence":"You are ready?","correct_answer":"Are you ready?"}]'),
('b0000001-0000-0000-0000-000000000011', 'PHRASE', 'Isso é uma boa ideia', 'It is a good idea', 'It = isso/ele/ela (para coisas e ideias)', 2, '[{"type":"FILL_GAP","correct_answer":"It","options":["It","He","She","This"]},{"type":"TRANSLATE","correct_answer":"It is a good idea"}]'),
('b0000001-0000-0000-0000-000000000011', 'PHRASE', 'O livro está na mochila', 'The book is in the backpack', 'in = dentro de (espaço fechado)', 2, '[{"type":"ORDER_SENTENCE","scrambled_words":["The","book","is","in","the","backpack"],"correct_answer":"The book is in the backpack"},{"type":"TRANSLATE","correct_answer":"The book is in the backpack"}]'),
('b0000001-0000-0000-0000-000000000011', 'PHRASE', 'Nós não somos de São Paulo', 'We are not from São Paulo', 'from = de (origem)', 2, '[{"type":"TRANSLATE","correct_answer":"We are not from São Paulo"},{"type":"FILL_GAP","correct_answer":"are not","options":["are not","is not","am not","not are"]}]'),
('b0000001-0000-0000-0000-000000000011', 'PHRASE', 'Onde está o banheiro?', 'Where is the bathroom?', 'Where = onde (pergunta de lugar)', 3, '[{"type":"ORDER_SENTENCE","scrambled_words":["Where","is","the","bathroom"],"correct_answer":"Where is the bathroom?"},{"type":"TRANSLATE","correct_answer":"Where is the bathroom?"}]'),
('b0000001-0000-0000-0000-000000000011', 'PHRASE', 'Quem é aquela mulher?', 'Who is that woman?', 'Who = quem; that = aquele/aquela', 3, '[{"type":"ORDER_SENTENCE","scrambled_words":["Who","is","that","woman"],"correct_answer":"Who is that woman?"},{"type":"TRANSLATE","correct_answer":"Who is that woman?"}]'),
('b0000001-0000-0000-0000-000000000011', 'PHRASE', 'Ele não é o professor, ele é um aluno', 'He is not the teacher, he is a student', 'the teacher (definido) vs a student (indefinido)', 3, '[{"type":"TRANSLATE","correct_answer":"He is not the teacher, he is a student"},{"type":"MULTIPLE_CHOICE","options":["He is not the teacher, he is a student","He not is the teacher, he is a student","He is not a teacher, he is the student","He is not teacher, he is student"],"correct_answer":"He is not the teacher, he is a student"}]');

-- ==============================
-- GRAMMAR BLOCK 2: Daily Habits
-- ==============================
INSERT INTO blocks (id, name, type, "order", intro_card, unlock_after)
VALUES (
  'b0000001-0000-0000-0000-000000000012',
  'Daily Habits', 'GRAMMAR', 12,
  '{"title":"Hábitos do Dia a Dia","explanation":"Aqui você vai praticar o Simple Present — o tempo verbal para falar de rotinas, hábitos e verdades gerais. Vai aprender quando usar DO/DOES para perguntas e negativas, e os advérbios de frequência (always, usually, often, sometimes, never). Tudo com frases sobre a vida real!","examples":["I wake up at 7 every day. (Eu acordo às 7 todos os dias.)","She doesn''t drink coffee. (Ela não bebe café.)","Do you always take the bus? (Você sempre pega o ônibus?)"]}',
  'b0000001-0000-0000-0000-000000000011'
);

INSERT INTO items (block_id, type, content_pt, content_en, hint, difficulty, exercises) VALUES
('b0000001-0000-0000-0000-000000000012', 'PHRASE', 'Eu acordo às sete horas', 'I wake up at seven o''clock', 'wake up = acordar (phrasal verb)', 1, '[{"type":"ORDER_SENTENCE","scrambled_words":["I","wake","up","at","seven","o''clock"],"correct_answer":"I wake up at seven o''clock"},{"type":"TRANSLATE","correct_answer":"I wake up at seven o''clock"}]'),
('b0000001-0000-0000-0000-000000000012', 'PHRASE', 'Ela trabalha de segunda a sexta', 'She works from Monday to Friday', 'works (com S) = ele/ela trabalha', 1, '[{"type":"FILL_GAP","correct_answer":"works","options":["works","work","working","worked"]},{"type":"TRANSLATE","correct_answer":"She works from Monday to Friday"}]'),
('b0000001-0000-0000-0000-000000000012', 'PHRASE', 'Nós almoçamos ao meio-dia', 'We have lunch at noon', 'have lunch = almoçar', 1, '[{"type":"ORDER_SENTENCE","scrambled_words":["We","have","lunch","at","noon"],"correct_answer":"We have lunch at noon"},{"type":"TRANSLATE","correct_answer":"We have lunch at noon"}]'),
('b0000001-0000-0000-0000-000000000012', 'PHRASE', 'Ele sempre chega cedo', 'He always arrives early', 'always = sempre (vai ANTES do verbo principal)', 1, '[{"type":"CORRECT_ERROR","incorrect_sentence":"He arrives always early","correct_answer":"He always arrives early"},{"type":"ORDER_SENTENCE","scrambled_words":["He","always","arrives","early"],"correct_answer":"He always arrives early"}]'),
('b0000001-0000-0000-0000-000000000012', 'PHRASE', 'Eu nunca como fast food', 'I never eat fast food', 'never = nunca (já é negativo, não precisa de don''t)', 1, '[{"type":"FILL_GAP","correct_answer":"never","options":["never","always","often","sometimes"]},{"type":"CORRECT_ERROR","incorrect_sentence":"I don''t never eat fast food","correct_answer":"I never eat fast food"}]'),
('b0000001-0000-0000-0000-000000000012', 'PHRASE', 'Ela não bebe café', 'She doesn''t drink coffee', 'doesn''t = does not (negativa para he/she/it)', 2, '[{"type":"CORRECT_ERROR","incorrect_sentence":"She doesn''t drinks coffee","correct_answer":"She doesn''t drink coffee"},{"type":"TRANSLATE","correct_answer":"She doesn''t drink coffee"}]'),
('b0000001-0000-0000-0000-000000000012', 'PHRASE', 'Eu não dirijo para o trabalho', 'I don''t drive to work', 'don''t = do not (negativa para I/you/we/they)', 2, '[{"type":"FILL_GAP","correct_answer":"don''t","options":["don''t","doesn''t","isn''t","not"]},{"type":"TRANSLATE","correct_answer":"I don''t drive to work"}]'),
('b0000001-0000-0000-0000-000000000012', 'PHRASE', 'Você faz exercício de manhã?', 'Do you exercise in the morning?', 'Do you...? = Você...? (pergunta para I/you/we/they)', 2, '[{"type":"ORDER_SENTENCE","scrambled_words":["Do","you","exercise","in","the","morning"],"correct_answer":"Do you exercise in the morning?"},{"type":"CORRECT_ERROR","incorrect_sentence":"You exercise in the morning?","correct_answer":"Do you exercise in the morning?"}]'),
('b0000001-0000-0000-0000-000000000012', 'PHRASE', 'Ele toma banho à noite?', 'Does he take a shower at night?', 'Does he...? = Ele...? (pergunta para he/she/it)', 2, '[{"type":"CORRECT_ERROR","incorrect_sentence":"Does he takes a shower at night?","correct_answer":"Does he take a shower at night?"},{"type":"TRANSLATE","correct_answer":"Does he take a shower at night?"}]'),
('b0000001-0000-0000-0000-000000000012', 'PHRASE', 'Às vezes eu fico até tarde no trabalho', 'Sometimes I stay late at work', 'sometimes pode ir no início ou antes do verbo', 2, '[{"type":"ORDER_SENTENCE","scrambled_words":["Sometimes","I","stay","late","at","work"],"correct_answer":"Sometimes I stay late at work"},{"type":"TRANSLATE","correct_answer":"Sometimes I stay late at work"}]'),
('b0000001-0000-0000-0000-000000000012', 'PHRASE', 'Ela geralmente cozinha no domingo', 'She usually cooks on Sundays', 'usually = geralmente; on Sundays (com S) = aos domingos', 2, '[{"type":"FILL_GAP","correct_answer":"usually","options":["usually","always","never","often"]},{"type":"CORRECT_ERROR","incorrect_sentence":"She cooks usually on Sundays","correct_answer":"She usually cooks on Sundays"}]'),
('b0000001-0000-0000-0000-000000000012', 'PHRASE', 'O que você faz depois do trabalho?', 'What do you do after work?', 'What do you do = O que você faz (rotina)', 3, '[{"type":"ORDER_SENTENCE","scrambled_words":["What","do","you","do","after","work"],"correct_answer":"What do you do after work?"},{"type":"TRANSLATE","correct_answer":"What do you do after work?"}]'),
('b0000001-0000-0000-0000-000000000012', 'PHRASE', 'Onde ela mora?', 'Where does she live?', 'Where does she...? (does para he/she/it, verbo sem S)', 3, '[{"type":"CORRECT_ERROR","incorrect_sentence":"Where does she lives?","correct_answer":"Where does she live?"},{"type":"TRANSLATE","correct_answer":"Where does she live?"}]'),
('b0000001-0000-0000-0000-000000000012', 'PHRASE', 'Meu irmão não come carne, ele é vegetariano', 'My brother doesn''t eat meat, he is vegetarian', 'doesn''t eat (hábito) + is (estado permanente)', 3, '[{"type":"TRANSLATE","correct_answer":"My brother doesn''t eat meat, he is vegetarian"},{"type":"MULTIPLE_CHOICE","options":["My brother doesn''t eat meat, he is vegetarian","My brother don''t eat meat, he is vegetarian","My brother doesn''t eats meat, he is vegetarian","My brother not eat meat, he is vegetarian"],"correct_answer":"My brother doesn''t eat meat, he is vegetarian"}]'),
('b0000001-0000-0000-0000-000000000012', 'PHRASE', 'Com que frequência você vai ao cinema?', 'How often do you go to the cinema?', 'How often = com que frequência', 3, '[{"type":"ORDER_SENTENCE","scrambled_words":["How","often","do","you","go","to","the","cinema"],"correct_answer":"How often do you go to the cinema?"},{"type":"TRANSLATE","correct_answer":"How often do you go to the cinema?"}]');

-- ========================
-- PLACEHOLDER BLOCKS (sem items por enquanto)
-- ========================
INSERT INTO blocks (id, name, type, "order", intro_card, unlock_after) VALUES
('b0000001-0000-0000-0000-000000000004', 'Daily Routine', 'VOCAB', 4, NULL, 'b0000001-0000-0000-0000-000000000003'),
('b0000001-0000-0000-0000-000000000005', 'Shopping', 'VOCAB', 5, NULL, 'b0000001-0000-0000-0000-000000000004'),
('b0000001-0000-0000-0000-000000000006', 'Health & Body', 'VOCAB', 6, NULL, 'b0000001-0000-0000-0000-000000000005'),
('b0000001-0000-0000-0000-000000000007', 'Getting Around', 'VOCAB', 7, NULL, 'b0000001-0000-0000-0000-000000000006'),
('b0000001-0000-0000-0000-000000000008', 'Food & Eating Out', 'VOCAB', 8, NULL, 'b0000001-0000-0000-0000-000000000007'),
('b0000001-0000-0000-0000-000000000009', 'Feelings & Opinions', 'VOCAB', 9, NULL, 'b0000001-0000-0000-0000-000000000008'),
('b0000001-0000-0000-0000-000000000010', 'Tech & Online', 'VOCAB', 10, NULL, 'b0000001-0000-0000-0000-000000000009'),
('b0000001-0000-0000-0000-000000000013', 'Right Now', 'GRAMMAR', 13, NULL, 'b0000001-0000-0000-0000-000000000012'),
('b0000001-0000-0000-0000-000000000014', 'Looking Back', 'GRAMMAR', 14, NULL, 'b0000001-0000-0000-0000-000000000013'),
('b0000001-0000-0000-0000-000000000015', 'What''s Next', 'GRAMMAR', 15, NULL, 'b0000001-0000-0000-0000-000000000014'),
('b0000001-0000-0000-0000-000000000016', 'Describing Things', 'GRAMMAR', 16, NULL, 'b0000001-0000-0000-0000-000000000015'),
('b0000001-0000-0000-0000-000000000017', 'People & Possession', 'GRAMMAR', 17, NULL, 'b0000001-0000-0000-0000-000000000016'),
('b0000001-0000-0000-0000-000000000018', 'Places & Quantities', 'GRAMMAR', 18, NULL, 'b0000001-0000-0000-0000-000000000017'),
('b0000001-0000-0000-0000-000000000019', 'Abilities & Rules', 'GRAMMAR', 19, NULL, 'b0000001-0000-0000-0000-000000000018'),
('b0000001-0000-0000-0000-000000000020', 'Advanced Structures', 'GRAMMAR', 20, NULL, 'b0000001-0000-0000-0000-000000000019');
