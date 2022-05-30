
const db = require('../database/db-config');
const User = require('../entities/user');

var bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)

const getAllUsers = async (req, res) => {

    db.select('*').from('users')
    .then(
        (users) => {
            return res.status(200).send(users)
        }
    )
    .catch((err) => {
        return res.status(500).json({
            ok: false,
            msg: "Error en el servidor",
        })
    })
    
}

const loginUser = async (req, res, token) => {

    const {email, password} = req.body;

    db.select('*').from('users').where({email})
    .then(
        (users) => {
            // console.log(users);
            // verify there is a user with this email in the database
            if(users.length !== 0) {
                const user = users[0];

                // verify password is correct
                if(! bcrypt.compareSync(password, user.password)) {
                    return res.status(401).json({
                        ok: false,
                        msg: "Contraseña incorrecta",
                    })
                }
                return res.status(200).json({
                    ok: true,
                    msg: "Login correcto",
                    email: user.email,
                    password: user.password,
                    token
                }) 
            } else {
                console.log(err);
                return res.status(404).json({
                    ok: false,
                    msg: "Este correo electrónico no está registrado",
                })
            }
        }
    )
    .catch((err) => {
        return res.status(500).json({
            ok: false,
            msg: "Error en el servidor",
        })
    })

}

const createUser = (req, res, token) => {
    const {name, password, email, role, pin} = req.body;

    const newUser = new User(name, password, email, role, pin);

    newUser.password = bcrypt.hashSync(password, salt);

    db.select('*').from('users').where({email})
    .then(
        (users) => {
            if(users.length === 0) {
                console.log(newUser);
                db('users').insert(newUser)
                .then(
                    (id) => {
                        return res.status(201).json({
                            ok: false,
                            msg: "Usuario registrado",
                            id
                        })
                    }
                )
                .catch((err) => {
                    return res.status(400).json({
                        ok: false,
                        msg: "Error al crear un nuevo usuario",
                    })
                })
            } else {
                return res.status(400).json({
                    ok: false,
                    msg: "El usuario ya está registrado",
                })
            }
        }
    )
    .catch((err) => {
        return res.status(500).json({
            ok: false,
            msg: "Error en el servidor",
        })
    })
}

module.exports = {getAllUsers, loginUser, createUser};
