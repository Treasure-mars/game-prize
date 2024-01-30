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
router.get("/banned", verifyToken, checkRole('admin'), Admin.allBannedUser)
router.get("/all", verifyToken, checkRole('admin'), Admin.allUsers)
router.get("/:id", verifyToken, checkRole('admin'), Admin.identifiedUser)
router.patch("/:id", verifyToken, checkRole('admin'), Admin.updateUser)
router.delete("/:id", verifyToken, checkRole('admin'), Admin.deleteUser)
router.delete("/banned/:id", verifyToken, checkRole('admin'), Admin.banUserDel)

export default router;
