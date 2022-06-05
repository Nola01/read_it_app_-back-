const db = require('../database/db-config');
const Itinerary = require('../entities/itinerary');

const jwt = require('jsonwebtoken');
// const { response } = require('express');

const getAllItineraries = async (req, res) => {
    db.select('*').from('itineraries')
    .then(
        (itineraries) => {
            // console.log(itineraries);

            const itinerariesId = [];
            console.log(itineraries);
            itineraries.map(itinerary => {
                itinerariesId.push(itinerary.id_itinerary)
            })
            // console.log(itinerariesId);

            // let bookList = [];
            // let studentsList = [];

            const response = [];

            db('itineraries_books').whereIn('id_itinerary', itinerariesId)
            .then(
                async itineraryBooksList => {
                    
                    const idList = []
                    itineraryBooksList.map(obj => {
                        idList.push(obj.id_itinerary)
                    })

                    let promises = [...idList]

                    promises = idList.map(async (id) => {
                        return getItineraryBooks(id).then(books => {
                            // console.log('PRUEBA ', books);
                            // bookList.push(books)
                            const resp = {id, books};
                            response.push(resp)
                        })
                    })

                    // console.log(promesas);
                    await Promise.all(promises)

                    // console.log(itineraries);

                    // console.log('lista libros: ', bookList);
                }
            )

            db('itineraries_students').whereIn('id_itinerary', itinerariesId)
            .then(
                async itineraryStudentsList => {
                    
                    const idList = []
                    itineraryStudentsList.map(obj => {
                        idList.push(obj.id_itinerary)
                    })

                    let promises = [...idList]

                    promises = idList.map(async (id) => {
                        return getItineraryStudents(id).then(students => {
                            // console.log('PRUEBA ', students);
                            // studentsList.push(students)

                            response.map(obj => {
                                obj.students = students
                            })
                        })
                    })

                    await Promise.all(promises)

                    promises = [...response]

                    promises = response.map(async (obj) => {
                        return getItineraryById(obj.id).then(itinerary => {
                            obj.itinerary = itinerary;
                            delete obj.id
                        })
                    })

                    await Promise.all(promises)

                    return res.status(200).json({
                        ok: true,
                        msg: 'Obtener todos los libros',
                        response
                    })
                }
            )
        }
    )
    .catch((err) => {
        return res.status(500).json({
            ok: false,
            msg: "Error en el servidor",
        })
    })
}

const getItineraryBooks = async (itineraryId) => {

    return db.select('*').from('itineraries_books').where('id_itinerary', itineraryId)
    .then(
        async (itineraryBooksList) => {
            const books = [];
            // console.log('Lista', itineraryBooksList);

            const isbn = [];
            itineraryBooksList.forEach(obj => isbn.push(obj.isbn))
            // console.log(isbn);

            return db('books').whereIn('isbn', isbn)
            .then(
                (bookList) => {
                    const book = bookList[0];
                    books.push(book)
                    //console.log('Libros: ', books);
                    return bookList;
                }
            )
        }
    )

}

const getItineraryStudents = async (itineraryId) => {

    return db.select('*').from('itineraries_students').where('id_itinerary', itineraryId)
    .then(
        async (itineraryStudentsList) => {
            const students = [];
            // console.log('Lista', itineraryBooksList);

            const idList = [];
            itineraryStudentsList.forEach(obj => idList.push(obj.id_user))
            // console.log(isbn);

            return db('users').whereIn('id_user', idList)
            .then(
                (studentList) => {
                    const student = studentList[0];
                    students.push(student)
                    //console.log('Libros: ', books);
                    return studentList;
                }
            )
        }
    )

}

const getItineraryById = async (itineraryId) => {

    return db.select('*').from('itineraries').where('id_itinerary', itineraryId)
    .then(
        (itinerary) => {
            return itinerary
        }
    )

}

const createItineraryBooks = (itineraryName, isbnList) => {

    db.select('*').from('itineraries').where('name', itineraryName)
    .then(
        (itineraries) => {
            const itinerary = itineraries[0];
            // console.log(itineraries[0]);
            // console.log(isbnList);
            isbnList.map(isbn => {
                const id_itinerary = itinerary.id_itinerary;
                const obj = {id_itinerary, isbn}
                db('itineraries_books').insert(obj)
                .then(
                    () => {
                        console.log('Libros registrados');
                    }
                )
            })
        }
    )

}

const createItineraryStudents = (itineraryName, studentsIdList) => {

    db.select('*').from('itineraries').where('name', itineraryName)
    .then(
        (itineraries) => {
            const itinerary = itineraries[0];
            // console.log(itineraries[0]);
            // console.log(studentsIdList);
            studentsIdList.map(id_user => {
                const id_itinerary = itinerary.id_itinerary;
                const obj = {id_itinerary, id_user}
                db('itineraries_students').insert(obj)
                .then(
                    () => {
                        console.log('Alumnos registrados');
                    }
                )
            })
        }
    )

}

