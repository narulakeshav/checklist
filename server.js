var express = require('express');
var bodyParser = require('body-parser');

var jwt = require('jsonwebtoken');  //https://npmjs.org/package/node-jsonwebtoken
var expressJwt = require('express-jwt'); //https://npmjs.org/package/express-jwt


var secret = 'this is the secret secret secret 12356';

var app = express();
var number = 0;
var apinumber = 0;

// We are going to protect /api routes with JWT
// app.use('/api', expressJwt({secret: secret}));

app.use(bodyParser.json());

// Token authorization
// if not sending 401
// app.use(function(err, req, res, next){
//   console.log('error')
//   console.log(err);
//   if (err.constructor.name === 'UnauthorizedError') {
//     res.status(401).send('Unauthorized');
//   }
// });

/*
 * Main Router
 */
var router = express.Router();

router.get(['/', '/login', '/tasks'], function(req, res) {
  console.log('sending index ' + ++number);
  res.sendFile('/dist/index.html', {root: __dirname});
});

router.use('/images', express.static(__dirname + '/dist/images'));
router.use('/fonts', express.static(__dirname + '/dist/fonts'));
router.use('/js', express.static(__dirname + '/dist/js'));
router.use('/styles', express.static(__dirname + '/dist/styles'));
router.use('/views', express.static(__dirname + '/dist/views'));

/*
 * API Router
 */
apiRouter = express.Router();

apiRouter.post('/authenticate', function(req, res) {
  console.log('calling /api ' + ++apinumber);
  //TODO validate req.body.username and req.body.password
  //if is invalid, return 401
  console.log('api/authenticate request');
  console.log(req.body);
  if (!(req.body.username === 'admin' && req.body.password === '123')) {
    res.status(401).send('Wrong user or password');
    return;
  }

  var profile = {
    first_name: 'John',
    last_name: 'Doe',
    email: 'john@doe.com',
    id: 123
  };

  // We are sending the profile inside the token
  var token = jwt.sign(profile, secret, { expiresIn: '1h' });

  res.json({ token: token });
});

app.use('/', router);
app.use('/api', apiRouter);

// app.get('/api/restricted', function (req, res) {
//   console.log('user ' + req.user.email + ' is calling /api/restricted');
//   res.json({
//     name: 'foo'
//   });
// });

app.listen(8080, function () {
  console.log('listening on http://localhost:8080');
});