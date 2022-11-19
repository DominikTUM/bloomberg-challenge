DROP DATABASE test_db;
CREATE DATABASE IF NOT EXISTS test_db;
USE test_db;
CREATE TABLE IF NOT EXISTS `test_db`.`Bookkeeping` ( `OrderID` INT NOT NULL AUTO_INCREMENT , `Security` TINYTEXT NOT NULL , `Qty` INT NOT NULL , `Price` DECIMAL NOT NULL , `Operation` TINYTEXT NOT NULL , `Side` TINYTEXT NOT NULL , `UserID` INT NOT NULL , PRIMARY KEY (`OrderID`)) ENGINE = InnoDB;
CREATE TABLE IF NOT EXISTS `test_db`.`Exchange` ( `ExchangeID` INT NOT NULL AUTO_INCREMENT , `Security` TINYTEXT NOT NULL , `UserID` INT NOT NULL , `Price` DECIMAL NOT NULL , `Qty` INT NOT NULL , PRIMARY KEY (`ExchangeID`)) ENGINE = InnoDB;
CREATE TABLE IF NOT EXISTS `test_db`.`Match` ( `MatchID` INT NOT NULL AUTO_INCREMENT , `Security` TINYTEXT NOT NULL , `SellerId` INT NOT NULL , `BuyerId` INT NOT NULL , `Qty` INT NOT NULL , `Price` DECIMAL NOT NULL , PRIMARY KEY (`MatchID`) ) ENGINE = InnoDB;
CREATE TABLE IF NOT EXISTS `test_db`.`User` ( `UserID` INT NOT NULL AUTO_INCREMENT , `Email` TINYTEXT NOT NULL , `Name` TINYTEXT NOT NULL , `Password` TINYTEXT NOT NULL , PRIMARY KEY (`UserID`) ) ENGINE = InnoDB;

INSERT INTO `Exchange` (`ExchangeID`, `Security`, `UserID`, `Price`, `Qty`) VALUES (NULL, 'Twitter', '1', '100', '10'); 
INSERT INTO `Match` (`MatchID`, `Security`, `Seller`, `Buyer`, `Qty`, `Price`) VALUES (NULL, 'Twitter', '1', '2', '10', '90'); 
INSERT INTO `Bookkeeping` (`OrderID`, `Security`, `Qty`, `Price`, `Operation`, `Side`, `UserID`) VALUES (NULL, 'Twitter', '5', '110', 'add', 'buy', '1'); 
INSERT INTO `Bookkeeping` (`OrderID`, `Security`, `Qty`, `Price`, `Operation`, `Side`, `UserID`) VALUES (NULL, 'Twitter', '10', '90', 'add', 'sell', '1');
INSERT INTO `Bookkeeping` (`OrderID`, `Security`, `Qty`, `Price`, `Operation`, `Side`, `UserID`) VALUES (NULL, 'Twitter', '5', '110', 'del', 'sell', '1');  

INSERT INTO `User` (`UserID`, `Email`, `Name`, `Password`) VALUES (0, 'root@secex.com', 'Root', 'd0508cb8ac4296ebff9aafb902978f0ef167b6c03aa332bef035b521aabe6a18');  
