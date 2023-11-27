ALTER TABLE `datesUnavailable` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `datesUnavailable` ADD `id` serial AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `datesUnavailable` ADD PRIMARY KEY(`id`);