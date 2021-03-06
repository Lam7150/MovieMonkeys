const Movie = require("../models/movie.model.js");
// CRUD functions could probably be named better, but I'm lazy, these work

// Gets all movies [limit 1000]
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

// Gets movie by id
exports.getById = (req, res) => {
  Movie.getById(req.params.id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving movies."
      });
    else res.send(data);
  });
};

// Gets movie by title
exports.getByTitle = (req, res) => {
  Movie.getByTitle(req.params.title, (err, data) => {
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
  Movie.getTopByCountry(req.params.country, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No movies found for country with name ${req.params.country}.`
        });
      } else {
        res.status(500).send({
          message: `Error retrieving movies from country with name ${req.params.country}.`
        });
      }
    } else res.send(data);
  });
};

// Gets top rated movies by genre [limit 1000]
exports.getTopByGenre = (req, res) => {
  Movie.getTopByGenre(req.params.genre, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No movies found for genre with name ${req.params.genre}.`
        });
      } else {
        res.status(500).send({
          message: `Error retrieving movies from genre with name ${req.params.genre}.`
        });
      }
    } else res.send(data);
  });
};

exports.getTopByPref = (req, res) => {
  console.log(req.query);
  Movie.getTopByPref(req.query.genre, req.query.country, req.query.language, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No movies found for genre with name ${req.params.genre}.`
        });
      } else {
        res.status(500).send({
          message: `Error retrieving movies from genre with name ${req.params.genre}.`
        });
      }
    } else res.send(data);
  });
}