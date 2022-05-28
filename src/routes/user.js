const { Router } = require('express')
const {getAllUsers} = require('../controllers/user')

const router = Router()

router.get('/', getAllUsers)

module.exports = router