'use strict';

require('dotenv').load();

const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const debug = require('debug')('mongoWorker:server');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

app.use(cors());
app.use(morgan('dev'));
app.use(require('./route/user-router.js'));

app.use(function(err, req, res, next){
  debug('error middleware');
  console.log(err.status, err.message);
  if(err.status) {
    res.status(err.status).send();
    return;
  }
  if(err.name === 'ValidationError'){
    res.status(400).send();
    return;
  }
  if(err.name === 'MongoError' && err.code == '11000'){
    res.status(409).send();
    return;
  }
  res.status(500).send();
  next();
});

const server = app.listen(process.env.PORT , () => {
  debug('starting server');
  console.log('server mongoWorker is up and running!', process.env.PORT);
});

server.isRunning = true;
module.exports = server;
