import express from "express";
import Notification from "../controller/notification.controller";
<<<<<<< HEAD:Player-App/src/routes/notification.route.js
=======
import checkRole from "../middleware/checkRole";
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/routes/notification.route.js
import verifyToken from "../middleware/verifyToken";

const router = express.Router();

<<<<<<< HEAD:Player-App/src/routes/notification.route.js
// Notifications
router.get("/all", verifyToken, Notification.getAllNotifications)
router.get("/:notificationId", verifyToken, Notification.getNotification)
=======
// Notification
router.post("/register", verifyToken, checkRole('ADD_PRODUCT'), Notification.register)
router.patch("/:notificationId", verifyToken, checkRole('EDIT_PRODUCT'), Notification.updateNotification)
router.get("/all", verifyToken, checkRole('VIEW_PRODUCTS'), Notification.getAllNotifications)
router.get("/:notificationId", verifyToken, checkRole('VIEW_PRODUCTS'), Notification.getNotification)
router.delete("/:notificationId", verifyToken, checkRole('EDIT_PRODUCT'), Notification.deleteNotification)
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/routes/notification.route.js

export default router;
