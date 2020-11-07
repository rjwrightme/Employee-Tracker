const inquirer = require("inquirer");
const mysql = require("mysql");
const logo = require('asciiart-logo');
const config = require('./package.json');
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employee_tracker"
});

// ASCII title
console.log(logo(config).render());

// Connect to database and start app
connection.connect(function(err) {
    if (err) throw err;
    startApp();
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
        .then ( answer => {
            switch (answer.action) {
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
    const query = "SELECT * FROM employees JOIN roles ON employees.role_id=roles.role_id JOIN departments ON roles.department_id=departments.department_id ORDER BY employee_id";
      connection.query(query, function(err, res) {
        if (err) {
            console.log(err);
        }
        let employees = [];
        for (let i = 0; i < res.length; i++) {
            let employee = {
                "ID": res[i].employee_id,
                "Name": res[i].first_name + " " + res[i].last_name,
                "Title": res[i].title,
                "Department": res[i].department,
                "Salary": res[i].salary,
                "Manager": res[i].manager_id ? res[(res[i].manager_id) - 1].first_name + " " + res[(res[i].manager_id) - 1].last_name : null
            }
            employees.push(employee);
        }
        console.log("\n");
        console.table(employees);
        });
    startApp();
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