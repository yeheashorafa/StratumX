-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 05, 2026 at 10:22 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `stratumx`
--

-- --------------------------------------------------------

--
-- Table structure for table `business`
--

CREATE TABLE `business` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `logo` varchar(191) DEFAULT NULL,
  `defaultLang` varchar(191) NOT NULL DEFAULT 'en',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `business`
--

INSERT INTO `business` (`id`, `name`, `slug`, `logo`, `defaultLang`, `createdAt`, `updatedAt`) VALUES
(1, 'StratumX Demo Business', 'stratumx-demo', NULL, 'en', '2026-03-03 21:27:03.830', '2026-03-03 21:27:03.830');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `businessId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cartitem`
--

CREATE TABLE `cartitem` (
  `id` int(11) NOT NULL,
  `cartId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `businessId` int(11) NOT NULL,
  `parentId` int(11) DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `isDeleted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `businessId`, `parentId`, `isActive`, `isDeleted`) VALUES
(5, 1, NULL, 1, 0),
(6, 1, NULL, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `categorytranslation`
--

CREATE TABLE `categorytranslation` (
  `id` int(11) NOT NULL,
  `categoryId` int(11) NOT NULL,
  `lang` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categorytranslation`
--

INSERT INTO `categorytranslation` (`id`, `categoryId`, `lang`, `name`, `slug`) VALUES
(9, 5, 'en', 'Electronics', 'electronics'),
(10, 5, 'ar', 'إلكترونيات', 'electronics-ar'),
(11, 6, 'en', 'Accessories', 'accessories'),
(12, 6, 'ar', 'إكسسوارات', 'accessories-ar');

-- --------------------------------------------------------

--
-- Table structure for table `contactmessage`
--

CREATE TABLE `contactmessage` (
  `id` int(11) NOT NULL,
  `businessId` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `message` varchar(191) NOT NULL,
  `isRead` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `id` int(11) NOT NULL,
  `businessId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `orderNumber` varchar(191) NOT NULL,
  `totalAmount` double NOT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'pending',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order`
--

INSERT INTO `order` (`id`, `businessId`, `userId`, `orderNumber`, `totalAmount`, `status`, `createdAt`) VALUES
(2, 1, 4, 'ORD-1772621935323-51', 199.5, 'pending', '2026-03-04 10:58:55.326');

-- --------------------------------------------------------

--
-- Table structure for table `orderitem`
--

CREATE TABLE `orderitem` (
  `id` int(11) NOT NULL,
  `orderId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `priceSnapshot` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orderitem`
--

INSERT INTO `orderitem` (`id`, `orderId`, `productId`, `quantity`, `priceSnapshot`) VALUES
(2, 2, 17, 1, 199.5);

-- --------------------------------------------------------

--
-- Table structure for table `page`
--

CREATE TABLE `page` (
  `id` int(11) NOT NULL,
  `businessId` int(11) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `isPublished` tinyint(1) NOT NULL DEFAULT 1,
  `isDeleted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pagetranslation`
--

CREATE TABLE `pagetranslation` (
  `id` int(11) NOT NULL,
  `pageId` int(11) NOT NULL,
  `lang` varchar(191) NOT NULL,
  `title` varchar(191) NOT NULL,
  `body` varchar(191) NOT NULL,
  `metaTitle` varchar(191) DEFAULT NULL,
  `metaDescription` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `businessId` int(11) NOT NULL,
  `categoryId` int(11) NOT NULL,
  `price` double NOT NULL,
  `stock` int(11) NOT NULL,
  `sku` varchar(191) NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `isDeleted` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `businessId`, `categoryId`, `price`, `stock`, `sku`, `isActive`, `isDeleted`, `createdAt`, `updatedAt`) VALUES
(13, 1, 5, 299.99, 50, 'PROD-ELEC-001', 1, 0, '2026-03-04 10:40:51.547', '2026-03-04 10:40:51.547'),
(14, 1, 5, 1299, 15, 'PROD-ELEC-002', 1, 0, '2026-03-04 10:40:51.556', '2026-03-04 10:40:51.556'),
(15, 1, 6, 45, 100, 'PROD-ACC-001', 1, 0, '2026-03-04 10:40:51.562', '2026-03-04 10:40:51.562'),
(16, 1, 6, 120, 200, 'PROD-ACC-002', 1, 0, '2026-03-04 10:40:51.565', '2026-03-04 10:40:51.565'),
(17, 1, 5, 199.5, 29, 'PROD-ELEC-003', 1, 0, '2026-03-04 10:40:51.569', '2026-03-04 10:58:55.310'),
(18, 1, 6, 89, 120, 'PROD-ACC-003', 1, 0, '2026-03-04 10:40:51.573', '2026-03-04 10:40:51.573');

-- --------------------------------------------------------

--
-- Table structure for table `productimage`
--

CREATE TABLE `productimage` (
  `id` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `url` varchar(191) NOT NULL,
  `altText` varchar(191) DEFAULT NULL,
  `isPrimary` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `productimage`
--

INSERT INTO `productimage` (`id`, `productId`, `url`, `altText`, `isPrimary`) VALUES
(13, 13, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1770&auto=format&fit=crop', 'Premium Wireless Headphones', 1),
(14, 14, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1771&auto=format&fit=crop', 'Ultra-Slim Creator Laptop', 1),
(15, 15, 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=1227&auto=format&fit=crop', 'Leather Smartwatch Band', 1),
(16, 16, 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=1227&auto=format&fit=crop', 'Minimalist Desk Organizer', 1),
(17, 17, 'https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=1771&auto=format&fit=crop', 'Mechanical Keyboard Pro', 1),
(18, 18, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1770&auto=format&fit=crop', 'Ergonomic Laptop Stand', 1);

-- --------------------------------------------------------

--
-- Table structure for table `producttranslation`
--

CREATE TABLE `producttranslation` (
  `id` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `lang` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `description` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `producttranslation`
--

INSERT INTO `producttranslation` (`id`, `productId`, `lang`, `name`, `description`) VALUES
(25, 13, 'en', 'Premium Wireless Headphones', 'Experience industry-leading noise cancellation and premium sound quality with these stylish over-ear headphones.'),
(26, 13, 'ar', 'سماعات لاسلكية فاخرة', 'استمتع بعزل الضوضاء الرائد في الصناعة وجودة الصوت الممتازة مع هذه السماعات المذهلة.'),
(27, 14, 'en', 'Ultra-Slim Creator Laptop', 'A powerful machine designed for content creators, featuring a stunning 4K OLED display and fast processing.'),
(28, 14, 'ar', 'حاسوب محمول فائق النحافة', 'جهاز قوي مصمم لصناع المحتوى، يتميز بشاشة مبهرة ومعالجة سريعة.'),
(29, 15, 'en', 'Leather Smartwatch Band', 'Upgrade your look with this premium genuine leather smartwatch band. Comfortable and highly durable.'),
(30, 15, 'ar', 'سوار ساعة ذكية من الجلد', 'ارتق بمظهرك مع سوار الساعة الذكية المصنوع من الجلد الأصلي الفاخر.'),
(31, 16, 'en', 'Minimalist Desk Organizer', 'Keep your workspace tidy and elegant with this bamboo wood minimalist desk organizer.'),
(32, 16, 'ar', 'منسق مكتب مبسط', 'حافظ على مساحة عملك مرتبة وأنيقة مع منظم المكتب هذا مبسط وجميل للحفاظ على ترتيب المكاتب.'),
(33, 17, 'en', 'Mechanical Keyboard Pro', 'Tactile, responsive, and beautifully designed mechanical keyboard with custom RGB lighting options.'),
(34, 17, 'ar', 'لوحة مفاتيح ميكانيكية احترافية', 'لوحة مفاتيح ميكانيكية ذات استجابة سريعة وتصميم جميل مع إضاءة قوية.'),
(35, 18, 'en', 'Ergonomic Laptop Stand', 'Improve your posture and cooling with this premium aluminum ergonomic laptop stand. Fits all laptops up to 17 inches.'),
(36, 18, 'ar', 'حامل لابتوب مريح', 'قم بتحسين وضع جلوسك وتبريد اللابتوب من خلال هذا الحامل الألمنيوم الفاخر.');

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `businessId` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `description` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id`, `businessId`, `name`, `description`) VALUES
(3, 1, 'ADMIN', 'Administrator Role'),
(4, 1, 'CUSTOMER', 'Customer Role');

-- --------------------------------------------------------

--
-- Table structure for table `service`
--

CREATE TABLE `service` (
  `id` int(11) NOT NULL,
  `businessId` int(11) NOT NULL,
  `icon` varchar(191) DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `isDeleted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `servicetranslation`
--

CREATE TABLE `servicetranslation` (
  `id` int(11) NOT NULL,
  `serviceId` int(11) NOT NULL,
  `lang` varchar(191) NOT NULL,
  `title` varchar(191) NOT NULL,
  `description` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` int(11) NOT NULL,
  `businessId` int(11) NOT NULL,
  `seoTitle` varchar(191) DEFAULT NULL,
  `seoDescription` varchar(191) DEFAULT NULL,
  `currency` varchar(191) NOT NULL DEFAULT 'USD',
  `theme` varchar(191) NOT NULL DEFAULT 'default',
  `cacheTTL` int(11) NOT NULL DEFAULT 3600
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `businessId` int(11) NOT NULL,
  `roleId` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `businessId`, `roleId`, `name`, `email`, `password`, `isActive`) VALUES
(3, 1, 3, 'System Admin', 'admin@stratumx.local', '$2b$10$t2oRdEnFbCnDnDiA6Vy4Fu9inv/jpwspT6AMvQD9s7X/526nTbLze', 1),
(4, 1, 4, 'Guest Checkout', 'guest@stratumx.local', 'guest_checkout_no_login', 1);

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('afbb2ece-b8ff-48c8-973d-d14bf96ab853', 'be843fa4d1948fc0b80bbc3bdc9e1f593f91648a22d47c48515cfec870595300', '2026-03-03 21:04:49.766', '20260302135016_add_business_model', NULL, NULL, '2026-03-03 21:04:49.742', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `business`
--
ALTER TABLE `business`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Business_slug_key` (`slug`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Cart_userId_key` (`userId`),
  ADD KEY `Cart_businessId_fkey` (`businessId`);

--
-- Indexes for table `cartitem`
--
ALTER TABLE `cartitem`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `CartItem_cartId_productId_key` (`cartId`,`productId`),
  ADD KEY `CartItem_productId_fkey` (`productId`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Category_businessId_fkey` (`businessId`),
  ADD KEY `Category_parentId_fkey` (`parentId`);

--
-- Indexes for table `categorytranslation`
--
ALTER TABLE `categorytranslation`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `CategoryTranslation_categoryId_lang_key` (`categoryId`,`lang`);

--
-- Indexes for table `contactmessage`
--
ALTER TABLE `contactmessage`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ContactMessage_businessId_fkey` (`businessId`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Order_orderNumber_key` (`orderNumber`),
  ADD KEY `Order_userId_fkey` (`userId`),
  ADD KEY `Order_businessId_fkey` (`businessId`);

--
-- Indexes for table `orderitem`
--
ALTER TABLE `orderitem`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `OrderItem_orderId_productId_key` (`orderId`,`productId`),
  ADD KEY `OrderItem_productId_fkey` (`productId`);

--
-- Indexes for table `page`
--
ALTER TABLE `page`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Page_businessId_slug_key` (`businessId`,`slug`);

--
-- Indexes for table `pagetranslation`
--
ALTER TABLE `pagetranslation`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `PageTranslation_pageId_lang_key` (`pageId`,`lang`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Product_categoryId_fkey` (`categoryId`),
  ADD KEY `Product_businessId_fkey` (`businessId`);

--
-- Indexes for table `productimage`
--
ALTER TABLE `productimage`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ProductImage_productId_fkey` (`productId`);

--
-- Indexes for table `producttranslation`
--
ALTER TABLE `producttranslation`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ProductTranslation_productId_lang_key` (`productId`,`lang`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Role_businessId_fkey` (`businessId`);

--
-- Indexes for table `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Service_businessId_fkey` (`businessId`);

--
-- Indexes for table `servicetranslation`
--
ALTER TABLE `servicetranslation`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ServiceTranslation_serviceId_lang_key` (`serviceId`,`lang`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Settings_businessId_key` (`businessId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_businessId_email_key` (`businessId`,`email`),
  ADD KEY `User_roleId_fkey` (`roleId`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `business`
--
ALTER TABLE `business`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cartitem`
--
ALTER TABLE `cartitem`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `categorytranslation`
--
ALTER TABLE `categorytranslation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `contactmessage`
--
ALTER TABLE `contactmessage`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `orderitem`
--
ALTER TABLE `orderitem`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `page`
--
ALTER TABLE `page`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pagetranslation`
--
ALTER TABLE `pagetranslation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `productimage`
--
ALTER TABLE `productimage`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `producttranslation`
--
ALTER TABLE `producttranslation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `service`
--
ALTER TABLE `service`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `servicetranslation`
--
ALTER TABLE `servicetranslation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `Cart_businessId_fkey` FOREIGN KEY (`businessId`) REFERENCES `business` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Cart_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `cartitem`
--
ALTER TABLE `cartitem`
  ADD CONSTRAINT `CartItem_cartId_fkey` FOREIGN KEY (`cartId`) REFERENCES `cart` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `CartItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `category`
--
ALTER TABLE `category`
  ADD CONSTRAINT `Category_businessId_fkey` FOREIGN KEY (`businessId`) REFERENCES `business` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Category_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `category` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `categorytranslation`
--
ALTER TABLE `categorytranslation`
  ADD CONSTRAINT `CategoryTranslation_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `contactmessage`
--
ALTER TABLE `contactmessage`
  ADD CONSTRAINT `ContactMessage_businessId_fkey` FOREIGN KEY (`businessId`) REFERENCES `business` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `Order_businessId_fkey` FOREIGN KEY (`businessId`) REFERENCES `business` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Order_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `orderitem`
--
ALTER TABLE `orderitem`
  ADD CONSTRAINT `OrderItem_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `order` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `OrderItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `page`
--
ALTER TABLE `page`
  ADD CONSTRAINT `Page_businessId_fkey` FOREIGN KEY (`businessId`) REFERENCES `business` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `pagetranslation`
--
ALTER TABLE `pagetranslation`
  ADD CONSTRAINT `PageTranslation_pageId_fkey` FOREIGN KEY (`pageId`) REFERENCES `page` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `Product_businessId_fkey` FOREIGN KEY (`businessId`) REFERENCES `business` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Product_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `productimage`
--
ALTER TABLE `productimage`
  ADD CONSTRAINT `ProductImage_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `producttranslation`
--
ALTER TABLE `producttranslation`
  ADD CONSTRAINT `ProductTranslation_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `role`
--
ALTER TABLE `role`
  ADD CONSTRAINT `Role_businessId_fkey` FOREIGN KEY (`businessId`) REFERENCES `business` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `service`
--
ALTER TABLE `service`
  ADD CONSTRAINT `Service_businessId_fkey` FOREIGN KEY (`businessId`) REFERENCES `business` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `servicetranslation`
--
ALTER TABLE `servicetranslation`
  ADD CONSTRAINT `ServiceTranslation_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `service` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `settings`
--
ALTER TABLE `settings`
  ADD CONSTRAINT `Settings_businessId_fkey` FOREIGN KEY (`businessId`) REFERENCES `business` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `User_businessId_fkey` FOREIGN KEY (`businessId`) REFERENCES `business` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `User_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
