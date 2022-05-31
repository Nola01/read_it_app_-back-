const {response} = require('express');
const db = require('../database/db-config');
const User = require('../entities/user');

const {generateJWT} = require('../helper/jwt')




const {createUser, loginUser} = require('./user')

const register = async (req, res = response) => {
    const {name, password, email, role, pin} = req.body;

    const user = new User(name, password, email, role, pin);

    createUser(req, res);
    
}

const login = async (req, res = response) => {

    const {name, password, email, role, pin} = req.body;

    const user = new User(name, password, email, role, pin);

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
