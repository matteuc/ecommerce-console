// a) Can view product categories
// b) Can view products within any chosen category (item IDs, names, and prices)
// c) Upon selection of a product, the user can choose a quantity and place the order
// * Purchase upon confirmation there is stil inventory available
// * Update product quantity 

var packages = require("../packages.js");

var messages = {
    exit: "Exit console"
}

function showConsole() {
    packages.inquirer.prompt({
        name: "consoleAction",
        type: "list",
        message: "What would you like to purchase?",
        choices: showCategories().concat([messsages.exit])
    }).then(function (res) {
        switch (res.consoleAction) {
            case messages.exit:
                packages.functions.exitConsole();
                break;
            default:
                showProductsIn(res.consoleAction);
        }
    });
}

// Returns an array containing all product categories
function showCategories() {

}

// Prompts the user (using inquirer) all the products in the specified department 
function showProductsIn(department) {

}

module.exports = {
    showConsole: showConsole
}