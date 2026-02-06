-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: localhost    Database: infinity_quiz
-- ------------------------------------------------------
-- Server version	8.0.45

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `imagem_capa` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (1,'Tecnologia','tech.jpg'),(2,'Ciências','science.jpg'),(3,'História','history.jpg'),(4,'Conhecimentos Gerais',NULL);
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historico_partidas`
--

DROP TABLE IF EXISTS `historico_partidas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historico_partidas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `categoria_id` int NOT NULL,
  `pontos` int NOT NULL,
  `data_jogo` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `categoria_id` (`categoria_id`),
  CONSTRAINT `historico_partidas_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `historico_partidas_ibfk_2` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historico_partidas`
--

LOCK TABLES `historico_partidas` WRITE;
/*!40000 ALTER TABLE `historico_partidas` DISABLE KEYS */;
/*!40000 ALTER TABLE `historico_partidas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_id` int NOT NULL,
  `enunciado` text NOT NULL,
  `alternativa_a` text NOT NULL,
  `alternativa_b` text NOT NULL,
  `alternativa_c` text NOT NULL,
  `alternativa_d` text NOT NULL,
  `correta` enum('alternativa_a','alternativa_b','alternativa_c','alternativa_d') NOT NULL,
  `dificuldade` enum('facil','medio','dificil') DEFAULT 'medio',
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categorias` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` VALUES (1,1,'Qual linguagem é conhecida como a \"linguagem da web\"?','Python','JavaScript','Java','C++','alternativa_b','facil'),(2,1,'O que significa HTML?','HyperText Markup Language','High Tech Modern Language','Home Tool Markup Language','Hyperlinks and Text Markup Language','alternativa_a','facil'),(3,1,'Qual empresa criou o sistema operacional Android?','Apple','Microsoft','Google','Samsung','alternativa_c','medio'),(4,1,'O que é um algoritmo?','Um tipo de computador','Uma sequência de instruções para resolver um problema','Uma linguagem de programação','Um sistema operacional','alternativa_b','facil'),(5,1,'Qual é a função principal de um banco de dados?','Criar websites','Armazenar e organizar dados','Executar programas','Conectar à internet','alternativa_b','medio'),(6,1,'O que significa API?','Advanced Programming Interface','Application Programming Interface','Automated Program Integration','Applied Programming Instructions','alternativa_b','medio'),(7,1,'Qual linguagem é usada para estilizar páginas web?','HTML','JavaScript','CSS','Python','alternativa_c','facil'),(8,1,'O que é Cloud Computing?','Computação em nuvem - serviços via internet','Um tipo de computador','Um sistema operacional','Uma linguagem de programação','alternativa_a','medio'),(9,1,'Qual foi o primeiro computador eletrônico?','IBM PC','ENIAC','Apple I','Commodore 64','alternativa_b','dificil'),(10,1,'O que é Machine Learning?','Um tipo de hardware','Aprendizado de máquina - IA que aprende com dados','Uma linguagem de programação','Um sistema operacional','alternativa_b','medio'),(11,1,'Qual protocolo é usado para transferir páginas web?','FTP','HTTP','SMTP','SSH','alternativa_b','medio'),(12,1,'O que significa SQL?','Structured Query Language','Simple Question Language','Standard Quality Language','System Query Logic','alternativa_a','facil'),(13,1,'Qual empresa desenvolveu o React?','Google','Facebook (Meta)','Microsoft','Apple','alternativa_b','medio'),(14,1,'O que é um framework?','Um tipo de computador','Uma estrutura de código reutilizável','Um banco de dados','Um navegador web','alternativa_b','medio'),(15,1,'Qual é a diferença entre RAM e ROM?','RAM é volátil, ROM é permanente','Não há diferença','RAM é permanente, ROM é volátil','Ambas são voláteis','alternativa_a','dificil'),(16,1,'Qual linguagem é conhecida como a \"linguagem da web\"?','Python','JavaScript','Java','C++','alternativa_b','facil'),(17,1,'O que significa HTML?','HyperText Markup Language','High Tech Modern Language','Home Tool Markup Language','Hyperlinks and Text Markup Language','alternativa_a','facil'),(18,1,'Qual empresa criou o sistema operacional Android?','Apple','Microsoft','Google','Samsung','alternativa_c','medio'),(19,1,'O que é um algoritmo?','Um tipo de computador','Uma sequência de instruções para resolver um problema','Uma linguagem de programação','Um sistema operacional','alternativa_b','facil'),(20,1,'Qual é a função principal de um banco de dados?','Criar websites','Armazenar e organizar dados','Executar programas','Conectar à internet','alternativa_b','medio'),(21,1,'O que significa API?','Advanced Programming Interface','Application Programming Interface','Automated Program Integration','Applied Programming Instructions','alternativa_b','medio'),(22,1,'Qual linguagem é usada para estilizar páginas web?','HTML','JavaScript','CSS','Python','alternativa_c','facil'),(23,1,'O que é Cloud Computing?','Computação em nuvem - serviços via internet','Um tipo de computador','Um sistema operacional','Uma linguagem de programação','alternativa_a','medio'),(24,1,'Qual foi o primeiro computador eletrônico?','IBM PC','ENIAC','Apple I','Commodore 64','alternativa_b','dificil'),(25,1,'O que é Machine Learning?','Um tipo de hardware','Aprendizado de máquina - IA que aprende com dados','Uma linguagem de programação','Um sistema operacional','alternativa_b','medio'),(26,1,'Qual protocolo é usado para transferir páginas web?','FTP','HTTP','SMTP','SSH','alternativa_b','medio'),(27,1,'O que significa SQL?','Structured Query Language','Simple Question Language','Standard Quality Language','System Query Logic','alternativa_a','facil'),(28,1,'Qual empresa desenvolveu o React?','Google','Facebook (Meta)','Microsoft','Apple','alternativa_b','medio'),(29,1,'O que é um framework?','Um tipo de computador','Uma estrutura de código reutilizável','Um banco de dados','Um navegador web','alternativa_b','medio'),(30,1,'Qual é a diferença entre RAM e ROM?','RAM é volátil, ROM é permanente','Não há diferença','RAM é permanente, ROM é volátil','Ambas são voláteis','alternativa_a','dificil'),(31,2,'Qual é o planeta mais próximo do Sol?','Vênus','Mercúrio','Terra','Marte','alternativa_b','facil'),(32,2,'Quantos ossos tem o corpo humano adulto?','186','206','226','196','alternativa_b','medio'),(33,2,'Qual é a fórmula química da água?','H2O','CO2','O2','H2O2','alternativa_a','facil'),(34,2,'Qual é a velocidade da luz?','300.000 km/s','150.000 km/s','450.000 km/s','200.000 km/s','alternativa_a','medio'),(35,2,'Quem propôs a teoria da evolução?','Isaac Newton','Charles Darwin','Albert Einstein','Galileu Galilei','alternativa_b','facil'),(36,2,'O que é fotossíntese?','Processo de respiração das plantas','Processo de produção de alimento pelas plantas','Processo de reprodução das plantas','Processo de crescimento das plantas','alternativa_b','medio'),(37,2,'Qual é o maior órgão do corpo humano?','Fígado','Pele','Coração','Cérebro','alternativa_b','facil'),(38,2,'Quantos cromossomos tem uma célula humana?','23','46','48','44','alternativa_b','medio'),(39,2,'O que é DNA?','Ácido desoxirribonucleico - material genético','Um tipo de proteína','Um tipo de célula','Um hormônio','alternativa_a','medio'),(40,2,'Qual é a temperatura de ebulição da água?','100°C','90°C','110°C','80°C','alternativa_a','facil'),(41,2,'Qual gás as plantas absorvem da atmosfera?','Oxigênio','Dióxido de Carbono (CO2)','Nitrogênio','Hidrogênio','alternativa_b','facil'),(42,2,'O que causa as marés?','O vento','A atração gravitacional da Lua','A rotação da Terra','As correntes oceânicas','alternativa_b','medio'),(43,2,'Qual é o elemento químico mais abundante no universo?','Oxigênio','Hidrogênio','Carbono','Hélio','alternativa_b','medio'),(44,2,'Quantos planetas tem o Sistema Solar?','9','8','7','10','alternativa_b','facil'),(45,2,'O que é um átomo?','A menor unidade de matéria','Um tipo de molécula','Uma partícula de energia','Um tipo de célula','alternativa_a','medio'),(46,3,'Em que ano foi descoberto o Brasil?','1492','1500','1510','1498','alternativa_b','facil'),(47,3,'Quem foi o primeiro presidente do Brasil?','Getúlio Vargas','Deodoro da Fonseca','Dom Pedro II','Juscelino Kubitschek','alternativa_b','medio'),(48,3,'Em que ano ocorreu a Proclamação da República no Brasil?','1888','1889','1890','1891','alternativa_b','medio'),(49,3,'Qual foi a primeira capital do Brasil?','Rio de Janeiro','Salvador','São Paulo','Brasília','alternativa_b','facil'),(50,3,'Quem pintou a Mona Lisa?','Michelangelo','Leonardo da Vinci','Rafael','Donatello','alternativa_b','facil'),(51,3,'Em que ano começou a Segunda Guerra Mundial?','1939','1940','1938','1941','alternativa_a','medio'),(52,3,'Quem foi Napoleão Bonaparte?','Um imperador francês','Um rei inglês','Um filósofo grego','Um explorador português','alternativa_a','medio'),(53,3,'O que foi a Revolução Francesa?','Uma guerra entre França e Inglaterra','Um movimento que derrubou a monarquia francesa','Uma descoberta científica','Um tratado de paz','alternativa_b','medio'),(54,3,'Quem descobriu a América?','Vasco da Gama','Cristóvão Colombo','Pedro Álvares Cabral','Fernando de Magalhães','alternativa_b','facil'),(55,3,'Em que ano caiu o Muro de Berlim?','1989','1990','1988','1991','alternativa_a','medio'),(56,3,'Qual foi o período da ditadura militar no Brasil?','1964-1985','1960-1980','1970-1990','1950-1970','alternativa_a','medio'),(57,3,'Quem foi Dom Pedro I?','Primeiro imperador do Brasil','Primeiro presidente do Brasil','Rei de Portugal','Descobridor do Brasil','alternativa_a','facil'),(58,3,'O que foi a Inconfidência Mineira?','Um movimento de independência em Minas Gerais','Uma guerra civil','Uma descoberta de ouro','Um tratado comercial','alternativa_a','dificil'),(59,3,'Em que século ocorreu o Renascimento?','Século XIV-XVI','Século X-XII','Século XVII-XIX','Século XX','alternativa_a','medio'),(60,3,'Quem foi Cleópatra?','Rainha do Egito','Imperatriz romana','Rainha da Inglaterra','Filósofa grega','alternativa_b','medio'),(61,3,'Qual evento marcou o fim do Consulado e a proclamação de Napoleão Bonaparte como Imperador da França em 1804?','A assinatura do Tratado de Tilsit, que consolidou a supremacia francesa na Europa.','A realização de um plebiscito nacional que ratificou a nova Constituição do Ano XII, estabelecendo o Império.','O Golpe do 18 de Brumário, que derrubou o Diretório e iniciou a ascensão de Napoleão.','A vitória decisiva na Batalha de Austerlitz contra a Terceira Coalizão.','alternativa_b','medio'),(62,3,'A União Ibérica (1580-1640), período em que Portugal e suas colônias ficaram sob o domínio da Coroa Espanhola, é diretamente responsável pela invasão holandesa no Nordeste brasileiro. O fim da presença holandesa foi impulsionado por qual evento na metrópole?','A Restauração Portuguesa, que devolveu a coroa a D. João IV e priorizou a retomada do território brasileiro.','O Tratado de Tordesilhas, que foi revogado pelos holandeses após a tomada de Olinda.','A assinatura do Tratado de Madrid, que redefiniu as fronteiras coloniais.','A Crise de Sucessão Espanhola, que desviou o foco militar dos Países Baixos.','alternativa_a','medio'),(63,3,'Qual imperador romano é conhecido por ter oficializado o Cristianismo como religião lícita (permitida) dentro do Império Romano através da promulgação do Edito de Milão em 313 d.C.?','Diocleciano','Nero','Teodósio I','Constantino','alternativa_d','medio'),(64,3,'O Plano Marshall (European Recovery Program), implementado pelos Estados Unidos após a Segunda Guerra Mundial, foi crucial para a Guerra Fria. Qual era o objetivo primário deste programa?','Estabelecer uma aliança militar unificada (OTAN) para defender a Europa Ocidental de invasões soviéticas.','Criar um mercado comum europeu para garantir a hegemonia econômica americana sobre a Inglaterra.','Fornecer apoio financeiro à URSS, conforme acordado nas Conferências de Potsdam e Yalta.','Reconstruir as economias da Europa Ocidental para fortalecer regimes democráticos e impedir a expansão do comunismo.','alternativa_d','medio'),(65,3,'Durante a Baixa Idade Média (séculos XI ao XV), o renascimento urbano e comercial na Europa impulsionou o desenvolvimento de uma nova classe social que, apesar de não pertencer à nobreza, detinha poder econômico crescente. Que classe é essa?','Clero Regular','Servos da Gleba','Burguesia','Vassalos','alternativa_c','medio'),(66,4,'Qual monumento icônico da Roma Antiga é famoso por ter uma cúpula de concreto não suportada, sendo o panteão mais bem preservado da cidade?','O Panteão de Agripa','O Coliseu','O Fórum Romano','O Arco de Constantino','alternativa_a','medio'),(67,4,'Na tabela periódica, qual elemento químico é representado pelo símbolo \'W\', sendo notável por ter o maior ponto de fusão de todos os elementos?','Estanho','Tungstênio','Vanádio','Bário','alternativa_b','medio'),(68,4,'Qual escritor espanhol é amplamente reconhecido como um dos maiores dramaturgos do século XX, sendo o autor de \'A Casa de Bernarda Alba\'?','Miguel de Cervantes','Gabriel García Márquez','Federico García Lorca','Jorge Luis Borges','alternativa_c','medio'),(69,4,'Qual é o nome formal da capital dos Países Baixos (Holanda), embora a sede do governo, o parlamento e a monarquia estejam localizados em Haia?','Roterdã','Utreque','Eindhoven','Amsterdã','alternativa_d','medio'),(70,4,'Qual diretor de cinema britânico, conhecido como \'Mestre do Suspense\', dirigiu clássicos como \'Psicose\', \'Os Pássaros\' e \'Janela Indiscreta\'?','Alfred Hitchcock','Stanley Kubrick','Orson Welles','Steven Spielberg','alternativa_a','medio'),(71,4,'Durante a Guerra Fria, a Doutrina Truman, estabelecida em 1947, foi uma política externa crucial dos EUA. Qual era o seu objetivo principal?','Estabelecer a hegemonia econômica no continente americano.','Conter a expansão do comunismo e da influência soviética no mundo.','Promover a criação do Estado de Israel após a Segunda Guerra Mundial.','Incentivar a descolonização das nações africanas e asiáticas.','alternativa_b','medio'),(72,4,'Na mitologia grega clássica, quem era a divindade conhecida por ser o deus da guerra, sendo filho de Zeus e Hera, e frequentemente associado à violência e brutalidade?','Apolo','Hades','Hefesto','Ares','alternativa_d','medio'),(73,4,'Qual organização internacional, criada em 1995, substituiu o GATT (Acordo Geral de Tarifas e Comércio) com o objetivo de regulamentar e facilitar o comércio global?','Fundo Monetário Internacional (FMI)','Banco Mundial (BM)','Organização Mundial do Comércio (OMC)','Organização das Nações Unidas (ONU)','alternativa_c','medio'),(74,4,'O Protocolo de Kyoto, um acordo internacional adotado em 1997 e que entrou em vigor em 2005, tem como foco principal a redução da emissão de:','Gases radioativos derivados de energia nuclear.','Gases de efeito estufa.','Produtos químicos que destroem a camada de ozônio.','Metais pesados despejados em rios e oceanos.','alternativa_b','medio'),(75,4,'O nome dado ao buraco negro supermassivo que se acredita estar localizado no centro da nossa galáxia, a Via Láctea, é:','Sagittarius A*','Cisne X-1','Messier 87','Andrômeda B','alternativa_a','medio');
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scores`
--

DROP TABLE IF EXISTS `scores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `scores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `category_id` int NOT NULL,
  `score` int NOT NULL,
  `date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `scores_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `scores_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categorias` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scores`
--

LOCK TABLES `scores` WRITE;
/*!40000 ALTER TABLE `scores` DISABLE KEYS */;
INSERT INTO `scores` VALUES (1,2,1,4,'2026-01-26 18:00:30'),(2,2,1,1,'2026-01-26 18:04:13'),(3,2,3,0,'2026-01-26 18:06:30'),(4,2,3,0,'2026-01-26 18:06:47'),(5,3,2,1,'2026-01-26 18:29:28'),(6,5,1,1,'2026-01-27 11:19:35'),(7,5,2,0,'2026-01-27 11:27:09'),(8,5,2,0,'2026-01-27 11:27:21'),(9,4,1,5,'2026-01-29 11:20:43');
/*!40000 ALTER TABLE `scores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `is_admin` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'diaosias','djsanodinaosid@gmail.com','$2b$10$unM8FBpYruI/Md8Yk5tdJuHr.gI/Bo3MoMLO2oUbtRkdmmEdwvMnq','2026-01-26 20:50:08',0),(2,'pedro123','pedroferaguiar@gmail.com','$2b$10$KNFuev7UEYvt.gNvvRai0u26z9WOsLPZ3yhYN9B4oDjOc9V1rb1vC','2026-01-26 20:51:06',0),(3,'contaTeste1','contaTeste1@gmail.com','$2b$10$nyAY4td5wZhOv/Fm0pLJPuLSHrXVQx6x0GSdoIcdPZkdp5X9k5r0G','2026-01-26 21:21:09',0),(4,'Adm','admin123@gmail.com','$2b$10$SX7qFgq2TiOnKtGkzyTHMuQDpmgt7Jw.vAhitFJ4YN6P1xKbs2Fy2','2026-01-26 21:36:46',1),(5,'bernardo','bernardo@gmail.com','$2b$10$xwsDuyTUe288Hr6pTk5mTul6b.sRDt169horTpcFpoEOF8HrUBFJK','2026-01-27 14:19:08',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome_completo` varchar(100) NOT NULL,
  `apelido` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `criado_em` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `apelido` (`apelido`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-05 16:04:26
