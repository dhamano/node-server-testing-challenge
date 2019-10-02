const express = require('express');
const helmet = require('helmet');

const userRoutes = require('./routes/users');

const server = express();

server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
  res.send('<h2>5x5</h2>');
});

server.use('/api/', userRoutes);

module.exports = server;