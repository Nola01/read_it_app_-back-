const db = require('../database/db-config');
const Book = require('../entities/book');

const getAllBooks = (req, res) => {
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

const createBook = (req, res, token) => {
    const {isbn, title, author, image} = req.body;

    const newBook = new Book(isbn, title, author, image);
}

module.exports = {getAllBooks, createBook};
