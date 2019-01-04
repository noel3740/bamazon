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
    startApp();
});

//Function that starts the application
function startApp() {
    console.log();
    console.log('\x1b[36m%s\x1b[0m',"================================");
    console.log('\x1b[36m%s\x1b[0m',"=== =WELCOME TO BAMAZON!!! =====");
    console.log('\x1b[36m%s\x1b[0m',"================================");

    //Ask user which item they wish to buy
    buyAnItem();
}

//Function that ends the application
function endApp() {
    if (connection) {
        connection.end();
    }
}

//Function that gets products from the bamazon database and displays them in the console.
//Then prompts the user to select an item to buy and how many.
function buyAnItem() {
    //Get all products where the stock quantity is greater than 0
    connection.query("Select * From products Where stock_quantity > 0 Order By product_name",
        function (err, res) {
            if (err) throw err;

            const itemsForSale = [];

            //Display items for sale
            console.log();
            console.log('\x1b[32m%s\x1b[0m',"=======Current Items For Sale=======");
            res.forEach((item) => {
                itemsForSale.push({
                    name: item.product_name,
                    value: item.item_id
                });

                console.log('\x1b[34m%s\x1b[0m',`${item.product_name}`, ` (Item ID: ${item.item_id}, Price: $${item.price.toLocaleString('en')})`);
            });
            console.log('\x1b[32m%s\x1b[0m',"====================================");
            console.log();

            //Prompt user to select an item to buy
            inquirer.prompt([
                {
                    type: "rawlist",
                    name: "itemToBuy",
                    message: "Select an item to buy:",
                    choices: itemsForSale
                },
                {
                    name: "quantityToBuy",
                    message: "How many of the item would you like to buy?",
                    validate: function (quantityToBuy) {
                        if (isNaN(quantityToBuy) || parseInt(quantityToBuy) <= 0) {
                            return "Please enter a valid positive number";
                        } else {
                            return true;
                        }
                    }
                }
            ]).then(answer => {

                var itemToBuy = res.find((item) => item.item_id == answer.itemToBuy);

                //If there is enough quantity of the item the fulfill the user's order
                if (parseInt(itemToBuy.stock_quantity) >= parseInt(answer.quantityToBuy)) {
                    //Fulfill item order
                    fulfillItemOrder(itemToBuy, answer.quantityToBuy);
                }
                //If there is not enough quantity of the item then display a message letting the user know
                else {
                    console.log('\x1b[31m%s\x1b[0m',"Insufficient quantity!");
                    //End the application
                    endApp();
                }
            });
        });
}

//Function that fulfills the customers order to purchase an item
function fulfillItemOrder(itemToBuy, quantityToBuy) {
    //Calculate total cost
    var totalCost = parseFloat(itemToBuy.price) * parseInt(quantityToBuy);
    
    //Update the products table to reflect remaining quantity and product sales
    connection.query("Update products Set ? Where ?",
        [
            {
                stock_quantity: (parseInt(itemToBuy.stock_quantity) - parseInt(quantityToBuy)),
                product_sales: (parseFloat(itemToBuy.product_sales) + parseFloat(totalCost))
            }, 
            {
                item_id: itemToBuy.item_id
            }
        ],
        function (err, res) {
            if (err) throw err;
            //Show the user the total cost of their purchase
            
            console.log('\x1b[32m%s\x1b[0m',`Total Cost of Purchase: $${totalCost}`);

            //End the application
            endApp();
        });




}