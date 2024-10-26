-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 26, 2024 at 03:46 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kbmc_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `awards`
--

CREATE TABLE `awards` (
  `id` int(11) NOT NULL,
  `heading` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `awardimage` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ceos`
--

CREATE TABLE `ceos` (
  `id` int(11) NOT NULL,
  `coName` varchar(255) NOT NULL,
  `designation` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ceos`
--

INSERT INTO `ceos` (`id`, `coName`, `designation`, `email`, `image_path`, `created_at`) VALUES
(10, 'Maruti Gaikwad', 'Chief Officer', 'support@kbmc.gov.in', '/uploads/1729583221545.jpg', '2024-10-22 07:47:01');

-- --------------------------------------------------------

--
-- Table structure for table `citizen-charter`
--

CREATE TABLE `citizen-charter` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `pdf` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `citizen-charter`
--

INSERT INTO `citizen-charter` (`id`, `name`, `pdf`, `created_at`) VALUES
(6, 'Mechanical', 'uploads\\1729685569369.pdf', '2024-10-23 12:12:49'),
(7, 'Mechanical', 'uploads\\1729685648087.pdf', '2024-10-23 12:14:08'),
(8, 'Mechanical', 'uploads\\1729685673516.pdf', '2024-10-23 12:14:33');

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `hod` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`id`, `name`, `hod`, `created_at`) VALUES
(3, 'Com', 'Akhile', '2024-10-22 04:28:01'),
(4, 'Mechanical', 'Abhay', '2024-10-22 05:31:43'),
(6, 'Civil Eng.', 'Manoj ', '2024-10-22 05:47:29'),
(8, 'B-Pharma', 'Akhil ', '2024-10-22 09:46:50');

-- --------------------------------------------------------

--
-- Table structure for table `elected_wings`
--

