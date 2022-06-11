const db = require('../database/db-config');

const createUserGroups = async (req, res, userEmail, groupList) => {

    const errorList = []

    db.select('*').from('users').where('email', userEmail)
    .then(
        (users) => {
            const user = users[0];

            groupList.map(group => {
                const id_user = user.id_user;
                const obj = {id_user, id_group: group}
                // console.log('obj', obj);
                db('users_groups').insert(obj)
                .then(
                    () => {
                        console.log('Grupos registrados');
                    }
                )
                .catch(err => {
                    errorList.push({
                        ok: false,
                        msg: "Error al insertar grupos",
                        err
                    })
                })
            })
        }
    )
    .catch(err => {
        errorList.push({
            ok: false,
            msg: "El usuario no existe",
            err
        })
    })

    return errorList

}

module.exports = {createUserGroups}