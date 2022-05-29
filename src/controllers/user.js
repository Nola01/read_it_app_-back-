
const db = require('../database/db-config');
const User = require('../entities/user');

const getAllUsers = (req, res) => {
    db.getConnection((err, connection) => {
        if (err) {
            res.status(500).json({
                ok: false,
                msg: "Error al conectar con el servidor",
            })
            return;
        };

        connection.query('SELECT * FROM users', (err, users) => {
            connection.release();

            if(!err) {
                res.send(users);
                console.log('Obtener usuarios de la bd');
            } else {
                console.log(err);
                res.status(404).json({
                    ok: false,
                    msg: "Error al encontrar usuarios",
                })
                
            }

            connection.end();
        })
    })
}



const createUser = (req, res) => {
    const {name, password, email, role, pin} = req.body;

    const newUser = new User(name, password, email, role, pin);

    db.getConnection((err, connection) => {
        if (err) {
            res.status(500).json({
                ok: false,
                msg: "Error al conectar con el servidor",
            })
            return;
        };

        connection.query('INSERT INTO users SET ?', newUser, (err, users) => {
            connection.release();

            if(!err) {
                // res.send(`Usuario ${newUser.name} añadido`);
                console.log('Crear nuevo usuario');
                res.status(201).json({
                    ok: true,
                    msg: "register",
                    name, 
                    password, 
                    email, 
                    role, 
                    pin
                })
            } else {
                console.log(err);
                res.status(404).json({
                    ok: false,
                    msg: "Error al registrar usuario",
                })
            }

            // connection.end();
        })
    })
}

module.exports = {getAllUsers, createUser};
