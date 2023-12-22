import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: { type: String, required: true },
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },

//   image: String,
//   darkMode: { type: Boolean, default: false },
//   onboarded: { type: Boolean, default: false},
//-   todos: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Todo",
//     },
//   ],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;