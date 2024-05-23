-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Värd: 127.0.0.1
-- Tid vid skapande: 23 maj 2024 kl 23:59
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
(4, 'elSimone', 'Simon', 'Hellbeck', 'simonarbast@allt.nu', '$2b$10$idMCnAl3dkdxtLrh.zUktuVjEZUmG2ajFWtDWzHMn86U2RDuUof8G'),
(6, 'lösen123', 'Simon', 'Hellbeck', 'yoyou@you.com', '$2b$10$wwuyftMaUN2Ulc6vBxh.HeZ0eDonzrnXlHec3EUVRRQyU8mNsvH0i'),
(8, '123', '12345', '12345', '12345@213', '$2b$10$FDUAHhVuY8NiYKDxkWctAOeLY5aY.b4oEzTgBK9UAqCNEjc726qZu'),
(9, 'Hej123', 'Elsimone', 'STOCKHOLm', 'hej@lkgnslkdg.com', '$2b$10$OiG65NwLGfMGAWtv3VNg.uCs6aWL3JH90OgolYkCWmqb4bM1dJQty'),
(16, 'lösen1234', 'lkfd', 'lsfkn', 'dakfmsldk@lfskn', '$2b$10$o4f8Doj6w0EMSx7J/JxJneqaVyrIxFvtM0w4o7gZpo5/tZXP/zdjG'),
(17, 'sdlknf', 'sdkfn', 'sldkf', 'lsdksf@lsfn', '$2b$10$kRISSlugXJ6hWo/b15NEgObwMIcwfZ/2/L5a8ZeTDp48TXwVuRcyC'),
(24, 'ladksfnLSKD', 'lkdsnf', 'sdklfn', 'SDKLFM@dslkfn', '$2b$10$XVCtqU8khMxz21ushsv5Iu4W3omyExyDe4rqubqJRXJIf8u1zyVru'),
(26, 'sdmf ', 'skfd', 'sdkflm', 'slkdnf@lfskn', '$2b$10$TW7ZKgh7KGS3uKkaKC1FneorztPGnhPPCYFnTvHevDT4hiR4k6y6O'),
(31, 'aslkd', 'sdlkfn', 'sdkfn', 'sdlkfn@slfdn', '$2b$10$vC9OV.bh1TbG2AqcXLPOAOhZCYvwh0ShAOe0qIp9s3uwRGjgUQkYS'),
(32, 'Fasterbom', 'Filip', 'Asterbom', 'asterbomen05@gmail.com', '$2b$10$qDyQyUv6tlCLX2xZWk76a.0ETboOV.eCcpdHcltOoyGc33ZtxvT1C');

-- --------------------------------------------------------

--
-- Tabellstruktur `kvitto`
--

CREATE TABLE `kvitto` (
  `UserId` int(11) NOT NULL,
  `datum` date NOT NULL,
  `Bilar` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumpning av Data i tabell `kvitto`
--

INSERT INTO `kvitto` (`UserId`, `datum`, `Bilar`) VALUES
(6, '2024-05-23', '765LT, 765LT Spider, 765LT, 765LT Spider'),
(6, '2024-05-23', '765LT, 765LT Spider, 765LT, 765LT Spider'),
(6, '2024-05-23', '720 S, Artura, 720 S Spider, 720 S, 765LT'),
(6, '2024-05-23', '720 S, 720 S Spider, Artura'),
(6, '2024-05-23', 'Artura, 720 S Spider, Artura'),
(6, '2024-05-23', 'Artura, 720 S Spider, Artura'),
(6, '2024-05-23', '765LT, 720 S Spider, 720 S, 720 S, 720 S, 720 S, 720 S, 720 S'),
(6, '2024-05-23', '765LT, 720 S Spider'),
(6, '2024-05-23', '765LT, 720 S Spider');

-- --------------------------------------------------------

--
-- Tabellstruktur `varukorg`
--

CREATE TABLE `varukorg` (
  `användarnamn` varchar(100) DEFAULT NULL,
  `produkt` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumpning av Data i tabell `varukorg`
--

INSERT INTO `varukorg` (`användarnamn`, `produkt`) VALUES
(NULL, '765LT'),
(NULL, '765LT'),
(NULL, '765LT'),
('12345', '765LT Spider'),
('12345', '765LT Spider'),
('12345', '765LT Spider'),
('12345', '765LT'),
('12345', '765LT'),
('12345', '765LT'),
('12345', '720S Spider'),
('12345', '765LT'),
('12345', '765LT'),
('12345', '765LT'),
('12345', '765LT'),
('12345', '765LT'),
('12345', '765LT'),
('12345', '765LT'),
('12345', '765LT Spider'),
('12345', '765LT Spider'),
('12345', '765LT Spider'),
('12345', '765LT Spider'),
('12345', '765LT Spider'),
('12345', '765LT Spider'),
('12345', '765LT Spider'),
('12345', '765LT Spider'),
('12345', '765LT Spider'),
('12345', '765LT Spider'),
('12345', '765LT Spider'),
('12345', '765LT Spider'),
('12345', '765LT'),
('12345', '765LT'),
('12345', '765LT'),
('12345', '765LT'),
('12345', '720S Spider'),
('12345', '765LT Spider'),
('12345', '765LT'),
('12345', '765LT Spider'),
('12345', '765LT'),
('12345', '720S Spider'),
('12345', '765LT Spider'),
('12345', 'Artura'),
('12345', '720S'),
('12345', '765LT'),
('12345', '720S Spider'),
('12345', '720S'),
('12345', 'GT'),
('720 S Spider', 'Fasterbom'),
('720 S', 'Fasterbom'),
('Fasterbom', '720 S'),
('Fasterbom', '720 S Spider'),
('lösen1234', '765LT'),
('lösen1234', '765LT Spider'),
('lösen1234', 'Artura');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
