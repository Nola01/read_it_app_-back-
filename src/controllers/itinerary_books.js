const db = require('../database/db-config');

const updateBooks = async (req, res, id_itinerary, books) => {
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
                            await db('itineraries_books').where({id_itinerary}).insert(updateBook)
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
}


module.exports = {updateBooks};