const createItinerary = (req, res) => {

    const token = req.header('x-token')

    const {name, department, endDate, books, students} = req.body; //students (students id array), books (books id array)

    let id_teacher;

    jwt.verify(token, process.env.PRIVATE_KEY, (err, token) => {
        //console.log(token)
        if (err) {
            throw err
        }
        id_teacher = token.id_user
    })

    // console.log(id_teacher);


    const newItinerary = new Itinerary(name, department, id_teacher, new Date(endDate));

    // console.log(newItinerary);

    
    db.select('*').from('itineraries').where({name})
    .then(
        (itineraries) => {
            if(itineraries.length === 0) {
                db('itineraries').insert(newItinerary)
                .then(
                    () => {
                        if (books.length !== 0) {
                            createItineraryBooks(name, books)
                        }
                        if (students.length !== 0) {
                            createItineraryStudents(name, students)
                        }
                            return res.status(201).json({
                                ok: true,
                                msg: "Itinerario registrado",
                            })
                    }
                )
                .catch((err) => {
                    return res.status(400).json({
                        ok: false,
                        msg: "Error al crear un nuevo itinerario",
                        err
                    })
                })
            } else {
                return res.status(400).json({
                    ok: false,
                    msg: "Ya existe un itinerario con ese nombre",
                })
            }
        }
    )
}

