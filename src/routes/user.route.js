import express from "express";
import Users from "../controller/user.controller";
import signupValidate from "../middleware/signUpValidate";
import { checkUserExist, checkUser } from "../middleware/checkUser";
import verifyToken from "../middleware/verifyToken";

const router = express.Router();

// User
router.post("/register", signupValidate, checkUserExist, Users.register)
router.post("/login", Users.login)
router.post("/verify-otp", checkUser, Users.verifyOtp)
router.patch("/change-password", verifyToken, Users.changePassword)
router.post("/forgot-password", checkUser, Users.forgotPassword)
router.post("/resend-otp", checkUser, Users.resendOtp)
router.post("/reset-password/:otpCode", checkUser, Users.resetPassword)
router.get("/profile", verifyToken, Users.getProfile)
router.patch("/profile", verifyToken, Users.updateProfile)
router.post("/logout", verifyToken, Users.logout)

export default router;
