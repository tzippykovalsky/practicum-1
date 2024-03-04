import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  
    userName: String,
    phone: String,
    email: { type: String, unique: true }

});

export const User = mongoose.model("users", userSchema);

