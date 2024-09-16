import { query } from "./db";
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
    `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager_id 
    FROM employee 
    JOIN role ON employee.role_id = role.id 
    JOIN department ON role.department = department.id`
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
export const addRole = async () => {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "Enter the title of the role:",
    },
    {
      type: "number",
      name: "salary",
      message: "Enter the salary for the role:",
    },
    {
      type: "number",
      name: "department",
      message: "Enter the department id number for the role:",
    },
  ]);

  await query(
    "INSERT INTO role (title, salary, department) VALUES ($1, $2, $3)",
    [answers.title, answers.salary, answers.department]
  );
  console.log(`Role ${answers.title} added successfully.`);
};

// TODO: Add an employee
// first name, last name, role, and manager, and that employee is added to the database
export const addEmployee = async () => {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "first_name",
      message: "Enter the employee's first name:",
    },
    {
      type: "input",
      name: "last_name",
      message: "Enter the employee's last name:",
    },
    {
      type: "number",
      name: "role_id",
      message: "Enter the role id number for the employee:",
    },
    {
      type: "number",
      name: "manager_id",
      message: "Enter the manager id number for the employee:",
    },
  ]);

  await query(
    "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)",
    [answers.first_name, answers.last_name, answers.role_id, answers.manager_id]
  );
  console.log(
    `Employee ${answers.first_name} ${answers.last_name} added successfully.`
  );
};

// TODO: Update an employee role
// prompted to select an employee to update and their new role and this information is updated in the database
export const updateEmployeeRole = async () => {
  const employees = await query("SELECT * FROM employee");
  const roles = await query("SELECT * FROM role");

  const employeeChoices = employees.rows.map((employee: any) => ({
    name: `${employee.first_name} ${employee.last_name}`,
    value: employee.id,
  }));

  const roleChoices = roles.rows.map((role: any) => ({
    name: role.title,
    value: role.id,
  }));

  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "employee_id",
      message: "Select an employee to update:",
      choices: employeeChoices,
    },
    {
      type: "list",
      name: "role_id",
      message: "Select the employee's new role:",
      choices: roleChoices,
    },
  ]);
  console.log(
    "answers.role_id: ",
    answers.role_id,
    "answers.employee_id: ",
    answers.employee_id
  );

  await query("UPDATE employee SET role_id = $1 WHERE id = $2", [
    answers.role_id,
    answers.employee_id,
  ]);
  console.log("Employee role updated successfully.");
};
