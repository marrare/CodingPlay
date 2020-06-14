DROP DATABASE IF EXISTS codingplay;
CREATE DATABASE codingplay CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE codingplay;

SET SQL_MODE='allow_invalid_dates';
SET @@auto_increment_offset=1;
SET @@auto_increment_increment=1;

CREATE TABLE aluno (
  id int NOT NULL AUTO_INCREMENT,
  codigo_pusher varchar(25) NOT NULL,
  matricula varchar(20)  NOT NULL,
  nome varchar(60) NOT NULL,
  email varchar(40) NOT NULL,
  senha varchar(100) NOT NULL,
  situacao tinyint(1) DEFAULT '0',
  pontuacao int(11) DEFAULT '0',
  nivel tinyint(1) DEFAULT '0',
  data_Alteracao timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_email (email),
  UNIQUE KEY unique_matricula (matricula),
  UNIQUE KEY unique_codigo_pusher (codigo_pusher),
  PRIMARY KEY (id)
);

CREATE TABLE professor (
  id int NOT NULL AUTO_INCREMENT,
  codigo_pusher varchar(25) NOT NULL,
  matricula varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  nome varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  email varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  senha varchar(100) COLLATE utf8mb4_unicode_ci,
  situacao tinyint(1) DEFAULT '1',
  data_Alteracao timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_email (email),
  UNIQUE KEY unique_matricula (matricula),
  UNIQUE KEY unique_codigo_pusher (codigo_pusher),
  PRIMARY KEY (id)
);

CREATE TABLE problema (
  id int NOT NULL AUTO_INCREMENT,
  id_Professor int NOT NULL,
  nome_problema varchar(40) NOT NULL,
  desc_Problema text(10000) NOT NULL,
  dificuldade varchar(7) NOT NULL,
  quantidade_entradas varchar(200),
  situacao tinyint(1) DEFAULT '1',
  data_Alteracao timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (id_Professor) REFERENCES professor (id)
);

CREATE TABLE problema_caso_teste (
  id int NOT NULL AUTO_INCREMENT,
  id_Problema int NOT NULL,
  entrada varchar(120) NOT NULL,
  saida varchar(50) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id_Problema) REFERENCES problema (id)
);

CREATE TABLE equipe (
  id int NOT NULL AUTO_INCREMENT,
  nome varchar(120) NOT NULL,  
  PRIMARY KEY (id
);

CREATE TABLE aluno_equipe (
  id int NOT NULL AUTO_INCREMENT,
  id_Equipe int NOT NULL,
  id_Aluno int NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id_Equipe) REFERENCES equipe (id),
  FOREIGN KEY (id_Aluno) REFERENCES aluno (id)
);

CREATE TABLE sessao (
  id int NOT NULL AUTO_INCREMENT,
  id_Professor int NOT NULL,
  id_Problema int NOT NULL,
  id_Equipe int NOT NULL,
  situacao tinyint(1) DEFAULT '1',
  tipo_sessao varchar(7) NOT NULL,
  confirm_sessao_professor tinyint(1) DEFAULT 0,
  nome_sessao varchar(20) NOT NULL,
  texto_colaborativo varchar(10) NOT NULL,
  tamanho_grupo tinyint(4) NOT NULL,
  tempo_rotacao tinyint(4) NOT NULL,
  hora_inicio timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  hora_final timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  hora_inicio_realizado timestamp NULL DEFAULT NULL,
  hora_final_realizado timestamp NULL DEFAULT NULL,
  resposta_sessao_realizada text(10000) DEFAULT NULL,
  resposta_correta tinyint(1) DEFAULT NULL,
  feedback_sessao text(10000) DEFAULT NULL,
  acerto_casos_teste tinyint(3) DEFAULT NULL,
  data_Alteracao timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (id_Professor) REFERENCES professor (id),
  FOREIGN KEY (id_Problema) REFERENCES problema (id),
  FOREIGN KEY (id_Equipe) REFERENCES equipe (id)
);

