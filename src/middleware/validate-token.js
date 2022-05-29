const {response} = require('express');
const jwt = require('jsonwebtoken')


const validateJWT = (req, res, next) => {

    const token = req.header('x-token');
    
    if(!token) {
        return res.status(401).json({
            ok: 'false',
            msg: 'No hay token de autorización'
        })
    }

    // validation
    try {
        const {id, name} = jwt.verify(token, 'privateKey12345');
        req.id = id;
        req.name = name;
    } catch (error) {
        return res.status(401).json({
            ok: 'false',
            msg: 'Token no válido'
        })
    }

    next()
}

module.exports = {validateJWT}
