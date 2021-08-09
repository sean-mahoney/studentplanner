-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 09, 2021 at 03:10 AM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `student_planner_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `lists`
--

CREATE TABLE `lists` (
  `list` text NOT NULL,
  `id` int(11) NOT NULL,
  `list_id` int(240) NOT NULL,
  `username` varchar(240) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `lists`
--

INSERT INTO `lists` (`list`, `id`, `list_id`, `username`) VALUES
('Student Planner Application', 7, 52, 'Sean1997');

-- --------------------------------------------------------

--
-- Table structure for table `plan`
--

CREATE TABLE `plan` (
  `titleid` int(11) NOT NULL,
  `planid` int(11) NOT NULL,
  `title` text NOT NULL,
  `startdate` text NOT NULL,
  `duedate` text NOT NULL,
  `priority` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `plan`
--

INSERT INTO `plan` (`titleid`, `planid`, `title`, `startdate`, `duedate`, `priority`) VALUES
(32, 37, 'Finish Application', '2021-08-04', '2021-08-05', 'high'),
(35, 37, 'Make Application ready for deployment', 'No Start Date', '2021-08-04', 'high'),
(37, 37, 'Complete User Testing', 'No Start Date', '2021-08-04', 'high'),
(38, 37, 'Finish Design and Development Document', 'No Start Date', '2021-08-04', 'high'),
(39, 37, 'Poster', 'No Start Date', '2021-08-05', 'medium'),
(40, 37, 'Video/Audio', 'No Start Date', '2021-08-05', 'medium'),
(41, 37, 'Eval Document', 'No Start Date', '2021-08-05', 'high'),
(44, 43, 'Honours Project', 'No Start Date', '2021-08-05', 'high'),
(45, 43, 'Email David', 'No Start Date', '2021-08-05', 'high'),
(47, 44, 'Evaluation ', '2021-07-15', '2021-07-20', 'No Priority'),
(48, 45, 'conclusion', '2021-07-15', '2021-07-20', 'No Priority'),
(49, 46, 'Evaluation', '2021-07-15', '2021-07-20', 'No Priority'),
(50, 48, 'New Event', 'No Start Date', 'No Due Date', 'No Priority'),
(52, 49, 'EVALUATION', '2021-07-15', '2021-07-20', 'No Priority');

-- --------------------------------------------------------

--
-- Table structure for table `plans`
--

CREATE TABLE `plans` (
  `id` int(11) NOT NULL,
  `username` varchar(240) NOT NULL,
  `plan` text NOT NULL,
  `planid` int(11) NOT NULL,
  `due` varchar(240) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `plans`
--

INSERT INTO `plans` (`id`, `username`, `plan`, `planid`, `due`) VALUES
(7, 'Sean1997', 'Honours', 37, '2021-08-05');

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `task_id` int(255) NOT NULL,
  `list_id` int(240) NOT NULL,
  `task` text NOT NULL,
  `status` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`task_id`, `list_id`, `task`, `status`) VALUES
(2, 39, 'Study Hard', 'false'),
(28, 40, 'Revise for exam', 'false'),
(29, 39, 'Finish Project', 'false'),
(51, 52, 'Upload Completed Version to GitHub', 'false'),
(52, 52, 'Make app ready for deployment', 'false'),
(53, 52, 'Deploy Back End to GitHub/Heroku', 'false'),
(54, 52, 'Deploy Front End to GitHub/Netlify', 'false'),
(55, 52, 'Export and Import MySQL DB', 'false'),
(60, 57, 'Homework', 'false');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `username` text NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `username`, `email`, `password`) VALUES
(7, 'Sean Mahoney', 'Sean1997', 'thesean_mahoney@yahoo.co.uk', '$2b$10$1aq2loYaKA.33L8e4vosueV8mfskJOAthLrYx2EWAZXJ.cGZmgYJO'),
(10, 'Test', 'Test123', 'test@test.co.uk', '$2b$10$3uGCwqvtpjIbLKhlQAsRZezvTvzuIXlphdlEKegdryxeoidg8285K'),
(21, 'James', 'Williams', 'jameswilliams@outlook.co.uk', '$2b$10$JEvnPIPG3NTjKK.PWcKYDeqRDPI9XxZoe5B4/R5hO1768O.XtPTf2'),
(22, 'James Williams', 'James', 'jameswilliams@outlook.co.uk', '$2b$10$PHzVhq1uqI7sVWtuBjrMMeyvFhpga1f/.oTlg1vAbNZW.uGSh2wQe'),
(23, 'Sinead Mahoney', 'sinead_mahoney', 'sinead_mahoney@yahoo.co.uk', '$2b$10$kff.lWIqxLc8gmbpl1Zvs.X2NTQ9SyqKui0hN3FhiABoRkgYc3c.S'),
(24, 'Natasha Thomson', 'N.thomson', 'N.thomson@gmail.com', '$2b$10$Y984l4DtHscl50qH/HL0Iu1a.Hr2dFRgpb32rBFW/fe1qpS32LXRq'),
(25, 'Colleen Mahoney', 'vascod20', 'mahoney_stella@yahoo.co.uk', '$2b$10$dvxVelTGOH0ioNi6/R46puL41S/.gxp2vgfAzdCZER.yT8.sbd2Aa');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `lists`
--
ALTER TABLE `lists`
  ADD PRIMARY KEY (`list_id`),
  ADD UNIQUE KEY `list_id` (`list_id`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `plan`
--
ALTER TABLE `plan`
  ADD PRIMARY KEY (`titleid`);

--
-- Indexes for table `plans`
--
ALTER TABLE `plans`
  ADD PRIMARY KEY (`planid`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`task_id`),
  ADD UNIQUE KEY `task_id` (`task_id`),
  ADD KEY `list` (`list_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`) USING HASH;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `lists`
--
ALTER TABLE `lists`
  MODIFY `list_id` int(240) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT for table `plan`
--
ALTER TABLE `plan`
  MODIFY `titleid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `plans`
--
ALTER TABLE `plans`
  MODIFY `planid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `task_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `lists`
--
ALTER TABLE `lists`
  ADD CONSTRAINT `id` FOREIGN KEY (`id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
