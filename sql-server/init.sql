DROP DATABASE test_db;
CREATE DATABASE IF NOT EXISTS test_db;
USE test_db;
CREATE TABLE IF NOT EXISTS `test_db`.`Bookkeeping` ( `OrderID` INT NOT NULL AUTO_INCREMENT , `Security` TINYTEXT NOT NULL , `Qty` INT NOT NULL , `Price` DECIMAL NOT NULL , `Operation` TINYTEXT NOT NULL , `Side` TINYTEXT NOT NULL , `UserID` INT NOT NULL , PRIMARY KEY (`OrderID`)) ENGINE = InnoDB;
CREATE TABLE IF NOT EXISTS `test_db`.`Exchange` ( `ExchangeID` INT NOT NULL AUTO_INCREMENT , `Security` TINYTEXT NOT NULL , `UserID` INT NOT NULL , `Price` DECIMAL NOT NULL , `Qty` INT NOT NULL , `Side` TINYTEXT NOT NULL , PRIMARY KEY (`ExchangeID`)) ENGINE = InnoDB;
CREATE TABLE IF NOT EXISTS `test_db`.`Matches` ( `MatchID` INT NOT NULL AUTO_INCREMENT , `Security` TINYTEXT NOT NULL , `Seller` INT NOT NULL , `Buyer` INT NOT NULL , `Qty` INT NOT NULL , `Price` DECIMAL NOT NULL , PRIMARY KEY (`MatchID`) ) ENGINE = InnoDB;
INSERT INTO `Exchange` (`ExchangeID`, `Security`, `UserID`, `Price`, `Qty`, 'Side') VALUES (NULL, 'Twitter', '1', '100', '10', 'buy'); 
INSERT INTO `Matches` (`MatchID`, `Security`, `Seller`, `Buyer`, `Qty`, `Price`) VALUES (NULL, 'Twitter', '1', '2', '10', '90'); 
INSERT INTO `Bookkeeping` (`OrderID`, `Security`, `Qty`, `Price`, `Operation`, `Side`, `UserID`) VALUES (NULL, 'Twitter', '5', '110', 'add', 'buy', '1'); 
INSERT INTO `Bookkeeping` (`OrderID`, `Security`, `Qty`, `Price`, `Operation`, `Side`, `UserID`) VALUES (NULL, 'Twitter', '10', '90', 'add', 'sell', '1');
INSERT INTO `Bookkeeping` (`OrderID`, `Security`, `Qty`, `Price`, `Operation`, `Side`, `UserID`) VALUES (NULL, 'Twitter', '5', '110', 'del', 'sell', '1');  