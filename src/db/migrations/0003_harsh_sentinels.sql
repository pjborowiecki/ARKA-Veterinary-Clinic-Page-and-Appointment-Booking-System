ALTER TABLE `clinics` RENAME COLUMN `phone` TO `phone_1`;--> statement-breakpoint
ALTER TABLE `clinics` ADD `phone_2` varchar(16);