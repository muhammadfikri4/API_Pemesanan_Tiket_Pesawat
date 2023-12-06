-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 06, 2023 at 11:03 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `muh_travel`
--

-- --------------------------------------------------------

--
-- Table structure for table `aircraft`
--

CREATE TABLE `aircraft` (
  `id` int(11) NOT NULL,
  `aircraft_name` varchar(255) NOT NULL,
  `aircraft_code` varchar(255) NOT NULL,
  `seat_ammount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `aircraft`
--

INSERT INTO `aircraft` (`id`, `aircraft_name`, `aircraft_code`, `seat_ammount`) VALUES
(1, 'Batik Air New', 'BTK', 40),
(7, 'Garuda Indonesia', 'GA', 50);

-- --------------------------------------------------------

--
-- Table structure for table `airport`
--

CREATE TABLE `airport` (
  `id` int(11) NOT NULL,
  `airport_name` varchar(255) NOT NULL,
  `airport_code` varchar(255) NOT NULL,
  `city_id` int(11) DEFAULT NULL,
  `country_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `airport_aircraft`
--

CREATE TABLE `airport_aircraft` (
  `id` int(11) NOT NULL,
  `airport_id` int(11) DEFAULT NULL,
  `aircraft_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `airport_city`
--

CREATE TABLE `airport_city` (
  `id` int(11) NOT NULL,
  `city_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `airport_city`
--

INSERT INTO `airport_city` (`id`, `city_name`) VALUES
(1, 'Jakarta'),
(14, 'Bali');

-- --------------------------------------------------------

--
-- Table structure for table `airport_country`
--

CREATE TABLE `airport_country` (
  `id` int(11) NOT NULL,
  `country_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `airport_country`
--

INSERT INTO `airport_country` (`id`, `country_name`) VALUES
(13, 'Indonesia'),
(15, 'Malaysia');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `otp_code` int(11) NOT NULL,
  `status_verification` enum('Verified','Not Verified') NOT NULL DEFAULT 'Not Verified',
  `gender` enum('Man','Woman','Unknown') NOT NULL DEFAULT 'Unknown',
  `date_birth` varchar(255) NOT NULL,
  `access_token` varchar(255) DEFAULT NULL,
  `isActive` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `phone_number`, `password`, `otp_code`, `status_verification`, `gender`, `date_birth`, `access_token`, `isActive`) VALUES
(3, 'Muhammad Fikrianto Aji', 'muhfikri0726@gmail.com', '+6281284230451', '$2b$10$l87EAoTt6rpCV.7pcUIgnuU9DQGWe5GGGQF.w5FxjDd1MXiDWSzCe', 595705, 'Verified', 'Unknown', '', NULL, 0),
(8, 'Muhammad Dzikri', 'rockband653@gmail.com', '+62895360778397', '$2b$10$LIMxM5/kRVVeB4CyNYC6i.lfiyWFzUwym3woUe2huPjNR5L7sZ5V6', 578955, 'Verified', 'Unknown', '', NULL, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `aircraft`
--
ALTER TABLE `aircraft`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `airport`
--
ALTER TABLE `airport`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_8dd342028aac7d008d0eaec57ee` (`city_id`),
  ADD KEY `FK_697d2a8ca61b28cc24a16e66bcb` (`country_id`);

--
-- Indexes for table `airport_aircraft`
--
ALTER TABLE `airport_aircraft`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_f7c26e66f5201dae1af11a504c8` (`airport_id`),
  ADD KEY `FK_70efca61f8b69f9fce9cb3d9256` (`aircraft_id`);

--
-- Indexes for table `airport_city`
--
ALTER TABLE `airport_city`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `airport_country`
--
ALTER TABLE `airport_country`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `aircraft`
--
ALTER TABLE `aircraft`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `airport`
--
ALTER TABLE `airport`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `airport_aircraft`
--
ALTER TABLE `airport_aircraft`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `airport_city`
--
ALTER TABLE `airport_city`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `airport_country`
--
ALTER TABLE `airport_country`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `airport`
--
ALTER TABLE `airport`
  ADD CONSTRAINT `FK_697d2a8ca61b28cc24a16e66bcb` FOREIGN KEY (`country_id`) REFERENCES `airport_country` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_8dd342028aac7d008d0eaec57ee` FOREIGN KEY (`city_id`) REFERENCES `airport_city` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `airport_aircraft`
--
ALTER TABLE `airport_aircraft`
  ADD CONSTRAINT `FK_70efca61f8b69f9fce9cb3d9256` FOREIGN KEY (`aircraft_id`) REFERENCES `aircraft` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_f7c26e66f5201dae1af11a504c8` FOREIGN KEY (`airport_id`) REFERENCES `airport` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
