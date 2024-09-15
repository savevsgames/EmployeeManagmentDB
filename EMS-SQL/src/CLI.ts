import inquirer from "inquirer";
import { viewDepartments, addDepartment } from "./Queries.ts";

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
    case "Add Department":
      await addDepartment();
      break;
    // Add other cases for roles and employees
    case "Exit":
      console.log("Goodbye!");
      process.exit(0);
  }
}

mainMenu();
