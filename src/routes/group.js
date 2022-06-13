const { Router } = require('express')
const {getAllGroups, getUserGroups} = require('../controllers/group')

const router = Router()

router.get('/', getAllGroups)

router.get('/:id', getUserGroups)


module.exports = router