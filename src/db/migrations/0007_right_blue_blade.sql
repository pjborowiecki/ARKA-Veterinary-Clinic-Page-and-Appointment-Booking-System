CREATE TABLE `clinics` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`userId` varchar(191) NOT NULL,
	`name` varchar(32) NOT NULL,
	`address` varchar(128) NOT NULL,
	`phone` varchar(16) NOT NULL,
	`email` varchar(64) NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `clinics_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `openingHours` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`dayOfWeek` enum('monday','tuesday','wednesday','thursday','friday','saturday','sunday') NOT NULL,
	`openingTime` time NOT NULL,
	`closingTime` time NOT NULL,
	CONSTRAINT `openingHours_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
DROP TABLE `datesUnavailable`;--> statement-breakpoint
DROP TABLE `days`;--> statement-breakpoint
ALTER TABLE `bookings` DROP COLUMN `updatedAt`;