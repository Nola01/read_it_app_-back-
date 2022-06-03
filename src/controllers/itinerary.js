const db = require('../database/db-config');
const Itinerary = require('../entities/itinerary');

const jwt = require('jsonwebtoken');

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

const createItineraryBooks = (itineraryName, isbnList) => {

    db.select('*').from('itineraries').where('name', itineraryName)
    .then(
        (itineraries) => {
            const itinerary = itineraries[0];
            console.log(itineraries[0]);
            console.log(isbnList);
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
            console.log(itineraries[0]);
            console.log(studentsIdList);
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

    console.log(id_teacher);


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
                                ok: false,
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
                            ok: false,
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

const updateItinerary = (req, res) => {

    const {id} = req.params;

    const {name, department, endDate} = req.body;

    const itineraryUpdate = new Itinerary(name, department, endDate);

    db('itineraries').where('id_itinerary', id)
    .then(
        (itineraries) => {
            if(itineraries.length !== 0) {
                const itinerary = itineraries[0];

                db('itineraries').where('id_itinerary', itinerary.id_itinerary).update(itineraryUpdate)
                .then(
                    () => {
                        return res.status(200).json({
                            ok: false,
                            msg: "Itinerario actualizado",
                        })
                    }
                )
                .catch((err) => {
                    return res.status(400).json({
                        ok: false,
                        msg: "Error al actualizar itinerario",
                        err
                    })
                })
            } else {
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
