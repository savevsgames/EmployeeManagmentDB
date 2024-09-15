import inquirer from "inquirer";
import {
  viewDepartments,
  viewRoles,
  viewEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
} from "./Queries.ts";

async function mainMenu() {
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Add Department",
        "Add Role",
        "Add Employee",
        "Update Employee Role",
        "Exit",
      ],
    },
  ]);

  switch (answers.action) {
    case "View All Departments":
      await viewDepartments();
      break;
    case "View All Roles":
      await viewRoles(); // Implement viewRoles function
      break;
    case "View All Employees":
      await viewEmployees(); // Implement viewEmployees function
      break;
    case "Add Department":
      await addDepartment();
      break;
    case "Add Role":
      await addRole(); // Implement addRole function
      break;
    case "Add Employee":
      await addEmployee(); // Implement addEmployee function
      break;
    case "Update Employee Role":
      await updateEmployeeRole(); // Implement updateEmployeeRole function
      break;
    case "Exit":
      console.log("Goodbye!");
      process.exit(0);
  }

  // Recursively call mainMenu until the user chooses "Exit"
  await mainMenu();
}

mainMenu();
