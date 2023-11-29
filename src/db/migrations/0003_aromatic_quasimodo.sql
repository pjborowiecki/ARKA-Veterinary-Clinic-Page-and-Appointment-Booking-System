ALTER TABLE `bookings` MODIFY COLUMN `date` datetime(3) NOT NULL;--> statement-breakpoint
ALTER TABLE `datesUnavailable` MODIFY COLUMN `date` datetime(3) NOT NULL;