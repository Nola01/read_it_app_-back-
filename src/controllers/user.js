
const db = require('../database/db-config');
const User = require('../entities/user');

var bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)

const getAllUsers = (req, res) => {
    
    db.getConnection((err, connection) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                msg: "Error al conectar con el servidor",
            })
        };

        connection.query('SELECT * FROM users', (err, users) => {
            connection.release();

            if(!err) {
                res.status(200).send(users);    
                console.log('Obtener usuarios de la bd');
            } else {
                console.log(err);
                return res.status(404).json({
                    ok: false,
                    msg: "Error al encontrar usuarios",
                })
                
            }

            // connection.end();
        })
    })
}

const loginUser = async (req, res, token) => {

    const {email, password} = req.body;

    db.getConnection((err, connection) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                msg: "Error al conectar con el servidor",
            })
        };

        connection.query('SELECT * FROM users WHERE email = ?', email, (err, users) => {
            connection.release();

            if(!err) {
                // verify there is a user with this email in the database
                if(users.length !== 0) {
                    const user = users[0];

                    // verify password is correct
                    if(! bcrypt.compareSync(password, user.password)) {
                        return res.status(400).json({
                            ok: false,
                            msg: "Contraseña incorrecta",
                        })
                    }
                    return res.status(200).json({
                        ok: true,
                        msg: "login",
                        email: user.email,
                        password: user.password,
                        token
                    }) 

                } else {
                    return res.status(404).json({
                        ok: false,
                        msg: "El usuario no está registrado",
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

const createUser = (req, res, token) => {
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
                                pin,
                                token
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
                    return res.status(400).json({
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

module.exports = {getAllUsers, loginUser, createUser};
