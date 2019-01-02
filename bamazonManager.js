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
function viewProducts() {

}

//Function that will list all items with an inventory count lower than the specified amount
function viewLowInventory() {

}

//Function will display a prompt that will let the user add more quantity of any item
function addToInventory() {

}

//Function will allow the user to add a new product item
function addNewProduct() {

}