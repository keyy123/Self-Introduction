const Pool = require("pg").Pool;

const pool = new Pool({
   user:`${process.env.USER}` || 'postgres',
   password:`${process.env.PASSWORD}` || 'your database password',
   database: "intro_database",
   host: "localhost",
   port: `${process.env.PORT}` || 'your database port - localhost preferably'
});

module.exports = pool;
