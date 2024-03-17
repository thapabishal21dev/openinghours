const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  opening_times: {
    Sunday: { date: String, status: String, open: String, close: String },
    Monday: { date: String, status: String, open: String, close: String },
    Tuesday: { date: String, status: String, open: String, close: String },
    Wednesday: { date: String, status: String, open: String, close: String },
    Thursday: { date: String, status: String, open: String, close: String },
    Friday: { date: String, status: String, open: String, close: String },
    Saturday: { date: String, status: String, open: String, close: String },
  },
});

const UserModel = mongoose.model("openinghours", UserSchema);

module.exports = UserModel;
