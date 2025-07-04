const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // so name doesn't duplicate
  },
  password: {
    type: String,
    required: true,
  },
});

// Hash password before saving
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare entered password with stored hash
adminSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.models.Admin || mongoose.model("Admin", adminSchema);
