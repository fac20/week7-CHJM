const express = require('express');
const authentification = require('./middleware/authorise');
const harvestHandler = require('./handlers/harvest');
// const db = require('./database/connection');
require('dotenv').config();
const PORT = process.env.PORT || 4000;
//bring in handlers with format const nameOfHandlers = require('./handlers/file')
const users = require('./handlers/users');
const harvests = require('./handlers/harvests');

//bring in middleware with format const nameOfMiddleware = require('./middleware/file')
const handleErrors = require('./middleware/errorHandling');

const server = express();
server.use(express.json());

server.use(handleErrors);

//route to create a user
server.post('/signin', users.signin);

// route to login
// server.post('/login', users.login);

server.get('/harvest', harvestHandler.getAllHarvest);
server.post('/harvest', authentification, harvestHandler.createHarvest);
// server.put("harvest", authentification, harvestHandler.adjustHarvest);
// server.delete("harvest", authentification, harvestHandler.deleteHarvest);

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
