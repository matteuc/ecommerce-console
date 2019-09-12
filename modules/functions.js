var packages = require("../packages.js");

function exitConsole() {
    printMessage("Goodbye!");
    process.exit();
}

function printMessage(message) {
    console.log(packages.figlet.textSync(message, {
        font: 'ANSI Shadow',
        horizontalLayout: 'default',
        verticalLayout: 'default'
    }));
}

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

module.exports = {
    exitConsole: exitConsole,
    printMessage: printMessage,
    isEmpty: isEmpty
}
