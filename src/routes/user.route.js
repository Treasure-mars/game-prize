import express from "express";
import Users from "../controller/user.controller";
import signupValidate from "../middleware/signUpValidate";
import checkRole from "../middleware/checkRole";
import { checkUserExist } from "../middleware/checkUser";
import verifyToken from "../middleware/verifyToken";

const router = express.Router();

// User
router.post("/register", signupValidate, checkUserExist, Users.register)
router.post("/login", Users.login)
router.post("/verify-otp", verifyToken, Users.verifyOtp)
router.patch("/change-password", verifyToken, Users.changePassword)
router.post("/forgot-password", Users.forgotPassword)
router.post("/resend-otp", Users.resendOtp)
router.post("/reset-password/:otpCode", Users.resetPassword)
router.get("/profile", verifyToken, Users.profile)
router.patch("/profiles", verifyToken, Users.profiles)
router.post("/logout", verifyToken, Users.logout)

export default router;
