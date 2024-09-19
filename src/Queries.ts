import { query } from "./remote_db";
import inquirer from "inquirer";

//
// View all departments
// department names and department ids = * from department
//
export const viewDepartments = async () => {
  try {
    const res = await query("SELECT * FROM department");
    // console.table() is a method that displays tabular data as a table - used to display the results of the query
    console.table(res.rows);
  } catch (err) {
    console.error("Error fetching departments: ", err);
  }
};

//
// TODO: View all roles
// job title, role id, the department that role belongs to, and the salary for that role
//
export const viewRoles = async () => {
  try {
    const res = await query(
      "SELECT role.title, role.id, role.department, role.salary FROM role"
    );
    // console.table() is a method that displays tabular data as a table - used to display the results of the query
    console.table(res.rows);
  } catch (err) {
    console.error("Error fetching roles: ", err);
  }
};

//
// TODO: View all employees
// employee ids, first names, last names, job titles, departments, salaries, and managers
//
export const viewEmployees = async () => {
  try {
    const res = await query(
      `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager_id 
      FROM employee 
      JOIN role ON employee.role_id = role.id 
      JOIN department ON role.department = department.id`
    );
    // console.table() is a method that displays tabular data as a table - used to display the results of the query
    console.table(res.rows);
  } catch (err) {
    console.error("Error fetching employees: ", err);
  }
};

//
// Add a department and log - department was successfully added to the database
//
export const addDepartment = async () => {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Enter the name of the department:",
    },
  ]);

  try {
    // use the answers.name to insert the department name into the department table
    await query("INSERT INTO department (name) VALUES ($1)", [answers.name]);
    console.log(`Department ${answers.name} added successfully.`);
  } catch (err) {
    console.error("Error adding department: ", err);
  }
};

//
// TODO: Add a role
// name, salary, and department for the role and that role is added
//
export const addRole = async () => {
  const departments = await query("SELECT * FROM department");

  // Get a list of roles for inquirer prompt
  const deparmentChoices = departments.rows.map((department: any) => ({
    name: department.name,
    value: department.id,
  }));

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
      type: "list",
      name: "department",
      message: "Select the department for the role:",
      choices: deparmentChoices,
    },
  ]);
  // Log the answers to the console to verify the correct values are being used
  // console.log(
  //   "answers.title: ",
  //   answers.title,
  //   "answers.salary: ",
  //   answers.salary,
  //   "answers.department: ",
  //   answers.department
  // );

  // Add the role to the database
  try {
    await query(
      "INSERT INTO role (title, salary, department) VALUES ($1, $2, $3)",
      [answers.title, answers.salary, answers.department]
    );
    console.log(`Role ${answers.title} added successfully.`);
  } catch (err) {
    console.error("Error adding role: ", err);
  }
};

//
// TODO: Add an employee
// first name, last name, role, and manager, and that employee is added to the database
//
export const addEmployee = async () => {
  // Get a list of roles for inquirer prompt
  const roles = await query("SELECT * FROM role");
  const roleChoices = roles.rows.map((role: any) => ({
    name: role.title,
    value: role.id,
  }));

  // Get a list of employees for inquirer prompt for manager id
  const employees = await query("SELECT * FROM employee");
  const employeeChoices = employees.rows.map((employee: any) => ({
    name: `${employee.first_name} ${employee.last_name}`,
    value: employee.id,
  }));

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
      type: "list",
      name: "role_id",
      message: "Select the role for the new employee:",
      choices: roleChoices,
    },
    {
      type: "list",
      name: "manager_id",
      message: "Select an employee to be the manager for the new employee:",
      choices: employeeChoices,
    },
  ]);
  // Log the answers to the console to verify the correct values are being used
  // console.log(
  //   "answers.first_name: ",
  //   answers.first_name,
  //   "answers.last_name: ",
  //   answers.last_name,
  //   "answers.role_id: ",
  //   answers.role_id,
  //   "answers.manager_id: ",
  //   answers.manager_id
  // );

  try {
    await query(
      "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)",
      [
        answers.first_name,
        answers.last_name,
        answers.role_id,
        answers.manager_id,
      ]
    );
    console.log(
      `Employee ${answers.first_name} ${answers.last_name} added successfully.`
    );
  } catch (err) {
    console.error("Error adding employee: ", err);
  }
};

