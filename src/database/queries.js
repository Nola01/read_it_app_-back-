const { Router } = require('express');
const db = require('./db-config')

const router = Router();

router.get('/', (req, res) => {
    db.getConnection((err, connection) => {
        if (err) throw err
        console.log('Conectado a la bd');

        connection.query('Select * from users', (err, rows) => {
            connection.release()

            if(!err) {
                res.send(rows)
            } else {
                console.log(err);
            }
        })
    })
})

module.exports = router;
