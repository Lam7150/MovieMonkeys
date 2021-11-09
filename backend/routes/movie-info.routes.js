module.exports = app => {
  const MovieInfo = require("../controllers/movie-info.controller.js");

  // Gets movie info based on ID
  app.get("/movie_info/:id", MovieInfo.find);
};