//
// TODO: Update an employee role
// prompted to select an employee to update and their new role and this information is updated in the database
//
export const updateEmployeeRole = async () => {
  // Get a list of employees and roles to choose from
  const employees = await query("SELECT * FROM employee");
  // Get a list of roles to choose from
  const roles = await query("SELECT * FROM role");
  // Create an array of choices for the inquirer prompt
  const employeeChoices = employees.rows.map((employee: any) => ({
    name: `${employee.first_name} ${employee.last_name}`,
    value: employee.id,
  }));
  // Create an array of choices for the inquirer prompt
  const roleChoices = roles.rows.map((role: any) => ({
    name: role.title,
    value: role.id,
  }));
  // Prompt the user to select an employee to update and their new role
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
  // Log the answers to the console to verify the correct values are being used
  // console.log(
  //   "answers.role_id: ",
  //   answers.role_id,
  //   "answers.employee_id: ",
  //   answers.employee_id
  // );
  // Set the employee's role in the database where the employee id matches the selected employee id
  // Rather than using the employee id first in our query, we use it in the WHERE clause to specify which employee to update
  try {
    await query("UPDATE employee SET role_id = $1 WHERE id = $2", [
      answers.role_id,
      answers.employee_id,
    ]);
    console.log("Employee role updated successfully.");
  } catch (err) {
    console.error("Error updating employee role: ", err);
  }
};

//
// Update employee managers.
//
export const updateEmployeeManager = async () => {
  // Get a list of employees to choose from
  const employees = await query("SELECT * FROM employee");
  // Create an array of choices for the inquirer prompt
  const employeeChoices = employees.rows.map((employee: any) => ({
    name: `${employee.first_name} ${employee.last_name}`,
    value: employee.id,
  }));
  // Prompt the user to select an employee to update
  const employeeAnswer = await inquirer.prompt([
    {
      type: "list",
      name: "employee_id",
      message: "Select an employee from the list to update their manager:",
      choices: employeeChoices,
    },
  ]);
  // Get a list of managers to choose from
  const managers = await query("SELECT * FROM employee");
  // Create an array of choices for the inquirer prompt
  const managerChoices = managers.rows.map((manager: any) => ({
    name: `${manager.first_name} ${manager.last_name}`,
    value: manager.id,
  }));
  // Prompt the user to select a new manager for the employee
  const managerAnswer = await inquirer.prompt([
    {
      type: "list",
      name: "manager_id",
      message: "Select the employee's new manager:",
      choices: managerChoices,
    },
  ]);
  // Update the employee's manager in the database
  try {
    // Update the employee's manager in the database - send 2 values - 1st is the new manager id, 2nd is the employee id as a WHERE clause
    await query("UPDATE employee SET manager_id = $1 WHERE id = $2", [
      managerAnswer.manager_id,
      employeeAnswer.employee_id,
    ]);
    console.log("Employee manager updated successfully.");
  } catch (err) {
    console.error("Error updating employee manager: ", err);
  }
};

