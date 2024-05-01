


var Project = require('../models/projects');


const { body,validationResult } = require("express-validator");

var async = require('async');
const { redirect } = require('express/lib/response');
const { db } = require('../models/projects');



// Display list of all books.
exports.index = function(req, res, next) {

    Project.find({}, '')
      .sort({title : 1})
      .populate('').exec(function (err, list_projects) {
        if (err) {return next(err)} 
        else {
              // Successful, so render
              res.jsonp(list_projects);
          }
      });
  
  };


// Handle project create on POST.
exports.project_create_post = [
    

  // Validate and sanitize fields.
 
  // Process request after validation and sanitization.
  (req, res, next) => {
      

      // Extract the validation errors from a request.
      //const errors = validationResult(req);

      // Create a Book object with escaped and trimmed data.
      var project = new Project(
        { nome: req.body.nome,
            acronimo: req.body.acronimo,
            data_inicio: req.body.data_inicio,
            data_fim: req.body.data_fim         });

     
      
          // Data from form is valid. Save book.
          project.save(function (err) {
              if (err) { return next(err); }
                 // Successful - redirect to new book record.
                 res.redirect("/projects");
              });
      
  }
];


// Display detail page for a specific Project.
exports.project_detail = function(req, res, next) {

    async.parallel({
        project: function(callback) {
  
            Project.findById(req.params.id)
              .populate('')
              .exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.project==null) { // No results.
            var err = new Error('Project not found' + req.params.id);
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        console.log(results.project.nome);
        res.jsonp(results.project);
    });
  
  };


  exports.project_put = async (req, res) => {
    console.log("Project put");
    try {
        const project = await Project.findById(req.params.id)
        if(project == null){
            return res.status(404).json({message: 'Cannot find project'})
        }
        
        if(req.body.tasks != null){
          project.tasks = req.body.tasks;
        }

        await project.save()
        res.json(project)
  
    } catch (err) {
        res.json({message: err.message})
    }
    
  };