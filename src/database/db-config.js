const mysql = require('mysql');

// config
const db = mysql.createPool({
    connectionLimit : 10,
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'read_it'
})




module.exports = db



