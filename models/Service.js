const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  servicename: { type: String, required: true },
  servicedescription: { type: String, required: true },
  image: { type: String, required: true }
});

module.exports = mongoose.model("Service", ServiceSchema);
