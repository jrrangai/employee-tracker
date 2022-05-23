USE company;
DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS employee;

CREATE TABLE department (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE role (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL,
    department_id INTEGER,
    FOREIGN KEY(department_id) REFERENCES department(id)
);

CREATE TABLE employee (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) UNIQUE NOT NULL,
    last_name VARCHAR(30) UNIQUE NOT NULL,
    role_id INTEGER,
    FOREIGN KEY(role_id) REFERENCES role(id),
    manager_id INTEGER,
    FOREIGN KEY(manager_id) REFERENCES employee(id)
    ON DELETE SET NULL
);