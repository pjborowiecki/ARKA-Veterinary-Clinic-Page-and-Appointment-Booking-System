CREATE TABLE `account` (
	`userId` varchar(255) NOT NULL,
	`type` varchar(255) NOT NULL,
	`provider` varchar(255) NOT NULL,
	`providerAccountId` varchar(255) NOT NULL,
	`refresh_token` varchar(255),
	`access_token` varchar(255),
	`expires_at` int,
	`token_type` varchar(255),
	`scope` varchar(255),
	`id_token` varchar(255),
	`session_state` varchar(255),
	CONSTRAINT `account_provider_providerAccountId_pk` PRIMARY KEY(`provider`,`providerAccountId`)
);
--> statement-breakpoint
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
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `bookings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `businessHours` (
	`id` serial AUTO_INCREMENT NOT NULL,
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
	`longitude` varchar(24) NOT NULL,
	`latitude` varchar(24) NOT NULL,
	`address` varchar(128) NOT NULL,
	`phone_1` varchar(16) NOT NULL,
	`phone_2` varchar(16) NOT NULL,
	`email` varchar(64) NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `clinics_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `datesUnavailable` (
	`date` datetime NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `datesUnavailable_date` PRIMARY KEY(`date`)
);
--> statement-breakpoint
CREATE TABLE `session` (
	`sessionToken` varchar(255) NOT NULL,
	`userId` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `session_sessionToken` PRIMARY KEY(`sessionToken`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` varchar(255) NOT NULL,
	`name` varchar(255),
	`email` varchar(255),
	`emailVerificationToken` varchar(255),
	`emailVerified` timestamp(3),
	`passwordHash` text,
	`resetPasswordToken` varchar(255),
	`resetPasswordTokenExpires` timestamp(3),
	`image` varchar(255),
	`createdAt` timestamp(3) DEFAULT (now()),
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_emailVerificationToken_unique` UNIQUE(`emailVerificationToken`),
	CONSTRAINT `user_resetPasswordToken_unique` UNIQUE(`resetPasswordToken`)
);
--> statement-breakpoint
CREATE TABLE `verificationToken` (
	`identifier` varchar(255) NOT NULL,
	`token` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `verificationToken_identifier_token_pk` PRIMARY KEY(`identifier`,`token`)
);
