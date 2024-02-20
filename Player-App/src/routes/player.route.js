import express from "express";
import Player from "../controller/player.controller";
import Token from "../controller/token.controller";
import Payment from "../controller/payment.controller";
import Notification from "../controller/notification.controller";
import verifyToken from "../middleware/verifyToken";

const router = express.Router();

// Player
router.get("/getAllProduct", verifyToken, Player.getAllProduct)
router.post("/playForProduct/:productId", verifyToken, Player.playForProduct, Payment.register, Token.register, Notification.register)

export default router;
