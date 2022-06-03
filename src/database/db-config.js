const mysql = require('mysql');
const knex = require('knex');

// config

const connection = knex.knex({
  client: 'mysql',
  connection: {
    host : '192.168.8.148',
    port : 3306,
    user : 'root',
    password : 'root',
    database : 'read_it'
  }
})

// const createConnection = () => {
//   const connection = knex.knex({
//     client: 'mysql',
//     connection: {
//       host : '192.168.1.37',
//       port : 3306,
//       user : 'root',
//       password : 'root',
//       database : 'read_it'
//     }
//   })
//   console.log('Conexión establecida con la bd');
//   return connection;
// }

module.exports = connection;



