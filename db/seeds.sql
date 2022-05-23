INSERT INTO department (name) 
VALUES 
    ("HR"),
    ("Accounting"),
    ("Developers"),
    ("Recruiters");

INSERT INTO role (title, salary, department_id)
VALUES
    ("Office lead", 12, 1),
    ("Finance Specialist", 1000000, 2),
    ("Junior Developer", 75000, 3),
    ("Intern Recruiter", 0, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ("Bob", "Smite", 1, NULL),
    ("John", "Hope", 2, NULL),
    ("Ricky", "Bobby", 3, 1),
    ("James", "Buck", 4, 2);
