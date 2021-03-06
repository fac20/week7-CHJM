const test = require('tape');
const build = require('../database/build');
const db = require('../database/connection');
const users = require('../model/users');
const harvest = require('../model/harvest');

// test that getUser works
test('can retrieve a user with a given email address', t => {
	build()
		.then(() => {
			const username = 'jhart5';
			return users.getUser(username);
		})
		.then(user => {
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
	//add all the fields to create a new user
	//return the correct model function with these fields
	const testUser = {
		email: 'testUser@hotmail.com',
		username: 'Test123',
		password: 'qwerty',
	};
	build()
		.then(() => {
			users
				.createUser(testUser)

				.then(returnedUser => {
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

// test that createUser
test('can add a harvest to the harvest table in database', t => {
	const testHarvest = {
		"food_type": "mint",
		"taste": "fresh",
		"harvest_time": "winter",
		"location": "ealing_broadway",
		"date": "27th August 2020"
	};
	build()
		.then(() => {
			harvest
				.createHarvest(testHarvest)

				.then(returnedHarvest => {
					t.equal(
						returnedHarvest.taste,
						'fresh',
						`Test harvest is in database with taste of ${returnedHarvest.taste}`
					);
					t.end();
				});
		})
		.catch(err => {
			t.error(err);
			t.end();
		});
});

//otherwise tests will pause for 10s in the terminal
test('Close DB pool', t => {
	db.end();
	t.end();
});