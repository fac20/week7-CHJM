const pg = require('./node_modules/pg');
const dotenv = require('./node_modules/dotenv');

dotenv.config();

const options = {
	connectionString: process.env.DATABASE_URL,
};

if (process.env.NODE_ENV === 'test') {
	options.connectionString = process.env.DATABASE_TEST_URL;
}

const database = new pg.Pool(options);

module.exports = database;
