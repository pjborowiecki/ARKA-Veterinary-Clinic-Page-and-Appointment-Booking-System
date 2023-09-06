CREATE TABLE `datesUnavailable` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`date` date NOT NULL,
	`clinicId` int NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `datesUnavailable_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `bookings` ADD `slot` datetime NOT NULL;--> statement-breakpoint
ALTER TABLE `bookings` ADD `rodo` boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `bookings` ADD `clinicId` int NOT NULL;--> statement-breakpoint
ALTER TABLE `clinics` ADD `slug` text;--> statement-breakpoint
ALTER TABLE `openingHours` ADD `clinicId` int NOT NULL;--> statement-breakpoint
ALTER TABLE `openingHours` ADD `createdAt` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `bookings` DROP COLUMN `date`;--> statement-breakpoint
ALTER TABLE `bookings` DROP COLUMN `time`;