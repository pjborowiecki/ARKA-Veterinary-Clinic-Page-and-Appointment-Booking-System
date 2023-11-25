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
CREATE TABLE `businessHours` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`clinicId` int NOT NULL,
	`userId` varchar(191) NOT NULL,
	`mondayStatus` enum('otwarte','zamknięte') NOT NULL DEFAULT 'otwarte',
	`tuesdayStatus` enum('otwarte','zamknięte') NOT NULL DEFAULT 'otwarte',
	`wednesdayStatus` enum('otwarte','zamknięte') NOT NULL DEFAULT 'otwarte',
	`thursdayStatus` enum('otwarte','zamknięte') NOT NULL DEFAULT 'otwarte',
	`fridayStatus` enum('otwarte','zamknięte') NOT NULL DEFAULT 'otwarte',
	`saturdayStatus` enum('otwarte','zamknięte') NOT NULL DEFAULT 'otwarte',
	`sundayStatus` enum('otwarte','zamknięte') NOT NULL DEFAULT 'otwarte',
	`mondayOpening` varchar(5) NOT NULL DEFAULT '09:00',
	`tuesdayOpening` varchar(5) NOT NULL DEFAULT '09:00',
	`wednesdayOpening` varchar(5) NOT NULL DEFAULT '09:00',
	`thursdayOpening` varchar(5) NOT NULL DEFAULT '09:00',
	`fridayOpening` varchar(5) NOT NULL DEFAULT '09:00',
	`saturdayOpening` varchar(5) NOT NULL DEFAULT '09:00',
	`sundayOpening` varchar(5) NOT NULL DEFAULT '09:00',
	`mondayClosing` varchar(5) NOT NULL DEFAULT '17:00',
	`tuesdayClosing` varchar(5) NOT NULL DEFAULT '17:00',
	`wednesdayClosing` varchar(5) NOT NULL DEFAULT '17:00',
	`thursdayClosing` varchar(5) NOT NULL DEFAULT '17:00',
	`fridayClosing` varchar(5) NOT NULL DEFAULT '17:00',
	`saturdayClosing` varchar(5) NOT NULL DEFAULT '17:00',
	`sundayClosing` varchar(5) NOT NULL DEFAULT '17:00',
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `businessHours_id` PRIMARY KEY(`id`)
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
	`date` datetime NOT NULL,
	`clinicId` int NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `datesUnavailable_id` PRIMARY KEY(`id`)
);
