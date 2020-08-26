const pg = require('./node_modules/pg');
const dotenv = require('./node_modules/dotenv');

dotenv.config();

const database = new pg.Pool({ connectionString: process.env.DATABASE_URL });

module.exports = database;
