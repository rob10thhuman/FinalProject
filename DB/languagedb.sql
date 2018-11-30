-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema languagedb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema languagedb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `languagedb` DEFAULT CHARACTER SET utf8 ;
USE `languagedb` ;

-- -----------------------------------------------------
-- Table `languagedb`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `languagedb`.`user` ;

CREATE TABLE IF NOT EXISTS `languagedb`.`user` (
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
-- Table `languagedb`.`language`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `languagedb`.`language` ;

CREATE TABLE IF NOT EXISTS `languagedb`.`language` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `logo` VARCHAR(45) NULL,
  `creator` VARCHAR(45) NULL,
  `year_created` INT NULL,
  `info` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `languagedb`.`comment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `languagedb`.`comment` ;

CREATE TABLE IF NOT EXISTS `languagedb`.`comment` (
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
    REFERENCES `languagedb`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `comment_language_id`
    FOREIGN KEY (`language_id`)
    REFERENCES `languagedb`.`language` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `languagedb`.`language_rating`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `languagedb`.`language_rating` ;

CREATE TABLE IF NOT EXISTS `languagedb`.`language_rating` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `rating` INT NOT NULL,
  `user_id` INT NOT NULL,
  `language_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `language_id_idx` (`language_id` ASC),
  INDEX `user_id_idx` (`user_id` ASC),
  CONSTRAINT `language_rating_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `languagedb`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `language_rating_language_id`
    FOREIGN KEY (`language_id`)
    REFERENCES `languagedb`.`language` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `languagedb`.`vote`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `languagedb`.`vote` ;

CREATE TABLE IF NOT EXISTS `languagedb`.`vote` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `vote` TINYINT NOT NULL,
  `user_id` INT NOT NULL,
  `comment_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `comment_id_idx` (`comment_id` ASC),
  INDEX `user_id_idx` (`user_id` ASC),
  CONSTRAINT `vote_comment_id`
    FOREIGN KEY (`comment_id`)
    REFERENCES `languagedb`.`comment` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `vote_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `languagedb`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE = '';
GRANT USAGE ON *.* TO admin@localhost;
 DROP USER admin@localhost;
SET SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';
CREATE USER 'admin'@'localhost' IDENTIFIED BY 'admin';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE `languagedb`.* TO 'admin'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
