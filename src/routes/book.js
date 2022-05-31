const { Router } = require('express')
const {getAllBooks} = require('../controllers/book')

const router = Router()

router.get('/', getAllBooks)

module.exports = router