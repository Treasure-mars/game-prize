import express from "express";
import Role from "../controller/role.controller";
import Permission from "../controller/permission.controller";
import RolePermission from "../controller/rolepermission.controller";
import checkRole from "../middleware/checkRole";
import verifyToken from "../middleware/verifyToken";


const router = express.Router();

// Role
router.delete("/role/all", verifyToken, checkRole('ADD_ROLE'), Role.deleteAllRoles)
router.get("/role/:roleId", verifyToken, checkRole('VIEW_ROLES'), Role.getRole)
router.patch("/role/:roleId", verifyToken, checkRole('ADD_ROLE'), Role.updateRole)
router.delete("/role/:roleId", verifyToken, checkRole('ADD_ROLE'), Role.deleteRole)
router.post("/role", verifyToken, checkRole('ADD_ROLE'), Role.register)
router.get("/role", verifyToken, checkRole('VIEW_ROLES'), Role.getAllRoles)

// Permissions
router.delete("/permission/all", verifyToken, checkRole('ADD_ROLE'), Permission.deleteAllPermissions)
router.get("/permission/:permissionId", verifyToken, checkRole('VIEW_ROLES'), Permission.getPermission)
router.patch("/permission/:permissionId", verifyToken, checkRole('ADD_ROLE'), Permission.updatePermission)
router.delete("/permission/:permissionId", verifyToken, checkRole('ADD_ROLE'), Permission.deletePermission)
router.post("/permission", verifyToken, checkRole('ADD_ROLE'), Permission.register)
router.get("/permission", verifyToken, checkRole('VIEW_ROLES'), Permission.getAllPermissions)

// Role Permissions
router.post("/roles/:roleId/permissions", verifyToken, checkRole('ADD_ROLE'), RolePermission.addRolePermission)
router.get("/roles/:roleId/permissions", verifyToken, checkRole('VIEW_ROLES'), RolePermission.getAllRolePermissions)
router.delete("/roles/:roleId/permissions", verifyToken, checkRole('ADD_ROLE'), RolePermission.deleteAllRolePermissions)
router.get("/roles/:roleId/permissions/:permissionId", verifyToken, checkRole('VIEW_ROLES'), RolePermission.getRolePermission)
router.post("/roles/:roleId/selected", verifyToken, checkRole('ADD_ROLE'), RolePermission.updateRolePermissions)
router.delete("/roles/:roleId/selected", verifyToken, checkRole('ADD_ROLE'), RolePermission.deleteRolePermissions)

export default router;