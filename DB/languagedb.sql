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
  `active` TINYINT NULL,
  `flag` TINYINT NULL,
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
  `active` TINYINT NULL,
  `flag` TINYINT NULL,
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
INSERT INTO `language` (`id`, `name`, `logo`, `creator`, `year_created`, `info`) VALUES (1, 'JavaScript', 'javascript-logo.png', 'Brendan Eich', 1995, 'Arguably the single most ubiquitous programming language, JavaScript is critical for programming the behavior of web applications. While JavaScript supports traditional procedural and object-oriented programming, the language has added more functional features in recent years.');
INSERT INTO `language` (`id`, `name`, `logo`, `creator`, `year_created`, `info`) VALUES (2, 'Java', 'java-icon-medium.png', 'James Gosling', 1995, 'Java is a language ideal for large-scale software projects. Because Java runs on a virtual machine, Java code is much more portable than that of languages like C++.');
INSERT INTO `language` (`id`, `name`, `logo`, `creator`, `year_created`, `info`) VALUES (3, 'Python', 'python-icon-medium.png', 'Guido van Rossum', 1990, 'Python is a language optimized for ease of learning, readability, and extensibility. Known for its unique indentation-based syntax, Python has found substantial use in web development and scientific computing.');
INSERT INTO `language` (`id`, `name`, `logo`, `creator`, `year_created`, `info`) VALUES (4, 'C++', 'cpp-icon-medium.png', 'Bjarne Stroustrup', 1985, 'C++ is a language ideal for low-level and systems programming. Based on C, C++ extends its predecessor with object-oriented programming and an expanded standard library.');
INSERT INTO `language` (`id`, `name`, `logo`, `creator`, `year_created`, `info`) VALUES (5, 'C', 'c-icon-medium.png', 'Dennis Ritchie', 1972, 'C is the oldest programming language that still enjoys wide use. Code written in C has the ability to work directly with a computer\'s memory system, making it dangerous yet powerful.');
INSERT INTO `language` (`id`, `name`, `logo`, `creator`, `year_created`, `info`) VALUES (6, 'Swift', 'swift-icon-medium.png', 'Apple, Inc.', 2014, 'Swift is a relatively recent programming language developed by Apple. Swift is specialized for mobile application development and is designed to prevent some common errors that arise in older languages.');
INSERT INTO `language` (`id`, `name`, `logo`, `creator`, `year_created`, `info`) VALUES (7, 'Go', 'go-logo.png', 'Google, Inc.', 2009, 'Go is a systems programming language developed by Google. It hopes to learn from older systems languages like C to maintain a high level of speed while increasing safety.');
INSERT INTO `language` (`id`, `name`, `logo`, `creator`, `year_created`, `info`) VALUES (8, 'C#', 'csharp-icon-medium.png', 'Microsoft', 2000, 'C# is a general-purpose programming language closely related to Java. Compared to Java, C# features a more unified type system and better integration with databases.');
INSERT INTO `language` (`id`, `name`, `logo`, `creator`, `year_created`, `info`) VALUES (9, 'Ruby', 'ruby-icon-medium.png', 'Yukihiro Matsumoto', 1995, 'Ruby is a general-purpose programming language known for its unique and elegant syntax. It is also known for Ruby on Rails, a popular web framework.');
INSERT INTO `language` (`id`, `name`, `logo`, `creator`, `year_created`, `info`) VALUES (10, 'Scala', 'scala-icon-medium.png', 'Martin Odersky', 2004, 'Scala is a programming language running on the Java Virtual Machine that aims to extend Java with additional features. Unlike Java, Scala has substantial support for functional programming.');
INSERT INTO `language` (`id`, `name`, `logo`, `creator`, `year_created`, `info`) VALUES (11, 'Perl', 'perl-icon-medium.png', 'Larry Wall', 1987, 'Perl is a programming language based on Unix scripts optimized for text processing. Perl makes heavy use of punctuation and abbreviations to be more terse.');
INSERT INTO `language` (`id`, `name`, `logo`, `creator`, `year_created`, `info`) VALUES (12, 'Haskell', 'haskell-icon-medium.png', 'Simon Peyton Jones', 1990, 'Haskell is a lazily-evaluated and purely functional programming language with a rich type system. Haskell draws from concepts in advanced mathematics to approach problems from a different direction as other programming languages.');
INSERT INTO `language` (`id`, `name`, `logo`, `creator`, `year_created`, `info`) VALUES (13, 'Lua', 'lua-icon-medium.png', 'Roberto Ierusalimschy', 1993, 'Lua is a programming language designed to be minimalistic and extensible. Because of Lua\'s minimalism, it has found heavy use in embedded systems and game development.');
INSERT INTO `language` (`id`, `name`, `logo`, `creator`, `year_created`, `info`) VALUES (14, 'Kotlin', 'kotlin-icon-medium.png', 'JetBrains', 2011, 'Kotlin is a Java Virtual Machine-based programming language. Although Kotlin extends Java with a richer type system and support for functional programming, it remains fully interoperable with Java code.');
INSERT INTO `language` (`id`, `name`, `logo`, `creator`, `year_created`, `info`) VALUES (15, 'Rust', 'rust-icon-medium.png', 'Graydon Hoare', 2010, 'Rust is a programming language that aims to bring stronger typing and greater safety to systems programming while maintaining performance. Rust\'s unique memory management system helps avoid the memory bugs that are common in traditional systems languages.');

