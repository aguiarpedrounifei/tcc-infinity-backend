-- Script para popular o banco com 100+ perguntas
USE infinity_quiz;

-- Limpar perguntas existentes para evitar duplicatas
DELETE FROM questions;

-- =====================================================
-- TECNOLOGIA (category_id = 1)
-- =====================================================

-- Fácil
INSERT INTO questions (category_id, enunciado, dificuldade, alternativa_a, alternativa_b, alternativa_c, alternativa_d, correta) VALUES
(1, 'Qual linguagem é conhecida como a "linguagem da web"?', 'facil', 'Python', 'JavaScript', 'Java', 'C++', 'alternativa_b'),
(1, 'O que significa HTML?', 'facil', 'HyperText Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlinks Text Language', 'alternativa_a'),
(1, 'Qual linguagem é usada para estilizar páginas web?', 'facil', 'HTML', 'JavaScript', 'CSS', 'Python', 'alternativa_c'),
(1, 'O que significa SQL?', 'facil', 'Structured Query Language', 'Simple Question Language', 'Standard Quality Language', 'System Query Logic', 'alternativa_a'),
(1, 'Qual é o principal navegador desenvolvido pelo Google?', 'facil', 'Firefox', 'Safari', 'Chrome', 'Edge', 'alternativa_c'),
(1, 'O que é um bug em programação?', 'facil', 'Um vírus', 'Um erro no código', 'Um tipo de software', 'Uma linguagem', 'alternativa_b'),
(1, 'Qual dispositivo é usado para armazenar dados permanentemente?', 'facil', 'RAM', 'HD ou SSD', 'Processador', 'Placa de vídeo', 'alternativa_b'),
(1, 'O que significa USB?', 'facil', 'Universal Serial Bus', 'Ultra Speed Buffer', 'Unified System Bridge', 'User Service Backup', 'alternativa_a'),
(1, 'Qual empresa criou o Windows?', 'facil', 'Apple', 'Microsoft', 'Google', 'IBM', 'alternativa_b'),
(1, 'O que é um smartphone?', 'facil', 'Um computador de mesa', 'Um telefone inteligente', 'Um tablet', 'Um notebook', 'alternativa_b'),
(1, 'Qual símbolo representa o Wi-Fi?', 'facil', 'Uma nuvem', 'Ondas crescentes', 'Um cadeado', 'Uma engrenagem', 'alternativa_b'),
(1, 'O que é um aplicativo?', 'facil', 'Um tipo de hardware', 'Um programa de computador ou celular', 'Um cabo de conexão', 'Uma memória', 'alternativa_b');

-- Médio
INSERT INTO questions (category_id, enunciado, dificuldade, alternativa_a, alternativa_b, alternativa_c, alternativa_d, correta) VALUES
(1, 'Qual empresa criou o sistema operacional Android?', 'medio', 'Apple', 'Microsoft', 'Google', 'Samsung', 'alternativa_c'),
(1, 'O que significa API?', 'medio', 'Advanced Programming Interface', 'Application Programming Interface', 'Automated Program Integration', 'Applied Program Instructions', 'alternativa_b'),
(1, 'O que é Cloud Computing?', 'medio', 'Computação em nuvem', 'Um tipo de computador', 'Um sistema operacional', 'Uma linguagem de programação', 'alternativa_a'),
(1, 'O que é Machine Learning?', 'medio', 'Um tipo de hardware', 'Aprendizado de máquina', 'Uma linguagem de programação', 'Um sistema operacional', 'alternativa_b'),
(1, 'Qual protocolo é usado para transferir páginas web?', 'medio', 'FTP', 'HTTP', 'SMTP', 'SSH', 'alternativa_b'),
(1, 'Qual empresa desenvolveu o React?', 'medio', 'Google', 'Facebook (Meta)', 'Microsoft', 'Apple', 'alternativa_b'),
(1, 'O que é um framework?', 'medio', 'Um tipo de computador', 'Uma estrutura de código reutilizável', 'Um banco de dados', 'Um navegador web', 'alternativa_b'),
(1, 'O que é Git?', 'medio', 'Uma linguagem de programação', 'Um sistema de controle de versão', 'Um navegador', 'Um sistema operacional', 'alternativa_b'),
(1, 'Qual é a função de um servidor?', 'medio', 'Exibir imagens', 'Fornecer serviços e recursos para outros computadores', 'Imprimir documentos', 'Gravar vídeos', 'alternativa_b'),
(1, 'O que é criptografia?', 'medio', 'Técnica de compressão de arquivos', 'Técnica de proteção de dados através de códigos', 'Um tipo de vírus', 'Uma linguagem de programação', 'alternativa_b'),
(1, 'O que significa IoT?', 'medio', 'Internet of Things', 'Integration of Technology', 'Internal Operation Test', 'Input Output Transfer', 'alternativa_a'),
(1, 'O que é um banco de dados relacional?', 'medio', 'Software de edição de imagens', 'Sistema que organiza dados em tabelas relacionadas', 'Tipo de hardware', 'Programa de antivírus', 'alternativa_b');

