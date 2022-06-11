const mysql = require('mysql');
const knex = require('knex');

// config

const connection = knex.knex({
  client: 'mysql',
  connection: {
    host : '192.168.1.38',
    port : 3306,
    user : 'root',
    password : 'root',
    database : 'read_it'
  }
})

module.exports = connection;



