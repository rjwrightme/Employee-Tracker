USE employee_tracker;

-- Departments
INSERT INTO departments (department)
VALUES ("Marketing"), ("Engineering"), ("Finance");

-- Roles
INSERT INTO roles (title, salary, department_id)
SELECT 'Chief Techincal Officer', '125,000', department_id
  FROM departments
 WHERE department = 'Engineering'
 LIMIT 1;

INSERT INTO roles (title, salary, department_id)
SELECT 'Full Stack Developer', '$100,000', department_id
  FROM departments
 WHERE department = 'Engineering'
 LIMIT 1;

INSERT INTO roles (title, salary, department_id)
SELECT 'Front End Developer', '$65,000', department_id
  FROM departments
 WHERE department = 'Engineering'
 LIMIT 1;

INSERT INTO roles (title, salary, department_id)
SELECT 'Chief Marketing Officer', '$80,000', department_id
  FROM departments
 WHERE department = 'Marketing'
 LIMIT 1;

INSERT INTO roles (title, salary, department_id)
SELECT 'Marketing Analyst', '$60,000', department_id
  FROM departments
 WHERE department = 'Marketing'
 LIMIT 1;

INSERT INTO roles (title, salary, department_id)
SELECT 'Marketing Specialist', '$50,000', department_id
  FROM departments
 WHERE department = 'Marketing'
 LIMIT 1;

INSERT INTO roles (title, salary, department_id)
SELECT 'Chief Financial Officer', '$135,000', department_id
  FROM departments
 WHERE department = 'Finance'
 LIMIT 1;

INSERT INTO roles (title, salary, department_id)
SELECT 'Senior Accountant', '$85,000', department_id
  FROM departments
 WHERE department = 'Finance'
 LIMIT 1;

INSERT INTO roles (title, salary, department_id)
SELECT 'Junior Accountant', '$55,000', department_id
  FROM departments
 WHERE department = 'Finance'
 LIMIT 1;

-- Employees
INSERT INTO employees (first_name, last_name, role_id)
SELECT 'John', 'Doe', role_id
  FROM roles
 WHERE title = 'Chief Financial Officer'
 LIMIT 1;

INSERT INTO employees (first_name, last_name, role_id, manager_id)
SELECT 'Margaret', 'Johnson', role_id,
(SELECT employee_id FROM employees WHERE first_name = 'John' AND last_name = 'Doe')
  FROM roles
 WHERE title = 'Senior Accountant'
 LIMIT 1;

 INSERT INTO employees (first_name, last_name, role_id)
SELECT 'Bill', 'Gates', role_id
  FROM roles
 WHERE title = 'Chief Techincal Officer'
 LIMIT 1;

INSERT INTO employees (first_name, last_name, role_id, manager_id)
SELECT 'Robert', 'Brook', role_id,
(SELECT employee_id FROM employees WHERE first_name = 'Bill' AND last_name = 'Gates')
  FROM roles
 WHERE title = 'Full Stack Developer'
 LIMIT 1;

 INSERT INTO employees (first_name, last_name, role_id)
SELECT 'Spencer', 'Durrant', role_id
  FROM roles
 WHERE title = 'Chief Marketing Officer'
 LIMIT 1;

INSERT INTO employees (first_name, last_name, role_id, manager_id)
SELECT 'Hailey', 'Bush', role_id,
(SELECT employee_id FROM employees WHERE first_name = 'Spencer' AND last_name = 'Durrant')
  FROM roles
 WHERE title = 'Marketing Analyst'
 LIMIT 1;
