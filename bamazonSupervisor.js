//Require npm packages
const inquirer = require("inquirer");
const mysql = require("mysql");
const table = require("table");
require('dotenv').config();

//Require local javascript
var validator = require("./inquirerValidation.js");

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
    console.log('\x1b[36m%s\x1b[0m', "========================================");
    console.log('\x1b[36m%s\x1b[0m', "WELCOME TO THE BAMAZON SUPERVISOR APP!!!");
    console.log('\x1b[36m%s\x1b[0m', "========================================");
    console.log();

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

//Function that ends the application
function endApp() {
    if (connection) {
        connection.end();
    }
}

//Function to display a summarized table of sales by department
function viewSalesByDepartment() {

    const query = `
        SELECT 
            d.department_id, 
            d.department_name, 
            d.over_head_costs, 
            IFNULL(sum(p.product_sales), 0) as product_sales,
            IFNULL(sum(p.product_sales), 0) - IFNULL(d.over_head_costs, 0) as total_profit
        FROM
            departments d
            left join products p
                on d.department_name = p.department_name
        GROUP BY d.department_name`;

    connection.query(query,
        function (err, res) {
            if (err) throw err;

            //Display sales by department using table npm package
            console.log();

            let data = [];
            const tableHeaderData = [];
            const tableRowData = [];

            //Loop through the department results
            res.forEach((department, index) => {

                const departmentArray = [];

                //Loop thru all the keys for this department
                for (let key in department) {
                    //If index is 0 (first department retrieved) then build out the header array
                    if (index === 0) {
                        tableHeaderData.push(key);
                    }

                    //Add data to department array
                    departmentArray.push(department[key]);
                }

                //Add the department data array to the row data array
                tableRowData.push(departmentArray);
            })

            //Add the header array to the data array
            data.push(tableHeaderData);
            //Concat the row array to the data array
            data = data.concat(tableRowData);

            //Build the output using the table npm package
            const output = table.table(data);
            //Console log the output table
            console.log('\x1b[32m%s\x1b[0m', output);

            //Restart the application
            startApp();
        });
}

//Function to create a new department
function createNewDepartment() {
    //Gather the information necessary to add a new department
    inquirer.prompt([
        {
            name: "departmentName",
            message: "Enter the department name to add:",
            validate: validator.validateValue
        },
        {
            name: "overHeadCosts",
            message: "Enter the department's over head costs:",
            validate: validator.validatePositiveMoney
        }
    ]).then(answer => {
        //Check if department already exists
        connection.query("Select count(1) as department_count From departments Where department_name = ?",
            answer.departmentName,
            function (err, res) {
                if (err) throw err;

                //If department already exists then prompt the user to enter a different department name
                if (res && res.length > 0 && parseInt(res[0].department_count) > 0) {
                    console.log('\x1b[31m%s\x1b[0m',"Department name already exists in the database! Please enter another name.");
                    console.log();
                    createNewDepartment();
                } else {
                    //Run the query to inser the department into the db
                    connection.query("Insert Into departments Set ?",
                        [
                            {
                                department_name: answer.departmentName,
                                over_head_costs: answer.overHeadCosts
                            }
                        ],
                        function (err) {
                            if (err) throw err;

                            //Display to the user that the insert was successful
                            console.log();
                            console.log('\x1b[32m%s\x1b[0m', "=============================================================");
                            console.log('\x1b[32m%s\x1b[0m', `Successfully added the "${answer.departmentName}" department!`);
                            console.log('\x1b[32m%s\x1b[0m', "=============================================================");
                            console.log();

                            //Restart the application
                            startApp();
                        });
                }
            });
    });
}