-- CREAITES: DATABASE --
DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;


-- CREATES: TABLE
CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,    -- assigns a unique INT(integer) that begins at 1 for an item, no need to define in VALUES because it is self-defined
    product_name VARCHAR(45),
    department_name VARCHAR(45),
    price DECIMAL(6, 2),                    -- separated by comma to indicate decimal spaces, price cannot exceed $9999.99
    stock_quantity INT(11),                 -- max value
    PRIMARY KEY (item_id)                   -- unique value to identify each product and cannot be duplicated
);

-- INSERTS: MOCK ITEMS INTO DB
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("milk", "groceries", 4.29, 141);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("toilet paper", "household", 14.99, 64);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("laundry detergent", "cleaning supplies", 12.29, 83);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("garden hose", "gardening", 11.00, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("sponges", "cleaning supplies", 2.99, 32);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("eggs", "groceries", 3.99, 117);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("shower curtain", "home", 14.99, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("bed sheets", "home", 69.00, 17);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("shampoo", "personal", 7.79, 270);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Diapers", "Baby", 24.99, 62);