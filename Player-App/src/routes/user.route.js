import express from "express";
import Users from "../controller/user.controller";
import Notification from "../controller/notification.controller";
import signupValidate from "../middleware/signUpValidate";
import { checkUserExist } from "../middleware/checkUser";
import verifyToken from "../middleware/verifyToken";

const router = express.Router();

// User
router.post("/register", signupValidate, checkUserExist, Users.register, Notification.register)
router.post("/login", Users.login)
router.post("/verify-otp", Users.verifyOtp)
router.patch("/change-password", verifyToken, Users.changePassword)
router.post("/forgot-password", Users.forgotPassword, Notification.register)
router.post("/resend-otp", Users.resendOtp, Notification.register)
router.post("/reset-password/:otpCode", Users.resetPassword)
router.get("/profile", verifyToken, Users.getProfile)
router.patch("/profile", verifyToken, Users.updateProfile)
router.post("/logout", verifyToken, Users.logout)

export default router;