-- Difícil
INSERT INTO questions (category_id, enunciado, dificuldade, alternativa_a, alternativa_b, alternativa_c, alternativa_d, correta) VALUES
(1, 'Qual foi o primeiro computador eletrônico de propósito geral?', 'dificil', 'IBM PC', 'ENIAC', 'Apple I', 'Commodore 64', 'alternativa_b'),
(1, 'Qual é a diferença entre RAM e ROM?', 'dificil', 'RAM é volátil, ROM é permanente', 'Não há diferença', 'RAM é permanente, ROM é volátil', 'Ambas são voláteis', 'alternativa_a'),
(1, 'O que é o protocolo TCP/IP?', 'dificil', 'Protocolo de email', 'Conjunto de protocolos base da internet', 'Protocolo de criptografia', 'Sistema operacional', 'alternativa_b'),
(1, 'O que é uma máquina virtual?', 'dificil', 'Um computador fictício', 'Software que emula um computador completo', 'Um tipo de vírus', 'Hardware especial', 'alternativa_b'),
(1, 'Qual linguagem foi criada por Guido van Rossum?', 'dificil', 'Java', 'Python', 'C++', 'Ruby', 'alternativa_b'),
(1, 'O que é DevOps?', 'dificil', 'Uma linguagem de programação', 'Cultura que une desenvolvimento e operações', 'Um sistema operacional', 'Um tipo de banco de dados', 'alternativa_b'),
(1, 'O que significa SOLID em programação?', 'dificil', 'Tipo de hardware', 'Cinco princípios de design orientado a objetos', 'Linguagem de programação', 'Metodologia ágil', 'alternativa_b'),
(1, 'Qual é a complexidade do algoritmo de busca binária?', 'dificil', 'O(n)', 'O(log n)', 'O(n²)', 'O(1)', 'alternativa_b'),
(1, 'O que é um container Docker?', 'dificil', 'Tipo de servidor físico', 'Unidade de software que empacota código e dependências', 'Sistema operacional', 'Linguagem de programação', 'alternativa_b'),
(1, 'O que é GraphQL?', 'dificil', 'Banco de dados', 'Linguagem de consulta para APIs', 'Framework JavaScript', 'Sistema operacional', 'alternativa_b'),
(1, 'O que é microserviços?', 'dificil', 'Pequenos computadores', 'Arquitetura onde aplicação é dividida em serviços independentes', 'Tipo de memória', 'Linguagem de programação', 'alternativa_b'),
(1, 'Qual padrão de design implementa o princípio da inversão de dependência?', 'dificil', 'Singleton', 'Dependency Injection', 'Factory', 'Observer', 'alternativa_b');

-- =====================================================
-- CIÊNCIAS (category_id = 2)
-- =====================================================

-- Fácil
INSERT INTO questions (category_id, enunciado, dificuldade, alternativa_a, alternativa_b, alternativa_c, alternativa_d, correta) VALUES
(2, 'Qual é o planeta mais próximo do Sol?', 'facil', 'Vênus', 'Mercúrio', 'Terra', 'Marte', 'alternativa_b'),
(2, 'Qual é a fórmula química da água?', 'facil', 'H2O', 'CO2', 'O2', 'H2O2', 'alternativa_a'),
(2, 'Quem propôs a teoria da evolução?', 'facil', 'Isaac Newton', 'Charles Darwin', 'Albert Einstein', 'Galileu Galilei', 'alternativa_b'),
(2, 'Qual é o maior órgão do corpo humano?', 'facil', 'Fígado', 'Pele', 'Coração', 'Cérebro', 'alternativa_b'),
(2, 'Qual é a temperatura de ebulição da água?', 'facil', '100°C', '90°C', '110°C', '80°C', 'alternativa_a'),
(2, 'Quantos planetas tem o Sistema Solar?', 'facil', '9', '8', '7', '10', 'alternativa_b'),
(2, 'Qual gás as plantas absorvem para fazer fotossíntese?', 'facil', 'Oxigênio', 'Dióxido de Carbono', 'Nitrogênio', 'Hidrogênio', 'alternativa_b'),
(2, 'Qual é o satélite natural da Terra?', 'facil', 'Sol', 'Lua', 'Marte', 'Vênus', 'alternativa_b'),
(2, 'De que são feitos os ossos principalmente?', 'facil', 'Ferro', 'Cálcio', 'Carbono', 'Oxigênio', 'alternativa_b'),
(2, 'O que é o ciclo da água?', 'facil', 'Movimento de peixes', 'Processo de evaporação, condensação e precipitação', 'Correntes marítimas', 'Movimento das marés', 'alternativa_b'),
(2, 'Qual órgão bombeia sangue no corpo?', 'facil', 'Pulmão', 'Fígado', 'Coração', 'Rim', 'alternativa_c'),
(2, 'O que produz a energia do Sol?', 'facil', 'Combustão', 'Fusão nuclear', 'Fissão nuclear', 'Energia elétrica', 'alternativa_b');

