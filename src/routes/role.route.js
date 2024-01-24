import express from "express";
import Role from "../controller/role.controller";
import Permission from "../controller/permission.controller";
import checkRole from "../middleware/checkRole";
import verifyToken from "../middleware/verifyToken";


const router = express.Router();

// User
router.delete("/role/all", verifyToken, checkRole('admin'), Role.deleteAllRoles)
router.get("/role/:id", verifyToken, checkRole('admin'), Role.getRole)
router.patch("/role/:id", verifyToken, checkRole('admin'), Role.updateRole)
router.delete("/role/:id", verifyToken, checkRole('admin'), Role.deleteRole)
router.post("/role", verifyToken, checkRole('admin'), Role.register)
router.get("/role", verifyToken, checkRole('admin'), Role.getAllRoles)

router.delete("/permission/all", verifyToken, checkRole('admin'), Permission.deleteAllPermissions)
router.get("/permission/:id", verifyToken, checkRole('admin'), Permission.getPermission)
router.patch("/permission/:id", verifyToken, checkRole('admin'), Permission.updatePermission)
router.delete("/permission/:id", verifyToken, checkRole('admin'), Permission.deletePermission)
router.post("/permission", verifyToken, checkRole('admin'), Permission.register)
router.get("/permission", verifyToken, checkRole('admin'), Permission.getAllPermissions)

export default router;
