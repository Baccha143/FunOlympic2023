const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: { type: String, require: true },
  description: { type: String, require: true },
});
const Comments = mongoose.model("comments", UserSchema);
Comments.createIndexes;
module.exports = Comments;
