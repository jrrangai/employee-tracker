const mysql = require('mysql2');\

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'employees'
    },
    console.log('Connected to the election database')
);

connection.connect(function (err) {
    if (err) throw err;
});

module.exports = db;