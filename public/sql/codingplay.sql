DROP DATABASE IF EXISTS codingplay;
CREATE DATABASE codingplay CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE codingplay;

SET SQL_MODE='allow_invalid_dates';

CREATE TABLE aluno (
  id int(11) NOT NULL AUTO_INCREMENT,
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
  nome_sessao varchar(20) NOT NULL,
  tamanho_grupo tinyint(4) NOT NULL,
  tempo_rotacao tinyint(4) NOT NULL,
  hora_inicio timestamp NOT NULL,
  hora_final timestamp NOT NULL,
  hora_inicio_realizado timestamp NULL DEFAULT NULL,
  hora_final_realizado timestamp NULL DEFAULT NULL,
  data_Alteracao timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (id_Professor) REFERENCES professor (id),
  FOREIGN KEY (id_Problema) REFERENCES problema (id)
);

-- Senha "professor'1234"
INSERT INTO professor(matricula,nome,email,senha) VALUES ('34452','professor','professor@gmail.com','db26588a2def92ed7e1e72ed8befe9a27af133542b2b088c6534489535badbff');

INSERT INTO problema(id_professor,nome_problema,desc_problema,dificuldade) VALUES (1,'Soma idade','Criar uma variável idade, adicionar 20 ao seu valor e imprimi-la.','Fácil'),(1,'Média','Encontrar a média da soma destes valores: 7,8,8,5,4','Fácil');

INSERT INTO sessao(id_professor,id_problema,nome_sessao,tamanho_grupo,tempo_rotacao,hora_inicio,hora_final) VALUES (1,2,'P5A4C',8,8,'2019-03-08 22:00:00','2019-03-08 23:00:00'),(1,2,'HTN46',4,8,'2019-03-20 18:00:00','2019-03-20 20:00:00'),(1,1,'26PAG',10,6,'2019-04-01 20:00:00','2019-04-01 22:00:00'),(1,1,'4ER2T',6,8,'2019-03-10 18:00:00','2019-03-10 20:00:00');