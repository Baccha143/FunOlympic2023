const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  cpassword: { type: String, require: true },
  date: { type: Date, default: Date.now },
  phone: {type: String, require: true, unique:true}
});
const User = mongoose.model("user", UserSchema);
User.createIndexes
module.exports = User
