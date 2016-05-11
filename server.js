var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var connection = mongoose.connect('mongodb://localhost/taskbase');

var apiRouter = require('./server/routes/apirouter');
var mainRouter = require('./server/routes/mainrouter');

var app = express();

app.use(bodyParser.json());

app.use('/', mainRouter);
app.use('/api', apiRouter);

app.listen(8080, function () {
  console.log('working on localhost:8080');
});
