import express from "express";
import Admin from "../controller/admin.controller";
import adminValidate from "../middleware/adminValidate";
import checkRole from "../middleware/checkRole";
import { checkUserExist } from "../middleware/checkUser";
import verifyToken from "../middleware/verifyToken";

const router = express.Router();

// Admin
router.post("/register/admin", verifyToken, checkUserExist, checkRole('ADD_USER'), adminValidate, Admin.register)
router.post("/banned", verifyToken, checkRole('ADD_USER'), Admin.banUser)
router.get("/banned", verifyToken, checkRole('VIEW_USERS'), Admin.allBannedUser)
router.get("/all", verifyToken, checkRole('VIEW_USERS'), Admin.allUsers)
router.get("/:userId", verifyToken, checkRole('VIEW_USERS'), Admin.identifiedUser)
router.patch("/:userId", verifyToken, checkRole('ADD_USER'), Admin.updateUser)
router.delete("/:userId", verifyToken, checkRole('ADD_USER'), Admin.deleteUser)
router.delete("/banned/:userId", verifyToken, checkRole('ADD_USER'), Admin.banUserDel)

export default router;
