DROP DATABASE IF EXISTS codingplay;
CREATE DATABASE codingplay CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE codingplay;

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

INSERT INTO professor VALUES (1,'34452','professor','professor@gmail.com','db26588a2def92ed7e1e72ed8befe9a27af133542b2b088c6534489535badbff',1,'2019-02-22 04:13:57');

INSERT INTO problema VALUES (1,1,'Soma idade','Criar uma variável idade, adicionar 20 ao seu valor e imprimi-la.','Fácil','2019-02-22 04:13:57'),(2,1,'Média','Encontrar a média da soma destes valores: 7,8,8,5,4','Fácil','2019-02-22 04:13:57');

INSERT INTO sessao VALUES (1,1,1,'Acamp Programing',6,8,'2019-02-08 22:00:00','2019-02-09 01:00:00',NULL,NULL,'2019-02-22 04:13:57'),(2,1,2,'Development',6,8,'2019-02-09 18:00:00','2019-02-09 20:00:00',NULL,NULL,'2019-02-22 04:13:57'),(3,1,2,'Academing',6,8,'2019-02-09 22:00:00','2019-02-10 00:00:00',NULL,NULL,'2019-02-22 04:13:57'),(4,1,1,'Testando',6,8,'2019-02-10 18:00:00','2019-02-09 20:00:00',NULL,NULL,'2019-02-22 04:13:57');