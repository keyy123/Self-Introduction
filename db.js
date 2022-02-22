const Pool = require("pg").Pool;

const pool = new Pool({
   user:`${process.env.USER}`,
   password:`${process.env.PASSWORD}`,
   database: "intro_database",
   host: "localhost",
   port: `${process.env.PORT}`
});

module.exports = pool;
