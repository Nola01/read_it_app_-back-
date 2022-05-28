const mysql = require('mysql');
const { Router } = require('express');

const router = Router();

const db = mysql.createPool({
    connectionLimit : 10,
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'read_it'
})


router.get('/', (req, res) => {
    db.getConnection((err, connection) => {
    if (err) throw err
    console.log('Conectado a la bd');

    connection.query('Select * from test', (err, rows) => {
        connection.release()

        if(!err) {
            res.send(rows)
        } else {
            console.log(err);
        }
    })
})
})

module.exports = router;


