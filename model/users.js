const db = require('../database/connection');

function createUser(user) {
	return db
		.query(
			'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)',
			[user.username, user.email, user.password]
		)
		.then(() => {
			return getUser(user.username);
		})
		.catch(error => error);
}

function getUser(username) {
	return db
		.query('SELECT * FROM users WHERE username = ($1)', [username])
		.then(user => user.rows[0])
		.catch(error => error);
}

module.exports = { createUser, getUser };
