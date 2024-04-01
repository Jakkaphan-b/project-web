-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: db:3306
-- Generation Time: Mar 31, 2024 at 05:18 PM
-- Server version: 8.3.0
-- PHP Version: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `webdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `Project`
--

CREATE TABLE `Project` (
  `id` int NOT NULL,
  `projectname` varchar(255) NOT NULL,
  `detail` varchar(255) NOT NULL,
  `responsible` varchar(255) NOT NULL,
  `activity` varchar(255) NOT NULL,
  `progress` int NOT NULL,
  `cost_budget` int NOT NULL,
  `financial_budget` int NOT NULL,
  `spending` varchar(255) NOT NULL,
  `start` varchar(20) NOT NULL,
  `end` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Project`
--

INSERT INTO `Project` (`id`, `projectname`, `detail`, `responsible`, `activity`, `progress`, `cost_budget`, `financial_budget`, `spending`, `start`, `end`) VALUES
(4, 'งานสุริยะ1', 'ทำเว็บ', 'สุริยะ', 'ทำเว็บตามโจทย์', 90, 3000, 200, '100', '2024-03-02', '2024-03-01'),
(7, 'งานสุริยะ1', 'ทำเว็บ', 'สุริยะ', 'ทำเว็บตามโจทย์', 95, 90, 100, '100', '2024-03-01', '2024-03-29'),
(8, 'งานสุริยะ1', 'ทำเว็บ', 'สุริยะ', 'ทำเว็บตามโจทย์', 95, 90, 100, '100', '2024-03-01', '2024-03-29'),
(9, 'งานสุริยะ1', 'ทำเว็บ', 'สุริยะ', 'ทำเว็บตามโจทย์', 95, 90, 100, '100', '2024-03-01', '2024-03-29'),
(11, 'งานสุริยะ3', 'ทำเว็บ', 'สุริยะ', 'ทำเว็บตามโจทย์', 95, 90, 100, 'ข้าว+น้ำ', '2024-03-01', '2024-03-30'),
(12, 'งานสุริยะ2', 'ทำเว็บ', 'สุริยะ', 'ทำเว็บตามโจทย์', 90, 3000, 200, '100', '2024-03-02', '2024-03-01'),
(13, 'งานสุริยะ2', 'ทำเว็บ', 'สุริยะ', 'ทำเว็บตามโจทย์', 90, 3000, 200, '100', '2024-03-02', '2024-03-01'),
(14, 'งานสุริยะ1', 'ทำเว็บ', 'สุริยะ', 'ทำเว็บตามโจทย์', 4, 14, 6, 'น้ำ', '2024-04-04', '2024-04-06');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Project`
--
ALTER TABLE `Project`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Project`
--
ALTER TABLE `Project`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
