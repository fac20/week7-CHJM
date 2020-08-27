const users = require('../model/users');
const harvest = require('../model/harvest');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET = process.env.SECRET;

function signin(req, res, next) {
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

//function login(req, res, next) {}

module.exports = { signin };
