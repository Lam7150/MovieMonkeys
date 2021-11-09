const Rating = require("../models/rating.model.js");

// Get movie ratings based on ID
exports.find = (req, res) => {
  Rating.find(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Rating with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Rating with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};
