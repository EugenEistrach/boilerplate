CREATE TABLE `cronjob_state` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`expression` text NOT NULL,
	`enabled` integer DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `cronjob_state_name_unique` ON `cronjob_state` (`name`);