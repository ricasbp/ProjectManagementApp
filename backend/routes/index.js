var express = require('express');
var router = express.Router();
var projects_controller = require('../controllers/projectsController');
var tasks_controller = require('../controllers/tasksController');
var team_controller = require('../controllers/teamController');
var reunions_controller = require('../controllers/reunionsController');

var users_controller = require('../controllers/userController');

/* GET all projects. */
router.get('/projects', projects_controller.index);  
/* GET a specific project */
router.get('/project/:id', projects_controller.project_detail);
/* Create project. */
router.post('/projects', projects_controller.project_create_post); 
//Update projects 
router.put('/project/:id', projects_controller.project_put); 



/* GET all users. */
router.get('/users', users_controller.index);  
/* Create users. */
router.post('/users', users_controller.user_create_post);

router.get('/user/:name', users_controller.get_user_by_name);

router.post('/users/login', users_controller.login);


// PERIODS
// CREATE A PERIOD
router.post('/period', users_controller.period_create_post);

// GET PERIODS FROM A USER
router.get('/user/:id/periods', users_controller.user_periods_get);

// ADD A PERIOD TO A USER
router.put('/user/:id/period', users_controller.user_period_put);





/* GET all tasks. */
router.get('/tasks', tasks_controller.tasks_get);  
/* Create task. */
router.post('/task', tasks_controller.task_post);
/* GET a specific Task */
router.get('/task/:id', tasks_controller.task_get);
/* PUT/Update a specific Task */
router.put('/task/:id', tasks_controller.task_put); 
/* DELETE*/
router.delete('/task/:id', tasks_controller.task_delete); 


// TEAM ROUTES
// GET ALL TEAMS
router.get('/teams', team_controller.team_list);

// GET A SPECIFIC TEAM
router.get('/team/:id', team_controller.team_detail);

// GET USERS FROM A SPECIFIC TEAM
router.get('/team/:id/users', team_controller.team_users_get);

// CREATE A TEAM
router.post('/teams', team_controller.team_create_post);

// UPDATE A TEAM
router.put('/team/:id', team_controller.team_update_put);

// DELETE A TEAM
router.delete('/team/:id', team_controller.team_delete_delete);

/* GET a specific project from a specific team*/
router.get('/team/:id/project', team_controller.project_team_detail);


//GET ALL REUNIONS
router.get('/reunions', reunions_controller.index);  

/* Create reunion. */
router.post('/reunions', reunions_controller.reunion_create_post);
/* GET a specific Task */
router.get('/reunion/:id', reunions_controller.reunion_detail);

router.get('/reunion/:id/users', reunions_controller.reunion_users_get);


module.exports = router;
