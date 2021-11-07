const Movie = require("../models/movie.model.js");
// CRUD functions could probably be named better, but I'm lazy, these work

// Gets all movies [limit 1000] with specified filters
exports.getAll = (req, res) => {
  Movie.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving movies."
      });
    else res.send(data);
  });
};

// Gets top rated movies by country [limit 1000]
exports.getTopByCountry = (req, res) => {
  Movie.getTopByCountry((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving movies."
      });
    else res.send(data);
  });
};

// Gets top rated movies by genre [limit 1000]
exports.getTopByGenre = (req, res) => {
  Movie.getTopByGenre((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving movies."
      });
    else res.send(data);
  });
};