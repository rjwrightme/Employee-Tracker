DROP DATABASE IF EXISTS employee_tracker;
CREATE database employee_tracker;

USE employee_tracker;

CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  department VARCHAR(30) NOT NULL,
  PRIMARY KEY (department_id)
);

CREATE TABLE roles (
  role_id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(100),
  salary VARCHAR(100),
  department_id INT,
  PRIMARY KEY (role_id),
  FOREIGN KEY (department_id) REFERENCES departments(department_id)
);

CREATE TABLE employees (
  employee_id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT NULL,
  PRIMARY KEY (employee_id),
  FOREIGN KEY (role_id) REFERENCES roles(role_id)
);
