const { Router } = require('express');
const {check} = require('express-validator');
const {validateFields, validateUser} = require('../middleware/validator');
const {validateJWT} = require('../middleware/validate-token');

const {getAllBooks, createBook, deleteBook, updateBook} = require('../controllers/book');

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

router.delete('/:id', validateUser, validateJWT, deleteBook)

router.put('/:id', validateUser, validateJWT, updateBook)

module.exports = router