const { response } = require('express');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const db = require('../database/db-config');

const {getUserById} = require('../controllers/user')

const validateFields = (req,res = response, next) => {
    const errors = validationResult(req);
    // console.log(errors);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            msg: errors.mapped()
        })
    }

    next()
}

const validateUser = (req, res = response, next) => {
    const token = req.header('x-token')
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No existe token',
        })
    }
    try {
        let tokenId;
        let tokenRole;
        jwt.verify(token, process.env.PRIVATE_KEY, (err, token) => {
            //console.log(token)
            if (err) {
                throw err
            }
            // console.log(token.id_user);
            req.id_user = token.id_user
            req.name = token.name
            req.role = token.role
            //console.log(token.name)
            // console.log(req.id);
            tokenId = token.id_user
            tokenRole = token.role
            //console.log(tokenId);
        })

        // console.log(tokenId);

        db('users').where('id_user', tokenId)
        .then(
            (users) => {
                if(users.length !== 0) {
                    const user = users[0];
                    // console.log(user);

                    if (!user || tokenRole.match('alumno')) {
                        return res.status(403).json({
                            ok: false,
                            msg: 'Solo un usuario con rol profesor puede crear itinerarios y libros',
                        })
                    } 

                    // return res.status(200).json({
                    //     ok: true,
                    //     msg: "Usuario correcto",
                    // }) 

                    next()

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
        
    } catch (error) {
        // console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Token erróneo',
        })
    }
}

module.exports = {validateFields, validateUser};
