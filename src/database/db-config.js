const mysql = require('mysql');
const knex = require('knex');

// config

const db = knex.knex({
    client: 'mysql',
    connection: {
      host : '192.168.1.37',
      port : 3306,
      user : 'root',
      password : 'root',
      database : 'read_it'
    }
  });



module.exports = db



