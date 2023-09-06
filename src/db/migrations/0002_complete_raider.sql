ALTER TABLE `bookings` ADD `updatedAt` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `bookings` DROP COLUMN `time`;--> statement-breakpoint
ALTER TABLE `bookings` DROP COLUMN `rodo`;