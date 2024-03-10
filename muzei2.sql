1. создаем базу

create database muzei2 COLLATE Cyrillic_General_CI_AS;


2. создаем структуру базы


CREATE TABLE users (id INT IDENTITY(1,1) PRIMARY KEY, emails VARCHAR(50) NOT NULL,uid VARCHAR(50) NOT NULL, statususer VARCHAR(10) NOT NULL,statusadmin VARCHAR(10) NOT NULL, status VARCHAR(20) NOT NULL);
CREATE TABLE booking (id INT IDENTITY(1,1) PRIMARY KEY,vistavka int NOT NULL,users varchar(100) NOT NULL) ;
CREATE TABLE muzei (id INT IDENTITY(1,1) PRIMARY KEY, names varchar(100) NOT NULL, descr text NOT NULL, photos text NOT NULL, users varchar(50) NOT NULL) ;
CREATE TABLE vistavki (id INT IDENTITY(1,1) PRIMARY KEY,muz int NOT NULL,names varchar(100) NOT NULL,descr text NOT NULL,photos text NOT NULL,users varchar(50) NOT NULL);