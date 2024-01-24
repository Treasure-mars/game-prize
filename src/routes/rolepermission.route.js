import express from "express";
import RolePermission from "../controller/rolepermission.controller";
import checkRole from "../middleware/checkRole";
import verifyToken from "../middleware/verifyToken";


const router = express.Router();

// User
router.post("/roles/:roleId/permissions", verifyToken, checkRole('admin'), RolePermission.addRolePermission)
// router.get("/RolePermission", verifyToken, checkRole('admin'), RolePermission.getAllRolePermissions)
// router.delete("/RolePermission/:id", verifyToken, checkRole('admin'), RolePermission.deleteRolePermission)

// router.get("/RolePermission/:id", verifyToken, checkRole('admin'), RolePermission.getRolePermission)
// router.post("/RolePermission/:id", verifyToken, checkRole('admin'), RolePermission.updateRolePermission)
// router.delete("/permission/all", verifyToken, checkRole('admin'), RolePermission.deleteAllRolePermissions)

export default router;