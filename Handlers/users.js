const users = require('../model/users');
const harvest = require('../model/harvest');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET = process.env.JWT_SECRET;

function signup(req, res, next) {
	const userData = req.body;
	users
		.createUser(userData)
		.then(user => {
			const token = jwt.sign({ user: user.id }, SECRET, {
				expiresIn: '1h',
			});
			const response = {
				id: user.id,
				name: user.name,
				email: user.email,
				access_token: token,
			};
			res.status(201).send(response);
		})
		.catch(next);
}

function login(req, res, next) {
	const username = req.body.username;
	const password = req.body.password;
	users
		.getUser(username)
		.then(user => {
			console.log(user);
			if (password !== user.password) {
				const error = new Error('wrong password');
				error.status = 401;
				next(error);
			} else {
				const token = jwt.sign({ user: user.id }, SECRET, {
					expiresIn: '2h',
				});
				res.status(200).send({ access_token: token });
			}
		})
		.catch(next);
}

//     ('jhart5', 'potatojosh@askjeeves.com', 'securePassw0rd'),
// }

// function getUser(username) {
// 	return db
// 		.query('SELECT * FROM users WHERE username = ($1)', [username])
// 		.then(user => user.rows[0])
// 		.catch(error => error);
// }

module.exports = {
	signup,
	login,
};
