module.exports = app => {
    const User = require("../controllers/user.controller.js");

    app.post("/user", User.create);
    app.get("/user/:id", User.find);
    app.delete("/user/:id", User.remove)

};