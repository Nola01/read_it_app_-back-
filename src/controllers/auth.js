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

const login = (req, res = response) => {

    loginUser(req, res);
    
}

module.exports = {register, login}
