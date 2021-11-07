const sql = require("./db.js");

// constructor
const MovieInfo = function (movieInfo) {
  this.Imdb_title_id = movieInfo.Imdb_title_id;
  this.Ordering = movieInfo.Ordering;
  this.Imdb_name_id = movieInfo.Imdb_name_id;
  this.Category = movieInfo.Category;
  this.Job = movieInfo.Job;
  this.Characters = movieInfo.Characters;
};

MovieInfo.create = (newUser, result) => {
  // Insert query below
  sql.query("INSERT INTO customers SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created customer: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};
