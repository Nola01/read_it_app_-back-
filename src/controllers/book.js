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

    console.log('Crea libro');

    db.select('*').from('books').where({isbn})
    .then(
        (books) => {
            if(books.length === 0) {
                console.log(newBook);
                db('books').insert(newBook)
                .then(
                    () => {
                        return res.status(201).json({
                            ok: false,
                            msg: "Libro registrado",
                            token
                        })
                    }
                )
                .catch((err) => {
                    return res.status(400).json({
                        ok: false,
                        msg: "Error al crear un nuevo libro",
                    })
                })
            } else {
                return res.status(400).json({
                    ok: false,
                    msg: "El libro ya existe",
                })
            }
        }
    )
    .catch((err) => {
        return res.status(500).json({
            ok: false,
            msg: "Error en el servidor",
        })
    })
}

module.exports = {getAllBooks, createBook};
