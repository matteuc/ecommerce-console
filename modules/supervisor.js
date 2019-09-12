// a) View product sales by department/category (log out a table)
// b) Create a new department

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
        name: "consoleAction",
        type: "list",
        message: "What would you like to do?",
        choices: [messages.viewDepartmentSales, messages.addDepartment, messages.exit]
    }).then(function (res) {
        switch (res.consoleAction) {
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

}


module.exports = {
    showConsole: showConsole
}