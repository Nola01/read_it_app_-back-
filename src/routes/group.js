const { Router } = require('express')
const {getAllGroups} = require('../controllers/group')

const router = Router()

router.get('/', getAllGroups)

module.exports = router