// a) Can view product categories
// b) Can view products within any chosen category (item IDs, names, and prices)
// c) Upon selection of a product, the user can choose a quantity and place the order
// * Purchase upon confirmation there is stil inventory available
// * Update product quantity 

var packages = require("../packages.js");

var messages = {
    exit: "Exit console"
}

var product_categories = [];
var products = {};

// Show consumer console
function showConsole() {
    // Get categories and the show to user
    var query = "SELECT department_name FROM department_sales";
    packages.ecommerce.database.query(query, function (err, res) {
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
    packages.ecommerce.database.query(query,
        { department_name: department },
        function (err, res) {
            if (err) {
                console.log(`An error has occurred. [${err}]`);
                throw err;
            }

            products = {};
            for (item of res) {
                if (item.quantity != 0) {
                    var description = `${item.id}:${item.product_name.bold} (${item.category.blue}) - $${item.price.yellow}`;
                    products[item.id] = {};
                    products[item.id].description = description;
                    products[item.id].stock = item.quantity;
                }
            }

            showProducts();

        })

}

function showCategories() {
    packages.inquirer.prompt({
        name: "consoleAction",
        type: "list",
        message: "What kind of product would you like to purchase?",
        choices: product_categories.concat([messsages.exit])
    }).then(function (res) {
        switch (res.consoleAction) {
            case messages.exit:
                packages.functions.exitConsole();
                break;
            default:
                getProductsIn(res.consoleAction);
        }
    });
}

function showProducts() {
    for (product of products) {
        console.log(product.description);
    }

    packages.inquirer.prompt(
        {
            name: "id",
            type: "input",
            message: "Please type in the ID of the product you would like to purchase:"
        }
    ).then(function (res) {

        packages.inquirer.prompt({
            name: "quantity",
            type: 'number',
            message: "How many would you like to buy?",
            validate: function (quantity) {
                if (quantity > products[res.id].stock) {
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
    

}

module.exports = {
    showConsole: showConsole
}