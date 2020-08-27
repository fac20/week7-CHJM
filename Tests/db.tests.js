const test = require('tape');
const build = require('../database/build');
const db = require('../database/connection');
const users = require('../model/users');
const { getMaxListeners } = require('../database/connection');

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
test('can add a user to the users table in database', t => {
	build()
		.then(() => {
			//add all the fields to create a new user
			//return the correct model function with these fields
			const testUser = {
				email: 'testUser@hotmail.com',
				username: 'Test123',
				password: 'qwerty',
			};
			users.createUser(testUser);
		})
		.then(() => {
			users.getUser('testUser@hotmail.com').then(returnedUser => {
				t.equal(
					returnedUser.username,
					'Test123',
					`Test user is in database with name ${returnedUser.username}`
				);
				t.end();
			});
		})
		.catch(err => {
			t.error(err);
			t.end();
		});
});

// test that getHarvest

// test thta createHarvest
