# bamazon

## Overview

This is an Amazon-like storefront with a MySQL database and Node Command Line Interface (CLI). The app will take in orders from customers and deplete stock from the store's inventory. There will also be a manager to view product sales and manage inventory and a supervisor CLI to view sales by department and create new departments. 

---

### Customer CLI

To run the customer CLI type in `node bamazonCustomer.js` in your terminal window. The customer CLI will display a welcome message, the list the items currently for sale, then prompt you to enter the id of the item that you would like to buy and the quantity. It will finally display the total amount of the purchase. 

![](demo_gifs/bamazonCustomerDemo.gif)

If there is insufficient stock of an item then an alert will be displayed to the user. 

![](demo_gifs/bamazonCustomerInsufficientStock.gif)

---

### Manager CLI

To run the manager CLI type in `node bamazonManager.js` in your terminal window. The manager CLI will then display a welcome message then prompt you to choose a task to perform. The tasks available are "View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", and "Exit". 

#### View Products for Sale

This task will display all products that are currently for sale along with their Item ID, Quantity of the item left, and Price of the item. 

![](demo_gifs/bamazonManagerDemo1.gif)

#### View Low Inventory

This task will display all the names of products with low inventory (quantity less than 5) along with their Item ID, Quantity of the item left, and Price of the item. 

![](demo_gifs/bamazonManagerDemo2.gif)

#### Add to Inventory

This task will prompt the user to select a current product that is for sale and how many of that product they would like to add to the quantity. A prompt will be displayed if the update to the quantity was successful or not. 

![](demo_gifs/bamazonManagerDemo3.gif)

#### Add New Product

This task will prompt the user for the name, department name, price, and quantity of the product they would like to add to the bamazon marketplace. A prompt will be displayed notifying the user if the product was successfully added. 

![](demo_gifs/bamazonManagerDemo4.gif)

#### Exit

This task will exit the manager CLI. 

---

### Supervisor CLI

To run the supervisor CLI type in `node bamazonSupervisor.js` in your terminal window. The supervisor CLI will then display a welcome message then prompt you to choose a task to perform. The tasks available are "View Product Sales by Department", "Create New Department", and "Exit". 

#### View Product Sales by Department

This task will display the name, over head costs, product sales, and total profit for each department in a table form. 

![](demo_gifs/bamazonSupervisorDemo1.gif)

#### Create New Department

This task will prompt the user for the name and over head costs for the department they would like to add to the bamazon marketplace. A prompt will be displayed notifying the user if the product was successfully added. 

![](demo_gifs/bamazonSupervisorDemo2.gif)

#### Exit

This task will exit the supervisor CLI. 