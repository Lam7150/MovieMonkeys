const sql = require("./db.js");

// constructor
const UserRating = function (rating) {
  this.userName = rating.userName;
  this.Imdb_title_ID = rating.Imdb_title_ID;
  this.movieName = rating.movieName;
  this.movieRating = rating.movieRating;
};

UserRating.create = (newRating, result) => {
  sql.query("INSERT INTO customers SET ?", newRating, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created customer: ", { id: res.insertId, ...newRating });
    result(null, { id: res.insertId, ...newRating });
  });
};
