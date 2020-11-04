const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    port: 8080,
    user: "root",
    password: "password",
    database: "employee_tracker"
});