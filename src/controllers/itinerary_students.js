const db = require('../database/db-config');

const createItineraryStudents = (req, res, itineraryName, studentsIdList) => {

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
                .catch(err => {
                    return res.status(400).json({
                        ok: false,
                        msg: "Error al insertar alumnos",
                        err
                    })
                })
            })
        }
    )
    .catch(err => {
        return res.status(400).json({
            ok: false,
            msg: "El itinerario no existe",
            err
        })
    })

}

const updateStudents = async (req, res, id_itinerary, students) => {
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

    await db('itineraries_students').where({id_itinerary})
    .then(
        /*
            itineraryStudentsList es una lista de objetos, donde cada objeto
            tiene el siguiente formato: {id_itinerary, id_user}
        */
        async itineraryStudentList => {

            /*
                Recorremos una lista con todos los alumnos del itinerario que
                estamos actualizando y guardamos la nueva lista de promesas
            */                            
            promises = itineraryStudentList.map(async (obj) => { // obj es un objeto como este: {id_itinerary, id_user}

                /*
                    Si la nueva lista de alumnos no incluye un alumno que ya estaba
                    asignado a este itinerario, se elimina de la bd
                */
                if (!students.includes(obj.id_user)) {
                    await db('itineraries_students').where({id_itinerary}).andWhere('id_user', obj.id_user).del()
                    .then(
                        () => {
                            console.log('eliminar');
                        }
                    )
                    .catch((err) => {
                        errorList.push({
                            ok: false,
                            msg: "Error al actualizar nuevos alumnos",
                            err
                        });
                    })
                }
            })

            // Esperamos a que se resuelvan todas las promesas anteriores
            await Promise.all(promises)

            /*
                Volvemos a obtener la lista de alumnos para este itinerario porque
                se pueden producir cambios después de eliminar alguno
            */
            await db('itineraries_students').where({id_itinerary})
            .then(
                async (itineraryStudentList) => {
                    // Volvemos a guardar las promesas que se crean en cada iteración
                    promises = students.map( async (id_user) => {
                        const updateStudent = {id_itinerary, id_user}

                        if (itineraryStudentList.length !== 0) {

                            let promises = [];
            
                            promises = itineraryStudentList.map(async (obj) => {

                                /*
                                    Si el alumno que queremos actualizar no está
                                    en la bd, lo insertamos
                                */
                                if (obj.id_user !== updateStudent.id_user) {
                                    await db('itineraries_students').where({id_itinerary}).insert(updateStudent)
                                    .then(
                                        () => {
                                            succesfullList.push({ok: true, msg: "Itinerario actualizado"})
                                        }
                                    )
                                    .catch((err) => {
                                        console.log(err);
                                        errorList.push({
                                            ok: false,
                                            msg: "Error al actualizar nuevos alumnos",
                                            err
                                        });
                                    })
                                }
                            })

                            // Resolvemos todas las promesas creadas al insertar los nuevos alumnos
                            await Promise.all(promises)

                            
                        } else { 
                            // Si este itinerario no tiene ningún alumno asignado, se insertan los nuevos
                            await db('itineraries_students').where({id_itinerary}).insert(updateStudent)
                            .then(
                                () => {
                                    succesfullList.push({ok: true, msg: "Itinerario actualizado"})
                                    
                                }
                            )
                            .catch((err) => {
                                errorList.push({
                                    ok: false,
                                    msg: "Error al actualizar nuevos alumnos",
                                    err
                                });
                            })
                        }
                    })

                    // Resolvemos todas las promesas creadas al insertar los nuevos alumnos
                    await Promise.all(promises)
                }
            )
            .catch((err) => {
                errorList.push({
                    ok: false,
                    msg: "Error al actualizar nuevos alumnos",
                    err
                });
            })
            
                
        }
    )
    .catch((err) => {
        errorList.push({
            ok: false,
            msg: "Error al actualizar nuevos alumnos",
            err
        });
    })

    // Retornamos una respuesta, si no hay ningún error retornamos [], en caso contrario retornamos el error
    if (succesfullList.length !== 0) {
        return []

    } else if (errorList.length !== 0) {
        return errorList[0]

    }
}

module.exports = {createItineraryStudents, updateStudents}