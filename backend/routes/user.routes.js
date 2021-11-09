module.exports = app => {
  const User = require("../controllers/user.controller.js");

  // Create and save a new User
  app.post("/user", User.create);

  // Get a user by ID
  app.get("/user/:id", User.find);

  // Delete a user by ID 
  app.delete("/user/:id", User.remove);
};