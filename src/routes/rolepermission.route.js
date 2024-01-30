import express from "express";
import RolePermission from "../controller/rolepermission.controller";
import checkRole from "../middleware/checkRole";
import verifyToken from "../middleware/verifyToken";


const router = express.Router();

// User
router.post("/roles/:roleId/permissions", verifyToken, checkRole('admin'), RolePermission.addRolePermission)
router.get("/roles/:roleId/permissions", verifyToken, checkRole('admin'), RolePermission.getAllRolePermissions)
router.delete("/roles/:roleId/permissions", verifyToken, checkRole('admin'), RolePermission.deleteAllRolePermissions)
router.get("/roles/:roleId/permissions/:permissionId", verifyToken, checkRole('admin'), RolePermission.getRolePermissions)
router.post("/roles/:roleId/selected", verifyToken, checkRole('admin'), RolePermission.updateRolePermissions)
router.delete("/roles/:roleId/selected", verifyToken, checkRole('admin'), RolePermission.deleteRolePermissions)

export default router;