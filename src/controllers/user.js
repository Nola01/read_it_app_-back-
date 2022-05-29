
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
                res.status(200).send(users);    
                console.log('Obtener usuarios de la bd');
            } else {
                console.log(err);
                res.status(404).json({
                    ok: false,
                    msg: "Error al encontrar usuarios",
                })
                
            }

            // connection.end();
        })
    })
}

const getUserByEmail = async (req, res) => {

    const {email} = req.body;

    db.getConnection((err, connection) => {
        if (err) {
            res.status(500).json({
                ok: false,
                msg: "Error al conectar con el servidor",
            })
            return;
        };

        connection.query('SELECT * FROM users WHERE email = ?', email, (err, users) => {
            connection.release();

            if(!err) {
                user = users
                console.log(users);
                res.status(200).json(users);
                console.log('Obtener usuario por email');
            } else {
                console.log(err);
                return res.status(404).json({
                    ok: false,
                    msg: "Error al encontrar usuario por email",
                })
            }

            // connection.end();
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

module.exports = {getAllUsers, getUserByEmail, createUser};
