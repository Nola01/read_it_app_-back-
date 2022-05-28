const { Router } = require('express');
const db = require('../database/db-config')

const router = Router();

const getAllUsers = (req, res) => {
    db.getConnection((err, connection) => {
        if (err) throw err
        console.log('Conectado a la bd');

        connection.query('Select * from users', (err, rows) => {
            connection.release()

            if(!err) {
                res.send(rows)
            } else {
                console.log(err);
            }
        })
    })
}

module.exports = {getAllUsers};
