// a) Can view product categories
// b) Can view products within any chosen category (item IDs, names, and prices)
// c) Upon selection of a product, the user can choose a quantity and place the order
// * Purchase upon confirmation there is stil inventory available
// * Update product quantity 

var packages = require("../packages.js");
// MY MODULES
var functions = require("./functions.js");
var ecommerce = require("../connection.js");

var messages = {
    exit: "Exit console",
    purchaseFromSameDepartment: "Purchase another item from this department",
    showCategories: "Purchase an item from another category"
}

var product_categories = [];
var products = {};

// Show consumer console
function showConsole() {
    // Get categories and the show to user
    var query = "SELECT department_name FROM department_sales";
    ecommerce.database.query(query, function (err, res) {
        if (err) {
            console.log(`An error has occurred. [${err}]`);
            throw err;
        }

        for (item of res) {
            product_categories.push(item.department_name);
        }

        showCategories();

    })
}

// Prompts the user (using inquirer) all the products in the specified department 
function getProductsIn(department) {
    // Get categories and the show to user
    var query = "SELECT id, product_name, category, price, quantity FROM products_list WHERE ?";
    ecommerce.database.query(query,
        { category: department },
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
                if (functions.isEmpty(products)) {
                    console.log(`There are no products for sale in ${department}.`.red);
                    promptNextAction();
                } else {
                    showProducts();
                }

            } else {
                console.log(`There are no products for sale in ${department}.`.red);
                promptNextAction();
            }

        })

}

function showCategories() {
    packages.inquirer.prompt({
        name: "consoleAction",
        type: "list",
        message: "What kind of product would you like to purchase?",
        choices: product_categories.concat([messages.exit])
    }).then(function (res) {
        switch (res.consoleAction) {
            case messages.exit:
                functions.exitConsole();
                break;
            default:
                getProductsIn(res.consoleAction);
        }
    });
}

function showProducts() {
    for (id in products) {
        console.log(products[id].description);
    }

    promptPurchase();
}

function promptPurchase() {
    packages.inquirer.prompt(
        {
            name: "id",
            type: "input",
            message: "Please type in the ID of the product you would like to purchase:",
            validate: function (id) {
                if (!id || !products[id]) {
                    return 'Please enter a valid product ID';
                }
                else {
                    return true;
                }
            }
        }
    ).then(function (res) {

        packages.inquirer.prompt({
            name: "quantity",
            type: 'number',
            message: "How many would you like to buy?",
            validate: function (quantity) {
                if (isNaN(quantity) || quantity <= 0) {
                    return "Please enter a positive non-zero number!";
                }
                else if (quantity > products[res.id].stock) {
                    return `Only ${products[res.id].stock} are available.`;
                } else {
                    return true;
                }
            }
        }).then(function (answer) {
            purchaseProduct(res.id, answer.quantity);
        })
    });
}

function purchaseProduct(id, quantity) {
    var query = "UPDATE products_list SET ? WHERE ?";
    ecommerce.database.query(query,
        [
            {
                quantity: products[id].stock - quantity
            },
            {
                id: id
            }
        ],
        function (err, res) {
            if (err) {
                console.log(`An error has occurred. [${err}]`);
                throw err;
            }
            updateSales(products[id].category, products[id].price * quantity);
            console.log(`${quantity} of item ID #${id} have been successfully ordered!`.green);

            promptNextAction();

        });

}

function updateSales(department, total_sale) {
    var query = `UPDATE department_sales SET sales = sales + ${total_sale} WHERE ?`;
    ecommerce.database.query(query,
        {
            department_name: department
        },
        function (err, res) {
            if (err) {
                console.log(`An error has occurred. [${err}]`);
                throw err;
            }
        });
}

function promptNextAction() {
    packages.inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do next?",
        choices: [messages.purchaseFromSameDepartment, messages.showCategories, messages.exit]
    })
        .then(function (res) {
            switch (res.action) {
                case messages.purchaseFromSameDepartment:
                    promptPurchase();
                    break;
                case messages.showCategories:
                    showCategories();
                    break;
                case messages.exit:
                    functions.exitConsole();
                    break;
            }
        })
}

module.exports = {
    showConsole: showConsole
}