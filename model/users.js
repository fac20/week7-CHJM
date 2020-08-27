const db = require('../database/connection');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function createUser(user) {
	console.log(user);
	return bcrypt
		.genSalt(10)
		.then(salt => bcrypt.hash(user.password, salt))
		.then(hash => {
			user.password = hash;
			return db.query(
				'INSERT INTO users(username, email, password) VALUES($1, $2, $3) RETURNING *',
				[user.username, user.email, user.password]
			);
		})
		.then(result => result.rows[0])
		.catch(error => error);
}

function getUser(username) {
	return db
		.query('SELECT * FROM users WHERE username = ($1)', [username])
		.then(user => {
			//console.log(user.rows[0]);
			return user.rows[0];
		})
		.catch(error => error);
}

function getUserByID(id) {
	return db
		.query('SELECT * FROM users WHERE id = ($1)', [id])
		.then(user => user.rows[0])
		.catch(error => error);
}

function updatePassword(currentPassword, newPassword) {
	bcrypt
		.gensalt(10)
		.then(salt => bcrypt.hash(newPassword, salt))
		.then(newHash => {
			return db.query(
				`UPDATE users SET password = ($1) WHERE id = '${req.user.id}' RETURNING *`,
				[newHash]
			);
		})
		.catch(error => error);
}

module.exports = { createUser, getUser, updatePassword, getUserByID };
