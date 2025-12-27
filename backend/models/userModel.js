import { Schema, model } from "mongoose";

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImg: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UserModel = model("user", userSchema);

export default UserModel;
