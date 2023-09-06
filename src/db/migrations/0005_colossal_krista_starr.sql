CREATE TABLE `datesUnavailable` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`date` date NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `datesUnavailable_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `days` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` enum('poniedziałek','wtorek','środa','czwartek','piątek','sobota','niedziela'),
	`openingTime` varchar(5) NOT NULL,
	`closingTime` varchar(5) NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `days_id` PRIMARY KEY(`id`)
);
