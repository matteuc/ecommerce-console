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

module.exports = {
    exitConsole: exitConsole,
    printMessage: printMessage
}
