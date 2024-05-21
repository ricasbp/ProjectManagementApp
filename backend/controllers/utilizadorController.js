var Utilizador = require('../models/utilizador');
const { body,validationResult } = require("express-validator");
var async = require('async');
const { redirect } = require('express/lib/response');
const { db } = require('../models/projects');


exports.index = function(req, res, next) {
    Utilizador.find({}, '')
      .sort({title : 1})
      .populate('').exec(function (err, list_utilizadores) {
        if (err) {return next(err)} 
        else {
              // Successful, so render
              res.jsonp(list_utilizadores);
          }
      });
  };