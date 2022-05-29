const {response} = require('express');
const db = require('../database/db-config');
const User = require('../entities/user');



const {createUser, loginUser} = require('./user')

const register = (req, res = response) => {

    createUser(req, res);
    
}

const login = (req, res = response) => {

    loginUser(req, res);
    
}

module.exports = {register, login}
