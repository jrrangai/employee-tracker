const inquirer = require('inquirer');

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
                'Update a current employee'
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
        }
    })
}

function viewDepartments()
module.exports = db;