CREATE TABLE `elected_wings` (
  `id` int(11) NOT NULL,
  `correspondentName` varchar(255) NOT NULL,
  `wardNo` varchar(50) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `mobileNo` varchar(15) NOT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `elected_wings`
--

INSERT INTO `elected_wings` (`id`, `correspondentName`, `wardNo`, `startDate`, `endDate`, `mobileNo`, `image_path`, `created_at`) VALUES
(8, 'Correspondent Officer', 'Ward No. 02', '2024-10-01', '2024-10-01', '+91 99887755834', '/uploads/1729852127185.jpg', '2024-10-22 08:59:49');

-- --------------------------------------------------------

--
-- Table structure for table `electric`
--

CREATE TABLE `electric` (
  `id` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `mobileNo` varchar(255) NOT NULL,
  `vendorName` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `heading` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `electric`
--

INSERT INTO `electric` (`id`, `description`, `mobileNo`, `vendorName`, `created_at`, `heading`) VALUES
(1, 'Salgem Infoigy Pvt. Ltd.', '4152637584', 'Aman Bhaii', '2024-10-22 06:46:24', 'Web Developer'),
(7, 'ij', 'adgfedd', 'dvsd', '2024-10-25 10:45:39', 'o');

-- --------------------------------------------------------

--
-- Table structure for table `fire_station`
--

CREATE TABLE `fire_station` (
  `id` int(11) NOT NULL,
  `heading` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phoneNo` varchar(15) NOT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `fire_station`
--

INSERT INTO `fire_station` (`id`, `heading`, `address`, `phoneNo`, `image_path`, `created_at`) VALUES
(1, 'Kulgaon Badlapur Municipal Council', 'Fire Station, Shirgaon MIDC, Badlapur East', '0251 2990890', '/uploads/1729529817117.jpg', '2024-10-21 12:18:07'),
(3, 'Kulgaon Badlapur Municipal Council', 'Fire Station, Shaswat Park, Manjarli, Badlapur West', '0251 2990890', '/uploads/1729529975293.jpg', '2024-10-21 14:20:04');

-- --------------------------------------------------------

--
-- Table structure for table `functions`
--

CREATE TABLE `functions` (
  `id` int(11) NOT NULL,
  `heading` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `functions`
--

INSERT INTO `functions` (`id`, `heading`, `description`) VALUES
(1, 'jkdhvjwd', 'cjwhduchwdc'),
(5, 'kadv', 'wief');

-- --------------------------------------------------------

--
-- Table structure for table `gallery`
--

CREATE TABLE `gallery` (
  `id` int(11) NOT NULL,
  `photo_name` varchar(255) NOT NULL,
  `file_path` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `gallery`
--

INSERT INTO `gallery` (`id`, `photo_name`, `file_path`, `created_at`) VALUES
(2, 'Photo Gallery One', '/uploads/1729710214632.jpg', '2024-10-23 14:50:07'),
(5, 'Photo Gallery Two', '/uploads/1729710235477.jpg', '2024-10-23 16:24:50'),
(6, 'Photo Gallery Three', '/uploads/1729710248950.jpg', '2024-10-23 19:04:08'),
(7, 'Photo Gallery Four', '/uploads/1729710264472.jpg', '2024-10-23 19:04:24'),
(8, 'Photo Gallery Five', '/uploads/1729710280327.jpg', '2024-10-23 19:04:40'),
(9, 'Photo Gallery Six', '/uploads/1729710310403.jpg', '2024-10-23 19:05:10'),
(10, 'Photo Gallery Seven', '/uploads/1729710330977.jpg', '2024-10-23 19:05:30'),
(11, 'Photo Gallery Eight', '/uploads/1729710347624.jpg', '2024-10-23 19:05:47'),
(12, 'Photo Gallery Nine', '/uploads/1729710385824.jpg', '2024-10-23 19:06:25'),
(13, 'Photo Gallery Ten', '/uploads/1729710402115.jpg', '2024-10-23 19:06:42'),
(14, 'Photo Gallery Eleven', '/uploads/1729710421737.jpg', '2024-10-23 19:07:01'),
(15, 'Photo Gallery Twelve', '/uploads/1729710443886.jpg', '2024-10-23 19:07:23');

-- --------------------------------------------------------

--
-- Table structure for table `gardens`
--

CREATE TABLE `gardens` (
  `id` int(11) NOT NULL,
  `heading` varchar(255) NOT NULL,
  `images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`images`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `gardens`
--

INSERT INTO `gardens` (`id`, `heading`, `images`) VALUES
(5, 'hadivhad', '[\"/uploads/1729853107764.jpg\"]');

-- --------------------------------------------------------

--
-- Table structure for table `generaladminaddyear`
--

CREATE TABLE `generaladminaddyear` (
  `id` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  `meetingtype` varchar(255) NOT NULL,
  `pdfheading` varchar(255) NOT NULL,
  `pdf` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `generaladminaddyear`
--

INSERT INTO `generaladminaddyear` (`id`, `year`, `meetingtype`, `pdfheading`, `pdf`) VALUES
(9, 2023, 'General Meeting', 'Intorduction', 'uploads\\1729681971177-flowchart.pdf'),
(10, 2022, 'Standing Committee Meeting', 'Revenue', 'uploads\\1729748352361-Major_Project_Synopsis.pdf');

-- --------------------------------------------------------

--
-- Table structure for table `generaladmindepartment`
--

CREATE TABLE `generaladmindepartment` (
  `id` int(11) NOT NULL,
  `departments_heading` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `generaladmindepartment`
--

INSERT INTO `generaladmindepartment` (`id`, `departments_heading`) VALUES
(3, 'Agriculture'),
(4, 'Bachelor of Information Technology'),
(6, 'Technical Engineering'),
(7, 'Jack Sparrow'),
(13, 'Head of department of science');

-- --------------------------------------------------------

--
-- Table structure for table `health_dep_sec`
--

CREATE TABLE `health_dep_sec` (
  `id` int(11) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `health_dep_sec`
--

INSERT INTO `health_dep_sec` (`id`, `description`) VALUES
(6, 'ADHFADH'),
(7, 'KSLAC');

-- --------------------------------------------------------

--
-- Table structure for table `health_photo_gallery`
--

CREATE TABLE `health_photo_gallery` (
  `id` int(11) NOT NULL,
  `heading` varchar(255) NOT NULL,
  `img_path` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `health_photo_gallery`
--

INSERT INTO `health_photo_gallery` (`id`, `heading`, `img_path`, `created_at`) VALUES
(3, 'Ab hay', '/uploads/1729801527715.jpg', '2024-10-24 19:52:42');

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `id` int(11) NOT NULL,
  `description` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `history`
--

INSERT INTO `history` (`id`, `description`, `created_at`) VALUES
(13, 'Kulgaon Badlapur city is just 55 km east from Mumbai. is sitting at a distance. Naturally Badlapur city is famous for its human friendly environment, clean water, pollution free environment etc. Due to this, thousands of families have migrated from Mumbai to Badlapur. Another main reason is that due to the planned development brought about by Badlapur Municipal Council, the name of Badlapur Municipal Council is being taken with great respect today. Various projects implemented by the municipal council for the service of the citizens and to maintain the balance of nature have been honored by the President of the country. All his credit goes to the first citizen of the city Hon. Mayor, Mr. The chief officer, all the members of the party have unitedly cooperated for the development of the city and the support given by the citizens of the city.', '2024-10-22 07:46:33');

-- --------------------------------------------------------

--
-- Table structure for table `home_videos`
--

CREATE TABLE `home_videos` (
  `id` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `publish_date` date NOT NULL,
  `video_url` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `home_videos`
--

INSERT INTO `home_videos` (`id`, `description`, `publish_date`, `video_url`, `created_at`) VALUES
(39, 'Online Tax Filling process', '2023-05-01', 'https://www.youtube.com/watch?v=RiWpJkYSnNE', '2024-10-23 17:34:06'),
(40, 'Meeting with the newly elected Chief Officer of Kulgaon', '2023-06-25', 'https://www.youtube.com/watch?v=OhWuHjMXBkM', '2024-10-23 17:43:28');

-- --------------------------------------------------------

--
-- Table structure for table `litigations`
--

CREATE TABLE `litigations` (
  `id` int(11) NOT NULL,
  `ward_no` varchar(255) NOT NULL,
  `name_lawsuit` varchar(255) NOT NULL,
  `mob_no` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `litigations`
--

INSERT INTO `litigations` (`id`, `ward_no`, `name_lawsuit`, `mob_no`) VALUES
(3, '43', 'DGS', '346');

-- --------------------------------------------------------

--
-- Table structure for table `main_menu`
--

CREATE TABLE `main_menu` (
  `id` int(11) NOT NULL,
  `mainMenu` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `main_menu`
--

INSERT INTO `main_menu` (`id`, `mainMenu`) VALUES
(12, 'Abhay');

-- --------------------------------------------------------

--
-- Table structure for table `muncipal`
--

CREATE TABLE `muncipal` (
  `id` int(11) NOT NULL,
  `heading` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `propertyType` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `muncipal`
--

INSERT INTO `muncipal` (`id`, `heading`, `name`, `propertyType`, `address`, `created_at`) VALUES
(2, 'Web Developer', 'Aman', 'Infoigy Pvt Ltd.', 'Greater Noi', '2024-10-22 06:09:05'),
(8, 'hefu', 'FEHIO', 'ugiS', 'avdhuu', '2024-10-25 10:41:45');

-- --------------------------------------------------------

--
-- Table structure for table `newsupdate`
--

CREATE TABLE `newsupdate` (
  `id` int(11) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `newsupdate`
--

INSERT INTO `newsupdate` (`id`, `description`) VALUES
(6, 'fhqeiofhqepfhqefq\n'),
(8, 'grsghewr9');

-- --------------------------------------------------------

--
-- Table structure for table `ponds_table`
--

CREATE TABLE `ponds_table` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ponds_table`
--

INSERT INTO `ponds_table` (`id`, `name`) VALUES
(1, 'ADGVSF'),
(5, 'ABhay'),
(7, 'ADGVS');

-- --------------------------------------------------------

--
-- Table structure for table `presidents`
--

CREATE TABLE `presidents` (
  `id` int(11) NOT NULL,
  `president_name` varchar(255) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `presidents`
--

INSERT INTO `presidents` (`id`, `president_name`, `start_date`, `end_date`, `image_path`, `created_at`) VALUES
(2, 'Abhay', '2024-10-01', '2024-10-18', '/uploads/1729669485752.png', '2024-10-23 07:44:45'),
(3, 'ajkfhaudf', '2024-10-15', '2024-10-18', '/uploads/1729669834104.jpg', '2024-10-23 07:50:34');

-- --------------------------------------------------------

--
-- Table structure for table `previous_chief_officer`
--

CREATE TABLE `previous_chief_officer` (
  `id` int(11) NOT NULL,
  `officer_name` varchar(255) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `previous_chief_officer`
--

INSERT INTO `previous_chief_officer` (`id`, `officer_name`, `start_date`, `end_date`, `image_path`, `created_at`) VALUES
(8, 'Abhay', '2024-10-09', '2024-10-18', '/uploads/1729606866137.jpg', '2024-10-22 14:21:06'),
(9, 'Manoj', '2024-10-02', '2024-10-17', '/uploads/1729665322633.jpg', '2024-10-23 05:23:50'),
(14, 'uzoxh', '2024-10-08', '2024-10-10', '/uploads/1729852639240.png', '2024-10-25 10:37:19');

-- --------------------------------------------------------

--
-- Table structure for table `property_holder`
--

CREATE TABLE `property_holder` (
  `id` int(11) NOT NULL,
  `heading` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `property` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `property_holder`
--

INSERT INTO `property_holder` (`id`, `heading`, `description`, `property`, `created_at`) VALUES
(6, 'sdvjs', 'svdh', 'sabdvbn', '2024-10-22 08:16:47'),
(9, 'a', 'sa', 'qsdb ', '2024-10-25 10:40:46');

-- --------------------------------------------------------

--
-- Table structure for table `prvt_hospital`
--

CREATE TABLE `prvt_hospital` (
  `id` int(11) NOT NULL,
  `hospital_name` varchar(255) NOT NULL,
  `division` varchar(255) NOT NULL,
  `principal_doctor` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone_no` varchar(15) NOT NULL,
  `mobile_no` varchar(15) NOT NULL,
  `beds` varchar(255) NOT NULL,
  `facility` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `prvt_hospital`
--

INSERT INTO `prvt_hospital` (`id`, `hospital_name`, `division`, `principal_doctor`, `address`, `phone_no`, `mobile_no`, `beds`, `facility`) VALUES
(3, 'FEQ', 'East', 'asdfg', 'Qwf', 'sdfvbn', 'sdfgdsdfg', '4', 'asdfb');

-- --------------------------------------------------------

--
-- Table structure for table `public_disclosure`
--

CREATE TABLE `public_disclosure` (
  `id` int(11) NOT NULL,
  `department_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `public_disclosure`
--

INSERT INTO `public_disclosure` (`id`, `department_name`) VALUES
(10, 'History'),
(11, 'Food science'),
(14, 'bachelor of science e'),
(17, '	informatio technology'),
(19, 'hgyg');

-- --------------------------------------------------------

--
-- Table structure for table `righttoservices`
--

CREATE TABLE `righttoservices` (
  `id` int(11) NOT NULL,
  `heading` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `righttoservices`
--

INSERT INTO `righttoservices` (`id`, `heading`, `description`, `created_at`) VALUES
(10, 'ABhay', 'Sharma', '2024-10-25 09:51:34');

-- --------------------------------------------------------

--
-- Table structure for table `roads`
--

CREATE TABLE `roads` (
  `id` int(11) NOT NULL,
  `heading` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `length` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roads`
--

INSERT INTO `roads` (`id`, `heading`, `description`, `length`, `created_at`) VALUES
(4, 'adfvw', 'asv', '452435', '2024-10-25 10:46:01');

-- --------------------------------------------------------

--
-- Table structure for table `rts_table`
--

CREATE TABLE `rts_table` (
  `id` int(11) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `pdf_path` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rts_table`
--

INSERT INTO `rts_table` (`id`, `description`, `pdf_path`, `created_at`) VALUES
(19, 'Abhay', 'uploads\\1729849865460.pdf', '2024-10-25 09:41:18');

-- --------------------------------------------------------

--
-- Table structure for table `sanitation_inspectors`
--

CREATE TABLE `sanitation_inspectors` (
  `id` int(11) NOT NULL,
  `zone_no` varchar(255) NOT NULL,
  `names` varchar(255) NOT NULL,
  `mob_no` varchar(255) NOT NULL,
  `ward_no` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sanitation_inspectors`
--

INSERT INTO `sanitation_inspectors` (`id`, `zone_no`, `names`, `mob_no`, `ward_no`) VALUES
(3, '32452', 'ZXADFDS', '2354252452', '235325');

-- --------------------------------------------------------

--
-- Table structure for table `schools`
--

CREATE TABLE `schools` (
  `id` int(11) NOT NULL,
  `heading` varchar(255) DEFAULT NULL,
  `schoolName` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `medium` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `schools`
--

INSERT INTO `schools` (`id`, `heading`, `schoolName`, `address`, `medium`, `created_at`) VALUES
(3, 'kjad', 'nizv', 'niasv', 'Urdu', '2024-10-25 10:44:06');

-- --------------------------------------------------------

--
-- Table structure for table `school_images`
--

CREATE TABLE `school_images` (
  `id` int(11) NOT NULL,
  `image_path` varchar(255) NOT NULL,
  `uploaded_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `school_images`
--

INSERT INTO `school_images` (`id`, `image_path`, `uploaded_at`) VALUES
(3, '/uploads/1729803072849.jpg', '2024-10-24 08:05:29'),
(5, '/uploads/1729852956535.png', '2024-10-25 10:42:36');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `service_heading` varchar(255) NOT NULL,
  `main_icon_path` varchar(255) NOT NULL,
  `hover_icon_path` varchar(255) NOT NULL,
  `uploaded_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `service_heading`, `main_icon_path`, `hover_icon_path`, `uploaded_at`) VALUES
(12, 'Public Disclosure', 'uploads\\1729510320857.png', 'uploads\\1729510320870.png', '2024-10-21 11:32:01'),
(13, 'Citizen Charter', 'uploads\\1729510354863.png', 'uploads\\1729510354864.png', '2024-10-21 11:32:34'),
(14, 'Right To Service', 'uploads\\1729510397477.png', 'uploads\\1729510397478.png', '2024-10-21 11:33:17'),
(15, 'Development Plan', 'uploads\\1729510432283.png', 'uploads\\1729510432285.png', '2024-10-21 11:33:52'),
(16, 'Downloads', 'uploads\\1729510478031.png', 'uploads\\1729510478032.png', '2024-10-21 11:34:38'),
(17, 'City Map', 'uploads\\1729510501598.png', 'uploads\\1729510501599.png', '2024-10-21 11:35:01'),
(18, 'Elected Wing', 'uploads\\1729510593373.png', 'uploads\\1729510593374.png', '2024-10-21 11:35:40'),
(19, 'Official Publications', 'uploads\\1729510616678.png', 'uploads\\1729510616678.png', '2024-10-21 11:36:56');

-- --------------------------------------------------------

--
-- Table structure for table `slider`
--

CREATE TABLE `slider` (
  `id` int(11) NOT NULL,
  `slider_name` varchar(255) NOT NULL,
  `file_path` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `slider`
--

INSERT INTO `slider` (`id`, `slider_name`, `file_path`, `created_at`) VALUES
(12, 'Slider One', '/uploads/1729500283395.jpg', '2024-10-21 08:44:43'),
(13, 'Slider Two', '/uploads/1729500303131.jpg', '2024-10-21 08:45:03'),
(14, 'Slider Three', '/uploads/1729500319570.jpg', '2024-10-21 08:45:19'),
(15, 'Slider Four', '/uploads/1729500338464.jpg', '2024-10-21 08:45:38'),
(16, 'Slider Five', '/uploads/1729500354653.jpg', '2024-10-21 08:45:54'),
(17, 'Slider Six', '/uploads/1729500376015.jpg', '2024-10-21 08:46:16');

-- --------------------------------------------------------

--
-- Table structure for table `sub_menu`
--

CREATE TABLE `sub_menu` (
  `id` int(11) NOT NULL,
  `mainMenuId` int(11) NOT NULL,
  `subMenu` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sub_menu`
--

INSERT INTO `sub_menu` (`id`, `mainMenuId`, `subMenu`) VALUES
(62, 12, 'Sharma');

-- --------------------------------------------------------

--
-- Table structure for table `tenders`
--

CREATE TABLE `tenders` (
  `id` int(11) NOT NULL,
  `tenders` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tenders`
--

INSERT INTO `tenders` (`id`, `tenders`, `status`, `created_at`) VALUES
(4, 'hdgsjhfsdjgf', 'New', '2024-10-21 11:41:52'),
(5, 'Hello friend! How are you', 'New', '2024-10-21 11:42:49'),
(6, 'Hello Manoj', '-', '2024-10-21 11:44:21'),
(7, 'djasdjksjh', '-', '2024-10-22 05:36:18'),
(8, 'abhay', '-', '2024-10-22 05:44:25');

-- --------------------------------------------------------

--
-- Table structure for table `treatment_facility`
--

CREATE TABLE `treatment_facility` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `loc` varchar(255) NOT NULL,
  `capacity` varchar(255) NOT NULL,
  `intake` varchar(255) NOT NULL,
  `output` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `treatment_facility`
--

INSERT INTO `treatment_facility` (`id`, `name`, `loc`, `capacity`, `intake`, `output`) VALUES
(3, 'DS', 'IJAD', '2', '2222', '2');

-- --------------------------------------------------------

--
-- Table structure for table `tree_census`
--

CREATE TABLE `tree_census` (
  `id` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `total` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tree_census`
--

INSERT INTO `tree_census` (`id`, `description`, `total`) VALUES
(4, 'cwdc', '50'),
(5, 'SDIOF', '4'),
(6, 'AZDFV', '4');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `department` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `department`, `created_at`) VALUES
(4, 'Abhay', 'asjdhfsd', 'Account Department', '2024-10-24 12:18:20'),
(5, 'Manoj', 'Mnaoj123', 'Account Department', '2024-10-25 10:56:23');

-- --------------------------------------------------------

--
-- Table structure for table `wards`
--

CREATE TABLE `wards` (
  `id` int(11) NOT NULL,
  `ward_no` varchar(255) NOT NULL,
  `ward_name` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `wards`
--

INSERT INTO `wards` (`id`, `ward_no`, `ward_name`, `created_at`) VALUES
(2, '12', 'Salgem Infoigy', '2024-10-22 07:51:56'),
(3, '435', 'ewrwet', '2024-10-22 07:52:31'),
(10, '7667', 'SDJK', '2024-10-25 10:27:40');

-- --------------------------------------------------------

--
-- Table structure for table `websitelink`
--

CREATE TABLE `websitelink` (
  `id` int(11) NOT NULL,
  `websitelink` varchar(255) NOT NULL,
  `websitelogo` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `websitelink`
--

INSERT INTO `websitelink` (`id`, `websitelink`, `websitelogo`) VALUES
(11, 'SKJFHQE', '/uploads/1729851237968.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `awards`
--
ALTER TABLE `awards`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ceos`
--
ALTER TABLE `ceos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `citizen-charter`
--
ALTER TABLE `citizen-charter`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `elected_wings`
--
ALTER TABLE `elected_wings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `electric`
--
ALTER TABLE `electric`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `fire_station`
--
ALTER TABLE `fire_station`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `functions`
--
ALTER TABLE `functions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `gallery`
--
ALTER TABLE `gallery`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `gardens`
--
ALTER TABLE `gardens`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `generaladminaddyear`
--
ALTER TABLE `generaladminaddyear`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `generaladmindepartment`
--
ALTER TABLE `generaladmindepartment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `health_dep_sec`
--
ALTER TABLE `health_dep_sec`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `health_photo_gallery`
--
ALTER TABLE `health_photo_gallery`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `home_videos`
--
ALTER TABLE `home_videos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `litigations`
--
ALTER TABLE `litigations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `main_menu`
--
ALTER TABLE `main_menu`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `muncipal`
--
ALTER TABLE `muncipal`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `newsupdate`
--
ALTER TABLE `newsupdate`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ponds_table`
--
ALTER TABLE `ponds_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `presidents`
--
ALTER TABLE `presidents`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `previous_chief_officer`
--
ALTER TABLE `previous_chief_officer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `property_holder`
--
ALTER TABLE `property_holder`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `prvt_hospital`
--
ALTER TABLE `prvt_hospital`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `public_disclosure`
--
ALTER TABLE `public_disclosure`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `righttoservices`
--
ALTER TABLE `righttoservices`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roads`
--
ALTER TABLE `roads`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rts_table`
--
ALTER TABLE `rts_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sanitation_inspectors`
--
ALTER TABLE `sanitation_inspectors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `schools`
--
ALTER TABLE `schools`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `school_images`
--
ALTER TABLE `school_images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `slider`
--
ALTER TABLE `slider`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sub_menu`
--
ALTER TABLE `sub_menu`
  ADD PRIMARY KEY (`id`),
  ADD KEY `mainMenuId` (`mainMenuId`);

--
-- Indexes for table `tenders`
--
ALTER TABLE `tenders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `treatment_facility`
--
ALTER TABLE `treatment_facility`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tree_census`
--
ALTER TABLE `tree_census`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wards`
--
ALTER TABLE `wards`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `websitelink`
--
ALTER TABLE `websitelink`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `awards`
--
ALTER TABLE `awards`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `ceos`
--
ALTER TABLE `ceos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `citizen-charter`
--
ALTER TABLE `citizen-charter`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `elected_wings`
--
ALTER TABLE `elected_wings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `electric`
--
ALTER TABLE `electric`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `fire_station`
--
ALTER TABLE `fire_station`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `functions`
--
ALTER TABLE `functions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `gallery`
--
ALTER TABLE `gallery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `gardens`
--
ALTER TABLE `gardens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `generaladminaddyear`
--
ALTER TABLE `generaladminaddyear`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `generaladmindepartment`
--
ALTER TABLE `generaladmindepartment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `health_dep_sec`
--
ALTER TABLE `health_dep_sec`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `health_photo_gallery`
--
ALTER TABLE `health_photo_gallery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `history`
--
ALTER TABLE `history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `home_videos`
--
ALTER TABLE `home_videos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `litigations`
--
ALTER TABLE `litigations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `main_menu`
--
ALTER TABLE `main_menu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `muncipal`
--
ALTER TABLE `muncipal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `newsupdate`
--
ALTER TABLE `newsupdate`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `ponds_table`
--
ALTER TABLE `ponds_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `presidents`
--
ALTER TABLE `presidents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `previous_chief_officer`
--
ALTER TABLE `previous_chief_officer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `property_holder`
--
ALTER TABLE `property_holder`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `prvt_hospital`
--
ALTER TABLE `prvt_hospital`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `public_disclosure`
--
ALTER TABLE `public_disclosure`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `righttoservices`
--
ALTER TABLE `righttoservices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `roads`
--
ALTER TABLE `roads`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `rts_table`
--
ALTER TABLE `rts_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `sanitation_inspectors`
--
ALTER TABLE `sanitation_inspectors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `schools`
--
ALTER TABLE `schools`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `school_images`
--
ALTER TABLE `school_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `slider`
--
ALTER TABLE `slider`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `sub_menu`
--
ALTER TABLE `sub_menu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT for table `tenders`
--
ALTER TABLE `tenders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `treatment_facility`
--
ALTER TABLE `treatment_facility`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tree_census`
--
ALTER TABLE `tree_census`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `wards`
--
ALTER TABLE `wards`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `websitelink`
--
ALTER TABLE `websitelink`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `sub_menu`
--
ALTER TABLE `sub_menu`
  ADD CONSTRAINT `sub_menu_ibfk_1` FOREIGN KEY (`mainMenuId`) REFERENCES `main_menu` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
