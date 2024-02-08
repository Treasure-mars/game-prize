import express from "express";
import Player from "../controller/player.controller";
import Token from "../controller/token.controller";
import signupValidate from "../middleware/signUpValidate";
import { checkUserExist } from "../middleware/checkUser";
import checkRole from "../middleware/checkRole";
import verifyToken from "../middleware/verifyToken";

const router = express.Router();

// User
router.post("/register", verifyToken, checkRole('ADD_USER'), Player.register)
router.get("/getAllProduct", Player.getAllProduct)
router.patch("/:playerId", verifyToken, checkRole('ADD_USER'), Player.updatePlayer)
router.get("/all", verifyToken, checkRole('VIEW_USERS'), Player.getAllPlayers)
router.get("/:playerId", verifyToken, checkRole('VIEW_USERS'), Player.getPlayer)
router.delete("/:playerId", verifyToken, checkRole('ADD_USER'), Player.deletePlayer)
router.post("/playForProduct/:productId", Player.playForProduct, Token.register)
router.post("/pickWinner/:productId", verifyToken, checkRole('MAKE_DRAW'), Player.pickWinner)
router.get("/confirmWinner/:tokenId", verifyToken, checkRole('CONFIRM_WINNER'), Player.confirmWinner)


export default router;
