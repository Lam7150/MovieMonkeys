module.exports = app => {

  const name = require("../controllers/name.controller.js");

  // Gets name of person by their ID [limit 1]
  app.get("/name/:id", name.getNameById);
};
