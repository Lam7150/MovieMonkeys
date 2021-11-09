module.exports = app => {
  const Rating = require("../controllers/rating.controller.js");

  // Gets rating based on movie id
  app.get("/rating/:id", Rating.find);
};