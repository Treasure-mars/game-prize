import express from "express";
import Users from "../controller/user.controller";
import Notification from "../controller/notification.controller";
import signupValidate from "../middleware/signUpValidate";
<<<<<<< HEAD:Player-App/src/routes/user.route.js
import { checkUserExist } from "../middleware/checkUser";
=======
import { checkUserExist, checkUser } from "../middleware/checkUser";
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/routes/user.route.js
import verifyToken from "../middleware/verifyToken";

const router = express.Router();

// User
router.post("/register", signupValidate, checkUserExist, Users.register, Notification.register)
router.post("/login", Users.login)
<<<<<<< HEAD:Player-App/src/routes/user.route.js
router.post("/verify-otp", Users.verifyOtp)
router.patch("/change-password", verifyToken, Users.changePassword)
router.post("/forgot-password", Users.forgotPassword, Notification.register)
router.post("/resend-otp", Users.resendOtp, Notification.register)
router.post("/reset-password/:otpCode", Users.resetPassword)
=======
router.post("/verify-otp", checkUser, Users.verifyOtp)
router.patch("/change-password", verifyToken, Users.changePassword)
router.post("/forgot-password", checkUser, Users.forgotPassword)
router.post("/resend-otp", checkUser, Users.resendOtp)
router.post("/reset-password/:otpCode", checkUser, Users.resetPassword)
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/routes/user.route.js
router.get("/profile", verifyToken, Users.getProfile)
router.patch("/profile", verifyToken, Users.updateProfile)
router.post("/logout", verifyToken, Users.logout)

export default router;
