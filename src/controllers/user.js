
const db = require('../database/db-config');
const User = require('../entities/user');

const getAllUsers = (req, res) => {
    db.getConnection((err, connection) => {
        if (err) throw err;

        connection.query('SELECT * FROM users', (err, users) => {
            connection.release();

            if(!err) {
                res.send(users);
                console.log('Obtener usuarios de la bd');
            } else {
                console.log(err);
            }
        })
    })
}

const createUser = (newUser) => {
    db.getConnection((err, connection) => {
        if (err) throw err;

        connection.query('INSERT INTO users SET ?', newUser, (err, users) => {
            connection.release();

            if(!err) {
                // res.send(`Usuario ${newUser.name} añadido`);
                console.log('Crear nuevo usuario');
            } else {
                console.log(err);
            }
        })
    })
}

module.exports = {getAllUsers, createUser};
