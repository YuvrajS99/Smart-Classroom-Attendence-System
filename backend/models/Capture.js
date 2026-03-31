const mongoose = require("mongoose");

const CaptureSchema = new mongoose.Schema({
  studentCount: Number,
  imageUrl: String,
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Capture", CaptureSchema);
