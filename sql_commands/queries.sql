-- query for calulating total budget for a department

SELECT d.name AS department_name, SUM(r.salary) AS total_budget
FROM employee e
JOIN role r ON e.role_id = r.id
JOIN department d ON r.department = d.id
GROUP BY d.name;
