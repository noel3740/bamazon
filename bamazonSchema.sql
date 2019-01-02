CREATE DATABASE IF NOT EXISTS bamazon;

USE bamazon;

CREATE TABLE IF NOT EXISTS products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(200) NOT NULL,
  department_name VARCHAR(200) NOT NULL,
  price DECIMAL(20, 2) NOT NULL default 0,
  stock_quantity INT NOT NULL default 0,
  product_sales DECIMAL(20, 2) NOT NULL default 0,
  PRIMARY KEY (item_id)
);

CREATE TABLE IF NOT EXISTS departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(200) NOT NULL,
  over_head_costs DECIMAL(20, 2) NOT NULL default 0,
  PRIMARY KEY (department_id)
);