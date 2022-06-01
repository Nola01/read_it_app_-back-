const { Router } = require('express')
const {getAllItineraries} = require('../controllers/itinerary')

const router = Router()

router.get('/', getAllItineraries);

module.exports = router