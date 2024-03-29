const jwt = require('jsonwebtoken');

const generateJWT = (id_user, name, role) => {
    return new Promise((resolve, reject) => {
        const payload = {id_user, name, role}
        // process.env.PRIVATEKEY
        jwt.sign(payload, process.env.PRIVATE_KEY, { expiresIn : '1h' }, (err, token) => {
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
