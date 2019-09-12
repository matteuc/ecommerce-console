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
        ecommerce.database.query(query, function(err, res) {
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