module.exports = app => {
  const movie = require("../controllers/movie.controller.js");

  // Retrieve all Movies
  app.get("/movies", movie.findAll);
};
