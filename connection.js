var packages = require("./packages.js");
var mysql = require("mysql");


var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,
 
    // Your username
    user: "root",

    // Your password
    password: "Ymcninja9810308991$",
    database: "ecommercedatabase"
})

module.exports = {
    database: connection
}