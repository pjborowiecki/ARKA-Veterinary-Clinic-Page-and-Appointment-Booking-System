CREATE TABLE `bookings` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`message` text,
	`type` enum('weterynarz','salon fryzur') NOT NULL DEFAULT 'weterynarz',
	`slot` datetime NOT NULL,
	`firstName` varchar(32) NOT NULL,
	`lastName` varchar(32) NOT NULL,
	`email` varchar(64) NOT NULL,
	`phone` varchar(16) NOT NULL,
	`rodo` boolean NOT NULL DEFAULT false,
	`status` enum('niepotwierdzone','potwierdzone','anulowane','odrzucone') NOT NULL DEFAULT 'niepotwierdzone',
	`clinicId` int NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `bookings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `openingHours` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`dayOfWeek` enum('monday','tuesday','wednesday','thursday','friday','saturday','sunday') NOT NULL,
	`openingTime` time NOT NULL,
	`closingTime` time NOT NULL,
	`clinicId` int NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `openingHours_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `clinics` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`userId` varchar(191) NOT NULL,
	`longitude` varchar(24) NOT NULL,
	`latitude` varchar(24) NOT NULL,
	`address` varchar(128) NOT NULL,
	`phone` varchar(16) NOT NULL,
	`email` varchar(64) NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `clinics_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `datesUnavailable` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`date` date NOT NULL,
	`clinicId` int NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `datesUnavailable_id` PRIMARY KEY(`id`)
);
