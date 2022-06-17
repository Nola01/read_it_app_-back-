const {response} = require('express');
const jwt = require('jsonwebtoken')


const validateJWT = (req, res, next) => {

    const token = req.header('x-token');
    
    if(!token) {
        return res.status(401).json({
            ok: 'false',
            msg: 'No existe token'
        })
    }

    // validation
    try {
        jwt.verify(token, process.env.PRIVATE_KEY, (err, token) => {
            //console.log(token)
            if (err) {
                throw err
            }
            req.id = token.id
            req.name = token.name
        })
    } catch (error) {
        return res.status(401).json({
            ok: 'false',
            msg: 'Token no válido'
        })
    }

    next()
}

module.exports = {validateJWT}
