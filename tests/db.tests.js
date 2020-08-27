const test = require('tape');
const build = require('../database/build');
const db = require('../database/connection');
const users = require('../model/users');

// test that getUser works

test('can retrieve a user with a given email address', t => {
	build()
		.then(() => {
			const email = 'potatojosh@askjeeves.com';
			return users.getUser(email);
		})
		.then(user => {
			console.log(user);
			const email = user.email;
			t.equal(
				email,
				'potatojosh@askjeeves.com',
				`email ${email} should equal potatojosh@askjeeves.com`
			);
			t.end();
		})
		.catch(err => {
			t.error(err);
			t.end();
		});
});

// test that createUser

// test that getHarvest

// test thta createHarvest
