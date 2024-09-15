import { query } from "./db.ts";
import inquirer from "inquirer";

// View all departments
// department names and department ids = * from department
export const viewDepartments = async () => {
  const res = await query("SELECT * FROM department");
  console.table(res.rows);
};

// TODO: View all roles
// job title, role id, the department that role belongs to, and the salary for that role
export const viewRoles = async () => {
  const res = await query(
    "SELECT role.title, role.id, role.department, role.salary FROM role"
  );
  console.table(res.rows);
};

// TODO: View all employees
// employee ids, first names, last names, job titles, departments, salaries, and managers
export const viewEmployees = async () => {
  const res = await query(
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager_id FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id"
  );
  console.table(res.rows);
};

// Add a department
// department and (LOG) that department is added to the database
export const addDepartment = async () => {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Enter the name of the department:",
    },
  ]);

  await query("INSERT INTO department (name) VALUES ($1)", [answers.name]);
  console.log(`Department ${answers.name} added successfully.`);
};

// TODO: Add a role
// name, salary, and department for the role and that role is added

// TODO: Add an employee
// first name, last name, role, and manager, and that employee is added to the database

// TODO: Update an employee role
// prompted to select an employee to update and their new role and this information is updated in the database 
