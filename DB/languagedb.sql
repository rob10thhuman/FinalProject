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
-- Table `language`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `language` ;

CREATE TABLE IF NOT EXISTS `language` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `logo` VARCHAR(180) NULL DEFAULT NULL,
  `creator` VARCHAR(45) NULL DEFAULT NULL,
  `year_created` INT(11) NULL DEFAULT NULL,
  `info` VARCHAR(900) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user` ;

CREATE TABLE IF NOT EXISTS `user` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(450) NOT NULL,
  `email` VARCHAR(45) NULL DEFAULT NULL,
  `first_name` VARCHAR(45) NULL DEFAULT NULL,
  `last_name` VARCHAR(45) NULL DEFAULT NULL,
  `active` TINYINT(4) NOT NULL,
  `role` VARCHAR(45) NULL DEFAULT NULL,
  `reputation` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `comment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `comment` ;

CREATE TABLE IF NOT EXISTS `comment` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `comment` VARCHAR(2000) NULL DEFAULT NULL,
  `date_added` DATETIME NULL DEFAULT NULL,
  `date_updated` DATETIME NULL DEFAULT NULL,
  `user_id` INT(11) NOT NULL,
  `language_id` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `language_id_idx` (`language_id` ASC),
  INDEX `user_id_idx` (`user_id` ASC),
  CONSTRAINT `comment_language_id`
    FOREIGN KEY (`language_id`)
    REFERENCES `language` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `comment_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `language_rating`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `language_rating` ;

CREATE TABLE IF NOT EXISTS `language_rating` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `rating` INT(11) NOT NULL,
  `user_id` INT(11) NOT NULL,
  `language_id` INT(11) NOT NULL,
  `cat1` INT NULL,
  `cat2` INT NULL,
  `cat3` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `language_id_idx` (`language_id` ASC),
  INDEX `user_id_idx` (`user_id` ASC),
  CONSTRAINT `language_rating_language_id`
    FOREIGN KEY (`language_id`)
    REFERENCES `language` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `language_rating_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 29
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `sub_comment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sub_comment` ;

CREATE TABLE IF NOT EXISTS `sub_comment` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `comment` VARCHAR(2000) NULL DEFAULT NULL,
  `date_added` DATETIME NULL DEFAULT NULL,
  `date_updated` DATETIME NULL DEFAULT NULL,
  `user_id` INT(11) NOT NULL,
  `comment_id` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `sub_comment_user_id_idx` (`user_id` ASC),
  INDEX `sub_comment_comment_id_idx` (`comment_id` ASC),
  CONSTRAINT `sub_comment_comment_id`
    FOREIGN KEY (`comment_id`)
    REFERENCES `comment` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `sub_comment_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `vote`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `vote` ;

CREATE TABLE IF NOT EXISTS `vote` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `vote` TINYINT(4) NOT NULL,
  `user_id` INT(11) NOT NULL,
  `comment_id` INT(11) NULL DEFAULT NULL,
  `sub_comment_id` INT(11) NULL DEFAULT NULL,
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
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `category` ;

CREATE TABLE IF NOT EXISTS `category` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `category_rating`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `category_rating` ;

CREATE TABLE IF NOT EXISTS `category_rating` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `category_id` INT NOT NULL,
  `rating` INT NULL,
  `user_id` INT NOT NULL,
  `language_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `category_rating_category_id_idx` (`category_id` ASC),
  INDEX `category_rating_user_id_idx` (`user_id` ASC),
  INDEX `category_rating_language_id_idx` (`language_id` ASC),
  CONSTRAINT `category_rating_category_id`
    FOREIGN KEY (`category_id`)
    REFERENCES `category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `category_rating_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `category_rating_language_id`
    FOREIGN KEY (`language_id`)
    REFERENCES `language` (`id`)
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
-- Data for table `language`
-- -----------------------------------------------------
START TRANSACTION;
USE `languagedb`;
INSERT INTO `language` (`id`, `name`, `logo`, `creator`, `year_created`, `info`) VALUES (1, 'JavaScript', 'javascript-logo.png', 'Brendan Eich', 1995, 'Description: Arguably the single most ubiquitous programming language, JavaScript is critical for programming the behavior of web applications. While JavaScript supports traditional procedural and object-oriented programming, the language has added more functional features in recent years.');
INSERT INTO `language` (`id`, `name`, `logo`, `creator`, `year_created`, `info`) VALUES (2, 'Java', 'java-icon-medium.png', 'James Gosling', 1995, 'Description: Java is a language ideal for large-scale software projects. Because Java runs on a virtual machine, Java code is much more portable than that of languages like C++.');
INSERT INTO `language` (`id`, `name`, `logo`, `creator`, `year_created`, `info`) VALUES (3, 'Python', 'python-icon-medium.png', 'Guido van Rossum', 1990, 'Description: Python is a language optimized for ease of learning, readability, and extensibility. Known for its unique indentation-based syntax, Python has found substantial use in web development and scientific computing.');
INSERT INTO `language` (`id`, `name`, `logo`, `creator`, `year_created`, `info`) VALUES (4, 'C++', 'cpp-icon-medium.png', 'Bjarne Stroustrup', 1985, 'Description: C++ is a language ideal for low-level and systems programming. Based on C, C++ extends its predecessor with object-oriented programming and an expanded standard library.');
INSERT INTO `language` (`id`, `name`, `logo`, `creator`, `year_created`, `info`) VALUES (5, 'C', 'c-icon-medium.png', 'Dennis Ritchie', 1972, 'Description: C is the oldest programming language that still enjoys wide use. Code written in C has the ability to work directly with a computer\'s memory system, making it dangerous yet powerful.');
INSERT INTO `language` (`id`, `name`, `logo`, `creator`, `year_created`, `info`) VALUES (6, 'Swift', 'swift-icon-medium.png', 'Apple, Inc.', 2014, 'Description: Swift is a relatively recent programming language developed by Apple. Swift is specialized for mobile application development and is designed to prevent some common errors that arise in older languages.');
INSERT INTO `language` (`id`, `name`, `logo`, `creator`, `year_created`, `info`) VALUES (7, 'Go', 'go-logo.png', 'Google, Inc.', 2009, 'Description: Go is a systems programming language developed by Google. It hopes to learn from older systems languages like C to maintain a high level of speed while increasing safety.');

