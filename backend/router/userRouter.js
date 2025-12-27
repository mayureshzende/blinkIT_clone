import express from "express";
import * as userController from "../controller/userController.js";
// import { signUp, login } from "../controller/userController.js";
const userrouter = express.Router();

userrouter.get("/user", (req, res) => {
  res.status(200).json({ data: "this is a dummy user" });
});

userrouter.post("/signup", userController.signUp);
userrouter.post("/login", userController.login);
// router.post("/signup", signUp);

export default userrouter;
