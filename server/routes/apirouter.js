var express = require('express');
var Task = require('../models/task');
var User = require('../models/user');

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

  User.findOne({name: req.body.username}, function(err, user) {
    if (err) {
      res.status(401).send('An error has occured');
      return;
    } else if (!user) {
      res.status(401).send('There is no user in db');
      return;
    }

    user.comparePassword(req.body.password, function(err, isMatch) {
      if (err) {
        return res.status(401).send('Error');
      }

      if(!isMatch) {
        return res.status(401).send('Wrong password'); 
      }

      console.log(req.body.password + ': ' + isMatch);

      var token = jwt.sign(user, secret, { expiresIn: '1h' });

      res.json({token: token, user: user});

    });

  });

});

// Route /users
// ------------------------------------------
router.route('/users')

  .post(function(req, res) {

    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;

    user.save(function(err) {
      if (err) {
        res.send(err);
      }

      res.json({message: 'Success', data: user});
    });

  })

  .get(function(req, res) {

    User.find(function(err, users) {
      if (err) {
        res.send(err);
      }

      res.json(users);
    });

  });

// Route /users/:id
// ------------------------------------------
router.route('/users/:id')

  .get(function(req, res) {

    User.findById(req.params.id, function(err, user) {
      if (err) {
        res.send(err);
      }

      res.json(user);
    })

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