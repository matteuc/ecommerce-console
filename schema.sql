ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Ymcninja9810308991$';

-- DATABASE: ecommerceDatabase
DROP DATABASE IF EXISTS ecommerceDatabase;
CREATE DATABASE ecommerceDatabase;
USE ecommerceDatabase;

-- TABLE: products_list
DROP TABLE IF EXISTS products_list;
CREATE TABLE products_list(
    id INT NOT NULL auto_increment,
    product_name VARCHAR(100) NULL,
    category VARCHAR(100) NULL,
    price DECIMAL(10, 2) NULL,
    cost DECIMAL(10, 2) NULL,
    quantity INT NULL,
    PRIMARY KEY(id)
);   
-- TABLE: department_sales
DROP TABLE IF EXISTS department_sales;
CREATE TABLE department_sales(
    id INT NOT NULL auto_increment,
    department_name VARCHAR(100) NULL,
    overhead DECIMAL(10, 2) NULL,
    sales DECIMAL(10, 2) NULL,
    PRIMARY KEY(id)
);   

