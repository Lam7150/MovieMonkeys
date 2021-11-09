module.exports = app => {
  const movie = require("../controllers/movie.controller.js");

  // Gets all movies [limit 1000] with specified filters
  app.get("/movie", movie.getAll);

  // Gets top rated movies by country [limit 10]
  app.get("/movie/country/:country", movie.getTopByCountry);

  // Gets top rated movies by genre [limit 10]
  app.get("/movie/genre/:genre", movie.getTopByGenre);

};
