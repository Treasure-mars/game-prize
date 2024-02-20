import express from "express";
import Notification from "../controller/notification.controller";
import checkRole from "../middleware/checkRole";
import verifyToken from "../middleware/verifyToken";

const router = express.Router();

// Notification
router.patch("/:notificationId", verifyToken, checkRole('EDIT_PRODUCT'), Notification.updateNotification)
router.get("/all", verifyToken, checkRole('VIEW_PRODUCTS'), Notification.getAllNotifications)
router.get("/:notificationId", verifyToken, checkRole('VIEW_PRODUCTS'), Notification.getNotification)
router.delete("/:notificationId", verifyToken, checkRole('EDIT_PRODUCT'), Notification.deleteNotification)

export default router;
