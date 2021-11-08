module.exports = app => {
    const UserRatings = require("../controllers/user-rating.controller.js");

    app.get("/user_ratings/:id", UserRatings.find);
    app.post("/user_ratings/:id/:movieID/:rating", UserRatings.create);
    app.put("/user_ratings/:id/:movieID/:rating", UserRatings.update);
    app.delete("/user_rating/:id/:movieID", UserRatings.remove);

};