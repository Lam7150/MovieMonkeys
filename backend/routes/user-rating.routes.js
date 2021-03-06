module.exports = app => {
  const UserRatings = require("../controllers/user-rating.controller.js");

  // Gets users movies + ratings based on ID
  app.get("/user_ratings/:id", UserRatings.find);

  // Gets user's movie rating
  app.get("/user_ratings/:id/:movieID", UserRatings.findMovie);

  // Creates a user rating for movie
  app.post("/user_ratings/", UserRatings.create);

  // Updates a user's movie rating entry
  app.put("/user_ratings/:id/:movieID/:rating", UserRatings.update);

  // Removes a user rating from table
  app.delete("/user_ratings/:id/:movieID", UserRatings.remove);
};