-- Médio
INSERT INTO questions (category_id, enunciado, dificuldade, alternativa_a, alternativa_b, alternativa_c, alternativa_d, correta) VALUES
(2, 'Quantos ossos tem o corpo humano adulto?', 'medio', '186', '206', '226', '196', 'alternativa_b'),
(2, 'Qual é a velocidade da luz?', 'medio', '300.000 km/s', '150.000 km/s', '450.000 km/s', '200.000 km/s', 'alternativa_a'),
(2, 'O que é fotossíntese?', 'medio', 'Respiração das plantas', 'Processo de produção de alimento pelas plantas usando luz', 'Reprodução das plantas', 'Crescimento das plantas', 'alternativa_b'),
(2, 'Quantos cromossomos tem uma célula humana?', 'medio', '23', '46', '48', '44', 'alternativa_b'),
(2, 'O que é DNA?', 'medio', 'Ácido desoxirribonucleico - material genético', 'Tipo de proteína', 'Tipo de célula', 'Hormônio', 'alternativa_a'),
(2, 'O que causa as marés?', 'medio', 'O vento', 'Atração gravitacional da Lua e do Sol', 'Rotação da Terra', 'Correntes oceânicas', 'alternativa_b'),
(2, 'Qual é o elemento químico mais abundante no universo?', 'medio', 'Oxigênio', 'Hidrogênio', 'Carbono', 'Hélio', 'alternativa_b'),
(2, 'O que é um átomo?', 'medio', 'A menor unidade de um elemento químico', 'Tipo de molécula', 'Partícula de energia', 'Tipo de célula', 'alternativa_a'),
(2, 'Qual é a função dos glóbulos brancos?', 'medio', 'Transportar oxigênio', 'Defender o corpo contra infecções', 'Coagular o sangue', 'Produzir hormônios', 'alternativa_b'),
(2, 'O que é um buraco negro?', 'medio', 'Estrela muito brilhante', 'Região do espaço com gravidade tão forte que nada escapa', 'Planeta sem luz', 'Nebulosa escura', 'alternativa_b'),
(2, 'Qual vitamina é produzida pela exposição ao sol?', 'medio', 'Vitamina A', 'Vitamina C', 'Vitamina D', 'Vitamina B12', 'alternativa_c'),
(2, 'O que é ozônio?', 'medio', 'Tipo de nuvem', 'Molécula formada por três átomos de oxigênio', 'Gás venenoso', 'Elemento radioativo', 'alternativa_b');

