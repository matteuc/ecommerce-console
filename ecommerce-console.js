var consumer = require("./modules/consumer.js");
var manager = require("./modules/manager.js");
var supervisor = require("./modules/supervisor.js");

// Prompt user to a) sign in b) exit application

    // A. SIGN IN
    // Prompt user whether they are...

        // 1. Customer
            // a) Can view product categories
            // b) Can view products within any chosen category (item IDs, names, and prices)
            // c) Upon selection of a product, the user can choose a quantity and place the order
                // * Purchase upon confirmation there is stil inventory available
                // * Update product quantity 

        // 2. Manager
            // a) Can view all products (category, item IDs, names, prices, and quantities)
            // b) View only the items that are low in quantity 
            // c) Increase the quantity of any item
            // d) Can add a new product (must set name, price, quantity, and category) 

        // 3. Supervisor
            // a) View product sales by department/category (log out a table)
            // b) Create a new department


    // B. EXIT 
        // Call process.exit()
