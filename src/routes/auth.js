const { Router } = require('express');
const {register, login, resetToken} = require('../controllers/auth');
const {createUser} = require('../controllers/user');
const {check} = require('express-validator');
const {validateFields} = require('../middleware/validator');
const {validateJWT} = require('../middleware/validate-token');

const router = Router();

// Main route
router.get('/', (req, res) => {
    res.send('Hello World')
})

router.post('/register', 
    [
        check('name', 'El nombre no puede estar vacío').notEmpty(),
        check('email', 'El correo electrónico no es válido').isEmail(),
        check('password', 'La contraseña debe tener al menos 8 caracteres').isLength({min:8}),
        check('password', 'La contraseña no puede tener más de 16 caracteres').isLength({max:16}),
        // check('role', 'Debe seleccionar un rol (alumno o profesor)').notEmpty().matches(/alumno|profesor/),
        validateFields
    ],
    register)

router.post('/login',
    [
        check('email', 'El correo electrónico no es válido').isEmail(),
        check('password', 'La contraseña debe tener al menos 8 caracteres').isLength({min:8}),
        check('password', 'La contraseña no puede tener más de 16 caracteres').isLength({max:16}),
        validateFields
    ], 
    login)

router.get('/reset', validateJWT, resetToken)

module.exports = router;