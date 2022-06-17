const { Router } = require('express')
const {getAllUsers, getAllStudents, getUserById} = require('../controllers/user')
const {getUserBooks} = require('../controllers/user_books')

const router = Router()

router.get('/', getAllUsers)

router.get('/students', getAllStudents)

router.get('/:id', getUserById)

router.get('/books/:id', getUserBooks)

module.exports = router