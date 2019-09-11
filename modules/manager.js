// a) Can view all products (category, item IDs, names, prices, and quantities)
// b) View only the items that are low in quantity 
// c) Increase the quantity of any item
// d) Can add a new product (must set name, price, quantity, and category) 

var packages = require("../packages.js");

var messages = {
    exit: "Exit console",
    viewProducts: "View all available products",
    viewLowProducts: "View low inventory",
    addProduct: "Add a new product"
}

function showConsole() {
    packages.inquirer.prompt({
        name: "consoleAction",
        type: "list",
        message: "What would you like to do?",
        choices: [messages.viewProducts, messages.viewLowProducts, messages.addProduct, messages.exit]
    }).then(function (res) {
        switch (res.consoleAction) {
            case messages.viewProducts:
                showProducts(Infinity);
                break;
            case messages.viewLowProducts:
                showProducts(5);
                break;
            case messages.addProduct:
                addProduct();
                break;
            case messages.exit:
                packages.functions.exitConsole();
                break;
        }
    });
}

// Shows all products with the minimum quantity specified
function showProducts(minQuantity) {

}

// Prompts the user to add a product (must specify name, price, quantity, and category)
function addProduct() {

}

module.exports = {
    showConsole: showConsole
}