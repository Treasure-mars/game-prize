import express from "express";
import Notification from "../controller/notification.controller";
import verifyToken from "../middleware/verifyToken";

const router = express.Router();

// Notifications
router.get("/all", verifyToken, Notification.getAllNotifications)
router.get("/:notificationId", verifyToken, Notification.getNotification)

export default router;