const deleteItinerary = (req, res) => {

    const {id} = req.params;

    db('itineraries').where('id_itinerary', id)
    .then(
        (itineraries) => {
            if(itineraries.length !== 0) {
                const itinerary = itineraries[0];
  
                db('itineraries').where('id_itinerary', itinerary.id_itinerary).del()
                .then(
                    () => {
                        return res.status(200).json({
                            ok: true,
                            msg: "Itinerario borrado",
                        })
                    }
                )
                .catch((err) => {
                    return res.status(400).json({
                        ok: false,
                        msg: "Error al eliminar itinerario",
                    })
                })
            } else {
                return res.status(400).json({
                    ok: false,
                    msg: "El itinerario que quiere borrar no existe",
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

const updateItinerary = async (req, res) => {

    const {id} = req.params;

    // buscamos este itinerario por su id
    const fullItinerary = await getItineraryById(id)

    /**
        Inicializamos por defecto los campos del nuevo itinerario que vamos a actualizar 
        con los valores que ya tiene en la bd, de esta manera si el usuario no actualiza alguno
        de ellos (no viene en el body), ninguno tendrá nunca valor 'undefined', lo que puede
        provocar conflictos al usar la funcion update()/insert() más adelante
    */
    const {name = fullItinerary[0].name, department = fullItinerary[0].department, endDate = fullItinerary[0].endDate} = req.body;
    let {books, students} = req.body;

    // Si no existe una lista de libros en el body, la inicializamos como una lista vacía
    if (!books) {
        books = [];
    }

    // console.log(name, department, endDate);

    /*
        Creamos el nuevo itinerario que se insertará en la tabla 'itineraries'.
        Si en el body no viene ninguno de los siguientes campos no se cambia ningún registro
    */
    const itineraryUpdate = new Itinerary(name, department, id_teacher = fullItinerary[0].id_teacher, endDate);

    db('itineraries').where('id_itinerary', id)
    .then(
        async (itineraries) => {
            
            if(itineraries.length !== 0) {
                const itinerary = itineraries[0];
                // console.log(itinerary.id_itinerary);

                let id_itinerary = itinerary.id_itinerary

                /*
                    Actualizamos el itinerario con los datos que recibimos en el body.
                    Si no hay cambios en el body tampoco se cambia nada en la bd
                */
                await db('itineraries').where({id_itinerary}).update(itineraryUpdate)
                .then(
                    () => {
                        /* 
                            Esta función retorna una lista con las filas actualizadas,
                            pero como aún tenemos que actualizar los libros y los alumnos
                            de este itinerario no devolvemos nada en la respuesta
                            por el momento, a no ser que se produzca un error (catch)
                        */
                        console.log('Itinerario actualizado');
                    }
                )
                .catch(err => {
                    return res.status(400).json({
                        ok: false,
                        msg: 'Error al actualizar itinerario',
                        err
                    })
                })
                
                // console.log('libros ', books);
                
                if (books.length !== 0) {

                    /*
                        Como las operaciones se van a resolver dentro de una función map, si enviaramos
                        una respuesta dentro de esa función, en cada iteración se volvería a enviar
                        una respuesta y eso produciría un error. Por ello vamos a guardar en dos listas externas
                        tanto las respuestas satisfactorias como los errores
                    */
                    const succesfullList = []
                    const errorList = []

                    // Creamos una lista de promesas para después resolverlas todas a la vez
                    let promises = []

                    await db('itineraries_books').where({id_itinerary})
                    .then(
                        /*
                            itineraryBookList es una lista de objetos, donde cada objeto
                            tiene el siguiente formato: {id_itinerary, isbn}
                        */
                        async itineraryBookList => {
                            // console.log(itineraryBookList);

                            /*
                                Recorremos una lista con todos los libros del itinerario que
                                estamos actualizando y guardamos la nueva lista de promesas
                            */                            
                            promises = itineraryBookList.map(async (obj) => { // obj es un objeto como este: {id_itinerary, isbn}
                                // console.log(books.includes(obj.isbn));

                                /*
                                    Si la nueva lista de libros no incluye un libro que ya estaba
                                    asignado a este itinerario, se elimina de la bd
                                */
                                if (!books.includes(obj.isbn)) {
                                    await db('itineraries_books').where({id_itinerary}).andWhere('isbn', obj.isbn).del()
                                    .then(
                                        () => {
                                            console.log('eliminar');
                                        }
                                    )
                                    .catch((err) => {
                                        errorList.push({
                                            ok: false,
                                            msg: "Error al actualizar nuevos libros",
                                            err
                                        });
                                    })
                                }
                            })

                            // Esperamos a que se resuelvan todas las promesas anteriores
                            await Promise.all(promises)

                            /*
                                Volvemos a obtener la lista de libros para este itinerario porque
                                se pueden producir cambios después de eliminar algún libro
                            */
                            await db('itineraries_books').where({id_itinerary})
                            .then(
                                async (itineraryBookList) => {
                                    // Volvemos a guardar las promesas que se crean en cada iteración
                                    promises = books.map( async (isbn) => {
                                        const updateBook = {id_itinerary, isbn}

                                        // console.log('update books', updateBook);
        
                                        // console.log(itineraryBookList.length);
                
                                        if (itineraryBookList.length !== 0) {
            
                                            let promises = [];
                         
                                            promises = itineraryBookList.map(async (obj) => {
                                                // console.log('existe: ', obj.isbn, updateBook.isbn, obj.isbn !== updateBook.isbn)

                                                /*
                                                    Si el libro que queremos actualizar no está
                                                    en la bd, lo insertamos
                                                */
                                                if (obj.isbn !== updateBook.isbn) {
                                                    // console.log(updateBook);
                                                    // console.log('inserta');
                                                    await db('itineraries_books').where({id_itinerary}).insert(updateBook)
                                                    .then(
                                                        () => {
                                                            succesfullList.push({ok: true, msg: "Itinerario actualizado"})
                                                        }
                                                    )
                                                    .catch((err) => {
                                                        console.log(err);
                                                        errorList.push({
                                                            ok: false,
                                                            msg: "Error al actualizar nuevos libros update",
                                                            err
                                                        });
                                                    })
                                                }
                                            })
        
                                            // Resolvemos todas las promesas creadas al insertar los nuevos libros
                                            await Promise.all(promises)
            
                                            
                                        } else { 
                                            // Si este itinerario no tiene ningún libro asignado, se insertan los nuevos
                                            await db('itineraries_books').where('id_itinerary', itinerary.id_itinerary).insert(updateBook)
                                            .then(
                                                () => {
                                                    succesfullList.push({ok: true, msg: "Itinerario actualizado"})
                                                    
                                                }
                                            )
                                            .catch((err) => {
                                                errorList.push({
                                                    ok: false,
                                                    msg: "Error al actualizar nuevos libros",
                                                    err
                                                });
                                            })
                                        }
                                    })
        
                                    // Resolvemos todas las promesas creadas al insertar los nuevos libros
                                    await Promise.all(promises)
                                }
                            )
                            .catch((err) => {
                                errorList.push({
                                    ok: false,
                                    msg: "Error al actualizar nuevos libros",
                                    err
                                });
                            })
                            
                                
                        }
                    )
                    .catch((err) => {
                        errorList.push({
                            ok: false,
                            msg: "Error al actualizar nuevos libros",
                            err
                        });
                    })
                
                    // console.log(succesfullList[0]);
                    // console.log(errorList[0]);

                    // Mostramos la respuesta tanto si es 'ok' como si es error
                    if (succesfullList.length !== 0) {
                        return res.status(200).json(succesfullList[0])

                    } else if (errorList.length !== 0) {
                        return res.status(400).json(errorList[0])

                    } else {
                        return res.status(200).json({
                            ok: true,
                            msg: "Itinerario actualizado"
                        })
                    }

                } else { // Si la lista de libros en el body está vacía
                    console.log('vacio');
                    return res.status(400).json({
                        ok: false,
                        msg: "El itinerario debe tener como mínimo un libro",
                    })
                }
            } else { // Si la lista de itinerarios al buscar por id está vacía
                return res.status(400).json({
                    ok: false,
                    msg: "El itinerario que quiere actualizar no existe",
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

module.exports = {getAllItineraries, createItinerary, deleteItinerary, updateItinerary};
