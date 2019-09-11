var packages = require("packages.js");

var messages = {
    consoleWelcome: "WELCOME!",
    signIn: "Sign In",
    exit: "Exit console",
    consumer: "... a consumer",
    manager: "... a manager",
    supervisor: "... a supervisor"
}

// Upon connection to the database, show the sign in page
packages.ecommerce.database.connect(function (err) {
    if (err) {
        console.log(`An error has occurred. [${err}]`);
        throw err;
    }

    packages.functions.printMessage(messages.consoleWelcome);

    // Prompt user to a) sign in b) exit application
    packages.inquirer.prompt({
        name: "entryAction",
        type: "list",
        message: "What would you like to do?",
        choices: ["Sign In", "Exit"]
    }).then(function (res) {
        switch (res.entryAction) {
            case messages.signIn:
                showSignInOptions();
                break;
            case messages.exit:
                packages.functions.exitConsole();
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
                packages.consumer.showConsole();
                break;
            case messages.manager:
                packages.manager.showConsole();
                break;
            case messages.supervisor:
                packages.supervisor.showConsole();
                break;
            case messages.exit:
                packages.functions.exitConsole();
                break;
        }
    })

}
