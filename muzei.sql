-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 10, 2024 at 04:14 AM
-- Server version: 8.0.36-0ubuntu0.22.04.1
-- PHP Version: 8.1.2-1ubuntu2.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `muzei`
--

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `id` int UNSIGNED NOT NULL,
  `vistavka` int NOT NULL,
  `users` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`id`, `vistavka`, `users`) VALUES
(1, 1, 'mu23@m.ru'),
(2, 4, 'mu23@m.ru'),
(3, 7, 'mu23@m.ru');

-- --------------------------------------------------------

--
-- Table structure for table `muzei`
--

CREATE TABLE `muzei` (
  `id` int NOT NULL,
  `names` varchar(100) NOT NULL,
  `descr` text NOT NULL,
  `photos` text NOT NULL,
  `users` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `muzei`
--

INSERT INTO `muzei` (`id`, `names`, `descr`, `photos`, `users`) VALUES
(1, 'Музей архиологии', 'Музей посвещенный старнинным вещам шщгщшг', 'c8641f2f4a2378be411faac8f2265217.jpg', 'mu22@m.ru'),
(2, 'Музей античного искусства', 'Идея создания Музея появилась у коллекционера Бориса Минца еще в 2012 году. Впервые как единое собрание полотна были представлены в аукционном доме MacDougall’s весной 2014 года. После официальной презентации в Москве значительная часть будущей постоянной коллекции побывала в Иванове, Венеции и Фрайбурге. В 2015 году Музей русского импрессионизма вошел в состав ICOM (Международный совет музеев). С самого первого дня существования Музей русского импрессионизма занимается специальными образовательными и просветительскими программами. А совместный с «Иностранкой» проект «Картина в библиотеке» почти за 3 года объехал несколько крупных российских городов и вывел Музей в финал «Интермузея-2016».', 'kartinki-russkogo-muzeya-17-1.jpg', 'mu22@m.ru'),
(3, 'тест', 'гнегне  гегн', 'kartinki-russkogo-muzeya-17-1.jpg', 'mu22@m.ru');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int UNSIGNED NOT NULL,
  `emails` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `uid` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `statususer` varchar(10) NOT NULL,
  `statusadmin` varchar(10) NOT NULL,
  `status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `emails`, `uid`, `statususer`, `statusadmin`, `status`) VALUES
(1, 'mu22@m.ru', 'mu22@m.ru', 'true', 'false', 'администратор'),
(2, 'mu23@m.ru', 'mu23@m.ru', 'false', 'true', 'пользователь'),
(4, 'mu25@m.ru', 'mu25@m.ru', 'true', 'false', 'администратор'),
(5, 'mu26@m.ru', 'mu26@m.ru', 'false', 'true', 'пользователь'),
(6, 'mu27@m.ru', 'mu27@m.ru', 'true', 'false', 'администратор'),
(7, 'mu30@m.ru', 'mu30@m.ru', 'true', 'false', 'администратор');

-- --------------------------------------------------------

--
-- Table structure for table `vistavki`
--

CREATE TABLE `vistavki` (
  `id` int NOT NULL,
  `muz` int NOT NULL,
  `names` varchar(100) NOT NULL,
  `descr` text NOT NULL,
  `photos` text NOT NULL,
  `users` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `vistavki`
--

INSERT INTO `vistavki` (`id`, `muz`, `names`, `descr`, `photos`, `users`) VALUES
(1, 1, 'Выставка мамонтов', 'С резьбой по кости мамонта можно познакомиться на выставке в художественном музее', 'NVECsi1Qg-g.jpg', 'mu22@m.ru'),
(2, 1, 'Выставка древней культуры', 'В экспозиции будут представлены более 80 скульптур и украшений из резной кости, созданных авторами мастерской «Минсалим» и другими мастерами Сибири.', 'kachelinakhoreyakhminsalimvishnyakova2019800big.jpg', 'mu22@m.ru'),
(3, 1, 'Выставка древнего Рима', 'Погрузитесь в атмосферу этой эпохи, почувствуйте дыхание старины и увидьте, как жизнь протекала на этих улицах в далекие времена. Независимо от того, являетесь ли вы любителем истории или вдохновляетесь великими архитектурными произведениями, наш сайт предоставит вам неповторимый опыт и красочные визуальные образы из древнего Рима. ', '299385-drevniy-rim-1.jpg', 'mu22@m.ru'),
(4, 2, 'Гробнаца Тутанхамона', 'Выставка сокровища гробницы тутанхамона в москве отзывы - фото', '688043.jpg', 'mu22@m.ru'),
(5, 2, 'Мультимедийная выставка «Микеланджело»', 'Суета дней нас сильно приземляет, и мы забываем, что время от времени надо питать и душу – слушать классическую музыку, ходить в музеи, замирать перед творениями гениальных художников…', '41.jpg', 'mu22@m.ru'),
(7, 3, 'тестовая выставка', 'описание выставки', 'kartinki-russkogo-muzeya-17-1.jpg', 'mu22@m.ru');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `muzei`
--
ALTER TABLE `muzei`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vistavki`
--
ALTER TABLE `vistavki`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `muzei`
--
ALTER TABLE `muzei`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `vistavki`
--
ALTER TABLE `vistavki`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
