drop database codingplay;

create database codingplay;

use codingplay;

create table professor (
id int not null AUTO_INCREMENT,
matricula varchar(20) not null,
nome varchar(60) not null,
email varchar(40) not null,
senha varchar(100) not null,
situacao tinyint(1) default 1,
data_Alteracao timestamp default current_timestamp,
primary key(id)
);

-- Password professor1234
INSERT INTO `professor`(`matricula`, `nome`, `email`, `senha`) VALUES (034452,"professor","professor@gmail.com","db26588a2def92ed7e1e72ed8befe9a27af133542b2b088c6534489535badbff");

create table aluno (
id int not null AUTO_INCREMENT,
matricula varchar(20) not null,
nome varchar(60) not null,
email varchar(40) not null,
senha varchar(100) not null,
situacao tinyint(1) default 1,
pontuacao int default 0,
nivel tinyint(1) default 0,
data_Alteracao timestamp default current_timestamp,
primary key(id)
);