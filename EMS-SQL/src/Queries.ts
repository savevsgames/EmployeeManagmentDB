import { query } from "./db";
import inquirer from "inquirer";

// View all departments
export const viewDepartments = async () => {
  const res = await query("SELECT * FROM department");
  console.table(res.rows);
};

// Add a department
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
