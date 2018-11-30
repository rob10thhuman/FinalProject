-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema languagedb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `languagedb` ;

-- -----------------------------------------------------
-- Schema languagedb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `languagedb` DEFAULT CHARACTER SET utf8 ;
USE `languagedb` ;

-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user` ;

CREATE TABLE IF NOT EXISTS `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NULL,
  `first_name` VARCHAR(45) NULL,
  `last_name` VARCHAR(45) NULL,
  `active` TINYINT(4) NOT NULL,
  `role` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `language`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `language` ;

CREATE TABLE IF NOT EXISTS `language` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `logo` VARCHAR(45) NULL,
  `creator` VARCHAR(45) NULL,
  `year_created` INT NULL,
  `info` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `comment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `comment` ;

CREATE TABLE IF NOT EXISTS `comment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `comment` VARCHAR(45) NULL,
  `date_added` DATETIME NULL,
  `date_updated` DATETIME NULL,
  `user_id` INT NOT NULL,
  `language_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `language_id_idx` (`language_id` ASC),
  INDEX `user_id_idx` (`user_id` ASC),
  CONSTRAINT `comment_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `comment_language_id`
    FOREIGN KEY (`language_id`)
    REFERENCES `language` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `language_rating`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `language_rating` ;

CREATE TABLE IF NOT EXISTS `language_rating` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `rating` INT NOT NULL,
  `user_id` INT NOT NULL,
  `language_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `language_id_idx` (`language_id` ASC),
  INDEX `user_id_idx` (`user_id` ASC),
  CONSTRAINT `language_rating_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `language_rating_language_id`
    FOREIGN KEY (`language_id`)
    REFERENCES `language` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `vote`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `vote` ;

CREATE TABLE IF NOT EXISTS `vote` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `vote` TINYINT NOT NULL,
  `user_id` INT NOT NULL,
  `comment_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `comment_id_idx` (`comment_id` ASC),
  INDEX `user_id_idx` (`user_id` ASC),
  CONSTRAINT `vote_comment_id`
    FOREIGN KEY (`comment_id`)
    REFERENCES `comment` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `vote_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE = '';
GRANT USAGE ON *.* TO admin@localhost;
 DROP USER admin@localhost;
SET SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';
CREATE USER 'admin'@'localhost' IDENTIFIED BY 'admin';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'admin'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `user`
-- -----------------------------------------------------
START TRANSACTION;
USE `languagedb`;
INSERT INTO `user` (`id`, `username`, `password`, `email`, `first_name`, `last_name`, `active`, `role`) VALUES (1, 'rob', 'rob', 'rob@10thHuman.com', 'Rob', 'Thompson', 1, NULL);
INSERT INTO `user` (`id`, `username`, `password`, `email`, `first_name`, `last_name`, `active`, `role`) VALUES (2, 'josh', 'josh', 'josh@josh.com', 'Josh', 'O', 1, NULL);
INSERT INTO `user` (`id`, `username`, `password`, `email`, `first_name`, `last_name`, `active`, `role`) VALUES (3, 'henry', 'henry', 'henry@henry.com', 'Henry', 'Z', 1, NULL);
INSERT INTO `user` (`id`, `username`, `password`, `email`, `first_name`, `last_name`, `active`, `role`) VALUES (4, 'brandon', 'brandon', 'brandon@brandon.com', 'Brandon', 'B', 1, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `language`
-- -----------------------------------------------------
START TRANSACTION;
USE `languagedb`;
INSERT INTO `language` (`id`, `name`, `logo`, `creator`, `year_created`, `info`) VALUES (1, 'java', NULL, NULL, NULL, NULL);
INSERT INTO `language` (`id`, `name`, `logo`, `creator`, `year_created`, `info`) VALUES (2, 'python', NULL, NULL, NULL, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `comment`
-- -----------------------------------------------------
START TRANSACTION;
USE `languagedb`;
INSERT INTO `comment` (`id`, `comment`, `date_added`, `date_updated`, `user_id`, `language_id`) VALUES (1, 'hello world', NULL, NULL, 1, 1);
INSERT INTO `comment` (`id`, `comment`, `date_added`, `date_updated`, `user_id`, `language_id`) VALUES (2, 'goodbye world', NULL, NULL, 1, 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `language_rating`
-- -----------------------------------------------------
START TRANSACTION;
USE `languagedb`;
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`) VALUES (1, 3, 1, 1);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`) VALUES (2, 4, 1, 2);

COMMIT;


-- -----------------------------------------------------
-- Data for table `vote`
-- -----------------------------------------------------
START TRANSACTION;
USE `languagedb`;
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`) VALUES (1, 0, 1, 1);
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`) VALUES (2, 1, 2, 1);

COMMIT;