COMMIT;


-- -----------------------------------------------------
-- Data for table `user`
-- -----------------------------------------------------
START TRANSACTION;
USE `languagedb`;
INSERT INTO `user` (`id`, `username`, `password`, `email`, `first_name`, `last_name`, `active`, `role`, `reputation`) VALUES (1, 'rob', '$2a$10$kN23QoxVbJF8O1RALWZD.ORjz9R4g0ZKpjeYElDVkppXIR65dnaEm', 'rob@10thHuman.com', 'Rob', 'Thompson', 1, 'standard', NULL);
INSERT INTO `user` (`id`, `username`, `password`, `email`, `first_name`, `last_name`, `active`, `role`, `reputation`) VALUES (2, 'josh', '$2a$10$I2hDXE/PxjIPLIFBn5xDTOa19vxuyOcSkE8QcJ8C0KgyT1ocxTMVO', 'josh@josh.com', 'Josh', 'O', 1, 'standard', NULL);
INSERT INTO `user` (`id`, `username`, `password`, `email`, `first_name`, `last_name`, `active`, `role`, `reputation`) VALUES (3, 'henry', '$2a$10$fK5OmZfKwzlaJ44aZU8FEu1ngMoNqvoPKZNQFYMsjXDkIW3/0P8y6', 'henry@henry.com', 'Henry', 'Z', 1, 'standard', NULL);
INSERT INTO `user` (`id`, `username`, `password`, `email`, `first_name`, `last_name`, `active`, `role`, `reputation`) VALUES (4, 'brandon', '$2a$10$WTcVPuvML2RuSv.eoSCV2OGnp0dQsP/R3IydsWOjMqx.tcVVBm.fa', 'brandon@brandon.com', 'Brandon', 'Jaloway', 1, 'standard', NULL);

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
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (1, 1, 1, 1, 1, 1, 1);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (2, 2, 1, 2, 2, 2, 2);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (3, 3, 1, 3, 3, 3, 3);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (4, 4, 1, 4, 4, 4, 4);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (5, 5, 1, 5, 5, 5, 5);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (6, 1, 1, 6, 1, 1, 1);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (7, 2, 1, 7, 2, 2, 2);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (8, 3, 2, 1, 3, 3, 3);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (9, 4, 2, 2, 4, 4, 4);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (10, 5, 2, 3, 5, 5, 5);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (11, 1, 2, 4, 1, 1, 1);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (12, 2, 2, 5, 2, 2, 2);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (13, 3, 2, 6, 3, 3, 3);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (14, 4, 2, 7, 4, 4, 4);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (15, 5, 3, 1, 5, 5, 5);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (16, 1, 3, 2, 1, 1, 1);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (17, 2, 3, 3, 2, 2, 2);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (18, 3, 3, 4, 3, 3, 3);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (19, 4, 3, 5, 4, 4, 4);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (20, 5, 3, 6, 5, 5, 5);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (21, 1, 3, 7, 1, 1, 1);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (22, 2, 4, 1, 2, 2, 2);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (23, 3, 4, 2, 3, 3, 3);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (24, 4, 4, 3, 4, 4, 4);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (25, 5, 4, 4, 5, 5, 5);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (26, 1, 4, 5, 1, 1, 1);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (27, 2, 4, 6, 2, 2, 2);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (28, 3, 4, 7, 3, 3, 3);

COMMIT;


-- -----------------------------------------------------
-- Data for table `vote`
-- -----------------------------------------------------
START TRANSACTION;
USE `languagedb`;
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (1, 0, 1, 1, NULL);
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (2, 1, 2, 1, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `category`
-- -----------------------------------------------------
START TRANSACTION;
USE `languagedb`;
INSERT INTO `category` (`id`, `name`) VALUES (1, 'Safety');
INSERT INTO `category` (`id`, `name`) VALUES (2, 'Ease of Learning');
INSERT INTO `category` (`id`, `name`) VALUES (3, 'Speed');

COMMIT;
