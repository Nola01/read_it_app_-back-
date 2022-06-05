const { Router } = require('express');
const {check} = require('express-validator');
const {validateFields, validateUserToken} = require('../middleware/validator');
const {validateJWT} = require('../middleware/validate-token');

const {getAllBooks, createBook, deleteBook, updateBook} = require('../controllers/book');

const router = Router()

router.get('/', getAllBooks)

router.post('/new', 
    [
        check('title', 'Campo nombre no puede estar vacío').notEmpty(),
        validateFields
    ], 
    validateUserToken,
    validateJWT, 
    createBook
)

router.delete('/:id', validateUserToken, validateJWT, deleteBook)

router.put('/:id', validateUserToken, validateJWT, updateBook)

module.exports = router