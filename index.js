const inquirer = require('inquirer');
const mysql = require('mysql2');
require('console.table');
const connection = require('./db/connection');

function companyOptions() {
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'menu',
            message: 'You can view or manage the departments, roles and/or employees in the company. Which would you like to do? (Select from the following options)',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update a current employee',
                'All done!'
            ]
        }
    ])
    .then(userChoice => {
        switch (userChoice.menu) {
            case 'View all departments':
                viewDepartments();
                break;
            case 'View all roles': 
                viewRoles();
                break;
            case 'View all employees':
                viewEmployees();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Update a current employee':
                updateEmployee();
                break;
            case 'All done!':
                process.exit();
            
        }
    })
}

// viewing
function viewDepartments() {
    connection.promise().query(`
    SELECT * FROM department;
    `)
    .then( function([rows]){
        console.table(rows);
        companyOptions();
    })
}

function viewRoles() {
    connection.promise().query(`
    SELECT * FROM role;
    `)
    .then( function([rows]){
        console.table(rows);
        companyOptions();
    })
}


function viewEmployees() {
    connection.promise().query(`
    SELECT * FROM employee;
    `)
    .then( function([rows]){
        console.table(rows);
        companyOptions();
    })
}

// Adding
function addDepartment(){
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter a department name'
        }
    ])
    .then(ans => {
        connection.promise().query(`
        INSERT INTO department SET ?
        `, ans)
        .then(()=> {
            console.log('Department added.');
            companyOptions();
        })
    });
};

function addRole(){
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'title',
            message: "Enter a department name:"
        },
        {
            type: 'number',
            name: 'salary',
            message: 'Enter the departments salary:'
        },
        {
            type: 'number',
            name: 'departmentId',
            message: 'Give the department an ID:'
        }
    ]).then(ans =>{
        connection.promise().query(
            `INSERT INTO role SET ?`,
            {
                title: ans.title,
                salary: ans.salary,
                department_id: ans.departmentId
            }
        ).then(() => {
            console.log('Role added to company!');
            companyOptions();
        })
    })
}

function addEmployee() {
    connection.promise().query(
        `SELECT * FROM role`
    ).then(function([rows]) {
        let roles = rows.map(role => {
            return { value: role.id, name: role.title}
        })
        inquirer
        .prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'Enter new employees first name:'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Enter new employees last name:'
        },
        {
            type: 'list',
            name: 'roleId',
            message: 'Which role does this employee have in the company:',
            choices: roles
        }
        ]).then(ans => {
            connection.promise().query(
                `INSERT INTO employee SET ?`,
                {
                    first_name: ans.firstName,
                    last_name: ans.lastName,
                    role_id: ans.roleId
                }
            )
        })
    })
}

// Updating
function updateEmployee(){
    connection.promise().query(
        `SELECT * FROM employee`
    ).then(function([rows]) {
        let employees = rows.map(employee => {
            return { value: employee.id, name: employee.first_name + " " + employee.last_name }
        })
        inquirer.prompt([
            {
                type: 'list',
                name: 'employeeId',
                message: 'Choose employee to update:',
                choices: employees
            }
        ])
        .then(ans =>{
            let employee = ans.employeeId;
            connection.promise().query(
                `SELECT * FROM role`
            ).then(function([rows]) {
                let roles = rows.map(role => {
                    return { value: role.id, name: role.title }
                })
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'roleId',
                        message: 'What role does this employee now have:',
                        choices: roles
                    }
                ]).then( ans => {console.log(ans); console.log(employee)
                connection.promise().query(
                    `UPDATE employee SET role_id = ? WHERE id = ?`, [ans.roleId, employee]
                ).then( function(){
                    console.log('Employee has been updated');
                    companyOptions();
                })
                })
            })
        })
    })
}

companyOptions();