import express from "express";
import Player from "../controller/player.controller";
import checkRole from "../middleware/checkRole";
import verifyToken from "../middleware/verifyToken";

const router = express.Router();

// Player
router.post("/pickWinner/:productId/:drawId", verifyToken, checkRole('MAKE_DRAW'), Player.pickWinner)
router.get("/viewWinner/:tokenId", verifyToken, checkRole('VIEW_WINNER'), Player.viewWinner)
router.get("/confirmWinner/:tokenId", verifyToken, checkRole('CONFIRM_WINNER'), Player.confirmWinner)

export default router;
