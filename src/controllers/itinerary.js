const db = require('../database/db-config');
const Itinerary = require('../entities/itinerary');

const getAllItineraries = (req, res) => {
    db.select('*').from('itineraries')
    .then(
        (itineraries) => {
            return res.status(200).send(itineraries)
        }
    )
    .catch((err) => {
        return res.status(500).json({
            ok: false,
            msg: "Error en el servidor",
        })
    })
}

module.exports = {getAllItineraries};
