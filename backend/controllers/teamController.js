var Team = require('../models/team');

// Display list of all Teams.
exports.team_list = function(req, res) {
    Team.find()
        .populate('members')
        .exec(function(err, list_teams) {
            if (err) {
                return next(err);
            }
            res.json(list_teams)
        });
};

// Display detail page for a specific Team.
exports.team_detail = function(req, res) {
    Team.findById(req.params.id)
        .populate('members')
        .exec(function(err, results) {
        if (err) {
            return next(err);
        }
        if (results == null) {
            var err = new Error("Team not found");
            err.status = 404;
            return next(err);
        }
        res.json(results);
    });
};

// Handle Team mebers get on GET
exports.team_users_get = function(req, res) {
    Team.findById(req.params.id)
        .populate('members')
        .exec(function(err, results) {
            if (err) {
                return next(err);
            }
            res.json(results.members)
        });
}

// Handle Team create on POST.
exports.team_create_post = function(req, res) {
    var instance_team = new Team({name: req.body.name, members: req.body.members});
    console.log(instance_team)
    instance_team.save(function(err, results) {
        if (err) {
            return handleError(err);
        }
        if (results == null) {
            var err = new Error('Team not found');
            err.status = 404;
            return next(err);
        }
        res.json(results.id);
    });
};

// Handle Team update on POST.
exports.team_update_put = async (req, res) => {
    Team.findByIdAndUpdate(req.params.id, req.body)
    .exec(function(err, result) {
        if (err) {
            return next(err);
        }
        //console.log(result)
        res.json(result);
    });
};

// Display detail  for a specific project in a specific team.
exports.project_team_detail = function(req, res) {
    Team.findById(req.params.id)
        .populate('members')
        .exec(function(err, results) {
        if (err) {
            return next(err);
        }
        if (results == null) {
            var err = new Error("Team not found");
            err.status = 404;
            return next(err);
        }
        //console.log(results.project)
        res.json(results.project);
    });
};
  

// Deletes a Team on DELETE.
exports.team_delete_delete = function(req, res) {
    Team.findByIdAndDelete(req.params.id)
        .exec(function(err, results) {
            if (err) {
                return next(err);
            }
            res.send("Team has successfully been removed.")
        });
};
