var express = require('express');
var Task = require('../models/task');

var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

var secret = 'secret';

/*
 * API Router
 */
router = express.Router();

// Route /restricted protected
// TODO: RESTRICTED OPTIONS
router.use('/restricted', expressJwt({secret: secret}));

// Route /authenticate
// ------------------------------------------
router.post('/authenticate', function(req, res) {
  //TODO validate req.body.username and req.body.password
  //if is invalid, return 401
  console.log('api/authenticate request');
  if (!(req.body.username === 'admin' && req.body.password === '123')) {
    res.status(401).send('Wrong user or password');
    return;
  }

  var profile = {
    first_name: 'admin',
    email: 'admin@domain.com',
    id: 1
  };

  // We are sending the profile inside the token
  var token = jwt.sign(profile, secret, { expiresIn: '1h' });

  res.json({ token: token });
});

// Route /tasks
// ------------------------------------------
router.route('/tasks')

  .post(function(req, res) {

      var task = new Task();
      task.name = req.body.name;
      task.completed = false;

      task.save(function(err) {
        if (err) {
          res.send(err);
        }

        res.json({message: 'Task created!', data: task});
      });

  })

  .get(function(req, res) {

      Task.find(function(err, tasks) {
        if (err) {
          res.send(err);
        }

        res.json(tasks);
      });

  });

// Route /tasks/:id
// ------------------------------------------
router.route('/tasks/:id')

  .get(function(req, res) {

    Task.findById(req.params.id, function(err, task) {
      if (err) {
        res.send(err);
      }

      res.json(task);
    });

  })

  .put(function(req, res) {

    Task.findById(req.params.id, function(err, task) {
      if (err) {
        res.send(err);
      }

      task.completed = req.body.completed;
      task.name = req.body.name;

      task.save(function(err) {
        if (err) {
          res.send(err);
        }

        res.json({message: "updated"})
      })
    })

  })

  .delete(function(req, res) {

    Task.remove({
      _id: req.params.id
    }, function(err) {
      if (err) {
        res.send(err);
      }

      res.json({message: "deleted"});
    })
    
  });

module.exports = router;