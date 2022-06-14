const db = require('../database/db-config');
const Book = require('../models/book');

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

const getBookByIsbn = async (isbn) => {
    return db('books').where({isbn})
    .then(
        (books) => {
            if (books.length !== 0) {
                const book = books[0]
                return book
            } else {
                const error = 'Error'
                return error
            }
            
        }
    )
}

const createBook = (req, res) => {
    const {isbn, title, author} = req.body;

    let {image} = req.body

    const newBook = new Book(isbn, title, author, image);

    if (!image) {
        image = ''
    }

    if (!isbn) {
        return res.status(400).json({
            ok: false,
            msg: "Debe introducir el isbn",
        })
    }

    // console.log('Crea libro');

    db.select('*').from('books').where({isbn})
    .then(
        (books) => {
            if(books.length === 0) {
                // console.log(newBook);
                db('books').insert(newBook)
                .then(
                    () => {
                        return res.status(201).json({
                            ok: true,
                            msg: "Libro registrado",
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

const deleteBook = (req, res) => {

    const {id} = req.params;

    // console.log('isbn', id);

    db('books').where('isbn', id)
    .then(
        (books) => {
            if(books.length !== 0) {
                const book = books[0];
                // console.log(book);
                db('books').where('isbn', book.isbn).del()
                .then(
                    () => {
                        return res.status(200).json({
                            ok: false,
                            msg: "Libro borrado",
                        })
                    }
                )
                .catch((err) => {
                    return res.status(400).json({
                        ok: false,
                        msg: "Error al eliminar libro",
                    })
                })
            } else {
                return res.status(400).json({
                    ok: false,
                    msg: "El libro que quiere borrar no existe",
                })
            }
        }
    )
    .catch((err) => {
        return res.status(500).json({
            ok: false,
            msg: "Error en el servidor",
            err
        })
    })
}

const updateBook = (req, res) => {

    const {id} = req.params;

    const {title, author, image} = req.body;

    const bookUpdate = new Book(id, title, author, image);

    // console.log('isbn', id);

    db('books').where('isbn', id)
    .then(
        (books) => {
            if(books.length !== 0) {
                const book = books[0];
                // console.log(book);
                db('books').where('isbn', book.isbn).update(bookUpdate)
                .then(
                    () => {
                        return res.status(200).json({
                            ok: false,
                            msg: "Libro actualizado",
                        })
                    }
                )
                .catch((err) => {
                    return res.status(400).json({
                        ok: false,
                        msg: "Error al actualizar libro",
                    })
                })
            } else {
                return res.status(400).json({
                    ok: false,
                    msg: "El libro que quiere actualizar no existe",
                })
            }
        }
    )
    .catch((err) => {
        return res.status(500).json({
            ok: false,
            msg: "Error en el servidor",
            err
        })
    })
    
}

module.exports = {getAllBooks, getBookByIsbn, createBook, deleteBook, updateBook};
