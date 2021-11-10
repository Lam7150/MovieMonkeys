module.exports = app => {
  const movie = require("../controllers/movie.controller.js");

  // Gets all movies [limit 1000]
  app.get("/movie", movie.getAll);

  // Get movie by id
  app.get("/movie/:id", movie.getById);

  // Gets top rated movies by country [limit 10]
  app.get("/movie/country/:country", movie.getTopByCountry);

  // Gets top rated movies by genre [limit 10]
  app.get("/movie/genre/:genre", movie.getTopByGenre);

};
