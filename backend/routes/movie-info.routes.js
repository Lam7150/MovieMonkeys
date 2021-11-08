module.exports = app => {
    const MovieInfo = require("../controllers/movie-info.controller.js");
    app.get("/movie_info/:id", MovieInfo.find);

};