const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// enable 'Access-Control-Allow-Origin' header from all sources
app.use(cors());

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to movie monkeys application." });
});

// routes
require("./routes/movie.routes.js")(app);
require("./routes/movie-info.routes.js")(app);
require("./routes/name.routes.js")(app);
require("./routes/rating.routes.js")(app);
require("./routes/user-rating.routes.js")(app);
require("./routes/user.routes.js")(app);
require("./routes/user-movie-pref.routes.js")(app);

// set port, listen for requests
app.listen(9000, () => {
  console.log("Server is running on port 9000.");
});
