const Team = require('../models/team');

exports.home = (req, res, next) => {
    Team.find({})
        .exec()
        .then((teams) => {
            res.render('home', {teams: teams});
        }, (err) => {
            next(err);
        });
};

exports.addGet = (req, res, next) => {
    res.render('add', {
        validation: null,
        team: {
            name: null,
            city: null,
            year: null
        }
    });
};

exports.addPost = (req, res, next) => {
    const newTeam = {
        name: req.body.name,
        city: req.body.city,
        year: req.body.year
    };
    if(newTeam.name && newTeam.city && newTeam.year) {
        Team.create(newTeam)
            .then((team) => {
                res.redirect('/');
            }, (err) => {
                res.render('add', {
                    validation: err.message,
                    team: {
                        name: newTeam.name,
                        city: newTeam.city,
                        year: newTeam.year
                    }
                });
            });
    } else {
        res.render('add', {
            validation: 'All fields are required',
            team: {
                name: newTeam.name,
                city: newTeam.city,
                year: newTeam.year
            }
        });
    }
};

exports.delete = (req, res, next) => {
    Team.findByIdAndRemove(req.params.id, (err, removed) => {
        if(err) {
            next(err);
        } else {
            res.redirect('/');
        }
    });   
};