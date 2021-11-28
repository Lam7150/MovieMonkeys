const UserMoviePref = require("../models/user-movie-pref.model");

exports.find = (req, res) => {
    UserMoviePref.find(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving User with id " + req.params.id
                }); 
            }
        } else {
            res.send(data);
        }
    });
};

exports.add = (req, res) => {
    UserMoviePref.call(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving User with id " + req.params.id
                }); 
            }
        } else {
            res.send("success");
        }
    })
}