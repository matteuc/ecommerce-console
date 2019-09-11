var packages = require("packages.js");

var connection = packages.mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,
 
    // Your username
    user: "root",

    // Your password
    password: "Ymcninja9810308991$",
    database: "ecommerceDatabase"
})

module.exports = {
    database: connection
}