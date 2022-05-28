const {response} = require('express');
const {validationResult} = require('express-validator');

const register = (req, res = response) => {
    const {name, password, email, role, pin} = req.body
    const errors = validationResult(req);
    console.log(errors);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            msg: errors.mapped()
        })
    }

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
    const {email, password} = req.body
    const errors = validationResult(req);
    console.log(errors);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            msg: errors.mapped()
        })
    }
    
    res.json({
        ok: true,
        msg: "ok login",
        email,
        password
    })
}

module.exports = {register, login}