//
// View employees by manager
//
export const viewEmployeesByManager = async () => {
  // Get a list of managers to choose from
  const managers = await query("SELECT * FROM employee");
  // Create an array of choices for the inquirer prompt
  const managerChoices = managers.rows.map((manager: any) => ({
    name: `${manager.first_name} ${manager.last_name}`,
    value: manager.id,
  }));
  // Prompt the user to select a manager to view their employees
  const managerAnswer = await inquirer.prompt([
    {
      type: "list",
      name: "manager_id",
      message: "Select a manager to view their employees:",
      choices: managerChoices,
    },
  ]);
  // Get a list of employees for the selected manager
  // Join the employee, role, and department tables to get all the necessary information
  // role.id is the foreign key for role_id in the employee table
  // role.department is the foreign key for department.id in the department table
  // take the manager_id from the managerAnswer object and use in the WHERE clause
  // to get all the employees with that manager_id
  try {
    const res = await query(
      `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager_id 
      FROM employee 
      JOIN role ON employee.role_id = role.id 
      JOIN department ON role.department = department.id
      WHERE employee.manager_id = $1`,
      [managerAnswer.manager_id]
    );
    // console.table() is a method that displays tabular data as a table
    console.table(res.rows);
  } catch (err) {
    console.error("Error fetching employees by manager: ", err);
  }
};

// View employees by department.
export const viewEmployeesByDepartment = async () => {
  // Get a list of departments to choose from
  const departments = await query("SELECT * FROM department");
  // Create an array of choices for the inquirer prompt
  const departmentChoices = departments.rows.map((department: any) => ({
    name: department.name,
    value: department.id,
  }));
  // Prompt the user to select a department to view their employees
  const departmentAnswer = await inquirer.prompt([
    {
      type: "list",
      name: "department_id",
      message: "Select a department to view their employees:",
      choices: departmentChoices,
    },
  ]);
  // Get a list of employees for the selected department
  // Join the employee, role, and department tables to get all the necessary information
  // role.id is the foreign key for role_id in the employee table
  // role.department is the foreign key for department.id in the department table
  // take the department_id from the departmentAnswer object and use in the WHERE clause
  // to get all the employees with that department_id
  try {
    const res = await query(
      `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager_id 
      FROM employee 
      JOIN role ON employee.role_id = role.id 
      JOIN department ON role.department = department.id
      WHERE department.id = $1`,
      [departmentAnswer.department_id]
    );
    // console.table() is a method that displays tabular data as a table
    console.table(res.rows);
  } catch (err) {
    console.error("Error fetching employees by department: ", err);
  }
};

// Delete departments, roles, and employees.
export const deleteDepartment = async () => {
  // Get a list of departments to choose from
  const departments = await query("SELECT * FROM department");
  // Create an array of choices for the inquirer prompt
  const departmentChoices = departments.rows.map((department: any) => ({
    name: department.name,
    value: department.id,
  }));
  // Prompt the user to select a department to delete
  const departmentAnswer = await inquirer.prompt([
    {
      type: "list",
      name: "department_id",
      message: "Select a department to delete:",
      choices: departmentChoices,
    },
  ]);
  // Ensure this logs a valid ID
  console.log("Department ID: ", departmentAnswer.department_id);

  // Delete the selected department from the database
  try {
    // Start transaction
    await query("BEGIN;");

    // Update the roles to set department to NULL
    await query(`UPDATE role SET department = NULL WHERE department = $1;`, [
      departmentAnswer.department_id,
    ]);

    // Delete the department
    await query(`DELETE FROM department WHERE id = $1;`, [
      departmentAnswer.department_id,
    ]);

    // Commit transaction
    await query("COMMIT;");

    console.log("Department deleted successfully.");
  } catch (err) {
    // Rollback transaction in case of error
    await query("ROLLBACK;");
    console.error("Error deleting department: ", err);
  }
};
//
// Delete roles.
//
export const deleteRole = async () => {
  // Get a list of roles to choose from
  const roles = await query("SELECT * FROM role");
  // Create an array of choices for the inquirer prompt
  const roleChoices = roles.rows.map((role: any) => ({
    name: role.title,
    value: role.id,
  }));
  // Prompt the user to select a role to delete
  const roleAnswer = await inquirer.prompt([
    {
      type: "list",
      name: "role_id",
      message: "Select a role to delete:",
      choices: roleChoices,
    },
  ]);
  // Ensure this logs a valid role ID
  console.log("Role ID: ", roleAnswer.role_id);

  // Delete the selected role from the database
  try {
    // Start transaction
    await query("BEGIN");

    // Set role_id to NULL for employees with the role being deleted
    await query("UPDATE employee SET role_id = NULL WHERE role_id = $1", [
      roleAnswer.role_id,
    ]);

    // Delete the role
    await query("DELETE FROM role WHERE id = $1", [roleAnswer.role_id]);

    // Commit transaction
    await query("COMMIT");

    // Notify that the role was deleted successfully
    console.log("Role deleted successfully.");
  } catch (err) {
    // Rollback transaction in case of error
    await query("ROLLBACK");
    console.error("Error deleting role: ", err);
  }
};

