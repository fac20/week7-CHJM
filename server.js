const express = require('express');
const authentification = require('./middleware/authorise');
const harvestHandler = require('./handlers/harvest');
const cors = require("cors");

// const db = require('./database/connection');
require('dotenv').config();
const PORT = process.env.PORT || 4000;
//bring in handlers with format const nameOfHandlers = require('./handlers/file')
const users = require('./handlers/users');

//bring in middleware with format const nameOfMiddleware = require('./middleware/file')
const handleErrors = require('./middleware/errorHandling');

const server = express();
server.use(express.json());

const corsOptions = {
	origin: '*',
	optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

server.use(cors());

server.use(handleErrors);

//route to create a user
server.post('/signup', users.signup);

// route to login
server.post('/login', users.login);
// server.post('/login', users.login);

server.get('/harvest', harvestHandler.getAllHarvest);
server.get('/harvest/:type', harvestHandler.getHarvest);
server.post('/harvest', authentification, harvestHandler.createHarvest);
server.put('/password', authentification, users.changePassword); //put request calls users.changepassword handler,
//authenticates first with the middleware
// server.delete('/harvest/:id', authentification, harvestHandler.deleteHarvest);
server.put(
	'/harvest/:id/:property',
	authentification,
	harvestHandler.adjustHarvest
);

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
