import express from "express";
import Admin from "../controller/admin.controller";
import adminValidate from "../middleware/adminValidate";
import checkRole from "../middleware/checkRole";
import { checkUserExist } from "../middleware/checkUser";
import verifyToken from "../middleware/verifyToken";

const router = express.Router();

// User
router.post("/register/admin", verifyToken, checkUserExist, checkRole('ADD_USER'), adminValidate, Admin.register)
router.post("/banned", verifyToken, checkRole('ADD_USER'), Admin.banUser)
router.get("/banned", verifyToken, checkRole('VIEW_USERS'), Admin.allBannedUser)
router.get("/all", verifyToken, checkRole('VIEW_USERS'), Admin.allUsers)
router.get("/:id", verifyToken, checkRole('VIEW_USERS'), Admin.identifiedUser)
router.patch("/:id", verifyToken, checkRole('ADD_USER'), Admin.updateUser)
router.delete("/:id", verifyToken, checkRole('ADD_USER'), Admin.deleteUser)
router.delete("/banned/:id", verifyToken, checkRole('ADD_USER'), Admin.banUserDel)

export default router;
