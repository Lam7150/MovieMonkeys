const Name = require("../models/name.model.js");

// Gets name of person by their ID [limit 1]
exports.getNameById = (req, res) => {
    Name.getNameById(req.params.id, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving name."
        });
      else res.send(data);
    });
  };