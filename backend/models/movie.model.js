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

// Gets all movies [limit 1000] with specified filters
Movie.getAll = (title, result) => {
  // Limiting this to 100 for the moment so we don't break the DB
  let query = `SELECT * FROM Movies WHERE Country = 'USA'`;
  if (title) {
    query += ` AND Title LIKE '%${title}%'`
  };
  query += ` ORDER BY Votes DESC LIMIT 100;`
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("movies: ", res);
    result(null, res);
  });
};

// Gets top rated movies by country [limit 10]
Movie.getTopByCountry = (country, result) => {
  // Limiting this to 10 for the moment so we don't break the DB
  sql.query(`SELECT m.Original_title, m.Country, T.Mean_Vote, m.Director 
  FROM Movies m INNER JOIN (Select m1.Imdb_title_id, m1.Title, r1.Mean_vote
  FROM Movies m1 INNER JOIN Ratings r1 ON m1.Imdb_title_id = r1.Imdb_title_id
  WHERE Country LIKE "%${country}%" AND Total_votes > 10000
  Order by Mean_Vote DESC) as T on m.Imdb_title_id = T.Imdb_title_id
  Order by Mean_Vote DESC LIMIT 10;`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("movies: ", res);
    result(null, res);
  });
};

// Gets top rated movies by genre [limit 10]
Movie.getTopByGenre = (genre, result) => {
  // Limiting this to 10 for the moment so we don't break the DB
  sql.query(`SELECT m.Original_title, m.Genre, T.Mean_Vote, m.Director 
  FROM Movies m INNER JOIN (Select m1.Imdb_title_id, m1.Title, r1.Mean_vote
  FROM Movies m1 INNER JOIN Ratings r1 ON m1.Imdb_title_id = r1.Imdb_title_id
  WHERE Genre LIKE "%${genre}%" AND Total_votes > 10000
  Order by Mean_Vote DESC) as T on m.Imdb_title_id = T.Imdb_title_id
  WHERE m.Country = "USA"
  Order by Mean_Vote DESC LIMIT 10;`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("movies: ", res);
    result(null, res);
  });
};

Movie.getNameById = (id, result) => {
  sql.query(`SELECT Original_title FROM Movies WHERE Imdb_title_id = "${id}" LIMIT 1`, (err, res) => {
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