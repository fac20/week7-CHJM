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

function login(req, res, next) {
	const username = req.body.username;
	const password = req.body.password;

	users.getUser(username).then(user => {});
}

module.exports = {
	signin,
	login,
};

// function login(req, res, next) {
// 	const email = req.body.email;
// 	const password = req.body.password;
// 	model
// 	  .getUser(email)
// 	  .then((user) => {
// 		if (password !== user.password) {
// 		  const error = new Error("Unauthorized");
// 		  error.status = 401;
// 		  next(error);
// 		} else {
// 		  const token = jwt.sign({ user: user.id }, SECRET, { expiresIn: "1h" });
// 		  res.status(200).send({ access_token: token });
// 		}
// 	  })
// 	  .catch(next);
//   }
