const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    homeworklist: [{link: String, grade: String}]
  });

module.exports = mongoose.model("user", UserSchema);