// configuration
var dbUrl = 'mongodb://localhost/taskbase';
var port = 8080;

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var apiRouter = require('./server/routes/apirouter');
var mainRouter = require('./server/routes/mainrouter');

var connection = mongoose.connect(dbUrl);

var app = express();

app.use(bodyParser.json());

app.use('/api', apiRouter);
app.use('/', mainRouter);

app.listen(port, function () {
  console.log('Working on localhost:8080');
});
