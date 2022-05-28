const { Router } = require('express');
const {register, login} = require('../controllers/auth');
const {check} = require('express-validator');
const router = Router();

// Main route
router.get('/', (req, res) => {
    res.send('Hello World')
})

router.post(
    '/register', 
    [
        check('name', 'El nombre no puede estar vacío').notEmpty(),
        check('email', 'El correo electrónico no es válido').isEmail(),
        check('password', 'La contraseña debe tener al menos 8 caracteres').isLength({min:8}),
        check('role', 'Debe seleccionar un rol (alumno o profesor)').notEmpty().matches(/alumno|profesor/),
    ], 
    register)

router.post('/login', login)

module.exports = router;