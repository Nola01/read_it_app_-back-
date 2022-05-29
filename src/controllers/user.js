
const db = require('../database/db-config');
const User = require('../entities/user');

var bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)

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

    let user = [];

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

    return user;

}

const createUser = (req, res) => {
    const {name, password, email, role, pin} = req.body;

    const newUser = new User(name, password, email, role, pin);

    newUser.password = bcrypt.hashSync(password, salt);

    db.getConnection((err, connection) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                msg: "Error al conectar con el servidor",
            })
        };

        connection.query('SELECT * FROM users WHERE email = ?', email, (err, users) => {
            connection.release();
            // console.log('Select ', users);
            if(!err) {
                if(users.length === 0) {
                    connection.query('INSERT INTO users SET ?', newUser, (err, users) => {
                        // connection.release();
            
                        if(!err) {
                            // console.log(users);
                            // res.send(`Usuario ${newUser.name} añadido`);
                            console.log('Crear nuevo usuario');
                            return res.status(201).json({
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
                            return res.status(404).json({
                                ok: false,
                                msg: "Error al registrar usuario",
                            })
                        }
            
                        // connection.end();
                    })
                } else {
                    return res.status(404).json({
                        ok: false,
                        msg: "El usuario ya está registrado",
                    })
                }
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

module.exports = {getAllUsers, getUserByEmail, createUser};
