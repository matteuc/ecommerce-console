var packages = require("./packages.js");
var keys = require("./keys.js");
var mysql = require("mysql");


var connection = mysql.createConnection(keys.SQL_config);

module.exports = {
    database: connection
}