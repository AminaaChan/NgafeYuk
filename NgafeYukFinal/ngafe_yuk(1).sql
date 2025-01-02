-- phpMyAdmin SQL Dump
-- version 5.2.1deb3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 01, 2025 at 05:34 AM
-- Server version: 8.0.40-0ubuntu0.24.04.1
-- PHP Version: 8.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ngafe_yuk`
--

-- --------------------------------------------------------

--
-- Table structure for table `cafes`
--

CREATE TABLE `cafes` (
  `id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` text COLLATE utf8mb4_general_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `rating` decimal(2,1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cafes`
--

INSERT INTO `cafes` (`id`, `name`, `description`, `image`, `rating`) VALUES
(10, 'The soeds', 'Alamat: Jl. Jatiwinangun No.25, Jatiwinangun, Kec. Purwokerto Tim., Kabupaten Banyumas, Jawa Tengah.\r\njam buka: 08:00 - 23:00', 'img/cafes/4.jpg', 5.0),
(11, 'Fore', 'Alamat: Jl. Jend Sudirman Ruko Blok 1B , Purwokerto\r\njam buka: 7.00-22.00', 'img/cafes/9.jpg', 4.9),
(12, 'Bento Kopi', 'Alamat: Jl. Gunung Galunggung, Pabuaran, Kec. Purwokerto Utara, Kab. Banyumas, Jawa Tengah\r\njam buka: 09.00 WIB - 00.30 WIB', 'img/cafes/6.jpg', 4.9),
(13, 'Alas House', 'alamat: Jl. Gelora Indah I No.36, Mangunjaya, Purwokerto Lor, Kec. Purwokerto Timur, Kab. Banyumas, Jawa Tengah\r\njam buka: 9AM - 1AM', 'img/cafes/5.jpg', 4.9),
(14, 'Patawi', 'Alamat: Perum Puri, Jalan Intan Raya No.91, Karang Blimbing, Pabuaran, Purwokerto Utara, Kabupaten Banyumas\r\njam buka : 7.00 - 5.30', 'img/cafes/8.jpg', 4.0),
(15, 'Els Koffie', 'Alamat: Jl. Prof. Dr. Soeharso, Banyumas, Jawa Tengah, Indonesia \r\njam buka: 08:00-00:00', 'img/cafes/3.jpg', 5.0);

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `phone` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `message` text COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `name`, `email`, `phone`, `message`, `created_at`) VALUES
(1, 'Hana Setia', 'hanareghina@gmail.com', '081393193933', 'Halo kak, boleh tanya kah?', '2024-11-24 07:18:01'),
(2, 'Reghina', 'hanareghina@gmail.com', '099675645', 'boleh nanya?', '2024-11-24 07:53:50'),
(3, 'hana', 'hanareghina@gmail.com', '081393193933', 'halau', '2024-12-05 02:13:47'),
(4, 'hana', 'hanareghina@gmail.com', '081393193933', 'halau', '2024-12-05 02:13:47'),
(5, 'suhu', 'aldakatriyanti2208@gmail.com', '088234238031', 'WOOO BAJH', '2024-12-05 02:40:32'),
(6, 'suhu', 'aldakatriyanti2208@gmail.com', '088234238031', 'WOOO BAJH', '2024-12-05 02:40:32'),
(7, 'wulan', 'wulan@gnail.com', '0877788888', 'bagus', '2024-12-05 02:47:45'),
(8, 'wulan', 'wulan@gnail.com', '0877788888', 'bagus', '2024-12-05 02:47:45'),
(9, 'afif', 'afif@gmail.com', '0808', 'yops', '2024-12-05 02:54:34'),
(10, 'afif', 'afif@gmail.com', '0808', 'yops', '2024-12-05 02:54:34'),
(11, 'rome', 'rome@test.com', '09231098012', 'yaya', '2024-12-05 03:01:06'),
(12, 'rome', 'rome@test.com', '09231098012', 'yaya', '2024-12-05 03:01:06'),
(13, 'aaa', 'aaa@gmail.com', '000', 'aaa', '2024-12-05 03:05:39'),
(14, 'aaa', 'aaa@gmail.com', '000', 'aaa', '2024-12-05 03:05:39');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`) VALUES
(1, 'han', 'hanareghina2852@gmail.com', '$2b$10$ZVYJ.Xg8w7jKBb2LnKn3JOQRoybh4iUnJhoaXFwFKhNFe0Sh98qOG'),
(2, 'arkan', 'faizarkan789@gmail.com', '$2b$10$.W6ByDPhyMSVkUA0Ea3yPeueTiW6sNShqw7aN1.DuaygSgX696hz2'),
(3, 'Budi Sutaryo', 'masbudi@gmail.com', '$2b$10$Dhh3v0V0emsg2HLSyntNfOEf6WG7SePjF9hEY/AdgTB8rr56VWoGy'),
(4, 'reza winston', 'anjime@gmail.com', '$2b$10$V3VJLc37dWb4I9ZlvwrybemdStuSU9.HKDc6K7OXVFRTiGYOe1Oh2'),
(5, 'zahra', 'zahra@gmail.com', '$2b$10$XQ1blg02jBw8JkM4HmeEfuICEINIS4sKu76BinB3pyzHPPS.ir7YW'),
(7, 'riyon', 'riyon@gmail.com', '$2a$10$jtK./BYv5VXwUH8yXrbuA.4ZmhEcMv9E.YCiklxxkkkMN2AaARMwK'),
(8, 'Joko', 'joko@gmail.com', '$2a$10$7.RMXlpPrfXNOwbEA6Mlp.2kAGWLxW2rKwoPlYPe/jNzVESc/d/Ji'),
(9, 'Riyon', 'riyonaryono@gmail.com', '$2a$10$UUu6ttJ/by53L0Cak2bCqePzv/r2SW8JZiVD6KjIlESFmTOKyQ2MK');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cafes`
--
ALTER TABLE `cafes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cafes`
--
ALTER TABLE `cafes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
