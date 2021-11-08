const UserRating = require("../models/user-rating.model.js");
const Movie = require("../models/movie.model.js")

exports.find = (req, res) => {
    UserRating.find(req.params.id, (err, data) => {
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
        } else res.send(data);
    });
};

exports.remove = (req, res) => {
    UserRating.remove(req.params.id, req.params.movieID, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete User with id " + req.params.id
                });
            }
        } else res.send({ message: `User was deleted successfully!` });
    });
};

exports.create = (req, res) => {
    Movie.getNameById(req.params.movieID, (err, data) => {
        if (err) {
            res.status(500).send({message: "could not find movie by id when creating user-rating"});
        } else {
            const userRating = new UserRating({
                userName: req.params.id,
                Imdb_title_ID: req.params.movieID,
                movieName: data[0].Title,
                movieRating: req.params.rating
            });

            UserRating.create(userRating, (err, data) => {
                if (err)
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the User."
                });
                else res.send(data);
            });
        }
    });
};

exports.update = (req, res) => {
    UserRating.update(req.params.id, req.params.movieID, req.params.rating, (err, data) => {
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
        } else res.send(data);
    });
};