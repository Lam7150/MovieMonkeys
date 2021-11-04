const sql = require("./db.js");

// constructor
const Movie = function (movie) {
  this.Imdb_title_ID = movie.Imdb_title_ID;
  this.Title = movie.Title;
  this.Original_title = movie.Original_title;
  this.Year = movie.Year;
  this.Date_published = movie.Date_published;
  this.Genre = movie.Genre;
  this.Duration = movie.Duration;
  this.Country = movie.Country;
  this.Language = movie.Language;
  this.Director = movie.Director;
  this.Production_company = movie.Production_company;
  this.Actors = movie.Actors;
  this.Description = movie.Description;
  this.Avg_vote = movie.Avg_vote;
  this.Votes = movie.Votes;
  this.Budget = movie.Budget;
  this.Usa_gross_income = movie.Usa_gross_income;
  this.Worlwide_gross_income = movie.Worlwide_gross_income;
  this.Metascore = movie.Metascore;
  this.Reviews_from_users = movie.Reviews_from_users;
  this.Reviews_from_critics = movie.Reviews_from_critics;
};

Movie.getAll = result => {
  // Limiting this to 100 for the moment so we don't break the DB
  sql.query("SELECT * FROM Movies LIMIT 100", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("movies: ", res);
    result(null, res);
  });
};

module.exports = Movie;