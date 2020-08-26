const pg = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const database = new pg.Pool({ connectionString: process.env.DATABASE_URL });

module.exports = database;
