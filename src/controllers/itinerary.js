const db = require('../database/db-config');

const Itinerary = require('../models/itinerary');

const {createItineraryBooks, updateBooks} = require('./itinerary_books');
const {createItineraryStudents, updateStudents} = require('./itinerary_students')
const {createUserBooks} = require('./user_books')

const jwt = require('jsonwebtoken');
// const { response } = require('express');

const getAllItineraries = async (req, res) => {
    db.select('*').from('itineraries')
    .then(
        async (itineraries) => {
            // console.log(itineraries);

            
            const itinerariesId = [];
            // console.log(itineraries);
            itineraries.map(itinerary => {
                itinerariesId.push(itinerary.id_itinerary)
            })
            // console.log(itinerariesId);
            
            
            const response = [];

            let promises = []

            // obtenemos los libros y alumnos de cada itinerario

            promises = itineraries.map(async (itinerary) => {
                const obj = {itinerary}

                await db('users').where('id_user', itinerary.id_teacher)
                .then(
                    (users) => {
                        if(users.length !== 0) {
                            const teacher = users[0];
                            obj.teacher = teacher;
                        }
                    }
                )
                .catch((err) => {
                    return res.status(500).json({
                        ok: false,
                        msg: "Error en el servidor",
                    })
                });

                await db('itineraries_books').where('id_itinerary', itinerary.id_itinerary)
                .then(
                    async itineraryBooksList => {
                        const idList = []
                        itineraryBooksList.map(obj => {
                            idList.push(obj.id_itinerary)
                        })

                        let promises = [...idList]

                        promises = idList.map(async (id) => {
                            return getItineraryBooks(id).then(books => {
                                obj.books = books
                            })
                        })

                        // console.log(promesas);
                        await Promise.all(promises)
                        }
                )

                await db('itineraries_students').where('id_itinerary', itinerary.id_itinerary)
                .then(
                    async itineraryStudentsList => {
                    
                        const idList = []
                        itineraryStudentsList.map(obj => {
                            idList.push(obj.id_itinerary)
                        })
    
                        let promises = [...idList]
    
                        promises = idList.map(async (id) => {
                            return getItineraryStudents(id).then(students => {
                                obj.students = students
                            })
                        })
    
                        await Promise.all(promises)
    
                        
                    }
                )

                // console.log('obj', obj);

                response.push(obj)

                // console.log('response', response);


                //console.log('RESPONSE', response);

                
            })

            await Promise.all(promises)


            return res.status(200).send(response)

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


const createItinerary = (req, res) => {

    const token = req.header('x-token')

    const {name, department, id_group, endDate, books, students} = req.body; //students (students id array), books (books id array)

    let id_teacher;

    jwt.verify(token, process.env.PRIVATE_KEY, (err, token) => {
        //console.log(token)
        if (err) {
            throw err
        }
        id_teacher = token.id_user
    })

    // console.log(id_teacher);

    // date = new Date(endDate);
    // year = date.getFullYear();
    // month = date.getMonth()+1;
    // dt = date.getDate();

    // if (dt < 10) {
    //     dt = '0' + dt;
    // }
    // if (month < 10) {
    //     month = '0' + month;
    // }

    // endDateWithoutTime = year+'-' + month + '-'+dt;


    const newItinerary = new Itinerary(name, department, id_teacher, id_group, endDate);

    // console.log(newItinerary);

    
    db.select('*').from('itineraries').where({name})
    .then(
        (itineraries) => {
            if(itineraries.length === 0) {
                db('itineraries').insert(newItinerary)
                .then(
                    () => {
                        if (books.length !== 0) {
                            createItineraryBooks(req, res, name, books)
                        }
                        if (students.length !== 0) {
                            createItineraryStudents(req, res, name, students)
                        }

                        createUserBooks(req, res, students, books)
                        .then(
                            (errorList) => {
                                if (errorList.length === 0) {
                                    return res.status(201).json({
                                        ok: true,
                                        msg: "Itinerario registrado",
                                    })
                                } else {
                                    return errorList[0]
                                }
                            }
                        )
                        
                        
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

    const initItinerary = await getItineraryById(id)

    /**
        Inicializamos por defecto los campos del nuevo itinerario que vamos a actualizar 
        con los valores que ya tiene en la bd, de esta manera si el usuario no actualiza alguno
        de ellos (no viene en el body), ninguno tendrá nunca valor 'undefined', lo que puede
        provocar conflictos al usar la funcion update()/insert() más adelante
    */
    const {name = initItinerary[0].name, department = initItinerary[0].department, endDate = initItinerary[0].endDate} = req.body;
    let {books, students} = req.body;

    // Si no existe una lista de libros en el body, la inicializamos como una lista vacía
    if (!books) {
        books = [];
    }

    if (!students) {
        students = [];
    }

    // console.log(name, department, endDate);

    /*
        Creamos el nuevo itinerario que se insertará en la tabla 'itineraries'.
        Si en el body no viene ninguno de los siguientes campos no se cambia ningún registro
    */
    const itineraryUpdate = new Itinerary(name, department, id_teacher = initItinerary[0].id_teacher, endDate);

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

                let responseBooksList = []
                let responseStudentsList = []
                let errorList = []
                
                if (books.length !== 0) {
                    updateBooks(req, res, id_itinerary, books)
                    .then(
                        (response) => {
                            responseBooksList = response
                        }
                    );
                } else { // Si la lista de libros en el body está vacía
                    // console.log('vacio');
                    return res.status(400).json({
                        ok: false,
                        msg: "El itinerario debe tener como mínimo un libro",
                    })
                }

                if (students.length !== 0) {
                    let promises = []

                    /*
                        Comprobamos que los alumnos introducidos por el usuario tienen rol alumno.
                        El itinerario solo está asignado a un profesor (quien lo crea)
                    */
                    promises = students.map(student => {
                        db('users').where('id_user', student.id_user)
                        .then(
                            (users) => {
                                const user = users[0]
                                if (user.role === 'profesor') {
                                    errorList.push({ok: false, msg: "El itinerario sólo puede estar asignado a alumnos"})
                                }
                            }
                        )
                        .catch((err) => {
                            errorList.push({ok: false, msg: "Error al comprobar rol de alumnos", err})
                        });
                    })

                    await Promise.all(promises)
                    
                    updateStudents(req, res, id_itinerary, students)
                    .then(
                        (response) => {
                            responseStudentsList = response
                        }
                    );
                } else {
                    return res.status(400).json({
                        ok: false,
                        msg: "El itinerario debe tener como mínimo un alumno",
                    })
                }
                
                /*
                    Comprobamos primero si ha surgido algún error aquí y lo retornamos en la respuesta,
                    si no es así comprobamos si ha surgido algún error al actualizar los libros (si
                    es [] significa que todo ha ido bien), después comprobamos igual para la
                    actualización de alumnos (si es [] no hay errores). Por último, si no se ha retornado nada
                    aún sigifica que no hay errores así que retornamos un mensaje informando de que todo ha ido bien.
                */
                if (errorList.length !== 0) {
                    return res.status(400).json(errorList[0])

                } else if (responseBooksList.length !== 0) {
                    return res.status(400).json(responseBooksList[0])

                } else if (responseStudentsList.length !== 0) {
                    return res.status(400).json(responseStudentsList[0])

                } else {
                    return res.status(200).json({
                        ok: true,
                        msg: "Itinerario actualizado"
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
