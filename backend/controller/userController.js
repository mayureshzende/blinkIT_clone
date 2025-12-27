import mongoose from "mongoose";
import UserModel from "../models/userModel.js";

export const signUp = async (req, res) => {
  //   console.log(req.body);
  const { firstName, lastName, email, password, profileImg } = req.body;
  //   console.log(firstName, lastName, email, password);
  try {
    const user = await UserModel.findOne({ email: email });
    // console.log(user);
    if (user) {
      res.status(200).json({
        data: {},
        message: "User with the Email already exists.",
        status: "error",
      });
    } else {
      const newUser = UserModel({
        firstName,
        lastName,
        email,
        password,
        profileImg,
      });
      const save = await newUser.save();
      res.status(201).json({
        data: {
          firstName: firstName,
          lastName: lastName,
          email: email,
          profileImg: profileImg,
        },
        message: "User Created successfully",
        status: "success",
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export const login = async (req, res) => {
  // console.log(req.body);
  const { email, password } = req.body;
  //   console.log(email, password);
  try {
    const user = await UserModel.findOne({ email: email });
    if (user) {
      if (user.password === password) {
        res.status(200).json({
          data: {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            profileImg: user?.profileImg,
          },
          message: "Login success",
          status: "success",
        });
      } else {
        res.status(401).json({
          data: {},
          message: "Login Failed, user details does not match",
          status: "error",
        });
      }
    } else {
      res.status(200).json({
        data: {},
        message: "No user found with the email, please sign up.",
        status: "error",
      });
    }
  } catch (error) {
    console.error(error);
  }
};
