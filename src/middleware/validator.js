const { response } = require('express');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

const {getUserById} = require('../controllers/user')

const validateFields = (req,res = response, next) => {
    const errors = validationResult(req);
    console.log(errors);

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
        let tokenId = '';
        let tokenRole = '';
        jwt.verify(token, process.env.PRIVATE_KEY, (err, token) => {
            //console.log(token)
            if (err) {
                throw err
            }
            req.id = token.id
            req.name = token.name
            req.role = token.role
            //console.log(token.name)
            tokenId = token.id
            tokenRole = token.role
            //console.log(tokenId);
        })
        const user = getUserById(req, res);
        console.log(user)
        //console.log(tokenRole != 0)
        if (!user || tokenRole.match('profesor')) {
            return res.status(403).json({
                ok: false,
                msg: 'Solo un usuario con rol profesor puede crear itinerarios y libros',
            })
        }
        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token erróneo',
        })
    }
    next()
}

module.exports = {validateFields, validateUser};
