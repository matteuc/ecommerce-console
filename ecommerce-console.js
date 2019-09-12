var packages = require("./packages.js");
// MY MODULES
var functions = require("./modules/functions.js");
var ecommerce = require("./connection.js");
var consumer = require("./modules/consumer.js");
var manager = require("./modules/manager.js");
var supervisor = require("./modules/supervisor.js");


var messages = {
    consoleWelcome: "WELCOME!",
    signIn: "Sign In",
    exit: "Exit console",
    consumer: "... a consumer",
    manager: "... a manager",
    supervisor: "... a supervisor"
}

// Upon connection to the database, show the sign in page
ecommerce.database.connect(function (err) {
    if (err) {
        console.log(`An error has occurred. [${err}]`);
        throw err;
    }

    functions.printMessage(messages.consoleWelcome);

    // Prompt user to a) sign in b) exit application
    packages.inquirer.prompt({
        name: "entryAction",
        type: "list",
        message: "What would you like to do?",
        choices: [messages.signIn, messages.exit]
    }).then(function (res) {
        switch (res.entryAction) {
            case messages.signIn:
                showSignInOptions();
                break;
            case messages.exit:
                functions.exitConsole();
                break;
        }
    })
})


function showSignInOptions() {
    // A. SIGN IN
    // Prompt user whether they are...
    packages.inquirer.prompt({
        name: "clientType",
        message: "I am...",
        choices: [messages.consumer, messages.manager, messages.supervisor, messages.exit],
        type: "list"
    }).then(function (res) {
        switch (res.clientType) {
            case messages.consumer:
                consumer.showConsole();
                break;
            case messages.manager:
                manager.showConsole();
                break;
            case messages.supervisor:
                supervisor.showConsole();
                break;
            case messages.exit:
                functions.exitConsole();
                break;
        }
    })

}
