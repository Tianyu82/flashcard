const Pool = require("pg").Pool;

const pool = new Pool({
    user:"postgres",
    password: "123456",
    host: "localhost",
    port: 5432,
    database: "flashcard_db"
});

module.exports=pool;