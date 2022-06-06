const db = require('../database/db-config');

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

module.exports = {createUserBooks}
