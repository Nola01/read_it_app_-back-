const { Router } = require('express');
const db = require('../database/db-config')
const User = require('../entities/user')

const getAllUsers = (req, res) => {
    db.getConnection((err, connection) => {
        if (err) throw err
        console.log('Get all users from db');

        connection.query('Select * from users', (err, users) => {
            connection.release()

            if(!err) {
                res.send(users)
            } else {
                console.log(err);
            }
        })
    })
}

module.exports = {getAllUsers};
