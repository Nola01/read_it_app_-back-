const { Router } = require('express');
const {register, login} = require('../controllers/auth')
const router = Router();

// Main route
router.get('/', (req, res) => {
    res.send('Hello World')
})

router.post('/register', register)

router.post('/login', login)

module.exports = router;