const db = require('../database/db-config');

const getAllGroups = (req, res) => {
    db.select('*').from('groups')
    .then(
        (groups) => {
            return res.status(200).send(groups)
        }
    )
    .catch((err) => {
        return res.status(500).json({
            ok: false,
            msg: "Error en el servidor",
        })
    })
}

const getUserGroups = (req, res) => {
    const {id} = req.params;

    db.select('*').from('users_groups').where('id_user', id)
    .then(
        async (userGroups) => {
            console.log(userGroups);
            if (userGroups.length !== 0) {
                const groupList = []
                let promises = []
                promises = userGroups.map(async (group) => {
                    await db('groups').where('id_group', group.id_group)
                    .then(
                        groups => {
                            const group = groups[0]
                            groupList.push(group)
                        }
                    )
                    .catch((err) => {
                        return res.status(500).json({
                            ok: false,
                            msg: "Error al encontrar grupos",
                        })
                    })
                })
                await Promise.all(promises)
                return res.status(200).send(groupList)
            } else {
                return res.status(200).send(userGroups)
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

module.exports = {getAllGroups, getUserGroups}
