const db = require('../database/connection');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function createUser(user) {
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
			return user.rows[0];
		})
		.catch(error => error);
}

function getUserByID(id) {
	return db
		.query('SELECT * FROM users WHERE id = ($1)', [id])
		.then(user => {
			return user.rows[0];
		})
		.catch(error => error);
}

function updatePassword(currentPassword, newPassword, userID) {
	//user id isn't from the 'put' body
	return bcrypt
		.genSalt(10)
		.then(salt => bcrypt.hash(newPassword, salt))
		.then(newHash => {
			//we hash the new password
			return db.query(
				`UPDATE users SET password = ($1) WHERE id = '${userID}' RETURNING *`,
				[newHash]

				//				//and then set the password column of the id we want
				//if we'd had more time, we would have verified that the current password is correct, a
				//dd another layer of security by
				//if we'd had more time, we would have verified that the current password is correct, a
				//dd another layer of security by
				//if we'd had more time, we would have verified that the current password is correct, a
				//dd another layer of security by
				//verifying current password first and THEN go on to run bcrypt
				// we should bcrpyt compare the user entered current password with the database stored hashed current password
				//if that match returned 'true' then we'd carry on and let them update the password
				// we should parameterize this query to
			);
		})
		.then(result => {
			console.log('rows:', result.rows[0]);
			return result.rows[0];
		})
		.catch(error => error);
}

module.exports = {
	createUser,
	getUser,
	updatePassword,
	getUserByID,
};
