//Require npm packages
const inquirer = require("inquirer");
const mysql = require("mysql");
const table = require("table");
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
            sum(p.product_sales) as product_sales,
            sum(p.product_sales) - d.over_head_costs as total_profit
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

            //Loop through the results
            res.forEach((department, index) => {
                
                const departmentArray = [];

                for (let key in department) {
                    //If index is 0 then add the column names to the header data array
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
            //Concat the row data array to the data array
            data = data.concat(tableRowData);
            
            //Build the output using the table npm package
            const output = table.table(data);
            //Console log the output table
            console.log(output);

            //Restart the application
            startApp();
        });
}

//Function to create a new department
function createNewDepartment() {

}