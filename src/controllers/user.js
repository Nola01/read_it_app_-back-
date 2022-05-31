
const db = require('../database/db-config');
const User = require('../entities/user');
const {generateJWT} = require('../helper/jwt');

var bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)

const getAllUsers = (req, res) => {

    // try {
        // const db = createConnection();
        
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
        // .finally(() => {
        //     db.destroy().then(() => {
        //         console.log('Conexión cerrada');
        //     });
        // })
    // } catch (error) {
    //     return res.status(500).json({
    //         ok: false,
    //         msg: "Error al conectar con el servidor",
    //     })
    // }
    
}

const getUserById = (req, res) => {
    const {id} = req.params;

    db('users').where('id_user', id)
    .then(
        (users) => {
            if(users.length !== 0) {
                const user = users[0];
                return user;
            } else {
                return res.status(404).json({
                    ok: false,
                    msg: "El usuario no existe",
                })
            }
        }
    )
    .catch((err) => {
        return res.status(500).json({
            ok: false,
            msg: "Error en el servidor",
        })
    });
}



const loginUser = async (req, res) => {

    const {email, password} = req.body;

    db('users').where('email', email)
        .then(
            async (users) => {
                if(users.length !== 0) {
                    const user = users[0];
                    // generate token
                    console.log('Usuario ', user);
                    const token = await generateJWT(user.id_user, user.name, user.role);

                    console.log('error');
                    // verify password is correct
                    if(! bcrypt.compareSync(password, user.password)) {
                        return res.status(401).json({
                            ok: false,
                            msg: "Contraseña incorrecta",
                        })
                    }
                    // return res.status(200).json({
                    //     ok: true,
                    //     msg: "Login correcto",
                    //     email: user.email,
                    //     password: user.password,
                    //     token
                    // }) 
                } else {
                    return res.status(500).json({
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
        });
    
    

}

const createUser = async (req, res) => {

    const {name, password, email, role, pin} = req.body;

    const newUser = new User(name, password, email, role, pin);

    newUser.password = bcrypt.hashSync(password, salt);

    // generate token
    const token = await generateJWT(newUser.id_user, newUser.name, newUser.role);

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
                            id,
                            token
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

module.exports = {getAllUsers, getUserById, loginUser, createUser};
