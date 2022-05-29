const {response} = require('express');
const db = require('../database/db-config');
const User = require('../entities/user');
const {createUser} = require('./user')

const register = (req, res = response) => {
    const {name, password, email, role, pin} = req.body;

    const newUser = new User(name, password, email, role, pin);

    createUser(req, res);

    
}

const login = (req, res = response) => {
    const {email, password} = req.body;
    
    return res.json({
        ok: true,
        msg: "ok login",
        email,
        password
    })
}

module.exports = {register, login}
