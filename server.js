const inquirer = require("inquirer");
const mysql = require("mysql");
const logo = require('asciiart-logo');
const config = require('./package.json');

const connection = mysql.createConnection({
    host: "localhost",
    port: 8080,
    user: "root",
    password: "password",
    database: "employee_tracker"
});

function startApp() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "action",
                message: "Main Menu:",
                choices: [
                  "View > All Employees",
                  "View > By Department",
                  "View > By Manager",
                  "View > All Roles",
                  "View > Utilised Budget",
                  "Employee > Add",
                  "Employee > Remove",
                  "Employee > Update Role",
                  "Employee > Update Manager",
                  "Department > Add",
                  "Department > Remove",
                  "Department > Update",
                  "Roles > Add",
                  "Roles > Remove",
                  "Roles > Update"],
            }
        ])
        .then ( answers => {
            switch (answers.action) {
                case "View > All Employees":
                    viewEmployees();
                    break;
            }
        })
        .catch( error => console.error(error) );
}

function addEmployee() {
    inquirer
        .prompt([

        ])
        .then ()
        .catch( error => console.error(error) );
}

function removeEmployee() {
    inquirer
        .prompt([

        ])
        .then ()
        .catch( error => console.error(error) );
}

function viewEmployees() {
    inquirer
        .prompt([

        ])
        .then ()
        .catch( error => console.error(error) );
}

function viewByDeparment() {
    inquirer
        .prompt([

        ])
        .then ()
        .catch( error => console.error(error) );
}

function viewByManager() {
    inquirer
        .prompt([

        ])
        .then ()
        .catch( error => console.error(error) );
}

function viewRoles() {
    inquirer
        .prompt([

        ])
        .then ()
        .catch( error => console.error(error) );
}

function addRole() {
    inquirer
        .prompt([

        ])
        .then ()
        .catch( error => console.error(error) );
}

function removeRole() {
    inquirer
        .prompt([

        ])
        .then ()
        .catch( error => console.error(error) );
}

function updateManager() {
    inquirer
        .prompt([

        ])
        .then ()
        .catch( error => console.error(error) );
}

function updateRole() {
    inquirer
        .prompt([

        ])
        .then ()
        .catch( error => console.error(error) );
}

console.log(logo(config).render());
startApp();