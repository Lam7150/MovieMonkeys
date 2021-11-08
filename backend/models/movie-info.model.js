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

MovieInfo.find = (movieID, result) => {
  // Insert query below
  sql.query(`SELECT * FROM Movie_Information WHERE Imdb_title_id = "${movieID}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};
module.exports = MovieInfo;
