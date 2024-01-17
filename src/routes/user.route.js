import express from "express";
import Users from "../controller/user.controller";
import signupValidate from "../middleware/signUpValidate";
import checkRole from "../middleware/checkRole";
import { checkUserExist } from "../middleware/checkUser";

const router = express.Router();

router.post("/register", signupValidate, checkUserExist, Users.register);
router.post("/login", Users.login)
router.post("/verify-otp", Users.verifyOtp)
router.patch("/change-password", Users.changePassword)
router.post("/forgot-password", Users.forgotPassword)
router.post("/resend-otp", Users.resendOtp)
router.post("/reset-password/:otpCode", Users.resetPassword)
router.get("/profile", Users.profile)
router.patch("/profiles", Users.profiles)
router.post("/logout", Users.logout)

export default router;
