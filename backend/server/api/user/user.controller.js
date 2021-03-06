'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var rn = require('random-number')
var moment = require('moment')


var validationError = function(res, err) {
  return res.status(422).json(err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.pagination = function(req, res) {
  console.log(req.body)
 User.find({status:true},{_id:false,role:true,firstname:true,lastLoggedIn:true,lastLoggedOut:true,userIP:true}
 ).skip(req.body.start).limit(parseInt(req.body.end) - parseInt(req.body.start)).sort({ "created_at": -1 }).exec(function (err, b) {
  if (err) {
   console.log(err);
   res.status(400).json({message:'Something Went Wrong !!!'})
  } else{
    console.log(b);
    res.status(200).json(b)
  }
});
};

/*
To get all products
*/
exports.getproducts = function(req,res,next) {
  
}
/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  console.log(req.body)
  const user = new User(req.body);
  user.save(function(err,response) {
    if(err) {
      console.log(err);
      if (err && err.code === 11000) {
        res.status(400).json({message: 'The specified Username is already in use !!!'})
       } else {
         res.status(400).send({message:'Something Went Wrong !!!'});
       }  
    } else {
      var token = jwt.sign({_id: response._id }, config.secrets.session, { expiresInMinutes: 60*5 });
      res.status(200).json({ token: token ,userrole: response.role,firstname:response.firstname});
    }
  });
  };





/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.status(401).send('Unauthorized');
    res.json(user.profile);
  });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if(err) return res.status(500).send(err);
    return res.status(204).send('No Content');
  });
};


exports.logoutupdate = function(req, res) {
  req.body.lastLoggedOut = new Date();
  console.log(req.body.lastLoggedOut,req.user._id)
  User.findByIdAndUpdate(req.user._id,req.body,function(err,response){
  if(err) {
    console.log(err)
  } else {
   res.status(200).json('success');
  }
  })
}



/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.status(200).send('OK');
      });
    } else {
      res.status(403).send('Forbidden');
    }
  });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.status(401).send('Unauthorized');
    res.json(user);
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};


