const { Router } = require('express');
const {check} = require('express-validator');
const {getAllBooks, createBook} = require('../controllers/book');
const {validateFields, validateUser} = require('../middleware/validator');
const {validateJWT} = require('../middleware/validate-token');

const router = Router()

router.get('/', getAllBooks)

router.post('/new', 
    [
        check('title', 'Campo nombre no puede estar vacío').notEmpty(),
        validateFields
    ], 
    validateUser,
    validateJWT, 
    createBook
)

module.exports = router