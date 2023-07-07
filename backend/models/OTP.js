const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  phone: {type: String, require: true, unique:true},
  OTP: {type: String, require: true}
});
const OTP = mongoose.model("otp", UserSchema);
OTP.createIndexes
module.exports = OTP
