import { query } from "./db.ts"; // Location of DB connection function

const seedDatabase = async () => {
  try {
    const seedData = `
    INSERT INTO department (name)
    VALUES 
    ('Human Resources'),
    ('Engineering'),
    ('Marketing'),
    ('Sales'),
    ('Finance'),
    ('IT Support'),
    ('Operations'),
    ('Legal'),
    ('Customer Service'),
    ('Product Development');

    INSERT INTO role (title, salary, department)
    VALUES 
    ('HR Manager', 85000, 1),
    ('Software Engineer', 95000, 2),
    ('Marketing Specialist', 60000, 3),
    ('Sales Representative', 55000, 4),
    ('Accountant', 70000, 5),
    ('IT Specialist', 65000, 6),
    ('Operations Manager', 90000, 7),
    ('Legal Advisor', 95000, 8),
    ('Customer Support Agent', 40000, 9),
    ('Product Manager', 100000, 10),
    ('Recruiter', 65000, 1),
    ('Senior Software Engineer', 120000, 2),
    ('Marketing Director', 110000, 3),
    ('Sales Manager', 80000, 4),
    ('Chief Financial Officer (CFO)', 150000, 5),
    ('Chief Technology Officer (CTO)', 160000, 6),
    ('Operations Coordinator', 75000, 7),
    ('Chief Legal Officer', 140000, 8),
    ('Customer Success Manager', 85000, 9),
    ('Product Designer', 90000, 10);

    INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES 
    ('John', 'Doe', 1, NULL),  
    ('Jane', 'Smith', 2, 12),  
    ('Alice', 'Johnson', 3, 13),  
    ('Bob', 'Williams', 4, 14),  
    ('Michael', 'Brown', 5, 15),  
    ('Linda', 'Davis', 6, 16),  
    ('Richard', 'Miller', 7, 1),  
    ('Karen', 'Wilson', 8, 18),  
    ('David', 'Moore', 9, 19),  
    ('Laura', 'Taylor', 10, 20),  
    ('Charles', 'Anderson', 11, 1),  
    ('Emma', 'Thomas', 12, NULL),  
    ('Henry', 'Jackson', 13, NULL),  
    ('James', 'White', 14, NULL),  
    ('Patricia', 'Harris', 15, NULL),  
    ('Christopher', 'Martin', 16, NULL),  
    ('Barbara', 'Garcia', 17, 7),  
    ('George', 'Martinez', 18, NULL),  
    ('Nancy', 'Rodriguez', 19, NULL),  
    ('Jacob', 'Lewis', 20, NULL);
    `;

    await query(seedData);
    console.log("Database seeded successfully");
  } catch (err) {
    console.error("Error seeding the database:", err);
  }
};

seedDatabase();
