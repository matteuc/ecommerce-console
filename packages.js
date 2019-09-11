// MY MODULES
var functions = require("./modules/functions.js");
var ecommerce = require("./modules/connection.js");
var consumer = require("./modules/consumer.js");
var manager = require("./modules/manager.js");
var supervisor = require("./modules/supervisor.js");

// NPM MODULES
var inquirer = require("inquirer");
var colors = require("colors");
var mysql = require("mysql")
var figlet = require("figlet");

module.exports = {
    functions: functions,
    ecommerce: ecommerce,
    consumer: consumer,
    manager: manager,
    supervisor: supervisor,
    inquirer: inquirer,
    colors: colors,
    mysql: mysql,
    figlet: figlet
}