const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: [100, " name must not have more than 100"],
  },
  address: { type: String },
  phone: {
    type: String,
    maxlength: [10, "phone number must not have more than 10"],
  },
  devices: [{ type: mongoose.Schema.Types.ObjectId, ref: "Device" }],
});

const Location = mongoose.model("Location", locationSchema);

module.exports = Location;
