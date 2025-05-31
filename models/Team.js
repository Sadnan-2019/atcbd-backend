const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  membername: { type: String, required: true },
  memberdesignation: { type: String, required: true },
  image: { type: String, required: true }
}, {
  timestamps: true // <-- this adds createdAt and updatedAt fields
});

module.exports = mongoose.model("Team", teamSchema);
