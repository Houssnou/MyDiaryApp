DROP DATABASE IF EXISTS diary_db;
CREATE DATABASE diary_db;
USE diary_db;

--table entries as a new entry in the diary 
CREATE TABLE entries (
  id INT NOT NULL AUTO_INCREMENT,
  title varchar(45) NOT NULL,
  content TEXt NULL,
  date_creation DATETIME NOT NULL,
  last_modification DATETIME NOT NULL,
  PRIMARY KEY (`id`));

--updating table for trash and user 
ALTER TABLE `diary_db`.`entries` 
ADD COLUMN `is_trashed` TINYINT NOT NULL DEFAULT 0 AFTER `last_modification`,
ADD COLUMN `user_id` INT NOT NULL DEFAULT 1 AFTER `is_trashed`;



