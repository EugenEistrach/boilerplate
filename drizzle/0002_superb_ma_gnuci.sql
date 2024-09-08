DELETE FROM `example`;--> statement-breakpoint
ALTER TABLE `example` RENAME TO `note`;--> statement-breakpoint
ALTER TABLE `note` RENAME COLUMN `note` TO `content`;--> statement-breakpoint
ALTER TABLE `note` ADD `created_at` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `note` ADD `modified_at` integer NOT NULL;
