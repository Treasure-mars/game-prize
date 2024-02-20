import express from "express";
import Payment from "../controller/payment.controller";
import checkRole from "../middleware/checkRole";
import verifyToken from "../middleware/verifyToken";

const router = express.Router();

// Payment
router.post("/register", verifyToken, checkRole('ADD_PRODUCT'), Payment.register)
router.patch("/:paymentId", verifyToken, checkRole('EDIT_PRODUCT'), Payment.updatePayment)
router.get("/all", verifyToken, checkRole('VIEW_PRODUCTS'), Payment.getAllPayments)
router.get("/:paymentId", verifyToken, checkRole('VIEW_PRODUCTS'), Payment.getPayment)
router.delete("/:paymentId", verifyToken, checkRole('EDIT_PRODUCT'), Payment.deletePayment)

export default router;
