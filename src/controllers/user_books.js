const db = require('../database/db-config');
const {getBookByIsbn} = require('./book')

const createUserBooks = async (req, res, studentsList, booksList) => {

    const errorList = []


    booksList.map(book => {
        studentsList.map(student => {
            const obj = {id_user: student, id_book: book}
            // console.log(obj);

            db('users_books').insert(obj)
            .then(
                () => {
                    console.log('Insertados libros del usuario');
                }
            )
            .catch(err => {
                errorList.push({ok: false, msg: 'Error al insertar libros del usuario', err})
            })
        })
    })

    return errorList

}

const getUserBooks = (req, res) => {
    const {id} = req.params;

    db('users_books').where('id_user', id)
    .then(
        async (list) => {
            const books = []
            const isbnList = []

            list.map(obj => {
                isbnList.push(obj.id_book)
            })
            console.log(isbnList);
            
            let promises = []
            promises = isbnList.map(async (isbn) => {
                const book = await getBookByIsbn(isbn)
                books.push(book)
            })
            await Promise.all(promises)
            return res.status(200).send(books)
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

module.exports = {createUserBooks, getUserBooks}
