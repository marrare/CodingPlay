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

create table problema (
    id int not null AUTO_INCREMENT,
    id_Professor int not null,
    nome_problema varchar(20) not null,
    desc_Problema text(10000) not null,
    dificuldade char(1) not null,
    data_Alteracao timestamp default current_timestamp,
    primary key(id),
    foreign key (id_Professor) references Professor(id)
);
	
create table gabarito (
    id int not null AUTO_INCREMENT,
    id_Problema int  not null,
    desc_Gabarito text(10000) not null,
    data_Alteracao timestamp default current_timestamp,
    primary key (id),
    foreign key (id_Problema) references Problema(id)
);

create table sessao (
    id int  not null AUTO_INCREMENT,
    id_Professor int not null,
    id_Problema int not null,
    nome_sessao varchar(20) not null,
    tamanho_grupo tinyint not null,
    tempo_rotacao tinyint not null,
    hora_inicio timestamp not null,
    hora_final timestamp not null,
    hora_inicio_realizado timestamp,
    hora_final_realizado timestamp,
    data_Alteracao timestamp default current_timestamp,
    primary key (id),
    foreign key (id_Professor) references Professor(id),
    foreign key (id_Problema) references Problema(id)
);

-- Password professor1234
INSERT INTO `professor`(`matricula`, `nome`, `email`, `senha`) VALUES (034452,"professor","professor@gmail.com","db26588a2def92ed7e1e72ed8befe9a27af133542b2b088c6534489535badbff");

-- Insert de problemas temporários para teste
INSERT INTO `problema`(`id_Professor`, `nome_problema`, `desc_Problema`, `dificuldade`) VALUES (1,'Soma idade','Criar uma variável idade, adicionar 20 ao seu valor e imprimi-la.','F');
INSERT INTO `problema`(`id_Professor`, `nome_problema`, `desc_Problema`, `dificuldade`) VALUES (1,'Média','Encontrar a média da soma destes valores: 7,8,8,5,4','F');

-- Insert de sessões temporários para teste
INSERT INTO `sessao`(`id_Professor`, `id_Problema`, `nome_sessao`, `tamanho_grupo`, `tempo_rotacao`, `hora_inicio`, `hora_final`) VALUES (1,1,"Acamp Programing",6,8,'2019-02-08 19:00:00','2019-02-08 22:00:00'),(1,2,"Development",6,8,'2019-02-09 15:00:00','2019-02-09 17:00:00'),(1,2,"Academing",6,8,'2019-02-09 19:00:00','2019-02-09 21:00:00'),(1,1,"Testando",6,8,'2019-02-10 15:00:00','2019-02-09 17:00:00');

