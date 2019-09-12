var packages = require("../packages.js");
// MY MODULES
var functions = require("./functions.js");
var ecommerce = require("../connection.js");

var messages = {
    exit: "Exit console",
    viewProducts: "View all available products",
    viewLowProducts: "View low inventory",
    addProduct: "Add a new product",
    restockAnother: "Restock another item",
    showConsole: "Show the main console"
}

var products = {};
var product_categories = [];
var INFINITY = 10 ** 100;

function showConsole() {
    packages.inquirer.prompt({
        name: "consoleAction",
        type: "list",
        message: "What would you like to do?",
        choices: [messages.viewProducts, messages.viewLowProducts, messages.addProduct, messages.exit]
    }).then(function (res) {
        switch (res.consoleAction) {
            case messages.viewProducts:
                getProducts(INFINITY);
                break;
            case messages.viewLowProducts:
                getProducts(5);
                break;
            case messages.addProduct:
                addProduct();
                break;
            case messages.exit:
                functions.exitConsole();
                break;
        }
    });
}

function getProducts(minQuantity) {
    // Get categories and the show to user
    var query = `SELECT id, product_name, category, price, quantity FROM products_list WHERE quantity <= ${minQuantity}`;
    ecommerce.database.query(query,
        function (err, res) {
            if (err) {
                console.log(`An error has occurred. [${err}]`);
                throw err;
            }

            products = {};
            if (res.length != 0) {

                for (item of res) {
                    if (item.quantity != 0) {
                        var description = `${item.id}:${item.product_name.bold} (${item.category.blue}) - $${item.price.toString().yellow}`;
                        products[item.id] = {};
                        products[item.id].description = description;
                        products[item.id].stock = item.quantity;
                        products[item.id].price = item.price;
                        products[item.id].category = item.category;
                    }
                }

                showProducts();


            } else {
                console.log(`There are no products for sale with the specified condition.`.red);
                showConsole();
            }

        })
}

// Shows all products with the minimum quantity specified
function showProducts() {
    for (id in products) {
        console.log(products[id].description);
    }

    promptRestock();
}

function promptRestock() {
    packages.inquirer.prompt([
        {
            name: "id",
            type: "input",
            message: "Please type in the ID of the product you would like to restock:",
            validate: function (id) {
                if (!id || !products[id]) {
                    return 'Please enter a valid product ID';
                }
                else {
                    return true;
                }
            }
        },
        {
            name: "quantity",
            type: 'number',
            message: "How many units would you like to add to inventory?",
            validate: function (quantity) {
                if (isNaN(quantity) || quantity <= 0) {
                    return "Please enter a positive non-zero number!";
                }
                else {
                    return true;
                }
            }
        }]).then(function (res) {
            var query = `UPDATE products_list SET quantity = quantity + ${res.quantity} WHERE ?`;
            var quantity = res.quantity;
            var id = res.id;
            ecommerce.database.query(query,
                {
                    id: id
                },
                function (err, res) {
                    if (err) {
                        console.log(`An error has occurred. [${err}]`);
                        throw err;
                    }

                    console.log(`${quantity} of item ID #${id} have been added to inventory`.green);
                    promptNextAction();

                });


        })
}

function promptNextAction() {
    packages.inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do next?",
        choices: [messages.restockAnother, messages.showConsole, messages.exit]
    })
        .then(function (res) {
            switch (res.action) {
                case messages.restockAnother:
                    showProducts();
                    break;
                case messages.showConsole:
                    showConsole();
                    break;
                case messages.exit:
                    functions.exitConsole();
                    break;
            }
        })
}

// Prompts the user to add a product (must specify name, price, quantity, and category)
function addProduct() {
    // Get categories and the show to user
    var query = "SELECT department_name FROM department_sales";
    product_categories = [];
    ecommerce.database.query(query, function (err, res) {
        if (err) {
            console.log(`An error has occurred. [${err}]`);
            throw err;
        }

        for (item of res) {
            product_categories.push(item.department_name);
        }

        promptCreation();

    })

}

function promptCreation() {
    packages.inquirer.prompt([
        {
            name: "category",
            type: "list",
            message: "What type of product is this?",
            choices: product_categories
        },
        {
            name: "name",
            type: "input",
            message: "What is the name of this product?"

        }, {
            name: "price",
            type: "number",
            message: "How much does this product cost?",
            validate: function (price) {
                if (isNaN(price) || price <= 0) {
                    return "Please enter a positive non-zero number!";
                }
                else {
                    return true;
                }
            }

        }, 
        {
            name: "quantity",
            type: "number",
            message: "How many units would you like to initialize this product with?",
            validate: function (quantity) {
                if (isNaN(quantity) || quantity <= 0 || !(functions.isInt(quantity))) {
                    return "Please enter a positive non-zero integer!";
                }
                else {
                    return true;
                }
            }

        }
    ]).then(function (res) {
        var query = `INSERT INTO products_list(product_name, category, price, quantity) VALUES ("${res.name}", "${res.category}", ${res.price}, ${res.quantity})`;
        ecommerce.database.query(query, function(err, res) {
            if (err) {
                console.log(`An error has occurred. [${err}]`);
                throw err;
            }

            console.log(`${res.affectedRows} items have been added for sale.`)
            promptNextAction();
        })





    });
}

module.exports = {
    showConsole: showConsole
}