-- Creating the dayanase
CREATE DATABASE  name_db;

-- using the database

use name_db;

-- creating a table

CREATE TABLE name_table(
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    address VARCHAR(100) NOT NULL,
    phone VARCHAR(15)
);
-- SHOW ALL TABLES

SHOW TABLES ;

-- to describe the table

describe name_table;