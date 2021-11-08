const sql = require("./db.js");

// constructor
const User = function (user) {
  this.userName = user.userName;
  this.firstName = user.firstName;
  this.lastName = user.lastName;
};

User.create = (newUser, result) => {
  // Insert query below
  sql.query("INSERT INTO User_Info SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created customer: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};
// add read 
User.find = (Curr_User_ID, result) => {
  console.log(Curr_User_ID)
  // Insert query below
  sql.query(`SELECT * FROM User_Info Where userName =  "${Curr_User_ID}"`, (err, res) => {
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
};
// add remove 
User.remove = (curr_user_id, result) => {
  sql.query(`DELETE FROM User_Info WHERE userName = "${curr_user_id}"`, (err, res) => {
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
module.exports = User;