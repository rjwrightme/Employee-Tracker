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
                  "View > All Roles",
                  "Employee > Add",
                  "Employee > Update Role",
                  "Department > Add",
                  "Roles > Add",
                  "Roles > Update"],
            }
        ])
        .then ( answer => {
            switch (answer.action) {
                case "View > All Employees":
                    viewEmployees();
                    break;
                case "View > By Department":
                    viewByDeparment();
                    break;
                case "View > All Roles":
                    viewRoles();
                    break;
                case "Employee > Add":
                    addEmployee();
            }
        })
        .catch( error => console.error(error) );
}

/****************************
    SQL Query Functions for Inquirer
****************************/

// Get List of Managers

const getManagersArray = () => {
    const query = `SELECT employee_id, CONCAT(first_name, " ", last_name) AS name FROM employees WHERE ISNULL(manager_id)`;
    return new Promise((resolve, reject) => {
        connection.query(query, (error, response) => {
            if (error) {
                console.log(error);
                reject(error);
            }
            resolve(response);
        })
    });
}

const getRolesArray = () => {
    const query = `SELECT role_id, title FROM roles`;
    return new Promise((resolve, reject) => {
        connection.query(query, (error, response) => {
            if (error) {
                console.log(error);
                reject(error);
            }
            resolve(response);
        })
    });
}


async function addEmployee() {
    const rolesObject = await getRolesArray();
    const managerObject = await getManagersArray();
    inquirer
        .prompt([
            {
                type: "input",
                name: "first_name",
                message: "What is the new employee's first name?"
            },
            {
                type: "input",
                name: "last_name",
                message: "What is their last name?"
            },
            {
                type: "rawlist",
                name: "role_title",
                message: "Select Position",
                choices: rolesObject.map(role => role.title)
            },
            {
                type: "confirm",
                name: "manager_bool",
                message: "Does this employee have a manager?",
                default: "true"
            },
            {
                type: "rawlist",
                name: "manager_name",
                message: "Please select their manager:",
                choices: managerObject.map(manager => manager.name),
                when: (answers) => answers.manager_bool
            }
            
        ])
        .then ((answers) => {
            // if (answers.manager_bool) {
            //     const { employee_id: manager_id } = managerObject.find( ({name}) => name === answers.manager_name);
            // } else {
            //     const manager_id = "NULL";
            // }
            const { employee_id: manager_id } = managerObject.find( ({name}) => name === answers.manager_name);
            const { role_id } = rolesObject.find( ({title}) => title === answers.role_title );
            connection.query(
                "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
                [answers.first_name, answers.last_name, role_id, manager_id],
                (error, response) => {
                  if (error) {
                    console.error(error);
                  }
                  console.log(`${answers.first_name} ${answers.last_name} successfully added as a new employee.`);
                  startApp();
                }
              );
        })
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
        startApp();
        });
}

function viewByDeparment() {
    const query = "SELECT department FROM departments";
      connection.query(query, function(err, res) {
        if (err) {
            console.log(err);
        }
        const departments = res.map(obj => obj.department);
        inquirer
            .prompt([
                {
                    type: "rawlist",
                    name: "department",
                    message: "Select Department",
                    choices: departments
                }
            ])
            .then ( answer => {
                const query = "SELECT * FROM employees JOIN roles ON employees.role_id=roles.role_id JOIN departments ON roles.department_id=departments.department_id WHERE ? ORDER BY employee_id";
                connection.query(query, { department: answer.department }, function(err, res) {
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
                        }
                        employees.push(employee);
                    }
                    console.log("\n");
                    console.table(employees);
                    startApp();
                });
            })
            .catch( error => console.error(error) );
        });
}

function viewRoles() {
    const query = "SELECT title FROM roles";
      connection.query(query, function(err, res) {
        if (err) {
            console.log(err);
        }
        const roles = res.map(obj => obj.title);
        inquirer
            .prompt([
                {
                    type: "rawlist",
                    name: "role",
                    message: "Select Role",
                    choices: roles
                }
            ])
            .then ( answer => {
                const query = "SELECT * FROM employees JOIN roles ON employees.role_id=roles.role_id JOIN departments ON roles.department_id=departments.department_id WHERE ? ORDER BY employee_id";
                connection.query(query, { title: answer.role }, function(err, res) {
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
                        }
                        employees.push(employee);
                    }
                    console.log("\n");
                    console.table(employees);
                    startApp();
                });
            })
            .catch( error => console.error(error) );
        });
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