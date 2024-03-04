import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    userName: String,
    email: email,
    phone: String
})

export const User = mongoose.model("users", userSchema);
