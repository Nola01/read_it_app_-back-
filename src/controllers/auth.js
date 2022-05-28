const {response} = require('express');

const register = (req, res = response) => {
    const {name, password, email, role, pin} = req.body;

    return res.json({
        ok: true,
        msg: "register",
        name, 
        password, 
        email, 
        role, 
        pin
    })
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