-- Difícil
INSERT INTO questions (category_id, enunciado, dificuldade, alternativa_a, alternativa_b, alternativa_c, alternativa_d, correta) VALUES
(2, 'Qual é a constante de Planck usada para?', 'dificil', 'Calcular velocidade', 'Relacionar energia e frequência de fótons', 'Medir temperatura', 'Calcular pressão', 'alternativa_b'),
(2, 'O que é antimatéria?', 'dificil', 'Matéria normal', 'Matéria composta por antipartículas', 'Energia escura', 'Buraco negro', 'alternativa_b'),
(2, 'Qual é o número de Avogadro?', 'dificil', '3,14159', '6,022 x 10²³', '9,81', '299.792.458', 'alternativa_b'),
(2, 'O que é CRISPR?', 'dificil', 'Tipo de microscópio', 'Ferramenta de edição genética', 'Vacina', 'Proteína', 'alternativa_b'),
(2, 'Qual partícula subatômica tem carga positiva?', 'dificil', 'Elétron', 'Nêutron', 'Próton', 'Fóton', 'alternativa_c'),
(2, 'O que é um quasar?', 'dificil', 'Tipo de estrela', 'Núcleo galáctico extremamente luminoso', 'Planeta gasoso', 'Cometa', 'alternativa_b'),
(2, 'Qual é a teoria que unifica eletromagnetismo e força fraca?', 'dificil', 'Relatividade Geral', 'Teoria Eletrofraca', 'Mecânica Quântica', 'Teoria das Cordas', 'alternativa_b'),
(2, 'O que são células-tronco?', 'dificil', 'Células mortas', 'Células que podem se diferenciar em vários tipos', 'Células cancerígenas', 'Células nervosas', 'alternativa_b'),
(2, 'Qual é o princípio da incerteza de Heisenberg?', 'dificil', 'Tudo é relativo', 'Impossível conhecer posição e momento de partícula simultaneamente', 'Energia se conserva', 'Matéria atrai matéria', 'alternativa_b'),
(2, 'O que é o bóson de Higgs?', 'dificil', 'Tipo de quark', 'Partícula que dá massa a outras partículas', 'Forma de energia', 'Tipo de força', 'alternativa_b'),
(2, 'Qual é a idade aproximada do universo?', 'dificil', '4,5 bilhões de anos', '13,8 bilhões de anos', '100 bilhões de anos', '1 bilhão de anos', 'alternativa_b'),
(2, 'O que são ondas gravitacionais?', 'dificil', 'Ondas sonoras no espaço', 'Ondulações no espaço-tempo causadas por objetos massivos acelerados', 'Radiação eletromagnética', 'Correntes de matéria escura', 'alternativa_b');

-- =====================================================
-- HISTÓRIA (category_id = 3)
-- =====================================================

-- Fácil
INSERT INTO questions (category_id, enunciado, dificuldade, alternativa_a, alternativa_b, alternativa_c, alternativa_d, correta) VALUES
(3, 'Em que ano foi descoberto o Brasil?', 'facil', '1492', '1500', '1510', '1498', 'alternativa_b'),
(3, 'Qual foi a primeira capital do Brasil?', 'facil', 'Rio de Janeiro', 'Salvador', 'São Paulo', 'Brasília', 'alternativa_b'),
(3, 'Quem pintou a Mona Lisa?', 'facil', 'Michelangelo', 'Leonardo da Vinci', 'Rafael', 'Donatello', 'alternativa_b'),
(3, 'Quem descobriu a América?', 'facil', 'Vasco da Gama', 'Cristóvão Colombo', 'Pedro Álvares Cabral', 'Fernando de Magalhães', 'alternativa_b'),
(3, 'Quem foi Dom Pedro I?', 'facil', 'Primeiro imperador do Brasil', 'Primeiro presidente do Brasil', 'Rei de Portugal', 'Descobridor do Brasil', 'alternativa_a'),
(3, 'Em que continente fica o Egito?', 'facil', 'Ásia', 'Europa', 'África', 'Oceania', 'alternativa_c'),
(3, 'Qual povo construiu as pirâmides do Egito?', 'facil', 'Romanos', 'Gregos', 'Egípcios', 'Maias', 'alternativa_c'),
(3, 'O que é a Torre Eiffel?', 'facil', 'Palácio em Londres', 'Monumento em Paris', 'Castelo na Alemanha', 'Igreja na Itália', 'alternativa_b'),
(3, 'Qual país presenteou a Estátua da Liberdade aos EUA?', 'facil', 'Inglaterra', 'França', 'Alemanha', 'Espanha', 'alternativa_b'),
(3, 'Em que cidade fica o Coliseu?', 'facil', 'Atenas', 'Paris', 'Roma', 'Londres', 'alternativa_c'),
(3, 'Quem escreveu Romeu e Julieta?', 'facil', 'Dante', 'Shakespeare', 'Goethe', 'Cervantes', 'alternativa_b'),
(3, 'Qual era o sistema de trabalho usado no Brasil colonial?', 'facil', 'CLT', 'Escravidão', 'Feudalismo', 'Comunismo', 'alternativa_b');

