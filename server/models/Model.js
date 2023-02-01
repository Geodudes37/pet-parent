const { Pool } = require('pg');
require('dotenv').config();
const myURI = process.env.DB_URL;

const pool = new Pool({
  connectionString: myURI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
