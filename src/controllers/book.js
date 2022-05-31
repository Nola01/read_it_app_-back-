const db = require('../database/db-config');
const Book = require('../entities/book');

const getAllBooks = async (req, res) => {
    db.select('*').from('books')
    .then(
        (books) => {
            return res.status(200).send(books)
        }
    )
    .catch((err) => {
        return res.status(500).json({
            ok: false,
            msg: "Error en el servidor",
        })
    })
}

module.exports = {getAllBooks};
