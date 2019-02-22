-- MySQL dump 10.13  Distrib 5.7.24, for Win32 (AMD64)
--
-- Host: localhost    Database: codingplay
-- ------------------------------------------------------
-- Server version	5.7.24

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP DATABASE IF EXISTS 'codingplay';
CREATE DATABASE codingplay;
USE DATABASE codingplay;

--
-- Table structure for table `aluno`
--

DROP TABLE IF EXISTS `aluno`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aluno` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `matricula` varchar(20) NOT NULL,
  `nome` varchar(60) NOT NULL,
  `email` varchar(40) NOT NULL,
  `senha` varchar(100) NOT NULL,
  `situacao` tinyint(1) DEFAULT '1',
  `pontuacao` int(11) DEFAULT '0',
  `nivel` tinyint(1) DEFAULT '0',
  `data_Alteracao` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aluno`
--

LOCK TABLES `aluno` WRITE;
/*!40000 ALTER TABLE `aluno` DISABLE KEYS */;
/*!40000 ALTER TABLE `aluno` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gabarito`
--

DROP TABLE IF EXISTS `gabarito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gabarito` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_Problema` int(11) NOT NULL,
  `desc_Gabarito` text NOT NULL,
  `data_Alteracao` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_Problema` (`id_Problema`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gabarito`
--

LOCK TABLES `gabarito` WRITE;
/*!40000 ALTER TABLE `gabarito` DISABLE KEYS */;
/*!40000 ALTER TABLE `gabarito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `problema`
--

DROP TABLE IF EXISTS `problema`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `problema` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_Professor` int(11) NOT NULL,
  `nome_problema` varchar(20) NOT NULL,
  `desc_Problema` text NOT NULL,
  `dificuldade` char(1) NOT NULL,
  `data_Alteracao` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_Professor` (`id_Professor`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `problema`
--

LOCK TABLES `problema` WRITE;
/*!40000 ALTER TABLE `problema` DISABLE KEYS */;
INSERT INTO `problema` VALUES (1,1,'Soma idade','Criar uma variável idade, adicionar 20 ao seu valor e imprimi-la.','F','2019-02-22 04:13:57'),(2,1,'Média','Encontrar a média da soma destes valores: 7,8,8,5,4','F','2019-02-22 04:13:57');
/*!40000 ALTER TABLE `problema` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `professor`
--

DROP TABLE IF EXISTS `professor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `professor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `matricula` varchar(20) NOT NULL,
  `nome` varchar(60) NOT NULL,
  `email` varchar(40) NOT NULL,
  `senha` varchar(100) NOT NULL,
  `situacao` tinyint(1) DEFAULT '1',
  `data_Alteracao` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `professor`
--

LOCK TABLES `professor` WRITE;
/*!40000 ALTER TABLE `professor` DISABLE KEYS / senha de professor é 'professor1234' */;
INSERT INTO `professor` VALUES (1,'34452','professor','professor@gmail.com','db26588a2def92ed7e1e72ed8befe9a27af133542b2b088c6534489535badbff',1,'2019-02-22 04:13:57');
/*!40000 ALTER TABLE `professor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessao`
--

DROP TABLE IF EXISTS `sessao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sessao` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_Professor` int(11) NOT NULL,
  `id_Problema` int(11) NOT NULL,
  `nome_sessao` varchar(20) NOT NULL,
  `tamanho_grupo` tinyint(4) NOT NULL,
  `tempo_rotacao` tinyint(4) NOT NULL,
  `hora_inicio` timestamp NOT NULL,
  `hora_final` timestamp NOT NULL,
  `hora_inicio_realizado` timestamp NULL DEFAULT NULL,
  `hora_final_realizado` timestamp NULL DEFAULT NULL,
  `data_Alteracao` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_Professor` (`id_Professor`),
  KEY `id_Problema` (`id_Problema`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessao`
--

LOCK TABLES `sessao` WRITE;
/*!40000 ALTER TABLE `sessao` DISABLE KEYS */;
INSERT INTO `sessao` VALUES (1,1,1,'Acamp Programing',6,8,'2019-02-08 22:00:00','2019-02-09 01:00:00',NULL,NULL,'2019-02-22 04:13:57'),(2,1,2,'Development',6,8,'2019-02-09 18:00:00','2019-02-09 20:00:00',NULL,NULL,'2019-02-22 04:13:57'),(3,1,2,'Academing',6,8,'2019-02-09 22:00:00','2019-02-10 00:00:00',NULL,NULL,'2019-02-22 04:13:57'),(4,1,1,'Testando',6,8,'2019-02-10 18:00:00','2019-02-09 20:00:00',NULL,NULL,'2019-02-22 04:13:57');
/*!40000 ALTER TABLE `sessao` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-02-22  1:25:33
