CREATE DATABASE IF NOT EXISTS CHAT_APP;
USE CHAT_APP;

CREATE TABLE IF NOT EXISTS Account (
  `code` INT AUTO_INCREMENT,
  `username` VARCHAR(64) UNIQUE,
  `password` VARCHAR(128),

  CONSTRAINT PK_Account PRIMARY KEY (`code`)
);

INSERT INTO Account (`username`, `password`) VALUES
('username1', '$2a$04$Vk0eP5LnYPf780bic926qedBo.n8qf6h1zbO4BR/UBgeBvd3ALan2'),
('username2', '$2a$04$wCOz8q4gO6IW3SEdvYZQ0./crROEBhM3UkayDmITUGBkUiCccW40K'),
('username3', '$2a$04$Zo8pff7QvzBFEyAcHsPNyOu0vroe17Ee9ZhEJ29N5SQe2dhGBNw7m');