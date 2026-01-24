const mongoose = require("mongoose");

const searchHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  type: {
    type: String, // "weather" or "crop"
    required: true
  },
  query: {
    type: String, // city name / crop name
    required: true
  },
  result: {
    type: Object // store API response (simplified)
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("SearchHistory", searchHistorySchema);
