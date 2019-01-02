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
    console.log("========================================");
    console.log("WELCOME TO THE BAMAZON SUPERVISOR APP!!!");
    console.log("========================================");

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
            choices: ["View Product Sales by Department", "Create New Department", "Exit"]
        }
    ]).then(answer => {
        switch (answer.task) {
            case "View Product Sales by Department":
                viewSalesByDepartment();
                break;
            case "Create New Department":
                createNewDepartment();
                break;
            case "Exit":
                endApp();
                break;
        }
    });
}

//Function to display a summarized table of sales by department
function viewSalesByDepartment() {

}

//Function to create a new department
function createNewDepartment() {

}