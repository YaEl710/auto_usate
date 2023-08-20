-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Ago 20, 2023 alle 18:40
-- Versione del server: 10.4.28-MariaDB
-- Versione PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `auto_usate`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `automobili`
--

CREATE TABLE `automobili` (
  `ID` int(11) NOT NULL,
  `Modello_Nome` varchar(100) NOT NULL,
  `Km` int(11) NOT NULL,
  `Carburante` text NOT NULL,
  `Prezzo` decimal(10,0) NOT NULL,
  `Venditore_Nome` varchar(100) NOT NULL,
  `Tipo_Cambio` text NOT NULL,
  `Longitudine` double NOT NULL,
  `Latitudine` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `automobili`
--

INSERT INTO `automobili` (`ID`, `Modello_Nome`, `Km`, `Carburante`, `Prezzo`, `Venditore_Nome`, `Tipo_Cambio`, `Longitudine`, `Latitudine`) VALUES
(1, 'Fiat 500', 100000, 'Diesel', 12000, 'Mario Rossi', 'Manuale', 7.96243, 44.55347),
(2, 'Ford Focus', 25000, 'Elettrica', 15000, 'Laura Bianchi', 'Manuale', 7.96129, 44.55446),
(3, 'Renault Clio', 77000, 'Benzina', 13500, 'Marco Verdi', 'Automatico', 7.96, 44.5532),
(4, 'BMW X3', 200600, 'Gasolio', 40000, 'Luca Neri', 'Manuale', 7.9624, 44.5519),
(5, 'Volkswagen Golf', 606006, 'Benzina', 16000, 'Anna Gialli', 'Automatico', 7.9595, 44.5526),
(6, 'Toyota Corolla', 42069, 'Benzina', 18000, 'Giuseppe Marrone', 'Manuale', 7.9605, 44.5512);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