//
// Delete employees.
//
export const deleteEmployee = async () => {
  // Get a list of employees to choose from
  const employees = await query("SELECT * FROM employee");
  // Create an array of choices for the inquirer prompt
  const employeeChoices = employees.rows.map((employee: any) => ({
    name: `${employee.first_name} ${employee.last_name}`,
    value: employee.id,
  }));
  // Prompt the user to select an employee to delete
  const employeeAnswer = await inquirer.prompt([
    {
      type: "list",
      name: "employee_id",
      message: "Select an employee to delete:",
      choices: employeeChoices,
    },
  ]);
  // Ensure this logs a valid employee ID
  console.log("Employee ID: ", employeeAnswer.employee_id);

  // Delete the selected employee from the database
  try {
    // Start transaction
    await query("BEGIN");
    // Set manager_id to NULL for employees with the manager being deleted
    await query("UPDATE employee SET manager_id = NULL WHERE manager_id = $1", [
      employeeAnswer.employee_id,
    ]);
    // Delete the employee
    await query("DELETE FROM employee WHERE id = $1", [
      employeeAnswer.employee_id,
    ]);
    // Commit transaction
    await query("COMMIT");
    // Notify that the employee was deleted successfully
    console.log("Employee deleted successfully.");
  } catch (err) {
    // Rollback transaction in case of error
    await query("ROLLBACK");
    console.error("Error deleting employee: ", err);
  }
};

//
// View the total utilized budget of a department—in other words, the combined salaries of all employees in that department.
//
export const viewUtilizedBudgetByDepartment = async () => {
  // Get a list of departments

  try {
    const departments = await query("SELECT * FROM department");
    // Create an array of choices for the inquirer prompt with the department table
    const departmentChoices = departments.rows.map((department) => ({
      name: department.name,
      value: department.id,
    }));
    const departmentAnswer = await inquirer.prompt([
      {
        type: "list",
        name: "department_id",
        message:
          "Select a department to get the total utilized budget for that department:",
        choices: departmentChoices,
      },
    ]);
    // Query the database to get all the salaries for the employees with that id and sum them
    // Using select sum we can total the salaries and select all the salaries then JOIN the other tables
    // with deparment.id as the foreign key for role.department
    // and role.id the foreign key for employee.role_id
    // the table can be queried to only return the sums where the deparment matches the answered user prompt.
    try {
      const total = await query(
        `SELECT SUM(role.salary) AS total_budget
        FROM department
        JOIN role ON role.department = department.id
        JOIN employee ON employee.role_id = role.id
        WHERE department.id = $1`,
        [departmentAnswer.department_id]
      );

      // we have to go into total to get the total budget
      const totalBudgetForDepartment = total.rows[0].total_budget;
      console.log(departmentAnswer.department_id);

      const departmentChoice = await query(
        `SELECT name FROM department WHERE id = $1`,
        [departmentAnswer.department_id]
      );

      console.log(
        `The total utilized budget for ${
          departmentChoice.rows[0].name
        } is $${Math.round(totalBudgetForDepartment / 1000)}K.`
      );
    } catch (err) {
      console.error("Error totalling budget for department: ", err);
    }
  } catch (err) {
    console.error("Error fetching departments: ", err);
  }
};
