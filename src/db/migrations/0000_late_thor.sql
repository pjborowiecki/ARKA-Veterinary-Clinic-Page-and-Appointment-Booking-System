CREATE TABLE `bookings` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`message` text,
	`type` enum('weterynarz','salon fryzur') NOT NULL DEFAULT 'weterynarz',
	`date` date NOT NULL,
	`time` time NOT NULL,
	`name` varchar(32) NOT NULL,
	`surname` varchar(32) NOT NULL,
	`email` varchar(64) NOT NULL,
	`phone` varchar(16) NOT NULL,
	`rodo` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp DEFAULT (now())
);
