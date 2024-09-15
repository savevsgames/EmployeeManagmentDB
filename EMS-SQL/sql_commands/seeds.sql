-- Seed data for the employee management system generated with ChatGPT

$$ DO
BEGIN
    
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
('John', 'Doe', 1, NULL),  -- HR Manager (No manager, top-level)
('Jane', 'Smith', 2, 12),  -- Software Engineer (reports to Senior Software Engineer)
('Alice', 'Johnson', 3, 13),  -- Marketing Specialist (reports to Marketing Director)
('Bob', 'Williams', 4, 14),  -- Sales Representative (reports to Sales Manager)
('Michael', 'Brown', 5, 15),  -- Accountant (reports to CFO)
('Linda', 'Davis', 6, 16),  -- IT Specialist (reports to CTO)
('Richard', 'Miller', 7, 1),  -- Operations Manager (reports to HR Manager)
('Karen', 'Wilson', 8, 18),  -- Legal Advisor (reports to Chief Legal Officer)
('David', 'Moore', 9, 19),  -- Customer Support Agent (reports to Customer Success Manager)
('Laura', 'Taylor', 10, 20),  -- Product Manager (reports to Product Designer)
('Charles', 'Anderson', 11, 1),  -- Recruiter (reports to HR Manager)
('Emma', 'Thomas', 12, NULL),  -- Senior Software Engineer (No manager, top-level)
('Henry', 'Jackson', 13, NULL),  -- Marketing Director (No manager, top-level)
('James', 'White', 14, NULL),  -- Sales Manager (No manager, top-level)
('Patricia', 'Harris', 15, NULL),  -- CFO (No manager, top-level)
('Christopher', 'Martin', 16, NULL),  -- CTO (No manager, top-level)
('Barbara', 'Garcia', 17, 7),  -- Operations Coordinator (reports to Operations Manager)
('George', 'Martinez', 18, NULL),  -- Chief Legal Officer (No manager, top-level)
('Nancy', 'Rodriguez', 19, NULL),  -- Customer Success Manager (No manager, top-level)
('Jacob', 'Lewis', 20, NULL);  -- Product Designer (No manager, top-level)

END $$;

