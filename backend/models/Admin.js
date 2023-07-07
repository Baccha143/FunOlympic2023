const mongoose = require("mongoose");
const { Schema } = mongoose;

const AdminSchema = new Schema({
  username: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  cpassword: { type: String, require: true },
  date: { type: Date, default: Date.now },
  phone: {type: String, require: true, unique:true}
});
const Admin = mongoose.model("admin", AdminSchema);
Admin.createIndexes
module.exports = Admin
