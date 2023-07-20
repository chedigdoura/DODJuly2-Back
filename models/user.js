import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: false },
  googleId: { type: String, required: false },
  //Password et googleId are not required because i'll be using the GoogleAPI
  id: { type: String },
  role: { type: String, default: "User" },
});

export default mongoose.model("User", userSchema);
