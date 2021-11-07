const sql = require("./db.js");

// constructor
const Name = function (name) {
  this.Imdb_name_id = name.Imdb_name_id;
  this.Name = name.Name;
  this.Birth_name = name.Birth_name;
  this.Height = name.Height;
  this.Bio = name.Bio;
  this.Birth_details = name.Birth_details;
  this.Date_of_birth = name.Date_of_birth;
  this.Place_of_birth = name.Place_of_birth;
  this.Death_details = name.Death_details;
  this.Date_of_death = name.Date_of_death;
  this.Place_of_death = name.Place_of_death;
  this.Reason_of_death = name.Reason_of_death;
  this.Spouses_string = name.Spouses_string;
  this.Spouses = name.Spouses;
  this.Divorces = name.Divorces;
  this.Spouses_with_children = name.Spouses_with_children;
  this.Children = name.Children;
};

Name.create = (newName, result) => {
  // Insert query below
  sql.query("INSERT INTO customers SET ?", newName, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created customer: ", { id: res.insertId, ...newName });
    result(null, { id: res.insertId, ...newName });
  });
};
