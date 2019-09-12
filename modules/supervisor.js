var packages = require("../packages.js");
// MY MODULES
var functions = require("./functions.js");
var ecommerce = require("../connection.js");

var messages = {
    exit: "Exit console",
    viewDepartmentSales: "View all department sales",
    addDepartment: "Add a new department"
}

function showConsole() {
    packages.inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [messages.viewDepartmentSales, messages.addDepartment, messages.exit]
    }).then(function (res) {
        switch (res.action) {
            case messages.viewDepartmentSales:
                showDepartmentSales();
                break;
            case messages.addDepartment:
                addDepartment();
                break;
            case messages.exit:
                functions.exitConsole();
                break;
        }
    });
}

function showDepartmentSales() {
    // Department information constructor
    function Department(name, overhead, sales) {
        this["Name"] = name;
        this["Overhead"] = overhead;
        this["Sales"] = sales;
        this["Net Profit"] = sales - overhead;
    }

    var departments = {};

    // Query department_sales table and retrieve data for each department
    var query = "SELECT id, department_name, overhead, sales FROM department_sales";
    ecommerce.database.query(query, function (err, res) {
        if (err) {
            console.log(`An error has occurred. [${err}]`);
            throw err;
        }

        for (item of res) {
            var tmp_department = new Department(item.department_name, item.overhead, item.sales);
            departments[item.id] = tmp_department;
        }


        if (!functions.isEmpty(departments)) {
            console.table(departments);
        } else {
            console.log("There are currently no departments established. Create one at the main console.".red);
        }
        
        showConsole();

    })

}

function addDepartment() {
    packages.inquirer.prompt([
        {
            name: "department",
            type: "input",
            message: "What is the name of this department?"
        },
        {
            name: "overhead",
            type: "input",
            message: "How much did it cost to initialize this department?",
            validate: function (overhead) {
                if (isNaN(overhead) || overhead <= 0) {
                    return "Please enter a positive non-zero number!";
                }
                else {
                    return true;
                }
            }

        }
    ]).then(function (res) {
        var query = `INSERT INTO department_sales(department_name, overhead, sales) VALUES ("${res.department}", ${res.overhead}, 0)`;
        ecommerce.database.query(query, function (err, res) {
            if (err) {
                console.log(`An error has occurred. [${err}]`);
                throw err;
            }

            console.log(`${res.affectedRows} departments have been added.`)
            showConsole();
        })

    });
}


module.exports = {
    showConsole: showConsole
}