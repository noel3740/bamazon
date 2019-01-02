USE bamazon;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
    ('Asus Gaming Montior', 'Electronics', '300.00', 12),
    ('Scent Diffuser', 'Home Goods', '32.75', 50),
    ('Men''s Northface Jacket', 'Clothing', '153.26', 5),
    ('VTech cordless phone', 'Electronics', '98.99', 101),
    ('Bose Wireless Headphones', 'Electronics', '255.82', 20),
    ('Shoe Polish', 'Shoe', '5.46', 200),
    ('Banana', 'Produce', '0.50', 45),
    ('Picture Frame', 'Home Goods', '13.29', 12),
    ('Winter Boots', 'Shoe', '299.98', 7),
    ('Cool T-Shirt', 'Clothing', '23.23', 149)

INSERT INTO departments (department_name, over_head_costs)
VALUES 
    ('Electronics', '100000.00'),
    ('Home Goods', '2353.22'),
    ('Clothing', '3333.33'),
    ('Shoe', '4444.44'),
    ('Produce', '5555.55')