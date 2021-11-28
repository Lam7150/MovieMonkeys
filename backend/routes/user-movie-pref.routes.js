module.exports = app => {
    const UserMoviePref = require("../controllers/user-movie-pref.controller.js");
  
    // Find user movie preferences
    app.get("/user_movie_pref/:id", UserMoviePref.find);
};