-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 01, 2021 at 11:49 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `travels`
--
CREATE DATABASE IF NOT EXISTS `travels` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `travels`;

-- --------------------------------------------------------

--
-- Table structure for table `follows`
--

CREATE TABLE `follows` (
  `userId` int(50) NOT NULL,
  `vacationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `follows`
--

INSERT INTO `follows` (`userId`, `vacationId`) VALUES
(14, 7),
(14, 10),
(14, 38),
(14, 40),
(62, 7),
(62, 40),
(63, 7),
(63, 10),
(63, 40),
(63, 41),
(64, 7),
(64, 40),
(65, 7),
(65, 10);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `uuid` varchar(150) NOT NULL,
  `firstName` varchar(30) NOT NULL,
  `lastName` varchar(30) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(5000) NOT NULL,
  `isAdmin` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `uuid`, `firstName`, `lastName`, `username`, `password`, `isAdmin`) VALUES
(12, 'a4c2e684-181f-46c8-8da8-b5a14a3b1d2a', 'Admin', 'System', 'Admin', 'd5d4c13f60f3eba23d7ee4224b378d28e9136b246615c6081136bcfea4f4d4ff894b0f4b1a572d931aff6e97255bfec12e8c129a693f88a4cf1869d091c75c25', 1),
(13, 'ddcfacce-fa4c-4a41-8302-de861b41c69d', 'Benny', 'Sankevich', 'Benny', 'd0b5a95bf65c51373753fbc524b528bb26b4d57759c28b674bee9400a0c6df4168dd7f48db0e234badfbebe252f5b4127252ab6a1af68062fd01be8f97e56747', 0),
(14, '743b2873-e5c1-47fc-97fa-09a484373ffd', 'Sara', 'Sankevich', 'Sara', 'd0b5a95bf65c51373753fbc524b528bb26b4d57759c28b674bee9400a0c6df4168dd7f48db0e234badfbebe252f5b4127252ab6a1af68062fd01be8f97e56747', 0),
(62, 'cedb9243-1274-4785-b60e-fdc06e529d74', 'Roy', 'Elmakies', 'roy', 'd0b5a95bf65c51373753fbc524b528bb26b4d57759c28b674bee9400a0c6df4168dd7f48db0e234badfbebe252f5b4127252ab6a1af68062fd01be8f97e56747', 0),
(63, '137e0c57-3a4e-46ae-b24d-d99650e9c527', 'Rachel', 'Sharon', 'Rachel', 'd0b5a95bf65c51373753fbc524b528bb26b4d57759c28b674bee9400a0c6df4168dd7f48db0e234badfbebe252f5b4127252ab6a1af68062fd01be8f97e56747', 0),
(64, 'f7469215-52c0-4161-9bcb-f92cef7ac990', 'Yacov', 'Bibla', 'yacov', 'd0b5a95bf65c51373753fbc524b528bb26b4d57759c28b674bee9400a0c6df4168dd7f48db0e234badfbebe252f5b4127252ab6a1af68062fd01be8f97e56747', 0),
(65, '6fea84fe-f4ab-4bf0-b71f-19a7a6344dce', 'Maor', 'Malki', 'maor', 'd0b5a95bf65c51373753fbc524b528bb26b4d57759c28b674bee9400a0c6df4168dd7f48db0e234badfbebe252f5b4127252ab6a1af68062fd01be8f97e56747', 0);

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `vacationUuid` varchar(150) NOT NULL,
  `destination` varchar(14) NOT NULL,
  `description` varchar(5000) NOT NULL,
  `fromDate` date NOT NULL,
  `toDate` date NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `imageFileName` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `vacationUuid`, `destination`, `description`, `fromDate`, `toDate`, `price`, `imageFileName`) VALUES
(7, '1fhsbgshbgd', 'New York City', 'A city that never sleeps, never stops moving\nLuxe hotels. Gritty dive bars. Broadway magic. Side-street snack carts. Whether you’re a first-time traveler or a long-time resident, NYC is a city that loves to surprise. The unrivaled mix of iconic arts spaces, endless shopping experiences, architectural marvels, and proudly distinct neighborhoods — along with the city’s accessible 24/7 transport — means there’s always more to explore in the five boroughs.', '2021-08-01', '2021-08-15', '1401.00', '7eddaa1d-710c-4f22-ab70-04477fe85068.jpg'),
(10, 'mdkvnkfsndvjbcxjbxchbjfh', 'Orlando', 'Orlando is a city that runs on Disney Magic—it’s almost become shorthand for the Magic Kingdom Park. And that’s just the big opening number on the area’s Disney parade, which includes Animal Kingdom, Epcot, and even themed resorts. If that isn’t enough abracadabra, families can head to the Wizarding World of Harry Potter part of Universal. But Orlando isn’t all high-octane activities. Those seeking quiet can take refuge in the natural beauty of Harry P. Leu Gardens or one of many day spas. And Orlando’s James Beard-nominated restaurants are a far cry from fairground food.', '2022-05-17', '2022-05-18', '314.17', '10409d8b-9772-467e-a6f8-ac55725fdb65.jpg'),
(37, '8a6ce06f-3fda-4f63-b26e-2a7bacb3bd44', 'Ayia Napa', 'This resort town, with its great beaches, has a bit of a Spring Break atmosphere (the parties start in the late afternoon and go all night). If dancing in a bikini is not your thing, though, no worries—you can explore a medieval monastery or enjoy cruises on the lovely blue water. Families will want to visit Water World, the biggest theme waterpark in Europe.', '2021-02-20', '2021-02-25', '1590.90', '39bfe22c-4b46-4964-a877-1b7840953626.jpg'),
(38, '4d28999a-3cac-4e21-8ea7-b43552cbb93e', 'Punta Cana', 'For beach-lovers, golfers, honeymooners, and so many other travelers, Punta Cana provides pure escape. The beaches here are simply perfect: calm, warm waters that gently lap over stretches of fine white sand. But there\'s plenty of activity for those that seek it: launch yourself through a zip-line course, clap along with traditional Dominican music at a performance, or explore the magical lagoons of the Indigenous Eyes Ecological Park. Golfers will also want to hit the links, as Punta Cana is known as one of the best golf destinations in the world.', '2021-04-01', '2021-04-25', '1700.00', 'a9ee4e7a-77ef-41eb-b2ed-16070f94c9b9.jpg'),
(40, '276e3fd0-2043-4f0a-8fa7-76d039444510', 'London', 'A regal city surrounded by a rush of modern life\nLondon is layered with history, where medieval and Victorian complement a rich and vibrant modern world. The Tower of London and Westminster neighbor local pubs and markets, and time-worn rituals like the changing of the guards take place as commuters rush to catch the Tube. It’s a place where travelers can time-hop through the city, and when they’re weary, do as Londoners do and grab a “cuppa” tea.', '2021-05-05', '2021-05-20', '1850.00', '6b99a6ec-6707-46ef-bc12-1bca6062ff8a.jpg'),
(41, 'd69616cb-6fe4-4719-9432-d7c777a812d6', 'Cancun', 'The international capital of spring break\n“Spring break forever” could be Cancun’s motto. It’s all sun, sand, and good vibes. Here flip flops and board shorts count as “dressed,” and the club beats are thumping 24/7. Swim-up bars keep the cocktails coming to the twentysomething crowd. But families can find their own paradise at one of the many resorts with kids’ clubs and gigantic pools.', '2021-12-06', '2021-12-16', '1500.00', '301ac20d-ed31-4ed7-b185-2a6dc840df4f.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `follows`
--
ALTER TABLE `follows`
  ADD PRIMARY KEY (`userId`,`vacationId`),
  ADD KEY `vacationId` (`vacationId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=110;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `follows`
--
ALTER TABLE `follows`
  ADD CONSTRAINT `follows_ibfk_2` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `follows_ibfk_3` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
