const UserRating = require("../models/user-rating.model.js");

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
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a User Rating
  const userRating = new UserRating({
    userName: req.body.userName,
    Imdb_title_id: req.body.Imdb_title_id,
    movieName: req.body.movieName,
    movieRating: req.body.movieRating
  });

  UserRating.create(userRating, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User Rating."
      });
    else res.send(data);
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