CREATE TABLE participa_sessao (
  id int NOT NULL AUTO_INCREMENT,
  id_participante int NOT NULL,
  id_sessao int NOT NULL,
  data_Alteracao timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (id_participante) REFERENCES aluno (id),
  FOREIGN KEY (id_sessao) REFERENCES sessao (id)
);
CREATE TABLE perguntas_questionario (
  id int NOT NULL AUTO_INCREMENT,
  pergunta text(1000) NOT NULL,
  pergunta_fechada tinyint(1) NOT NULL,
  data_Alteracao timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);
CREATE TABLE respostas_questionario (
  id int NOT NULL AUTO_INCREMENT,
  id_pergunta int NOT NULL,
  id_participa_sessao int NOT NULL,
  resposta text(10000) NOT NULL,
  data_Alteracao timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (id_pergunta) REFERENCES perguntas_questionario (id),
  FOREIGN KEY (id_participa_sessao) REFERENCES participa_sessao (id)
);

-- Senha "aluno1234"
INSERT INTO aluno(codigo_pusher,matricula,nome,email,senha) VALUES ('6902168891230884','321457','aluno','aluno@gmail.com','9b856e7d565fb4c118445b56259e3ad592c84a71eceafb793c48b367cdb84c88');

-- Senha "professor1234"
INSERT INTO professor(codigo_pusher,matricula,nome,email,senha) VALUES ('7933409374315861','34452','professor','professor@gmail.com','db26588a2def92ed7e1e72ed8befe9a27af133542b2b088c6534489535badbff');

INSERT INTO problema(id_professor,nome_problema,desc_problema,dificuldade) VALUES (1,'SALÁRIO COM COMISSÃO','Faça um programa que leia o salário fixo de um vendedor e o valor total de vendas no mês que ele realizou. Considerando que o vendedor tem uma comissão de 5% do valor vendido. Imprimir o valor final recebido pelo vendedor. \r\nExemplo: \r\n    1200.0 5000.0 ==> 1450.0','fácil'),(1,'CONTADOR DE VOGAIS','Escreva uma função que receba uma string por parâmetro e verifique quantas letras dessa string são vogais, no final imprimir o número de vogais presente na string.','fácil'),(1,'ARRAY CRESCENTE','Escreva uma função que receba um array por parâmetro e verifique se o array está em ordem crescente, emitindo ao final uma mensagem \"Array crescente\" se crescente.\r\nExemplo:\r\n    [2,6,7,9] ---> \"Array crescente\"\r\n    [2,3,6,7] ---> ','fácil'),(1,'SITUAÇÃO DO ALUNO','Construa um programa para imprimir a situação do aluno: APROVADO, REPROVADO POR NOTA, REPROVADO POR FALTA.\r\nOs dados de entrada serão a nota da 1º unidade, a nota da 2º unidade e a quantidade de faltas no semestre. \r\nA disciplina tem uma carga horária de 100 aulas.\r\nCaso o aluno falte mais que 25% do número total de aulas, o aluno ficará REPROVADO POR FALTA; caso contrário deverá ser observada a nota final, calculada como média aritmética das duas notas de unidade. \r\nCaso a nota final seja maior ou igual a 6.0, o aluno estará APROVADO; caso contrário, o aluno estará REPROVADO POR NOTA.\r\n','fácil');

INSERT INTO perguntas_questionario(pergunta,pergunta_fechada) VALUES ('Sua equipe conseguiu montar as estratégias adequadas para alcançar a solução ?',1),('A ferramenta favoreceu a aprendizagem do tópico do problema em questão ?',1),('Foi possível desenvolver uma solução de forma colaborativa ?',1),('A ferramenta dificultou de alguma forma seu aprendizado ?',1),('É possível descrever algum novo conhecimento em relação a Lógica de Programação adquirido nesta sessão?',0),('Ocorreu alguma situação inesperada na sessão? Pode descrevê-la.',0),('O que ocorreu bem ?',0);