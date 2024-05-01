var Reunion = require('../models/reunions');


const { body,validationResult } = require("express-validator");

var async = require('async');
const { redirect } = require('express/lib/response');
const { db } = require('../models/projects');


// Display list of all books.
exports.index = function(req, res, next) {

    Reunion.find({}, '')
      .sort({title : 1})
      .populate('membros').exec(function (err, list_reunions) {
        if (err) {return next(err)} 
        else {
              // Successful, so render
              res.jsonp(list_reunions);
          }
      });
  
  };



// Handle project create on POST.
exports.reunion_create_post = [
    

  // Validate and sanitize fields.
 
  // Process request after validation and sanitization.
  (req, res, next) => {

      // Extract the validation errors from a request.
      const errors = validationResult(req); 

      // Create a Book object with escaped and trimmed data.
      var reunion = new Reunion(
        { nome: req.body.nome,
            membros: req.body.membros,
            data_inicio: req.body.data_inicio,
            data_fim: req.body.data_fim,
            team: req.body.team
         });

         console.log(reunion)

     
      
          // Data from form is valid. Save book.
          reunion.save(function (err) {
              if (err) { return next(err); }
                 // Successful - redirect to new book record.
                 res.redirect("/reunions");
              });
      
  }
];


// Display detail page for a specific Project.
exports.reunion_detail = function(req, res, next) {

    async.parallel({
        reunion: function(callback) {
  
            Reunion.findById(req.params.id)
              .populate('membros')
              .populate('team')
              .exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.reunion==null) { // No results.
            var err = new Error('Reunion not found' + req.params.id);
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        console.log(results.reunion.nome);
        res.jsonp(results.reunion);
    });
  
  };



// Display detail page for a specific Project.
exports.reunion_users_get = function(req, res, next) {

  async.parallel({
      reunion: function(callback) {

          Reunion.findById(req.params.id)
            .populate('')
            .exec(callback);
      },
  }, function(err, results) {
      if (err) { return next(err); }
      if (results.reunion==null) { // No results.
          var err = new Error('Reunion not found' + req.params.id);
          err.status = 404;
          return next(err);
      }
      // Successful, so render.
      console.log(results.reunion.nome);
      res.jsonp(results.reunion.membros);
  });

};