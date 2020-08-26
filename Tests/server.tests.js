const test = require('tape');
const request = require('supertest');
const nock = require('nock');
const server = require('../server');

test('server tests are initialised and working', t => {
	const x = 2;
	t.equal(x, 2, 'this works');
	t.end();
});

// {
//     "name": "WEEK-6-CADO",
//     "version": "1.0.0",
//     "description": "dog and cat app",
//     "main": "router.js",
//     "scripts": {
//       "test": "node ./test/test.js | tap-spec ",
//       "start": "node server.js",
//       "dev": "nodemon server.js",
//       "testdb": "NODE_ENV=test tape './test/model.test.js' | tap-spec"
//     },

//     CRAKT
//     "scripts": {
//         "test": "PGDATABASE=localtest tape tests/*.test.js | tap-spec",
//         "dev": "nodemon server.js",
//         "setupdb": "node db/build.js",
//         "format": "prettier --write '**/*.{js,css,md}'"
//     },
//     },
