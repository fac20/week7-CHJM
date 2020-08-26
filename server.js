const express = require('express');
require('dotenv').config();
const PORT = process.env.PORT || 4000;

//bring in handlers with format const nameOfHandlers = require('./middleware/file')

//bring in middleware with format const nameOfMiddleware = require('./middleware/file')
const handleErrors = require('./middleware/errorHandling');

const server = express();
server.use(express.json());

server.use(handleErrors);

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
