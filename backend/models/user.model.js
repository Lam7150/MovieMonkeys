const sql = require("./db.js");

// constructor
const User = function(user) {
  this.userName = user.userName;
  this.firstName = user.firstName;
  this.lastName = user.lastName;
};

User.create = (newUser, result) => {
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
