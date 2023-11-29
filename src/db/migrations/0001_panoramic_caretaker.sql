ALTER TABLE `datesUnavailable` MODIFY COLUMN `date` timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE `bookings` ADD `date` timestamp NOT NULL;