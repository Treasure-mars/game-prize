import express from "express";
import Users from "../controller/user.controller";
import signupValidate from "../middleware/signUpValidate";
import { checkUserExist } from "../middleware/checkUser";

const router = express.Router();

router.post("/register", signupValidate, checkUserExist, Users.register);

export default router;