-- Médio
INSERT INTO questions (category_id, enunciado, dificuldade, alternativa_a, alternativa_b, alternativa_c, alternativa_d, correta) VALUES
(3, 'Quem foi o primeiro presidente do Brasil?', 'medio', 'Getúlio Vargas', 'Deodoro da Fonseca', 'Dom Pedro II', 'Juscelino Kubitschek', 'alternativa_b'),
(3, 'Em que ano ocorreu a Proclamação da República no Brasil?', 'medio', '1888', '1889', '1890', '1891', 'alternativa_b'),
(3, 'Em que ano começou a Segunda Guerra Mundial?', 'medio', '1939', '1940', '1938', '1941', 'alternativa_a'),
(3, 'Quem foi Napoleão Bonaparte?', 'medio', 'Imperador francês', 'Rei inglês', 'Filósofo grego', 'Explorador português', 'alternativa_a'),
(3, 'O que foi a Revolução Francesa?', 'medio', 'Guerra entre França e Inglaterra', 'Movimento que derrubou a monarquia francesa', 'Descoberta científica', 'Tratado de paz', 'alternativa_b'),
(3, 'Em que ano caiu o Muro de Berlim?', 'medio', '1989', '1990', '1988', '1991', 'alternativa_a'),
(3, 'Qual foi o período da ditadura militar no Brasil?', 'medio', '1964-1985', '1960-1980', '1970-1990', '1950-1970', 'alternativa_a'),
(3, 'O que foi a Inconfidência Mineira?', 'medio', 'Movimento de independência em Minas Gerais', 'Guerra civil', 'Descoberta de ouro', 'Tratado comercial', 'alternativa_a'),
(3, 'Em que século ocorreu o Renascimento?', 'medio', 'Século XIV-XVI', 'Século X-XII', 'Século XVII-XIX', 'Século XX', 'alternativa_a'),
(3, 'Quem foi Cleópatra?', 'medio', 'Rainha do Egito', 'Imperatriz romana', 'Rainha da Inglaterra', 'Filósofa grega', 'alternativa_a'),
(3, 'O que foi a Guerra Fria?', 'medio', 'Guerra entre EUA e Rússia com armas', 'Conflito ideológico entre EUA e URSS sem confronto direto', 'Invasão da Rússia', 'Guerra civil americana', 'alternativa_b'),
(3, 'Quem liderou a independência da Índia?', 'medio', 'Nelson Mandela', 'Mahatma Gandhi', 'Winston Churchill', 'Mao Tsé-tung', 'alternativa_b');

-- Difícil
INSERT INTO questions (category_id, enunciado, dificuldade, alternativa_a, alternativa_b, alternativa_c, alternativa_d, correta) VALUES
(3, 'Qual tratado encerrou a Primeira Guerra Mundial?', 'dificil', 'Tratado de Paris', 'Tratado de Versalhes', 'Tratado de Roma', 'Tratado de Viena', 'alternativa_b'),
(3, 'Em que ano foi fundada a ONU?', 'dificil', '1945', '1948', '1950', '1942', 'alternativa_a'),
(3, 'Quem foi o líder da Revolução Russa de 1917?', 'dificil', 'Stalin', 'Lenin', 'Trotsky', 'Marx', 'alternativa_b'),
(3, 'O que foi a Reforma Protestante?', 'dificil', 'Reforma política', 'Movimento religioso iniciado por Martinho Lutero', 'Revolução industrial', 'Tratado de paz', 'alternativa_b'),
(3, 'Qual civilização criou a escrita cuneiforme?', 'dificil', 'Egípcia', 'Suméria', 'Grega', 'Romana', 'alternativa_b'),
(3, 'Em que ano Constantinopla caiu para os otomanos?', 'dificil', '1453', '1492', '1517', '1399', 'alternativa_a'),
(3, 'Quem foi o primeiro imperador romano?', 'dificil', 'Júlio César', 'Augusto', 'Nero', 'Calígula', 'alternativa_b'),
(3, 'O que foi a Peste Negra?', 'dificil', 'Guerra medieval', 'Pandemia de peste bubônica no século XIV', 'Fome generalizada', 'Invasão bárbara', 'alternativa_b'),
(3, 'Qual foi a dinastia que governou a China por mais tempo?', 'dificil', 'Ming', 'Qing', 'Zhou', 'Han', 'alternativa_c'),
(3, 'O que foi o Iluminismo?', 'dificil', 'Movimento artístico', 'Movimento intelectual do século XVIII que valorizava a razão', 'Revolução industrial', 'Reforma religiosa', 'alternativa_b'),
(3, 'Quem foi Simón Bolívar?', 'dificil', 'Imperador brasileiro', 'Libertador de países sul-americanos', 'Rei espanhol', 'Presidente americano', 'alternativa_b'),
(3, 'Em que ano ocorreu a Revolução Gloriosa na Inglaterra?', 'dificil', '1688', '1789', '1649', '1776', 'alternativa_a');
