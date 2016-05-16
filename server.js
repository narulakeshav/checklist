// configuration
var config = require('./config');

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var apiRouter = require('./app/routes/apirouter');
var mainRouter = require('./app/routes/mainrouter');

var connection = mongoose.connect(config.url);

var app = express();

app.use(bodyParser.json());

app.use('/api', apiRouter);
app.use('/', mainRouter);

app.listen(config.port, function () {
  console.log('Working on localhost:8080');
});
