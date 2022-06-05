const { Router } = require('express')
const {check} = require('express-validator');
const {validateFields, validateItinerary, validateUserToken} = require('../middleware/validator');
const {validateJWT} = require('../middleware/validate-token');

const {getAllItineraries, createItinerary, deleteItinerary, updateItinerary} = require('../controllers/itinerary')

const router = Router()

router.get('/', getAllItineraries);

router.post('/new', 
    [
        check('name', 'Campo nombre no puede estar vacío').notEmpty(),
        check('department', 'Campo departamento no puede estar vacío').notEmpty(),
        validateFields
    ], 
    validateUserToken,
    validateJWT, 
    createItinerary
)

router.delete('/:id', validateItinerary, validateUserToken, validateJWT, deleteItinerary)

router.put('/:id', validateItinerary, validateUserToken, validateJWT, updateItinerary)

module.exports = router