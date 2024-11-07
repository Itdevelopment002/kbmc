-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 07, 2024 at 10:41 PM
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
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `awards`
--

INSERT INTO `awards` (`id`, `heading`, `description`, `created_at`) VALUES
(14, 'Awards received at National / State level', 'In Swachh Bharat Abhiyan Swachh Survekshan 2021, Kulgaon Badlapur Municipal Council is ranked 14th at the national level and 2nd at the state level in the group of Amrit Cities. This is the best performance of the city till date in Swachh Survey.', '2024-10-28 10:47:25'),
(15, 'Awards received at National / State level', 'Swachh Survekshan 2022 under Swachh Bharat Abhiyaan has ranked 33rd in the Amrit Cities group at the country level and 7th at the state level.', '2024-10-28 10:47:50'),
(16, 'Awards received at National / State level', 'Swachh Survekshan 2023 under Swachh Bharat Abhiyaan has ranked 183rd in the Amrit Cities group at the country level and 36th at the state level.', '2024-10-28 10:48:12'),
(17, 'Awards received at National / State level', 'The city has achieved ODF++ status in Recertification in ODF City (Hagandari Free City).', '2024-10-28 10:48:33'),
(19, 'Awards received at National / State level', 'Achieved 3 star rating in GFC Rating (Garbage Free Star City).', '2024-10-29 06:25:01');

-- --------------------------------------------------------

--
-- Table structure for table `award_images`
--

