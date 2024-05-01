var User = require('../models/user');
var Period = require('../models/period');

const { body,validationResult } = require("express-validator");
var async = require('async');
const { redirect } = require('express/lib/response');
const { db } = require('../models/user');



exports.index = function(req, res, next) {
    User.find()
      .sort({title : 1})
      .populate('').exec(function (err, list_users) {
        if (err) {return next(err)} 
        else {
              // Successful, so render
              res.jsonp(list_users);
          }
      });
  };


exports.user_create_post = async (req, res) => {
  const user = await User.find({name: req.body.name});
  if (user.length != 0) {
    res.jsonp(new User({
                  name: "-> o nome já existe",
                  senha: "",
                  admin: false
              }))
  } else {
    const newUser = new User({
      name: req.body.name,
      senha: req.body.senha,
      admin: req.body.admin,
    });

    try {
        res.jsonp(await newUser.save());
    } catch (err) {
        res.jsonp({message: err.message});
    }
  }
};


exports.get_user_by_name = async (req, res, next) => {

  async.parallel({
    user: function(callback) {

        User.findOne({name: req.params.name})
          .exec(callback);
    },
    }, function(err, results) {
      if (err) { return next(err); }
      console.log(results.user);
      if (results.user == null) { // No results.
        var err = new Error('User not found');
        err.status = 404;
        return next(err);
      } else {
          res.jsonp(results.user);
      }
    });
};

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({name: req.body.name, senha: req.body.senha});
    console.log(user)
    if (user != undefined) {
      return res.json(user);
    }
    return res.jsonp(new User({
      name: "",
      senha: "",
      admin: false,
    }));
  } catch (error) {
        res.status(400).json({
          message: "An error occurred",
          error: error.message,
        });
  }
};


// CREATE A PERIOD
exports.period_create_post = function(req, res) {
  var instance_period = new Period({begin_date: req.body.begin_date, end_date: req.body.end_date});
  instance_period.save(function(err, results) {
      if (err) {
          return handleError(err);
      }
      if (results == null) {
          var err = new Error('Period not created');
          err.status = 404;
          return next(err);
      }
      res.json(results.id);
  });
};

// ADD A PERIOD TO USER
exports.user_period_put = async (req, res) => {
  console.log("Period put");
  console.log(req.body);
  try {
    const user = await User.findById(req.params.id)
    if (user == null) {
      return res.status(404).json({ message: 'Cannot find user' })
    }
    user.periods.push(req.body.period);

    await user.save()
    res.json(user)

  } catch (err) {
    res.json({ message: err.message })
  }
};

// GET PERIODS
exports.user_periods_get = async (req, res) => {
  User.findById(req.params.id)
    .populate('periods')
    .exec(function(err, results) {
      if(err) {
        return next(err);
      }
      res.json(results.periods)
    })
};