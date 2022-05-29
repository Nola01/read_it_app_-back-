const {response} = require('express');
const db = require('../database/db-config');
const User = require('../entities/user');

const {generateJWT} = require('../helper/jwt')



const {createUser, loginUser} = require('./user')

const register = async (req, res = response) => {
    const {name, password, email, role, pin} = req.body;

    const user = new User(name, password, email, role, pin);

    // generate token
    const token = await generateJWT(user.id, user.name);

    createUser(req, res, token);
    
}

const login = async (req, res = response) => {

    const {name, password, email, role, pin} = req.body;

    const user = new User(name, password, email, role, pin);

    // generate token
    const token = await generateJWT(user.id, user.name);

    loginUser(req, res, token);
    
}

const resetToken = async (req, res = response) => {
    const {id, name} = req.body;
    const token = await generateJWT(id, name);
    return res.json({
        ok: true,
        msg: 'Revalidando token',
        token
    })
}

module.exports = {register, login, resetToken}
