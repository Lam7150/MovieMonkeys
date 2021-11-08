const sql = require("./db.js");

// constructor
const Rating = function (rating) {
  this.Imdb_title_id = rating.Imdb_title_id;
  this.Weighted_average_vote = rating.Weighted_average_vote;
  this.Total_votes = rating.Total_votes;
  this.Mean_vote = rating.Mean_vote;
  this.Median_vote = rating.Median_vote;
  this.Votes_10 = rating.Votes_10;
  this.Votes_9 = rating.Votes_9;
  this.Votes_8 = rating.Votes_8;
  this.Votes_7 = rating.Votes_7;
  this.Votes_6 = rating.Votes_6;
  this.Votes_5 = rating.Votes_5;
  this.Votes_4 = rating.Votes_4;
  this.Votes_3 = rating.Votes_3;
  this.Votes_2 = rating.Votes_2;
  this.Votes_1 = rating.Votes_1;
  this.Allgenders_0age_avg_vote = rating.Allgenders_0age_avg_vote;
  this.Allgenders_0age_votes = rating.Allgenders_0age_votes;
  this.Allgenders_18age_avg_vote = rating.Allgenders_18age_avg_vote;
  this.Allgenders_18age_votes = rating.Allgenders_18age_votes;
  this.Allgenders_30age_avg_vote = rating.Allgenders_30age_avg_vote;
  this.Allgenders_30age_votes = rating.Allgenders_30age_votes;
  this.Allgenders_45age_avg_vote = rating.Allgenders_45age_avg_vote;
  this.Allgenders_45age_votes = rating.Allgenders_45age_votes;
  this.Males_allages_avg_vote = rating.Males_allages_avg_vote;
  this.Males_allages_votes = rating.Males_allages_votes;
  this.Males_0age_avg_vote = rating.Males_0age_avg_vote;
  this.Males_0age_votes = rating.Males_0age_votes;
  this.Males_18age_avg_vote = rating.Males_18age_avg_vote;
  this.Males_18age_votes = rating.Males_18age_votes;
  this.Females_allages_votes = rating.Females_allages_votes;
  this.Females_0age_avg_vote = rating.Females_0age_avg_vote;
  this.Females_0age_votes = rating.Females_0age_votes;
  this.Females_18age_avg_vote = rating.Females_18age_avg_vote;
  this.Females_18age_votes = rating.Females_18age_votes;
  this.Females_30age_avg_vote = rating.Females_30age_avg_vote;
  this.Females_30age_votes = rating.Females_30age_votes;
  this.Females_45age_avg_vote = rating.Females_45age_avg_vote;
  this.Females_45age_votes = rating.Females_45age_votes;
  this.usTop1000_voters_ratingerName = rating.Top1000_voters_rating;
  this.Top1000_voters_votes = rating.Top1000_voters_votes;
  this.Us_voters_rating = rating.Us_voters_rating;
  this.Us_voters_votes = rating.Us_voters_votes;
  this.Non_us_voters_rating = rating.Non_us_voters_rating;
  this.Non_us_voters_votes = rating.Non_us_voters_votes;
};

Rating.find = (RatingID, result) => {
  // Insert query below
  sql.query(`SELECT * FROM Ratings Where Imdb_title_id =  "${RatingID}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } 
  if (res.length) {
      console.log("found Rating: ", res[0]);
      result(null, res[0]);
      return;
  }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

module.exports = Rating;