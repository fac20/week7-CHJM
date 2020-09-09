const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const users = require('../model/users');
const db = require('../database/connection');

dotenv.config();
const SECRET = process.env.JWT_SECRET;

function authenticate(req, res, next) {
	const authHeader = req.headers.authorization;
	if (!authHeader) {
		const error = new Error('Unauthorised!');
		error.status = 400;
		next(error);
	}
	try {
		// line 12 exits from function if the above error
		//runs so we dont need an if statement??

		const token = authHeader.replace('Bearer ', ''); //fixed
		const tokenData = jwt.verify(token, SECRET);
		users
			.getUserByID(tokenData.id) //fixed already
			.then(user => {
				req.user = user;
				next();
			})
			.catch(next);
	} catch (_) {
		// replaced underscore with error
		// TO-DO: check error is unauth; if not return different error!
		const error = new Error('Unauthorized');
		error.status = 401;
		next(error);
	}
}

module.exports = authenticate;
