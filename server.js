const express = require('express');
const authentification = require('./middleware/authorise');
const harvestHandler = require('./handlers/harvest');
// const db = require('./database/connection');
require('dotenv').config();
const PORT = process.env.PORT || 4000;
//bring in handlers with format const nameOfHandlers = require('./handlers/file')
const users = require('./handlers/users');
const harvests = require('./handlers/harvest');

//bring in middleware with format const nameOfMiddleware = require('./middleware/file')
const handleErrors = require('./middleware/errorHandling');

const server = express();
server.use(express.json());

server.use(handleErrors);

//route to create a user
server.post('/signup', users.signup);

// route to login
server.post('/login', users.login);
// server.post('/login', users.login);

server.get('/harvest', harvestHandler.getAllHarvest);
server.get('/harvest/:type', harvestHandler.getHarvest);
server.post('/harvest', authentification, harvestHandler.createHarvest);
server.delete('/harvest/:id', authentification, harvestHandler.deleteHarvest);
// server.put('/harvest/:id', authentification, harvestHandler.adjustHarvest);

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
