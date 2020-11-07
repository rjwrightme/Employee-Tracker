const inquirer = require("inquirer");
const mysql = require("mysql");
const logo = require('asciiart-logo');
const config = require('./package.json');

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
    const query = "SELECT * FROM employees JOIN roles ON employees.role_id=roles.role_id JOIN department ON roles.department_id=department.id";
      connection.query(query, function(err, res) {
        if (err) {
            console.log(err);
        }
        console.log(res);
        // let employees = [];
        // for (let i = 0; i < res.length; i++) {
        //     let employee = {
        //         "ID": res[i].employee_id,
        //         "Name": res[i].first_name + " " + res[i].last_name,
        //         "Title": ,
        //         "Department": ,
        //         "Salary": ,
        //         "Manager"

        //     }
        // }
        // console.table(employees);
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