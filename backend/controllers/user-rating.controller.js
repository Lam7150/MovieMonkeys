const UserRating = require("../models/user-rating.model.js");
const Movie = require("../models/movie.model.js")

// Gets users movies + ratings based on ID
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

// Gets user's movie rating
exports.findMovie = (req, res) => {
  UserRating.findMovie(req.params.id, req.params.movieID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error getting user rating with id " + req.params.id + "and movie id" + req.params.movieID
        });
      }
    } else res.send(data);
  });
};

// Removes a user rating from table
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

// Creates a user rating for movie
exports.create = (req, res) => {
  Movie.getNameById(req.params.movieID, (err, data) => {
    if (err) {
      res.status(500).send({ message: "could not find movie by id when creating user-rating" });
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

// Updates a user's movie rating entry
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