CREATE TABLE `award_images` (
  `id` int(11) NOT NULL,
  `image_path` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `award_images`
--

INSERT INTO `award_images` (`id`, `image_path`, `created_at`) VALUES
(1, '/uploads/1730183973041.jpg', '2024-10-29 06:32:14'),
(3, '/uploads/1730183984072.jpg', '2024-10-29 06:39:44');

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
(6, 'Tax Department', 'uploads\\1730486856296.pdf', '2024-10-23 12:12:49'),
(7, 'Town Planning', 'uploads\\1730486891424.pdf', '2024-10-23 12:14:08'),
(8, 'Electrical Department', 'uploads\\1730486942185.pdf', '2024-10-23 12:14:33'),
(12, 'Public Work Department (PWD)', 'uploads\\1730486977993.pdf', '2024-11-01 18:49:38'),
(13, 'Health Department', 'uploads\\1730487070530.pdf', '2024-11-01 18:51:10'),
(14, 'Education Department', 'uploads\\1730487093655.pdf', '2024-11-01 18:51:33'),
(15, 'Vehicle Department', 'uploads\\1730487130896.pdf', '2024-11-01 18:52:10'),
(16, 'NULM Department', 'uploads\\1730487148565.pdf', '2024-11-01 18:52:28'),
(17, 'Hospital Department', 'uploads\\1730487163859.pdf', '2024-11-01 18:52:43'),
(18, 'Water Department', 'uploads\\1730488987642.pdf', '2024-11-01 19:23:07'),
(19, 'Establishment Department', 'uploads\\1730489018260.pdf', '2024-11-01 19:23:38');

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

CREATE TABLE `contact` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `mobile` varchar(15) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `feedback` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contact`
--

INSERT INTO `contact` (`id`, `name`, `mobile`, `subject`, `email`, `feedback`) VALUES
(6, 'Nishant Makam', '9988776655', 'Tax Enquiry', 'email@gmail.com', 'Feedback Description Here');

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `hod` varchar(255) NOT NULL,
  `link` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`id`, `name`, `hod`, `link`, `created_at`) VALUES
(3, 'General Admin Department', 'Mangesh Sonar', '/general-admin-department', '2024-10-22 04:28:01'),
(4, 'Audit Department', 'Subhash Nagap', '/audit-department', '2024-10-22 05:31:43'),
(6, 'Tax Department', 'Pratiksha Sawant', '/tax-department', '2024-10-22 05:47:29'),
(8, 'Account Department', 'Vikas Chavan', '/account-department', '2024-10-22 09:46:50'),
(10, 'Town Planning', 'Amar Gadge', '/town-planning', '2024-10-28 04:56:44'),
(15, 'Electrical Department', 'Abhijit Tamhane', '/electrical-department', '2024-10-30 19:31:53'),
(16, 'Public Work Department (PWD)', 'Sandip Tembhekar', '/public-work-department', '2024-10-30 19:32:36'),
(17, 'Milkat (Income)', 'Pooja Patil', '/income-department', '2024-10-30 19:33:11'),
(18, 'E-Governance Department', 'Dipali Bodke', '/egovernance-department', '2024-10-30 19:33:41'),
(19, 'Health Department', 'Shreya Shirvatkar', '/health-department', '2024-10-30 19:34:49'),
(20, 'WCD (Women and Child Development)', 'Shrikant Nikule', '/wcd', '2024-10-30 19:38:42'),
(21, 'Advertisement Department', 'Amit Sarmalkar', '/advertisement-department', '2024-10-30 19:38:53'),
(22, 'Education Department', 'Vilas Jadye', '/education-department', '2024-10-30 19:39:03'),
(23, 'Security Department', 'Abhijit Tamhane', '#.', '2024-10-30 19:39:13'),
(24, 'Vehicle Department', 'Abhijit Tamhane', '/vehicle-department', '2024-10-30 19:39:23'),
(25, 'NULM Department', 'Charudatt Sonawane', '/nulm-department', '2024-10-30 19:39:32'),
(26, 'Hospital Department', 'Dr. Rajesh Ankush', '/hospital-department', '2024-10-30 19:39:41'),
(27, 'Fire Department', 'Bhagwat Sonawane', '/fire-department', '2024-10-30 19:39:51'),
(28, 'Legal Department', 'Megha Kadam', '/legal-department', '2024-10-30 19:40:02'),
(29, 'Disability Welfare', 'Shrikant Nikule', '/disability-welfare-department', '2024-10-30 19:40:12'),
(30, 'Store & Records Department', 'Megha Kadam', '#.', '2024-10-30 19:40:26'),
(31, 'Marriage Registration', 'Dr. Rajesh Ankush', '#.', '2024-10-30 19:40:36'),
(32, 'Birth & Death Department', 'Shrikant Nikule', '/birth-death-department', '2024-10-30 19:40:47');

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
(8, 'Correspondent Officer', 'Ward No. 01', '2020-01-01', '2022-05-31', '+91 99887755834', '/uploads/1730057207024.jpg', '2024-10-22 08:59:49'),
(13, 'Correspondent Officer', 'Ward No. 02', '2024-10-01', '2024-10-31', '+91 99887755834', '/uploads/1730058389226.jpg', '2024-10-27 19:46:29');

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
(1, 'Citizens Grievance Redressal No.', '8263936484', 'M/s Hi-Tech Construction, East Division', '2024-10-22 06:46:24', 'Web Developer'),
(7, 'Citizens Grievance Redressal No.', '7757840944', 'M/s Sagar Sai Construction, Western Division', '2024-10-25 10:45:39', 'o');

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
(1, 'Kulgaon Badlapur Municipal Council', 'Shirgaon MIDC, Badlapur East', '0251 2990890', '/uploads/1729529817117.jpg', '2024-10-21 12:18:07'),
(3, 'Kulgaon Badlapur Municipal Council', 'Shaswat Park, Manjarli, Badlapur West', '0251 2990890', '/uploads/1729529975293.jpg', '2024-10-21 14:20:04');

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
(1, 'DUTIES AND FUNCTIONS OF THE COUNCIL AND THE MUNICIPAL EXECUTIVE.', 'lighting public streets, places and buildings; 1[(aa) planning for social and economic development; (ab) urban forestry, protection of the environment and promotion of ecological aspects ;]'),
(5, 'DUTIES AND FUNCTIONS OF THE COUNCIL AND THE MUNICIPAL EXECUTIVE.', 'watering public streets and places ;'),
(6, 'DUTIES AND FUNCTIONS OF THE COUNCIL AND THE MUNICIPAL EXECUTIVE.', 'cleansing public streets, places and sewers, and all spaces, not being private property, which are open to the enjoyment of the public, whether such spaces are vested in the Council or not removing noxious vegetation and abating all public nuisances ;'),
(7, 'DUTIES AND FUNCTIONS OF THE COUNCIL AND THE MUNICIPAL EXECUTIVE.', 'maintenance of a fire-brigade equipped with suitable appliances for extinguishing fires, and protection of life and property when fire occur;]'),
(8, 'DUTIES AND FUNCTIONS OF THE COUNCIL AND THE MUNICIPAL EXECUTIVE', 'regulating or abating offensive or dangerous trades or practices'),
(9, 'DUTIES AND FUNCTIONS OF THE COUNCIL AND THE MUNICIPAL EXECUTIVE.', 'removing obstructions and protections in public streets or places and in spaces, not being private property, which are open to the enjoyment of the public, whether such spaces are vested in the Council or in Government;'),
(10, 'DUTIES AND FUNCTIONS OF THE COUNCIL AND THE MUNICIPAL EXECUTIVE.', 'securing or removing dangerous buildings or places and reclaiming unhealthy localities;'),
(11, 'DUTIES AND FUNCTIONS OF THE COUNCIL AND THE MUNICIPAL EXECUTIVE.', 'acquiring and maintaining, changing and regulating places for the disposal of the dead ;'),
(12, 'DUTIES AND FUNCTIONS OF THE COUNCIL AND THE MUNICIPAL EXECUTIVE.', 'constructing, altering and maintaining public streets, culverts, municipal boundary marks, markets, slaughter-houses, laterines, privies, urinals, drains, sewers, drainage works, sewerage works, baths, washing places, drinking fountains, tanks, wells, dam'),
(13, 'DUTIES AND FUNCTIONS OF THE COUNCIL AND THE MUNICIPAL EXECUTIVE.', 'obtaining a supply or an additional supply of water, proper and sufficient for preventing danger to the health of the inhabitants from the insufficiency or unwholesomeness of the existing supply, when such supply or aditional supply can be obtained at rea'),
(14, 'DUTIES AND FUNCTIONS OF THE COUNCIL AND THE MUNICIPAL EXECUTIVE.', 'naming streets and numbering of premises ;'),
(15, 'DUTIES AND FUNCTIONS OF THE COUNCIL AND THE MUNICIPAL EXECUTIVE.', 'registering births and deaths;'),
(16, 'DUTIES AND FUNCTIONS OF THE COUNCIL AND THE MUNICIPAL EXECUTIVE.', 'public vaccination ;'),
(17, 'DUTIES AND FUNCTIONS OF THE COUNCIL AND THE MUNICIPAL EXECUTIVE.', 'suitable accommodation for any calves, cows, or buffaloes required within the municipal area for the supply of animal lymph ;');

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
(5, 'Ambernath Bunglow Society Garden', '[\"/uploads/1730494512275.jpg\",\"/uploads/1730494512299.jpg\",\"/uploads/1730494512312.jpg\",\"/uploads/1730494512335.jpg\",\"/uploads/1730494512345.jpg\"]'),
(6, 'Badlapur Gymkhana', '[\"/uploads/1730494567177.jpg\",\"/uploads/1730494567183.jpg\",\"/uploads/1730494567194.jpg\",\"/uploads/1730494567199.jpg\",\"/uploads/1730494567203.jpg\",\"/uploads/1730494567210.jpg\"]'),
(7, 'Balasaheb Thakrey Smarak Udyan Shantinagar', '[\"/uploads/1730494597580.jpg\",\"/uploads/1730494597583.jpg\",\"/uploads/1730494597585.jpg\",\"/uploads/1730494597590.jpg\",\"/uploads/1730494597593.jpg\",\"/uploads/1730494597602.jpg\",\"/uploads/1730494597604.jpg\",\"/uploads/1730494597606.jpg\",\"/uploads/1730494597607.jpg\",\"/uploads/1730494597616.jpg\",\"/uploads/1730494597618.jpg\",\"/uploads/1730494597619.jpg\"]'),
(8, 'Chaitanya Sankul Garden', '[\"/uploads/1730494638985.jpg\",\"/uploads/1730494638991.jpg\",\"/uploads/1730494638996.jpg\",\"/uploads/1730494639002.jpg\",\"/uploads/1730494639007.jpg\",\"/uploads/1730494639012.jpg\",\"/uploads/1730494639016.jpg\"]'),
(9, 'Dharmaveer Anand Dighe Sabhagruh', '[\"/uploads/1730494655737.jpg\"]');

-- --------------------------------------------------------

--
-- Table structure for table `generaladminaddyear`
--

CREATE TABLE `generaladminaddyear` (
  `id` int(11) NOT NULL,
  `year` varchar(255) NOT NULL,
  `meetingtype` varchar(255) NOT NULL,
  `pdfheading` varchar(255) NOT NULL,
  `pdf` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `generaladminaddyear`
--

INSERT INTO `generaladminaddyear` (`id`, `year`, `meetingtype`, `pdfheading`, `pdf`) VALUES
(9, '2021 - 2022', 'Standing Committee Meeting', 'Prashaskiy Tharav April 2021', 'uploads\\1730311003753-01_Prashaskiy Tharav April - 2021.pdf'),
(10, '2021 - 2022', 'Standing Committee Meeting', 'Prashaskiy Tharav May 2021', 'uploads\\1730311042660-02_Prashaskiy Tharav May - 2021.pdf'),
(13, '2021 - 2022', 'Standing Committee Meeting', 'Prashaskiy Tharav June 2021', 'uploads\\1730311062979-03_Prashaskiy Tharav June - 2021.pdf'),
(14, '2021 - 2022', 'Standing Committee Meeting', 'Prashaskiy Tharav July 2021', 'uploads\\1730311084785-04_Prashaskiy Tharav July - 2021.pdf'),
(15, '2021 - 2022', 'Standing Committee Meeting', 'Prashaskiy Tharav August 2021', 'uploads\\1730311115777-05_Prashaskiy Tharav Aug - 2021.pdf'),
(16, '2021 - 2022', 'Standing Committee Meeting', 'Prashaskiy Tharav September 2021', 'uploads\\1730311158074-06_Prashaskiy Tharav Sept - 2021.pdf'),
(17, '2021 - 2022', 'Standing Committee Meeting', 'Prashaskiy Tharav October 2021', 'uploads\\1730311185843-07_Prashaskiy Tharav Oct - 2021.pdf'),
(18, '2021 - 2022', 'Standing Committee Meeting', 'Prashaskiy Tharav November 2021', 'uploads\\1730315213137-08_Prashaskiy Tharav Nov - 2021.pdf'),
(19, '2021 - 2022', 'Standing Committee Meeting', 'Prashaskiy Tharav December 2021', 'uploads\\1730315233707-09_Prashaskiy Tharav Dec - 2021.pdf'),
(20, '2021 - 2022', 'Standing Committee Meeting', 'Prashaskiy Tharav January 2022', 'uploads\\1730315255480-10_Prashaskiy Tharav Jan - 2022.pdf'),
(21, '2021 - 2022', 'Standing Committee Meeting', 'Prashaskiy Tharav February 2022', 'uploads\\1730315278199-11_Prashaskiy Tharav Feb - 2022.pdf'),
(22, '2021 - 2022', 'Standing Committee Meeting', 'Prashaskiy Tharav March 2022', 'uploads\\1730315298936-12_Prashaskiy Tharav Mar - 2022.pdf'),
(23, '2022 - 2023', 'Standing Committee Meeting', 'Prashaskiy Tharav April 2022', 'uploads\\1730315325330-01_Prashaskiy Tharav April - 2022.pdf'),
(24, '2022 - 2023', 'Standing Committee Meeting', 'Prashaskiy Tharav May 2022', 'uploads\\1730317668714-02_Prashaskiy Tharav May - 2022.pdf'),
(25, '2022 - 2023', 'Standing Committee Meeting', 'Prashaskiy Tharav June 2022', 'uploads\\1730317690591-03_Prashaskiy Tharav June - 2022.pdf'),
(26, '2022 - 2023', 'Standing Committee Meeting', 'Prashaskiy Tharav July 2022', 'uploads\\1730317720452-04_Prashaskiy Tharav July - 2022.pdf'),
(27, '2022 - 2023', 'Standing Committee Meeting', 'Prashaskiy Tharav August 2022', 'uploads\\1730317738389-05_Prashaskiy Tharav Aug - 2022.pdf'),
(28, '2022 - 2023', 'Standing Committee Meeting', 'Prashaskiy Tharav September 2022', 'uploads\\1730317763571-06_Prashaskiy Tharav Sept - 2022.pdf'),
(29, '2022 - 2023', 'Standing Committee Meeting', 'Prashaskiy Tharav October 2022', 'uploads\\1730317782130-07_Prashaskiy Tharav Oct - 2022.pdf'),
(30, '2022 - 2023', 'Standing Committee Meeting', 'Prashaskiy Tharav November 2022', 'uploads\\1730317812402-08_Prashaskiy Tharav Nov - 2022.pdf'),
(31, '2022 - 2023', 'Standing Committee Meeting', 'Prashaskiy Tharav December 2022', 'uploads\\1730317832013-09_Prashaskiy Tharav Dec - 2022.pdf'),
(32, '2022 - 2023', 'Standing Committee Meeting', 'Prashaskiy Tharav January 2023', 'uploads\\1730317854130-10_Prashaskiy Tharav Jan - 2023.pdf'),
(33, '2022 - 2023', 'Standing Committee Meeting', 'Prashaskiy Tharav February 2023', 'uploads\\1730317885540-11_Prashaskiy Tharav Feb - 2023.pdf'),
(34, '2022 - 2023', 'Standing Committee Meeting', 'Prashaskiy Tharav March 2023', 'uploads\\1730317902184-12_Prashaskiy Tharav Mar - 2023.pdf'),
(35, '2023 - 2024', 'Standing Committee Meeting', 'Prashaskiy Tharav April 2023', 'uploads\\1730318321628-01_Prashaskiy Tharav April - 2023.pdf'),
(36, '2023 - 2024', 'Standing Committee Meeting', 'Prashaskiy Tharav May 2023', 'uploads\\1730318347667-02_Prashaskiy Tharav May - 2023.pdf'),
(37, '2023 - 2024', 'Standing Committee Meeting', 'Prashaskiy Tharav June 2023', 'uploads\\1730318369093-03_Prashaskiy Tharav June - 2023.pdf'),
(38, '2023 - 2024', 'Standing Committee Meeting', 'Prashaskiy Tharav July 2023', 'uploads\\1730318387492-04_Prashaskiy Tharav July - 2023.pdf'),
(39, '2023 - 2024', 'Standing Committee Meeting', 'Prashaskiy Tharav August 2023', 'uploads\\1730318407384-05_Prashaskiy Tharav Aug - 2023.pdf'),
(40, '2023 - 2024', 'Standing Committee Meeting', 'Prashaskiy Tharav September 2023', 'uploads\\1730318441745-06_Prashaskiy Tharav Sapt - 2023.pdf'),
(41, '2023 - 2024', 'Standing Committee Meeting', 'Prashaskiy Tharav October 2023', 'uploads\\1730318460707-07_Prashaskiy Tharav Oct - 2023.pdf'),
(42, '2023 - 2024', 'Standing Committee Meeting', 'Prashaskiy Tharav November 2023', 'uploads\\1730318476753-08_Prashaskiy Tharav Nov -2023.pdf'),
(43, '2023 - 2024', 'Standing Committee Meeting', 'Prashaskiy Tharav December 2023', 'uploads\\1730318495106-09_Prashaskiy Tharav Dec - 2023.pdf'),
(44, '2023 - 2024', 'Standing Committee Meeting', 'Prashaskiy Tharav January 2024', 'uploads\\1730318524089-10_Prashaskiy Tharav Jan - 2024.pdf');

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
(3, 'General Meeting and Standing Committee Meeting Resolutions');

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
(8, 'Ward no. From 1 to 47, the work of road cleaning and door to door collection and transportation of wet and dry waste is done through the department.'),
(9, 'Zone no.1 to 6 is sprayed ward wise with mosquito repellent fume by fogging machine.'),
(10, 'Daily cleaning of public and community toilets in zone no.1 to 6 Maintenance and minor repairs are carried out.'),
(11, 'Catching stray dogs in Kubanp area and carrying out sterilization operations on them and The work of giving them rabies prevention vaccine is done through the department.'),
(12, 'In Kulgaon Badlapur Municipal Council area pesticide spraying is done by mini tractor with power spray machine.'),
(13, 'Kulgaon Badlapur Municipal Council Area Maharashtra Plastic and Thermocol Non-decomposable Commodities (Production, Use, Sale, Transport, Handling, Storage) Notification, 2018 Sanitation Inspector has been appointed and appointed for implementation Throug');

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
(6, 'Decentralized Pit Composting Plant, Manjarli', '/uploads/1730196466697.jpg', '2024-10-29 10:07:46'),
(7, 'Decentralized Pit Composting Plant, Manjarli', '/uploads/1730196490009.jpg', '2024-10-29 10:08:10'),
(8, 'Decentralized Pit Composting Plant, Juveli', '/uploads/1730196509456.jpg', '2024-10-29 10:08:29'),
(9, 'Biogas Plant, Vadavali', '/uploads/1730196525548.jpg', '2024-10-29 10:08:45');

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
(4, '1, 2, 3', 'Mr. Gurunath Mahtre', '9011384305'),
(5, '3, 20, 21, 22', 'Mr. Pravin Dhule', '7709765162'),
(6, '18, 19', 'Mr. Pandharinath Meher', '9764773256'),
(7, '23, 24', 'Mr. Ramakant Vishe', '9850431178'),
(8, '4, 5, 16, 17', 'Mr. Pandharinath Meher', '9764773256'),
(9, '6, 7, 13, 14', 'Mr. Vilas Dhotre', '7276577421');

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
(15, 'Home'),
(16, 'About KBMC'),
(17, 'City Profile'),
(18, 'Online Services'),
(19, 'Schemes'),
(20, 'Complaints');

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
(9, 'Property', 'Ruhi Sabhagruha', 'Cultural Hall', 'Yadava Nagar, Shirgaon, Badlapur East', '2024-10-28 07:46:09'),
(10, 'Property', 'Shreeji Sabhagruha', 'Cultural Hall / Women Welfare Centre', 'Katrap, Badlapur East', '2024-10-28 07:46:31'),
(11, 'Property', 'Raut Arcade 8 Shops & 7 Offices', 'Shops', 'Shirgaon, Badlapur East', '2024-10-28 07:46:39'),
(12, 'Property', 'Kondilkar 17 Shops', 'Shops', 'Barrage Road, Badlapur West', '2024-10-28 07:46:58');

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
(6, 'Police and Fire Brigade KBMC flood rescue operations mock drill @ Barrage dam today.\n'),
(8, 'There are 16 primary and 4 secondary schools under the jurisdiction of Kulgaon Badlapur Municipal Council and students and parents are getting overwhelming response for admission in these schools in the new academic year 2024-25.'),
(10, 'कुळगाव बदलापूर नगर परिषदेच्या शाळांची गरुड भरारी. - नुकत्याच जाहीर झालेल्या दहावीच्या (SSC) निकालानुसार कुळगाव बदलापूर नगर परिषदेच्या शाळांनी उत्तुंग भरारी घेतली.'),
(11, 'List of candidates who have received applications for part time / full time medical officer and other posts.'),
(12, 'Lottery - Allotment of flats in Valmiki Nagar Kolegaon Badlapur 5 constructed by the Municipal Corporation ADVERTISEMENT - For appointment of members to Municipal Street Vendors Committee.'),
(13, 'On the post of Labourer/Valvemen/Zariwala dt. Result of Written Examination held on 21/01/2024.'),
(14, 'KBMC and Dr. Swachh Bharat Abhiyan dt. Implemented on 13 December 2023.'),
(15, 'Revised Development Plan Kolegaon Badlapur - Approved changes.'),
(16, 'Regarding noise pollution and temporary pavilions erected on roads without permission - Proceedings and details.');

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
(8, 'Mahalaxmi Talao'),
(9, 'Badlapur Gaon Talao'),
(10, 'Gaondevi Talao'),
(11, 'Katrap Talao'),
(12, 'Dagari Talao Badlapur Gaon'),
(13, 'Near Juveli Shivshankar Talao'),
(14, 'Wadwali Talao');

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
(2, 'Shri. U.P.S.Madan (IAS)', '1992-06-10', '1994-01-18', '/uploads/1729669485752.png', '2024-10-23 07:44:45'),
(3, 'Shri. Padmakar Bhandari', '1992-07-06', '1993-04-06', '/uploads/1729669834104.jpg', '2024-10-23 07:50:34');

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
(8, 'Mr. Yogesh Godse', '2024-10-09', '2024-10-18', '/uploads/1729606866137.jpg', '2024-10-22 14:21:06'),
(9, 'Mr. Deepak Pujari', '2024-10-02', '2024-10-17', '/uploads/1729665322633.jpg', '2024-10-23 05:23:50'),
(14, 'Mr. Prakash N. Borse', '2024-10-08', '2024-10-10', '/uploads/1729852639240.png', '2024-10-25 10:37:19');

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
(6, 'Property 1', 'Residential Property', '123213', '2024-10-22 08:16:47'),
(9, 'Property 2', 'Commercial Property', '14365', '2024-10-25 10:40:46'),
(10, 'Property 3', 'Industrial Property', '642', '2024-10-28 07:31:34'),
(11, 'Property 4', 'Total Property', '138299', '2024-10-28 07:31:57');

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
(3, 'K. B. S. Dube Hospital, KBMC', 'East', 'Dr. Rajesh Ankur, MBBS', 'Near Adharsh Vidhyamandhir, Station Road, Kulgaon Badlapur', '0251-2690920', '8380007056', '05', 'Outpatient, leprosy. Tuberculosis treatment blood test, vaccination. hosp.kbmc@gmail.com'),
(4, 'Primary Health Center Badlapur Village (PHC)', 'West', 'Dr. Prashant Kanojiya / Dr. Ashwini Kodilkar', 'Badlapur Village', '0251-2665915', '9822740508', '06', 'Outpatient department, maternity facility, family planning surgery facility');

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
(10, 'General Admin Department'),
(11, 'Tax Department'),
(14, 'Account Department'),
(17, 'Town Planning'),
(19, 'Public Work Department (PWD)'),
(21, 'Health Department'),
(22, 'Education Department'),
(23, 'NULM Department'),
(24, 'Hospital Department'),
(25, 'Fire Department'),
(26, 'Birth & Death Department');

-- --------------------------------------------------------

--
-- Table structure for table `righttoservices`
--

CREATE TABLE `righttoservices` (
  `id` int(11) NOT NULL,
  `heading` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `righttoservices`
--

INSERT INTO `righttoservices` (`id`, `heading`, `description`, `created_at`) VALUES
(10, 'Right To Services Act, 2015', 'The Maharashtra Right to Public Services Act, 2015 is enacted and is in force since 28.04.2015 to ensure that notified services are provided to the citizens in a transparent, speedy and time-bound manner by various Government Departments and Public Authorities under the Government. Its objective is to provide easy, prompt and time bound services to the citizens.', '2024-10-25 09:51:34'),
(11, 'Right To Services Act, 2015', 'The Maharashtra State Commission for Right to Public Service has been constituted under the above Act to monitor, coordinate, control and improve the public services being provided by the Government. The Commission consists of a Chief Commissioner and six Commissioners. The headquarter of the Commission is at the New Administrative Building, Opposite Mantralaya, Mumbai and the Divisional Offices of the Commissioners are at the six Divisional Headquarters.', '2024-11-01 06:05:00'),
(12, 'Right To Services Act, 2015', 'If any notified service is not provided to any eligible person within stipulated time or is rejected without proper grounds, the concerned person may file 1st and 2nd appeals with the higher authorities and if he is not satisfied with their decision, he may prefer third appeal to the Commission. The erring officer is liable for a penalty up to Rs 5000/- per case. Notified Services rendered by this Department are as per enclosed proforma.', '2024-11-01 06:05:22');

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
(4, 'adfvw', 'Total Road Length', '149.35 Km', '2024-10-25 10:46:01'),
(5, 'Road', 'Asphalt Road Length', '23.75 Km', '2024-11-01 21:14:14'),
(6, 'Road', 'Cement Road Length	', '125.60 Km', '2024-11-01 21:14:37');

-- --------------------------------------------------------

--
-- Table structure for table `rts_table`
--

CREATE TABLE `rts_table` (
  `id` int(11) NOT NULL,
  `description` text NOT NULL,
  `pdf_path` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rts_table`
--

INSERT INTO `rts_table` (`id`, `description`, `pdf_path`, `created_at`) VALUES
(19, 'The Maharashtra Right to Public Service Act, 2015 (English)', 'uploads\\1730441161992.pdf', '2024-10-25 09:41:18'),
(20, 'The Maharashtra Right to Public Service Act, 2015 (Marathi)', 'uploads\\1730441178199.pdf', '2024-11-01 06:06:18'),
(21, 'RTS GR', 'uploads\\1730451641974.pdf', '2024-11-01 09:00:42'),
(22, 'Form of application to Designated officer', 'uploads\\1730484718745.pdf', '2024-11-01 18:11:58'),
(23, 'Acknowledgement', 'uploads\\1730484751991.pdf', '2024-11-01 18:12:32'),
(24, 'Form of First Appeal to First Appellate Authority', 'uploads\\1730484819329.pdf', '2024-11-01 18:13:39'),
(25, 'Form of Second Appeal to Second Appellate Authority', 'uploads\\1730484844051.pdf', '2024-11-01 18:14:04'),
(26, 'Form of Appeal to Maharashtra State Commission for Right to Public Service', 'uploads\\1730484860616.pdf', '2024-11-01 18:14:20'),
(27, 'Register of cases', 'uploads\\1730484895059.pdf', '2024-11-01 18:14:55'),
(28, 'Office Inspection format', 'uploads\\1730484910528.pdf', '2024-11-01 18:15:10');

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
(4, '1', 'Mr. Akesh Mhatre ', '7666505666', '1,2,3'),
(5, '2', 'Mr. Ashish Jadhav', '1234567890', '4,5,16,17'),
(6, '3', 'Mr. Raju Bhande', '9881055385', '11,12');

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
(4, 'School', 'KBMC School No. 1', 'Kulgaon', 'Marathi', '2024-11-02 09:18:46'),
(5, 'School', 'KBMC School No. 2', 'Kulgaon', 'Urdu', '2024-11-02 09:25:10'),
(6, 'School', 'KBMC School No. 3', 'Juveli', 'Marathi', '2024-11-02 09:25:19'),
(7, 'School', 'KBMC School No. 4', 'Mankivali', 'Marathi', '2024-11-02 09:25:27'),
(8, 'School', 'KBMC School No. 5', 'Vajpe', 'Marathi', '2024-11-02 09:25:38'),
(9, 'School', 'KBMC School No. 6', 'Shirgaon Aptewadi', 'Marathi', '2024-11-02 09:25:49'),
(10, 'School', 'KBMC School No. 7', 'Katrap', 'Marathi', '2024-11-02 09:25:58'),
(11, 'School', 'KBMC School No. 8', 'Katrap Mohpada', 'Marathi', '2024-11-02 09:26:08'),
(12, 'School', 'KBMC School No. 9', 'Hendrepada', 'Marathi', '2024-11-02 09:26:24'),
(13, 'School', 'KBMC School No. 10', 'Badlapur', 'Urdu', '2024-11-02 09:26:34'),
(14, 'School', 'KBMC School No. 11', 'Sonivali', 'Marathi', '2024-11-02 09:26:43'),
(15, 'School', 'KBMC School No. 12', 'Valivali', 'Marathi', '2024-11-02 09:26:52'),
(16, 'School', 'KBMC School No. 13', 'Eranjad', 'Marathi', '2024-11-02 09:27:03'),
(17, 'School', 'KBMC School No. 14', 'Belavali', 'Marathi', '2024-11-02 09:27:57'),
(18, 'School', 'KBMC School No. 15', 'Vadavali', 'Marathi', '2024-11-02 09:28:08'),
(19, 'School', 'KBMC School No. 16', 'Manjarli', 'Marathi', '2024-11-02 09:28:24');

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
(3, '/uploads/1730538674162.jpg', '2024-10-24 08:05:29'),
(5, '/uploads/1730538679628.jpg', '2024-10-25 10:42:36'),
(6, '/uploads/1730538692467.jpg', '2024-11-02 09:11:32'),
(7, '/uploads/1730538704578.jpg', '2024-11-02 09:11:44'),
(8, '/uploads/1730538714032.jpg', '2024-11-02 09:11:54'),
(9, '/uploads/1730538723690.jpg', '2024-11-02 09:12:03'),
(10, '/uploads/1730538779427.jpg', '2024-11-02 09:12:59'),
(11, '/uploads/1730538790039.jpg', '2024-11-02 09:13:10'),
(12, '/uploads/1730538800423.jpg', '2024-11-02 09:13:20'),
(13, '/uploads/1730538812462.jpg', '2024-11-02 09:13:32'),
(14, '/uploads/1730538825287.jpg', '2024-11-02 09:13:45'),
(15, '/uploads/1730538842337.jpg', '2024-11-02 09:14:02'),
(16, '/uploads/1730538866247.jpg', '2024-11-02 09:14:26'),
(17, '/uploads/1730538886478.jpg', '2024-11-02 09:14:46'),
(18, '/uploads/1730538899883.jpg', '2024-11-02 09:14:59'),
(19, '/uploads/1730538917000.jpg', '2024-11-02 09:15:17'),
(20, '/uploads/1730538932669.jpg', '2024-11-02 09:15:32');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `service_heading` varchar(255) NOT NULL,
  `service_link` varchar(255) NOT NULL,
  `main_icon_path` varchar(255) NOT NULL,
  `hover_icon_path` varchar(255) NOT NULL,
  `uploaded_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `service_heading`, `service_link`, `main_icon_path`, `hover_icon_path`, `uploaded_at`) VALUES
(12, 'Public Disclosure', '/public-disclosure', 'uploads\\1729510320857.png', 'uploads\\1729510320870.png', '2024-10-21 11:32:01'),
(13, 'Citizen Charter', '/citizen-charter', 'uploads\\1729510354863.png', 'uploads\\1729510354864.png', '2024-10-21 11:32:34'),
(14, 'Right To Service', '/right-to-services', 'uploads\\1729510397477.png', 'uploads\\1729510397478.png', '2024-10-21 11:33:17'),
(15, 'Development Plan', '/town-planning', 'uploads\\1729510432283.png', 'uploads\\1729510432285.png', '2024-10-21 11:33:52'),
(16, 'Downloads', '/downloads', 'uploads\\1729510478031.png', 'uploads\\1729510478032.png', '2024-10-21 11:34:38'),
(17, 'City Map', '#.', 'uploads\\1729510501598.png', 'uploads\\1729510501599.png', '2024-10-21 11:35:01'),
(18, 'Elected Wing', '/elected-member', 'uploads\\1729510593373.png', 'uploads\\1729510593374.png', '2024-10-21 11:35:40'),
(19, 'Official Publications', '/official-publication', 'uploads\\1730198213886.png', 'uploads\\1730198213902.png', '2024-10-21 11:36:56');

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
  `subMenu` varchar(255) NOT NULL,
  `subLink` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sub_menu`
--

INSERT INTO `sub_menu` (`id`, `mainMenuId`, `subMenu`, `subLink`) VALUES
(135, 20, 'Aaple Sarkar', 'https://aaplesarkar.mahaonline.gov.in/en'),
(136, 20, 'P G Portal', 'https://pgportal.gov.in/'),
(137, 20, 'Right to Information', 'https://rtionline.maharashtra.gov.in/RTIMIS/login/index.php'),
(148, 18, 'Property Tax Payment', 'https://mahaulb.in/MahaULB/property/propertyOnlinePay'),
(149, 18, 'Property Tax Receipt', 'https://mahaulb.in/MahaULB/property/onlineReceiptReprint'),
(150, 18, 'Water Tax Payment', 'https://mjp.maharashtra.gov.in/pay-water-bill-online/'),
(151, 18, 'Birth & Death Search', 'https://crsorgi.gov.in/web/index.php/auth/login'),
(152, 18, 'Online Tenders', 'https://mahatenders.gov.in/nicgep/app'),
(153, 18, 'Auto DCR', 'https://maha.autodcr.com/BPAMSClient/Default.aspx'),
(209, 16, 'History', '/history'),
(210, 16, 'Wards', '/ward'),
(211, 16, 'Elected Wing', '/elected-member'),
(212, 16, 'Organization Structure', '/org-structure'),
(213, 16, 'Functions', '/functions'),
(214, 16, 'Departments', '/departments'),
(215, 16, 'Previous Chief Officers', '/elected-pre-officer'),
(216, 16, 'Previous Presidents', '/elected-pre-representative'),
(217, 16, 'Awards', '/awards'),
(235, 17, 'Areas', '/uploads/areas.pdf'),
(236, 17, 'Property Holder', '/property-holder'),
(237, 17, 'Muncipal Properties', '/properties-milkat'),
(238, 17, 'Schools', '/schools'),
(239, 17, 'Gardens', '/gardens'),
(240, 17, 'Electric', '/electric'),
(241, 17, 'Roads', '/roads'),
(242, 17, 'Tree Census', '/tree-census'),
(243, 17, 'Health', '/health'),
(244, 17, 'Ponds / Talao', '/ponds-talao'),
(245, 17, 'Fire Station', '/fire-station'),
(246, 17, 'Private Hospital', '/private-hospital'),
(247, 19, 'NULM', '/uploads/nulm.pdf'),
(248, 19, 'PMAY', '/pmay'),
(249, 19, 'NUHM', '/nuhm'),
(250, 19, 'AMRUT', '/amrut'),
(251, 19, 'Swachh Bharat', '/uploads/swachh.pdf');

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
(4, 'Appointment of Consultant for GAD approval Bid process management and supervision for the construction of Rail Over Bridge ROB between Katrap to Belvali Badlapur in KBMC area.', 'New', '2024-10-21 11:41:52'),
(5, 'Appointment of Consultant for GAD approval Bid process management and supervision for the construction of Rail Over Bridge ROB between Katrap to Belvali Badlapur in KBMC area.', 'New', '2024-10-21 11:42:49'),
(6, 'Appointment of Consultant for GAD approval Bid process management and supervision for the construction of Rail Over Bridge ROB between Katrap to Belvali Badlapur in KBMC area.', '-', '2024-10-21 11:44:21'),
(7, 'Appointment of Consultant for GAD approval Bid process management and supervision for the construction of Rail Over Bridge ROB between Katrap to Belvali Badlapur in KBMC area.', '-', '2024-10-22 05:36:18'),
(8, 'Appointment of Consultant for GAD approval Bid process management and supervision for the construction of Rail Over Bridge ROB between Katrap to Belvali Badlapur in KBMC area.', '-', '2024-10-22 05:44:25'),
(12, 'Appointment of Consultant for GAD approval Bid process management and supervision for the construction of Rail Over Bridge ROB between Katrap to Belvali Badlapur.', 'New', '2024-11-04 16:59:34');

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
(4, 'Biogas Plant, Vadavali', 'S.No. 178, Vadvali Smashan Bhoomi, Vadvali Gaon, Badlapur (W)', '5', '5', 'Electricity'),
(5, 'Decentralized Pit Composting Plant, Manjarli', 'S.No. 55, Manjarli Vidyapeeth Road, Manjarli, Badlapur (W)', '1', '1', 'Compost'),
(6, 'Decentralized Pit Composting Plant, Juveli', 'S.No. 83, Juveli Smashan Bhoomi, Juveli Gaon, Badlapur (E)', '1.5', '1.5', 'Compost');

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
(7, 'Area of Kulgaon-Badlapur Muncipal Council', '35.68 Sq. Km.'),
(8, 'No. of Wards in Kulgaon-Badlapur Muncipal Council', '47'),
(9, 'No. of Trees counted in Jurisdication of Kulgaon-Badlapur Muncipal Council', '19,64,66'),
(10, 'No. of Trees species counted in Jurisdication of Kulgaon-Badlapur Muncipal Council', '198'),
(11, 'Fruiting Trees', '72,558'),
(12, 'Medicinal Trees', '6,613'),
(13, 'Ornamental Trees', '1,17,295'),
(14, 'Heritage Trees', '137');

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
(6, 'Abhay', 'Abhay123', 'Tax Department', '2024-11-04 18:45:08'),
(7, 'Aniket', 'Aniket123', 'Account Department', '2024-11-07 21:29:16');

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
(11, 'Ward No. 1', 'Vadavali Shantinagar', '2024-10-27 18:39:22'),
(12, 'Ward No. 2', 'Valivali Deepali Park', '2024-10-27 18:40:07'),
(13, 'Ward No. 3', 'Niranjan Nagar', '2024-10-27 18:40:39'),
(14, 'Ward No. 4', 'Dattani Nagar', '2024-10-27 18:45:03'),
(15, 'Ward No. 5', 'Gopal Nagar', '2024-10-27 18:45:16'),
(16, 'Ward No. 6', 'Vivekanand Nagar', '2024-10-27 18:45:28'),
(17, 'Ward No. 7', 'Chhatrapati Shivaji Nagar', '2024-10-27 18:46:30'),
(18, 'Ward No. 8', 'Krishna Nagar', '2024-10-27 19:04:38'),
(19, 'Ward No. 9', 'Brahmand', '2024-10-27 19:04:39'),
(20, 'Ward No. 10', 'Ganesh Nagar', '2024-10-27 19:04:39'),
(21, 'Ward No. 11', 'Kalyan Nagar', '2024-10-27 19:04:39'),
(22, 'Ward No. 12', 'Kranti Nagar', '2024-10-27 19:04:39'),
(23, 'Ward No. 13', 'Bhim Nagar', '2024-10-27 19:04:39'),
(24, 'Ward No. 14', 'Shivaji Nagar', '2024-10-27 19:04:39'),
(25, 'Ward No. 15', 'Anand Nagar', '2024-10-27 19:04:39'),
(26, 'Ward No. 16', 'Shivaji Park', '2024-10-27 19:04:39'),
(27, 'Ward No. 17', 'Saraswati Nagar', '2024-10-27 19:04:39'),
(28, 'Ward No. 18', 'Ramesh Nagar', '2024-10-27 19:04:39'),
(29, 'Ward No. 19', 'Mahesh Nagar', '2024-10-27 19:04:39'),
(30, 'Ward No. 20', 'Siddharth Nagar', '2024-10-27 19:04:39'),
(31, 'Ward No. 21', 'Anupam Nagar', '2024-10-27 19:04:39'),
(32, 'Ward No. 22', 'Meera Nagar', '2024-10-27 19:04:39'),
(33, 'Ward No. 23', 'New Shanti Nagar', '2024-10-27 19:04:39'),
(34, 'Ward No. 24', 'Chandramouleshwari Nagar', '2024-10-27 19:04:39'),
(35, 'Ward No. 25', 'Chintamani Nagar', '2024-10-27 19:04:39'),
(36, 'Ward No. 26', 'Dharam Nagar', '2024-10-27 19:04:39'),
(37, 'Ward No. 27', 'Shri Krishna Nagar', '2024-10-27 19:04:39'),
(38, 'Ward No. 28', 'Ambedkar Nagar', '2024-10-27 19:04:39'),
(39, 'Ward No. 29', 'Vikas Nagar', '2024-10-27 19:04:39'),
(40, 'Ward No. 30', 'Siddharth Vihar', '2024-10-27 19:04:39'),
(41, 'Ward No. 31', 'Pragati Nagar', '2024-10-27 19:04:39'),
(42, 'Ward No. 32', 'Ashok Nagar', '2024-10-27 19:04:39'),
(43, 'Ward No. 33', 'Guruchhaya Soc, Guruprem', '2024-10-27 19:04:39'),
(44, 'Ward No. 34', 'Saishraddha complex, Mohpada', '2024-10-27 19:04:39'),
(45, 'Ward No. 35', 'Suryanagar Phase1, Ramyanagari', '2024-10-27 19:04:39'),
(46, 'Ward No. 36', 'Chaitanya Sankul, Ramnagar upvibhag', '2024-10-27 19:04:39'),
(47, 'Ward No. 37', 'Ramnagar, Shindeali', '2024-10-27 19:04:39'),
(48, 'Ward No. 38', 'Shirgaon Saja, Shrikrishna nagar', '2024-10-27 19:04:39'),
(49, 'Ward No. 39', 'Sanjay Nagar upshivaji nagar', '2024-10-27 19:04:39'),
(50, 'Ward No. 40', 'Sambhajinagar, Mhada Colony', '2024-10-27 19:04:39'),
(51, 'Ward No. 41', 'Vivekanand Nagar, Kulgaon Soc', '2024-10-27 19:04:39'),
(52, 'Ward No. 42', 'Jaybhavani Nagar, Dattawadi', '2024-10-27 19:04:39'),
(53, 'Ward No. 43', 'Panvelkar Nagari, Samrat Ashoknagar', '2024-10-27 19:04:39'),
(54, 'Ward No. 44', 'Kharvaigaon Juveli talpada', '2024-10-27 19:04:39'),
(55, 'Ward No. 45', 'Shirgaon Vajpe, Rohidasnagar, MIDC area', '2024-10-27 19:04:39'),
(56, 'Ward No. 46', 'Marathonnagari, Lodha heaven, Samartha Viddyalay', '2024-10-27 19:04:39'),
(57, 'Ward No. 47', 'Mankivali, Juveli', '2024-10-27 19:04:39');

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
(11, 'https://www.mpcb.gov.in/', '/uploads/1730193625481.png'),
(12, 'https://divcomkonkan.gov.in/', '/uploads/1730193657018.png'),
(13, 'https://aaplesarkar.mahaonline.gov.in/', '/uploads/1730193673324.png'),
(14, 'https://thane.nic.in/', '/uploads/1730193697626.png'),
(15, 'https://www.eci.gov.in/', '/uploads/1730193741151.png'),
(16, 'https://urban.maharashtra.gov.in/', '/uploads/1730193757397.png'),
(17, 'https://www.mygov.in/', '/uploads/1730193778737.png'),
(18, 'https://www.midcindia.org/', '/uploads/1730193805186.png'),
(19, 'https://mmrda.maharashtra.gov.in/', '/uploads/1730193838494.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `awards`
--
ALTER TABLE `awards`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `award_images`
--
ALTER TABLE `award_images`
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
-- Indexes for table `contact`
--
ALTER TABLE `contact`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `award_images`
--
ALTER TABLE `award_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `ceos`
--
ALTER TABLE `ceos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `citizen-charter`
--
ALTER TABLE `citizen-charter`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `contact`
--
ALTER TABLE `contact`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `elected_wings`
--
ALTER TABLE `elected_wings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `electric`
--
ALTER TABLE `electric`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `fire_station`
--
ALTER TABLE `fire_station`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `functions`
--
ALTER TABLE `functions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `gallery`
--
ALTER TABLE `gallery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `gardens`
--
ALTER TABLE `gardens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `generaladminaddyear`
--
ALTER TABLE `generaladminaddyear`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `generaladmindepartment`
--
ALTER TABLE `generaladmindepartment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `health_dep_sec`
--
ALTER TABLE `health_dep_sec`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `health_photo_gallery`
--
ALTER TABLE `health_photo_gallery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `history`
--
ALTER TABLE `history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `home_videos`
--
ALTER TABLE `home_videos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `litigations`
--
ALTER TABLE `litigations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `main_menu`
--
ALTER TABLE `main_menu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `muncipal`
--
ALTER TABLE `muncipal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `newsupdate`
--
ALTER TABLE `newsupdate`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `ponds_table`
--
ALTER TABLE `ponds_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `presidents`
--
ALTER TABLE `presidents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `previous_chief_officer`
--
ALTER TABLE `previous_chief_officer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `property_holder`
--
ALTER TABLE `property_holder`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `prvt_hospital`
--
ALTER TABLE `prvt_hospital`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `public_disclosure`
--
ALTER TABLE `public_disclosure`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `righttoservices`
--
ALTER TABLE `righttoservices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `roads`
--
ALTER TABLE `roads`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `rts_table`
--
ALTER TABLE `rts_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `sanitation_inspectors`
--
ALTER TABLE `sanitation_inspectors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `schools`
--
ALTER TABLE `schools`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `school_images`
--
ALTER TABLE `school_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `slider`
--
ALTER TABLE `slider`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `sub_menu`
--
ALTER TABLE `sub_menu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=254;

--
-- AUTO_INCREMENT for table `tenders`
--
ALTER TABLE `tenders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `treatment_facility`
--
ALTER TABLE `treatment_facility`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `tree_census`
--
ALTER TABLE `tree_census`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `wards`
--
ALTER TABLE `wards`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT for table `websitelink`
--
ALTER TABLE `websitelink`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

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
