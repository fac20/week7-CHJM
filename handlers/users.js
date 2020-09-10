const users = require('../model/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET = process.env.JWT_SECRET;
function signup(req, res, next) {
	const userData = req.body;
	users
		.createUser(userData)
		.then(user => {
			const token = jwt.sign(
				{
					id: user.id,
				},
				SECRET,
				{
					expiresIn: '1h',
				}
			);
			const response = {
				id: user.id,
				name: user.username,
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
			const match = bcrypt.compareSync(password, user.password);
			if (match) {
				const token = jwt.sign(
					{
						user: user.id,
					},
					SECRET,
					{
						expiresIn: '2h',
					}
				);
				res.status(200).send({
					access_token: token,
				});
			} else {
				const error = new Error('wrong password');
				error.status = 401;
				next(error);
			}
		})
		.catch(next);
}

function changePassword(req, res, next) {
	//called at /users/password
	//the api user needs to 'put' a json object with two things
	const oldPassword = req.body.oldPassword;
	const newPassword = req.body.newPassword;
	console.log(oldPassword, newPassword);
	users
		.updatePassword(oldPassword, newPassword, req.user.id) //user id is requested from the authorise.js middleware

		.then(() => {
			res.status(201).send({
				message: 'password updated',
			});
		})
		.catch(next);
}

module.exports = {
	signup,
	login,
	changePassword,
};
