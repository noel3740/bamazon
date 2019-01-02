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
    console.log("Started the application!");

    endApp();
}

//Function that ends the application
function endApp() {
    if (connection) {
        connection.end();
    }
}