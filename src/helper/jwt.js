const jwt = require('jsonwebtoken');

const generateJWT = (id, name, role) => {
    return new Promise((resolve, reject) => {
        const payload = {id,name,role}
        // process.env.PRIVATEKEY
        jwt.sign(payload, 'privateKey12345', { expiresIn : '1h' }, (err, token) => {
            if (err) {
                console.log(err)
                reject('No se puede generar el token')
            } else {
                resolve(token)
            }
        });
    })
}

module.exports = {generateJWT}
