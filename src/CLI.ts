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

// Main menu function that prompts the user for what they would like to do - starts the program
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
      await viewDepartments(); // async DB viewDepartments function
      break;
    case "View All Roles":
      await viewRoles(); // async DB viewRoles function
      break;
    case "View All Employees":
      await viewEmployees(); // async DB viewEmployees function
      break;
    case "Add Department":
      await addDepartment(); // async DB addDepartment function
      break;
    case "Add Role":
      await addRole(); // async DB  addRole function
      break;
    case "Add Employee":
      await addEmployee(); // async DB addEmployee function
      break;
    case "Update Employee Role":
      await updateEmployeeRole(); // async DB updateEmployeeRole function
      break;
    case "Exit":
      console.log("Goodbye!");
      process.exit(0);
  }

  // Recursively call mainMenu until the user chooses "Exit"
  await mainMenu();
}

mainMenu(); // init function to start the program
