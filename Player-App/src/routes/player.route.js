import express from "express";
import Player from "../controller/player.controller";
import Token from "../controller/token.controller";
<<<<<<< HEAD:Player-App/src/routes/player.route.js
import Payment from "../controller/payment.controller";
import Notification from "../controller/notification.controller";
=======
import checkRole from "../middleware/checkRole";
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/routes/player.route.js
import verifyToken from "../middleware/verifyToken";

const router = express.Router();

// Player
<<<<<<< HEAD:Player-App/src/routes/player.route.js
router.get("/getAllProduct", verifyToken, Player.getAllProduct)
router.post("/playForProduct/:productId", verifyToken, Player.playForProduct, Payment.register, Token.register, Notification.register)
=======
// router.post("/register", verifyToken, checkRole('ADD_USER'), Player.register)
router.get("/getAllProduct", verifyToken, Player.getAllProduct)
// router.patch("/:playerId", verifyToken, checkRole('ADD_USER'), Player.updatePlayer)
// router.get("/all", verifyToken, checkRole('VIEW_USERS'), Player.getAllPlayers)
// router.get("/:playerId", verifyToken, checkRole('VIEW_USERS'), Player.getPlayer)
// router.delete("/:playerId", verifyToken, checkRole('ADD_USER'), Player.deletePlayer)
router.post("/playForProduct/:productId", verifyToken, Player.playForProduct, Token.register)
router.post("/pickWinner/:productId/:drawId", verifyToken, checkRole('MAKE_DRAW'), Player.pickWinner)
router.get("/viewWinner/:tokenId", verifyToken, checkRole('VIEW_WINNER'), Player.viewWinner)
router.get("/confirmWinner/:tokenId", verifyToken, checkRole('CONFIRM_WINNER'), Player.confirmWinner)
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/routes/player.route.js

export default router;
