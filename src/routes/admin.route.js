import express from "express";
import Admin from "../controller/admin.controller";
import adminValidate from "../middleware/adminValidate";
import checkRole from "../middleware/checkRole";
import { checkUserExist } from "../middleware/checkUser";
import verifyToken from "../middleware/verifyToken";

const router = express.Router();

// User
router.post("/register/admin", verifyToken, checkUserExist, checkRole('admin'), adminValidate, Admin.register)
router.post("/banned", verifyToken, checkRole('admin'), Admin.banUser)
router.delete("/banned/:userId", verifyToken, checkRole('admin'), Admin.verifyOtp)
router.patch("/change-password", verifyToken, checkRole,  Admin.changePassword)
router.post("/forgot-password", verifyToken, checkRole, Admin.forgotPassword)
router.post("/resend-otp", verifyToken, checkRole, Admin.resendOtp)
router.post("/reset-password/:otpCode", verifyToken, checkRole, Admin.resetPassword)
router.get("/profile", verifyToken, checkRole, Admin.profile)
router.patch("/profiles", verifyToken, checkRole, Admin.profiles)
router.post("/logout", verifyToken, checkRole, Admin.logout)

export default router;
