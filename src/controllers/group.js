const db = require('../database/db-config');

const getAllGroups = (req, res) => {
    db.select('*').from('groups')
    .then(
        (groups) => {
            return res.status(200).send(groups)
        }
    )
    .catch((err) => {
        return res.status(500).json({
            ok: false,
            msg: "Error en el servidor",
        })
    })
}

module.exports = {getAllGroups}
