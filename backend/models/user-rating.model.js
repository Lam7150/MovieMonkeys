const sql = require("./db.js");

// constructor
const UserRating = function (rating) {
  this.userName = rating.userName;
  this.Imdb_title_id = rating.Imdb_title_id;
  this.movieName = rating.movieName;
  this.movieRating = rating.movieRating;
};

UserRating.create = (newUserRating, result) => {
  // Insert query below
  sql.query("INSERT INTO User_Movie_Info SET ?", newUserRating, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...newUserRating });
  });
};

UserRating.find = (Curr_User_ID, result) => {
  console.log(Curr_User_ID)
  // Insert query below
  sql.query(`SELECT * FROM User_Movie_Info WHERE userName =  "${Curr_User_ID}" LIMIT 100`, (err, res) => {
    console.log(res);
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found customer: ", res);
      result(null, res);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

UserRating.findMovie = (Curr_User_ID, Movie_ID, result) => {
  // Insert query below
  sql.query(`SELECT * FROM User_Movie_Info WHERE userName = "${Curr_User_ID}" AND Imdb_title_id = "${Movie_ID}"`, (err, res) => {
    console.log(res);
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found customer: ", res);
      result(null, res);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

UserRating.remove = (Curr_User_ID, Movie_ID, result) => {
  sql.query(`DELETE FROM User_Movie_Info WHERE userName = "${Curr_User_ID}" AND Imdb_title_id = "${Movie_ID}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted user with id: ", curr_user_id);
    result(null, res);
  });
};

UserRating.update = (Curr_User_ID, Movie_ID, rating, result) => {
  sql.query(`UPDATE User_Movie_Info SET movieRating=${rating} WHERE userName = "${Curr_User_ID}" AND Imdb_title_id = "${Movie_ID}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("updated user rating with id: ", Curr_User_ID);
    result(null, res);
  });
};

module.exports = UserRating;