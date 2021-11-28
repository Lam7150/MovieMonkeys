const sql = require("./db.js");

const User_Movie_Pref = function (user) {
    this.userName = user.userName;
    this.genre = user.genre;
    this.country = user.country;
    this.language = user.language;
};

User_Movie_Pref.find = (Curr_User_ID, result) => {
    sql.query(`SELECT * FROM User_Movie_Pref WHERE userName="${Curr_User_ID}"`, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        if (res.length) {
          console.log("found customer: ", res[0]);
          result(null, res[0]);
          return;
        }
    
        // not found Customer with the id
        result({ kind: "not_found" }, null);
      });
}

User_Movie_Pref.call = (Curr_User_ID, result) => {
  sql.query(`CALL FindMAX("${Curr_User_ID}")`, (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }
    result(null, res);
  });
}

module.exports = User_Movie_Pref;