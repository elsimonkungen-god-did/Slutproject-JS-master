-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Värd: 127.0.0.1
-- Tid vid skapande: 23 maj 2024 kl 13:35
-- Serverversion: 10.4.28-MariaDB
-- PHP-version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databas: `slutprojekt`
--

-- --------------------------------------------------------

--
-- Tabellstruktur `bilar`
--

CREATE TABLE `bilar` (
  `id` int(11) NOT NULL,
  `bilNamn` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `pris` int(20) DEFAULT NULL,
  `bilTyp` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumpning av Data i tabell `bilar`
--

INSERT INTO `bilar` (`id`, `bilNamn`, `pris`, `bilTyp`) VALUES
(1, '765LT', 382500, 'Supercar'),
(2, '765LT Spider', 490810, 'Supercar'),
(3, '720 S Spider', 326500, 'Supercar'),
(4, '720 S', 310500, 'Supercar'),
(5, 'Artura', 237500, 'Supercar'),
(6, 'GT', 208490, 'GT'),
(7, 'Mclaren Senna', 825000, 'Ultimate'),
(8, 'Speedtail', 2100000, 'Ultimate'),
(9, 'Mclaren Senna GTR', 1704000, 'Ultimate'),
(10, 'Elva', 1695000, 'Ultimate'),
(11, 'Mclaren F1', 20500000, 'Legacy'),
(12, '620R', 299000, 'Legacy'),
(13, '600 LT Spider', 255500, 'Legacy'),
(14, '540 C', 181900, 'Legacy'),
(15, '570S', 191100, 'Legacy'),
(16, '571 Spider', 128000, 'Legacy'),
(17, '675 LT', 244133, 'Legacy'),
(18, 'P1', 1100000, 'Legacy');

-- --------------------------------------------------------

--
-- Tabellstruktur `inloggning`
--

CREATE TABLE `inloggning` (
  `id` int(11) NOT NULL,
  `användarnamn` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `kundNamn` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `kundEfternamn` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `lösenord` varchar(150) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumpning av Data i tabell `inloggning`
--

INSERT INTO `inloggning` (`id`, `användarnamn`, `kundNamn`, `kundEfternamn`, `email`, `lösenord`) VALUES
(3, 'saedsa', 'asdsa', 'asdad', 'adssad@sasd.esd', '$2b$10$pMOHAUS4MA5jWdJzg6MK6eJxegd/voahn4y13bTKH6dxoYpwlokL2'),
(5, 'Elsimone', 'Simon', 'Hellbeck', 'simonhellbeck@gmail.com', '$2b$10$LkfDEd8a1mMA3nRU2gwzw.V6fYERbeD7w68eZd8UEyAEZ6TJWjKsC'),
(6, 'lösen123', 'Simon', 'Hellbeck', 'yoyou@you.com', '$2b$10$wwuyftMaUN2Ulc6vBxh.HeZ0eDonzrnXlHec3EUVRRQyU8mNsvH0i'),
(7, 'Fasterbom', 'Filip', 'Asterbom', 'asterbomen05@gmail.com', '$2b$10$JVMIOSAgD2R.X3tjozT0iOsof3Rz9WYm2nCSDw04Vb8vUNUkYmO7G'),
(8, 'ok', 'ok', 'okson', 'dina.mamma@suger.se', '$2b$10$JAuR5FugcUqwjucrwLC44uC8d6bKgfQMwTMgNTHWfZ5jVTvBOvwxO'),
(9, 'simonbeck', 'sium', 'hellbeck', 'ok@ok.se', '$2b$10$GRVqm19QCWbDWqCxH0pldeJeCWsRAK7B42/F29Bv353xrXBmxsf72');

-- --------------------------------------------------------

--
-- Tabellstruktur `varukorg`
--

CREATE TABLE `varukorg` (
  `produkt` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `användarnamn` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumpning av Data i tabell `varukorg`
--

INSERT INTO `varukorg` (`produkt`, `användarnamn`) VALUES
('765LT', ''),
('765LT', ''),
('765LT', ''),
('765LT', NULL),
('765LT', NULL),
('765LT', NULL),
('765LT', NULL),
('765LT', NULL),
('765LT', NULL),
('765LT', NULL),
('720 S Spider', 'Fasterbom'),
('720 S', 'Fasterbom'),
('765LT Spider', 'Fasterbom');

--
-- Index för dumpade tabeller
--

--
-- Index för tabell `bilar`
--
ALTER TABLE `bilar`
  ADD PRIMARY KEY (`id`);

--
-- Index för tabell `inloggning`
--
ALTER TABLE `inloggning`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `användarnamn_2` (`användarnamn`),
  ADD KEY `användarnamn` (`användarnamn`);

--
-- AUTO_INCREMENT för dumpade tabeller
--

--
-- AUTO_INCREMENT för tabell `bilar`
--
ALTER TABLE `bilar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT för tabell `inloggning`
--
ALTER TABLE `inloggning`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
