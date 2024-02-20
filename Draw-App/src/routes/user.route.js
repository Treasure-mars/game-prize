import express from "express";
import Users from "../controller/user.controller";
import verifyToken from "../middleware/verifyToken";

const router = express.Router();

// User
router.post("/login", Users.login)
router.get("/profile", verifyToken, Users.getProfile)
router.patch("/profile", verifyToken, Users.updateProfile)
router.post("/logout", verifyToken, Users.logout)

export default router;
