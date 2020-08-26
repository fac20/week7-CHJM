const path = require('path');
const fs = require('fs');
const database = require('./connection');

const filePath = path.join(__dirname, 'init.sql');
const initSQL = fs.readFileSync(filePath, 'utf-8');

function build() {
	return database.query(initSQL);
}

module.exports = build;