COMMIT;


-- -----------------------------------------------------
-- Data for table `user`
-- -----------------------------------------------------
START TRANSACTION;
USE `languagedb`;
INSERT INTO `user` (`id`, `username`, `password`, `email`, `first_name`, `last_name`, `active`, `role`, `reputation`) VALUES (1, 'rob', '$2a$10$kN23QoxVbJF8O1RALWZD.ORjz9R4g0ZKpjeYElDVkppXIR65dnaEm', 'rob@10thHuman.com', 'Rob', 'Thompson', 1, 'standard', 1);
INSERT INTO `user` (`id`, `username`, `password`, `email`, `first_name`, `last_name`, `active`, `role`, `reputation`) VALUES (2, 'josh', '$2a$10$I2hDXE/PxjIPLIFBn5xDTOa19vxuyOcSkE8QcJ8C0KgyT1ocxTMVO', 'josh@josh.com', 'Josh', 'O', 1, 'standard', 1);
INSERT INTO `user` (`id`, `username`, `password`, `email`, `first_name`, `last_name`, `active`, `role`, `reputation`) VALUES (3, 'henry', '$2a$10$fK5OmZfKwzlaJ44aZU8FEu1ngMoNqvoPKZNQFYMsjXDkIW3/0P8y6', 'henry@henry.com', 'Henry', 'Z', 1, 'standard', 1);
INSERT INTO `user` (`id`, `username`, `password`, `email`, `first_name`, `last_name`, `active`, `role`, `reputation`) VALUES (4, 'brandon', '$2a$10$WTcVPuvML2RuSv.eoSCV2OGnp0dQsP/R3IydsWOjMqx.tcVVBm.fa', 'brandon@brandon.com', 'Brandon', 'Jaloway', 1, 'standard', 1);
INSERT INTO `user` (`id`, `username`, `password`, `email`, `first_name`, `last_name`, `active`, `role`, `reputation`) VALUES (5, 'u1', '$2a$10$64zS0wOJwGsq.lYWyU9tL.ybmvM8XHmyAzFgOqK8MNg0BJrltHdqm', 'user@one.com', 'User', 'One', 1, 'standard', 1);
INSERT INTO `user` (`id`, `username`, `password`, `email`, `first_name`, `last_name`, `active`, `role`, `reputation`) VALUES (6, 'u2', '$2a$10$hiRWtSh1kGG7R9O7y9F6HehQwGybECuRIMBhgKPs1EgoWRd9Tv2JS', 'user@two.com', 'User', 'Two', 1, 'standard', 1);
INSERT INTO `user` (`id`, `username`, `password`, `email`, `first_name`, `last_name`, `active`, `role`, `reputation`) VALUES (7, 'u3', '$2a$10$wt1brox6J1AHCK.g/f2UdOmZ2ho65RftqthUNC.M8XdQ7GkZgl236', 'user@three.com', 'User', 'Three', 1, 'standard', 1);
INSERT INTO `user` (`id`, `username`, `password`, `email`, `first_name`, `last_name`, `active`, `role`, `reputation`) VALUES (8, 'u4', '$2a$10$PJiRxtIz/QpCphMYFwhSHenvXVTofoYhbQ8apXyQsxkRixZVjgX/K', 'user@four.com', 'User', 'Four', 1, 'standard', 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `comment`
-- -----------------------------------------------------
START TRANSACTION;
USE `languagedb`;
INSERT INTO `comment` (`id`, `comment`, `date_added`, `date_updated`, `user_id`, `language_id`, `active`, `flag`) VALUES (1, 'Java was my first programming language and I don’t know a lot of others so I’m a little bias. That said, learning to code through java has been great so far. I know there are other languages like C that get closer to the 0’s and 1’s but Java has been plenty challenging and equal parts rewarding to learn.', '2018-05-11 00:00:00', '2018-05-11 00:00:00', 1, 2, NULL, NULL);
INSERT INTO `comment` (`id`, `comment`, `date_added`, `date_updated`, `user_id`, `language_id`, `active`, `flag`) VALUES (2, 'I find javascript to be very fun. They say it’s the wild west of programming and I totally agree. With my knowledge of Java, it was a very easy transition learning js.', '2018-06-20 00:00:00', '2018-06-20 00:00:00', 1, 1, NULL, NULL);
INSERT INTO `comment` (`id`, `comment`, `date_added`, `date_updated`, `user_id`, `language_id`, `active`, `flag`) VALUES (3, 'javascript is great, love how fast and easy it is to get going compared to c/c++ ! ive currently been doing battle with migrating from directx9 to 11, took way too long just to set up basic boilerplater code for a directx window argh.', '2018-10-10 00:00:00', '2018-10-10 00:00:00', 2, 1, NULL, NULL);
INSERT INTO `comment` (`id`, `comment`, `date_added`, `date_updated`, `user_id`, `language_id`, `active`, `flag`) VALUES (4, 'Their generics are very, very weak. C#\'s generics are considerably stronger- although of course, neither is quite templates. Deterministic destruction is another major lack. Any form of lambda/closure is also a major problem- you can forget a functional API in Java. And, of course, there\'s always the issue of performance, for those areas that need them.', '2018-12-01 00:00:00', '2018-12-01 00:00:00', 3, 2, NULL, NULL);
INSERT INTO `comment` (`id`, `comment`, `date_added`, `date_updated`, `user_id`, `language_id`, `active`, `flag`) VALUES (5, 'I hate Javascript. Its not strict enough!', '2018-12-11 00:00:00', '2018-12-11 00:00:00', 5, 1, NULL, 1);
INSERT INTO `comment` (`id`, `comment`, `date_added`, `date_updated`, `user_id`, `language_id`, `active`, `flag`) VALUES (6, 'Golang is “easy to compile,” “easy to use” -basically the language feels light and agile, despite being statically typed. It compiles at amazing speed, thanks to the minimalist syntax, thus giving Go a rather “dynamic” feel.', '2017-01-15 00:00:00', '2017-01-15 00:00:00', 7, 7, NULL, NULL);
INSERT INTO `comment` (`id`, `comment`, `date_added`, `date_updated`, `user_id`, `language_id`, `active`, `flag`) VALUES (7, 'The number one reason C is the best programming language today is still the fact that it simply powers everything. From your phone to your Wifi, no other language provides the level of hardware interaction with the practicality of a concise and expressive syntax.', '2017-05-20 00:00:00', '2017-05-20 00:00:00', 4, 5, NULL, NULL);
INSERT INTO `comment` (`id`, `comment`, `date_added`, `date_updated`, `user_id`, `language_id`, `active`, `flag`) VALUES (8, ' its the basic programming language. If u learn this it gives most knowledge about java and other programming languages. It gives u idea about pointers, classes, basic input and output, arrays, variables, structures, etc.', '2018-04-20 00:00:00', '2018-04-20 00:00:00', 2, 5, NULL, 1);
INSERT INTO `comment` (`id`, `comment`, `date_added`, `date_updated`, `user_id`, `language_id`, `active`, `flag`) VALUES (9, 'Since almost all programming languages nowadays are themselves implemented in C, knowing C basically gives you a free ticket to knowing all programming languages. Of course, C is a procedural language, which means classes and objects are non-existent compared to languages like Python, but Python’s class model itself is written in C. This means that understanding C may not teach you object-oriented programming, but it will teach you how it was conceived, designed, and implemented.', '2018-12-11 00:00:00', '2018-12-11 00:00:00', 3, 5, NULL, NULL);
INSERT INTO `comment` (`id`, `comment`, `date_added`, `date_updated`, `user_id`, `language_id`, `active`, `flag`) VALUES (10, 'As a programmer from the pre-internet generation, I scoff at interpreted dynamically typed languages being used for large serious projects.\nPython and its ilk are great for getting started from scratch and getting something functional with the least effort. This works well in this day and age, where code is replaced or obsoleted very frequently and quick response to requirements is the most valuable part of many businesses.\nIn terms of languages, python is still a scripting language, and while it can be very clean, it suffers from the same disease that other interpreted languages suffer from - namely type errors that can be detected only at runtime.\nIt\'s a great brand of glue, but not the wisest choice for everything. As a general learning tool, scripting and web development language it\'s great.\n', '2018-02-28 00:00:00', '2018-02-28 00:00:00', 2, 3, NULL, NULL);
INSERT INTO `comment` (`id`, `comment`, `date_added`, `date_updated`, `user_id`, `language_id`, `active`, `flag`) VALUES (11, 'I love Python. It\'s not a language I build apps to distribute in (although you could) but if I want to put something together quickly it seems there\'s always a great Python library available to get me a solution in much fewer lines of code than going with Java or C#. Would I build a robust solution 100% in Python? Probably not. I\'ve found I like the tools available for other languages to deal with debugging, memory management, integration, security, etc...', '2018-06-07 00:00:00', '2018-06-07 00:00:00', 3, 3, NULL, NULL);
INSERT INTO `comment` (`id`, `comment`, `date_added`, `date_updated`, `user_id`, `language_id`, `active`, `flag`) VALUES (12, 'I wouldn\'t say that I\'ve been programming for a long time. However, I learnt C++ and then Java and then Python. If I am asked to do a project on one of the three languages, I would definitely choose either C++/Java simply because they are more readable. You cannot ignore the fact that braces add a certain kind of symmetry to code and it just looks better and is readable. Granted that Python is faster to write and is very powerful, however I wouldn\'t use it until I absolutely have to.\nI have had the opportunity of working on projects based on Django, Python\'s web framework. However, I try to find out if any alternative MVC framework can be used, simply because I wouldn\'t use Python unless I have to.\n', '2018-07-07 00:00:00', '2018-07-07 00:00:00', 4, 3, NULL, NULL);
INSERT INTO `comment` (`id`, `comment`, `date_added`, `date_updated`, `user_id`, `language_id`, `active`, `flag`) VALUES (13, 'Useful in the sense that some employers and/or projects require it. In such cases it’s absolutely yes.\nOtherwise, I’ve found no particular usefulness for C++ as I there is nothing I can do in C++ that I can’t do in C - and when it’s all compiled down to machine instructions it really doesn’t matter.\nThere is no magic in either language, use which ever one is most appropriate for the specific task at hand.\n\n', '2017-09-11 00:00:00', '2017-09-11 00:00:00', 8, 4, NULL, NULL);
INSERT INTO `comment` (`id`, `comment`, `date_added`, `date_updated`, `user_id`, `language_id`, `active`, `flag`) VALUES (14, 'it’s very useful. Recently I’m focused at some code that requires high performance in a very constrained environment. It turns out that C++ is our only choice if we want to take full control of the hardware and keep all the sweeties of STL and alike useful utilities in C++.', '2018-12-11 00:00:00', '2018-12-11 00:00:00', 4, 4, NULL, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `language_rating`
-- -----------------------------------------------------
START TRANSACTION;
USE `languagedb`;
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (1, 1, 1, 1, 1, 2, 4);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (2, 2, 1, 2, 2, 3, 2);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (3, 3, 1, 3, 3, 3, 3);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (4, 4, 1, 4, 4, 4, 4);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (5, 5, 1, 5, 5, 5, 2);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (6, 1, 1, 6, 1, 3, 1);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (7, 2, 1, 7, 2, 2, 2);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (8, 3, 2, 1, 3, 1, 3);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (9, 4, 2, 2, 4, 3, 2);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (10, 5, 2, 3, 5, 2, 5);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (11, 1, 2, 4, 1, 4, 1);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (12, 2, 2, 5, 2, 5, 1);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (13, 3, 2, 6, 3, 1, 3);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (14, 4, 2, 7, 4, 3, 4);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (15, 5, 3, 1, 5, 2, 5);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (16, 1, 3, 2, 1, 3, 1);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (17, 2, 3, 3, 2, 2, 2);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (18, 3, 3, 4, 3, 5, 3);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (19, 4, 3, 5, 4, 5, 2);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (20, 5, 3, 6, 5, 4, 5);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (21, 1, 3, 7, 1, 1, 1);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (22, 2, 4, 1, 2, 2, 3);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (23, 3, 4, 2, 3, 4, 2);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (24, 4, 4, 3, 4, 2, 4);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (25, 5, 4, 4, 5, 4, 5);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (26, 1, 4, 5, 1, 4, 1);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (27, 2, 4, 6, 2, 2, 2);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (28, 3, 4, 7, 3, 3, 3);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (29, 1, 5, 1, 1, 2, 4);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (30, 2, 5, 2, 2, 3, 2);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (31, 3, 5, 3, 3, 3, 3);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (32, 4, 5, 4, 4, 4, 4);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (33, 5, 5, 5, 5, 5, 2);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (34, 1, 5, 6, 1, 3, 1);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (35, 2, 5, 7, 2, 2, 2);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (36, 3, 6, 1, 3, 1, 3);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (37, 4, 6, 2, 4, 3, 2);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (38, 5, 6, 3, 5, 2, 5);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (39, 1, 6, 4, 1, 4, 1);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (40, 2, 6, 5, 2, 5, 1);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (41, 3, 6, 6, 3, 1, 3);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (42, 4, 6, 7, 4, 3, 4);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (43, 5, 7, 1, 5, 2, 5);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (44, 1, 7, 2, 1, 3, 1);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (45, 2, 7, 3, 2, 2, 2);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (46, 3, 7, 4, 3, 5, 3);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (47, 4, 7, 5, 4, 5, 2);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (48, 5, 7, 6, 5, 4, 5);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (49, 1, 7, 7, 1, 1, 1);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (50, 2, 8, 1, 2, 2, 3);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (51, 3, 8, 2, 3, 4, 2);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (52, 4, 8, 3, 4, 2, 4);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (53, 5, 8, 4, 5, 4, 5);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (54, 1, 8, 5, 1, 4, 1);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (55, 2, 8, 6, 2, 2, 2);
INSERT INTO `language_rating` (`id`, `rating`, `user_id`, `language_id`, `cat1`, `cat2`, `cat3`) VALUES (56, 3, 8, 7, 3, 3, 3);

COMMIT;


-- -----------------------------------------------------
-- Data for table `sub_comment`
-- -----------------------------------------------------
START TRANSACTION;
USE `languagedb`;
INSERT INTO `sub_comment` (`id`, `comment`, `date_added`, `date_updated`, `user_id`, `comment_id`, `active`, `flag`) VALUES (1, '@rob I agree.It was my first language too', '2018-05-15 00:00:00', '2018-05-15 00:00:00', 2, 1, NULL, NULL);
INSERT INTO `sub_comment` (`id`, `comment`, `date_added`, `date_updated`, `user_id`, `comment_id`, `active`, `flag`) VALUES (2, '@rob Its an okay language to learn first but I recommend learning C as it will give you a better foundation.', '2018-05-16 00:00:00', '2018-05-16 00:00:00', 3, 1, NULL, NULL);
INSERT INTO `sub_comment` (`id`, `comment`, `date_added`, `date_updated`, `user_id`, `comment_id`, `active`, `flag`) VALUES (3, '@josh this was great to hear', '2018-10-10', '2018-10-10 00:00:00', 1, 3, NULL, NULL);
INSERT INTO `sub_comment` (`id`, `comment`, `date_added`, `date_updated`, `user_id`, `comment_id`, `active`, `flag`) VALUES (4, '@brandon your opinion might change with experience', '2018-08-01 00:00:00', '2018-08-01 00:00:00', 3, 12, NULL, NULL);
INSERT INTO `sub_comment` (`id`, `comment`, `date_added`, `date_updated`, `user_id`, `comment_id`, `active`, `flag`) VALUES (5, '@brandon I couldn’t agree more', '2018-12-11 00:00:00', '2018-12-11 00:00:00', 3, 14, NULL, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `vote`
-- -----------------------------------------------------
START TRANSACTION;
USE `languagedb`;
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (1, 1, 1, 1, NULL);
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (2, 1, 2, 1, NULL);
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (3, 1, 3, 1, NULL);
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (4, 1, 4, 1, NULL);
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (5, 1, 5, 1, NULL);
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (6, 1, 6, 1, NULL);
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (7, 1, 7, 1, NULL);
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (8, 0, 8, 1, NULL);
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (9, 1, 1, 2, NULL);
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (10, 1, 2, 2, NULL);
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (11, 1, 3, 2, NULL);
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (12, 0, 4, 2, NULL);
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (13, 1, 5, 2, NULL);
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (14, 1, 6, 2, NULL);
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (15, 0, 7, 2, NULL);
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (16, 0, 8, 2, NULL);
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (17, 1, 1, 3, NULL);
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (18, 0, 2, 3, NULL);
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (19, 0, 3, 3, NULL);
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (20, 0, 4, 3, NULL);
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (21, 0, 5, 3, NULL);
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (22, 1, 6, 3, NULL);
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (23, 1, 7, 3, NULL);
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (24, 1, 8, 3, NULL);
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (25, 0, 1, 4, NULL);
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (26, 0, 2, 4, NULL);
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (27, 1, 3, 4, NULL);
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (28, 1, 4, 4, NULL);
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (29, 1, 5, 4, NULL);
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (30, 0, 6, 4, NULL);
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (31, 0, 7, 4, NULL);
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (32, 0, 8, 4, NULL);
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (33, 0, 1, 5, NULL);
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (34, 0, 2, 5, NULL);
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (35, 0, 3, 5, NULL);
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (36, 0, 4, 5, NULL);
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (37, 0, 5, 5, NULL);
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (38, 0, 6, 5, NULL);
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (39, 0, 7, 5, NULL);
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (40, 1, 8, 5, NULL);
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (41, 0, 1, 6, NULL);
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (42, 0, 2, 6, NULL);
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (43, 1, 3, 6, NULL);
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (44, 1, 4, 6, NULL);
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (45, 1, 5, 6, NULL);
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (46, 1, 6, 6, NULL);
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (47, 0, 7, 6, NULL);
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (48, 0, 1, 7, NULL);
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (49, 1, 3, 7, NULL);
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (50, 1, 4, 7, NULL);
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (51, 1, 5, 7, NULL);
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (52, 0, 8, 7, NULL);
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (53, 0, 1, 8, NULL);
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (54, 0, 2, 8, NULL);
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (55, 0, 6, 8, NULL);
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (56, 0, 7, 8, NULL);
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (57, 1, 1, 9, NULL);
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (58, 1, 3, 9, NULL);
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (59, 1, 5, 9, NULL);
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (60, 1, 7, 9, NULL);
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (61, 0, 3, 10, NULL);
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (62, 1, 1, 11, NULL);
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (63, 1, 2, 13, NULL);
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (64, 1, 4, 13, NULL);
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (65, 1, 6, 13, NULL);
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (66, 1, 8, 13, NULL);
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (67, 1, 1, 14, NULL);
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (68, 1, 2, 14, NULL);
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (69, 0, 5, 14, NULL);
INSERT INTO `vote` (`id`, `vote`, `user_id`, `comment_id`, `sub_comment_id`) VALUES (70, 1, 8, 14, NULL);

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
