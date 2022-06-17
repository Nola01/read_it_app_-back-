const {response} = require('express');

const {generateJWT} = require('../helper/jwt')

const {createUser, loginUser} = require('./user')

const register = async (req, res = response) => {
    createUser(req, res);
    
}

const login = async (req, res = response) => {

    loginUser(req, res);
    
}

const resetToken = async (req, res = response) => {
    const {id, name, role} = req
    const token = await generateJWT(id, name, role);
    return res.json({
        ok: true,
        msg: 'Revalidando token',
        token
    })
}

module.exports = {register, login, resetToken}
