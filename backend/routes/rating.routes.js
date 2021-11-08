module.exports = app => {
    const Rating = require("../controllers/rating.controller.js");
    app.get("/Rating/:id", Rating.find);

};