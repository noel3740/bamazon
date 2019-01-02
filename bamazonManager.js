//Require npm packages
var inquirer = require("inquirer");
var mysql = require("mysql");
require('dotenv').config();

//Create mySQL connection variable
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: process.env.DATABASE_PASSWORD,
    database: "bamazon"
});

//Connecto to mySQL database and start the application if successful
connection.connect(function (err) {
    if (err) throw err;

    //Display welcome message
    console.log();
    console.log("=====================================");
    console.log("WELCOME TO THE BAMAZON MANAGER APP!!!");
    console.log("=====================================");

    //Start the application
    startApp();
});

//Function that starts the application
function startApp() {

    //Prompt the user asking them what they want to do 
    //and run the appropriate function based on twhat they select
    inquirer.prompt([
        {
            type: "list",
            name: "task",
            message: "What would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"]
        }
    ]).then(answer => {
        switch (answer.task) {
            case "View Products for Sale":
                viewProducts();
                break;
            case "View Low Inventory":
                viewLowInventory();
                break;
            case "Add to Inventory":
                addToInventory();
                break;
            case "Add New Product":
                addNewProduct();
                break;
            case "Exit":
                endApp();
                break;
        }
    });
}

//Function that ends the application
function endApp() {
    if (connection) {
        connection.end();
    }
}

//Function that will display all products for sale
function viewProducts(onlyLowInventory) {

    const query = onlyLowInventory ?
        "Select * From products Where stock_quantity < 5" :
        "Select * From products"

    connection.query(query,
        function (err, res) {
            if (err) throw err;

            //Display items for sale
            console.log();
            console.log("====================================");
            res.forEach((item) => {
                console.log(`${item.product_name} (Item ID: ${item.item_id}, Quantity: ${item.stock_quantity}, Price: ${item.price})`);
            });
            console.log("====================================");
            console.log();

            //Restart the application
            startApp();
        });
}

//Function that will list all items with an inventory count lower than the specified amount
function viewLowInventory() {
    viewProducts(true);
}

//Function will display a prompt that will let the user add more quantity of any item
function addToInventory() {

    connection.query("Select * From products",
        function (err, res) {
            if (err) throw err;

            const itemsForSale = [];

            //Build the list of products to display in the inquirer prompt
            res.forEach((item) => {
                itemsForSale.push({
                    name: item.product_name,
                    value: item.item_id
                });
            });

            inquirer.prompt([
                {
                    type: "rawlist",
                    name: "itemToAddInventory",
                    message: "Select an item to add inventory to:",
                    choices: itemsForSale
                },
                {
                    name: "quantityToAdd",
                    message: "How many of the item would you like to add?",
                    validate: function (quantityToAdd) {
                        if (isNaN(quantityToAdd) || parseInt(quantityToAdd) <= 0) {
                            return "Please enter a valid positive number";
                        } else {
                            return true;
                        }
                    }
                }
            ]).then(answer => {
                connection.query("Update products Set stock_quantity = (stock_quantity + ?) Where item_id = ?",
                    [answer.quantityToAdd, answer.itemToAddInventory],
                    function (err) {
                        if (err) throw err;

                        var itemToAddTo = res.find((item) => item.item_id == answer.itemToAddInventory);

                        //Display to the user that the update was successful
                        console.log();
                        console.log("====================================");
                        console.log(`Successfully added ${answer.quantityToAdd} to ${itemToAddTo.product_name} quantity!`);
                        console.log("====================================");
                        console.log();

                        //Restart the application
                        startApp();
                    });
            });
        });
}

//Function will allow the user to add a new product item
function addNewProduct() {
    console.log("add new product");
    startApp();
}