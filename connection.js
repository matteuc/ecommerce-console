var packages = require("./packages.js");
var keys = require("./keys.js");
var mysql = require("mysql");


var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,
 
    // Your username
    user: "root",

    // Your password
    password: keys.SQL_config.secret,
    database: "ecommercedatabase"
})

module.exports = {
    database: connection
}