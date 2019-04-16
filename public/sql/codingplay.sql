DROP DATABASE IF EXISTS codingplay;
CREATE DATABASE codingplay CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE codingplay;

SET SQL_MODE='allow_invalid_dates';

CREATE TABLE aluno (
  id int(11) NOT NULL AUTO_INCREMENT,
  codigo_pusher varchar(25) NOT NULL,
  matricula varchar(20)  NOT NULL,
  nome varchar(60) NOT NULL,
  email varchar(40) NOT NULL,
  senha varchar(100) NOT NULL,
  situacao tinyint(1) DEFAULT '1',
  pontuacao int(11) DEFAULT '0',
  nivel tinyint(1) DEFAULT '0',
  data_Alteracao timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE professor (
  id int(11) NOT NULL AUTO_INCREMENT,
  codigo_pusher varchar(25) NOT NULL,
  matricula varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  nome varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  email varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  senha varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  situacao tinyint(1) DEFAULT '1',
  data_Alteracao timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE problema (
  id int(11) NOT NULL AUTO_INCREMENT,
  id_Professor int(11) NOT NULL,
  nome_problema varchar(40) NOT NULL,
  desc_Problema mediumtext NOT NULL,
  dificuldade varchar(7) NOT NULL,
  data_Alteracao timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (id_Professor) REFERENCES professor (id)
);

CREATE TABLE sessao (
  id int(11) NOT NULL AUTO_INCREMENT,
  id_Professor int(11) NOT NULL,
  id_Problema int(11) NOT NULL,
  situacao tinyint(1) DEFAULT '1',
  nome_sessao varchar(20) NOT NULL,
  texto_colaborativo varchar(10) NOT NULL,
  tamanho_grupo tinyint(4) NOT NULL,
  tempo_rotacao tinyint(4) NOT NULL,
  hora_inicio timestamp NOT NULL,
  hora_final timestamp NOT NULL,
  hora_inicio_realizado timestamp NULL DEFAULT NULL,
  hora_final_realizado timestamp NULL DEFAULT NULL,
  resposta_sessao_realizada text DEFAULT NULL,
  chat_sessao_realizada text DEFAULT NULL,
  data_Alteracao timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (id_Professor) REFERENCES professor (id),
  FOREIGN KEY (id_Problema) REFERENCES problema (id)
);

CREATE TABLE participa_sessao (
  id int(11) NOT NULL AUTO_INCREMENT,
  id_participante int(11) NOT NULL,
  id_sessao int(11) NOT NULL,
  data_Alteracao timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (id_participante) REFERENCES aluno (id),
  FOREIGN KEY (id_sessao) REFERENCES sessao (id)
);

-- Senha "aluno1234"
INSERT INTO aluno(codigo_pusher,matricula,nome,email,senha) VALUES ('6902168891230884','321457','aluno','aluno@gmail.com','9b856e7d565fb4c118445b56259e3ad592c84a71eceafb793c48b367cdb84c88');

-- Senha "professor1234"
INSERT INTO professor(codigo_pusher,matricula,nome,email,senha) VALUES ('7933409374315861','34452','professor','professor@gmail.com','db26588a2def92ed7e1e72ed8befe9a27af133542b2b088c6534489535badbff');

INSERT INTO problema(id_professor,nome_problema,desc_problema,dificuldade) VALUES (1,'Soma idade','Criar uma variável idade, adicionar 20 ao seu valor e imprimi-la.','Fácil'),(1,'Média','Encontrar a média da soma destes valores: 7,8,8,5,4','Fácil');

INSERT INTO sessao(id_professor,id_problema,nome_sessao,texto_colaborativo,tamanho_grupo,tempo_rotacao,hora_inicio,hora_final) VALUES (1,2,'P5A4C','g073vryca',8,8,'2019-03-08 22:00:00','2019-03-08 23:00:00'),(1,2,'HTN46','nx15vztpj',4,8,'2019-03-20 18:00:00','2019-03-20 20:00:00'),(1,1,'26PAG','8wfhau04e',10,6,'2019-04-01 20:00:00','2019-04-01 22:00:00'),(1,1,'4ER2T','annjpa2zt',6,8,'2019-03-10 18:00:00','2019-03-10 20:00:00');