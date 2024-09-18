import inquirer from "inquirer";
import pool from "./db";
import {
  viewDepartments,
  viewRoles,
  viewEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
  updateEmployeeManager,
  viewEmployeesByManager,
  viewEmployeesByDepartment,
  deleteDepartment,
  deleteRole,
  deleteEmployee,
  viewUtilizedBudgetByDepartment,
} from "./Queries";

// To allow for when render needs time to spin up, the database will have a retry timer
// The user will also be able to retry connection on command before the timer runs out and it retries again
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 30 * 1000; // This variable controls the retry delay (in milliseconds)

// Function to check if the database is ready
const checkDatabaseConnection = async (): Promise<boolean> => {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log(`Database connected successfully at ${res.rows[0].now}`);
    return true;
  } catch (error) {
    console.error("Error connecting to the database:", error);
    return false;
  }
};

// Function to display a countdown timer using the RETRY_DELAY_MS variable
const countdown = async (milliseconds: number) => {
  const seconds = milliseconds / 1000;
  for (let i = seconds; i > 0; i--) {
    // process.stdout.write clears the current line and writes the new one on the same line
    // We can use this to overwrite the countdown instead of logging multiple lines
    process.stdout.write(`Retrying in ${i} seconds... \r`);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  console.log(); // Move to a new line after countdown
};

// If the connection to the DB fails, this function prompts the user to retry now, wait, or exit
const promptRetryOptions = async (): Promise<string> => {
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "retryOption",
      message: "Database connection failed. What would you like to do?",
      choices: ["Retry Now", "Wait and Retry", "Exit Application"],
    },
  ]);

  return answers.retryOption;
};

// Retry function with countdown and user options
// Implements the above functions to provide the user with a visual countdown and options to retry
export const retryDatabaseConnection = async (attempt = 1): Promise<void> => {
  const isConnected = await checkDatabaseConnection();

  if (isConnected) {
    console.log("Database is ready. Continuing with the application...");
    return;
  }

  if (attempt < MAX_RETRIES) {
    const retryOption = await promptRetryOptions();

    if (retryOption === "Retry Now") {
      console.log("Retrying now...");
      return retryDatabaseConnection(attempt + 1);
    } else if (retryOption === "Wait and Retry") {
      await countdown(RETRY_DELAY_MS); // Use the user-configured or default retry delay
      return retryDatabaseConnection(attempt + 1);
    } else if (retryOption === "Exit Application") {
      console.log("Exiting application.");
      process.exit(1); // Exit the application
    }
  } else {
    console.error(
      "Failed to connect to the database after multiple attempts. Exiting."
    );
    process.exit(1); // Exit the app after max retries
  }
};

// Main menu function that prompts the user for what they would like to do
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
        "Update Employee Manager",
        "View Employees by Manager",
        "View Employees by Department",
        "Delete Department",
        "Delete Role",
        "Delete Employee",
        "View Utilized Budget by Department",
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
    case "Update Employee Manager":
      await updateEmployeeManager(); // async DB updateEmployeeManager function
      break;
    case "View Employees by Manager":
      await viewEmployeesByManager(); // async DB viewEmployeesByManager function
      break;
    case "View Employees by Department":
      await viewEmployeesByDepartment(); // async DB viewEmployeesByDepartment function
      break;
    case "Delete Department":
      await deleteDepartment(); // async DB deleteDepartment function
      break;
    case "Delete Role":
      await deleteRole(); // async DB deleteRole function
      break;
    case "Delete Employee":
      await deleteEmployee(); // async DB deleteEmployee function
      break;
    case "View Utilized Budget by Department":
      await viewUtilizedBudgetByDepartment(); // async DB viewUtilizedBudgetByDepartment function
      break;
    case "Exit":
      console.log("Thanks for using the Employee Management System! Goodbye.");
      process.exit(0);
  }

  // Recursively call mainMenu until the user chooses "Exit"
  await mainMenu();
}

// Main function to start the app
const main = async () => {
  console.log("Checking database status...");

  // Wait until the database is ready before continuing
  await retryDatabaseConnection();

  // Proceed with the main menu logic
  await mainMenu();
};

main(); // Start the app
