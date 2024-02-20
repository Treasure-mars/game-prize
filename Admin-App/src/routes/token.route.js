import express from "express";
import Token from "../controller/token.controller";
import checkRole from "../middleware/checkRole";
import verifyToken from "../middleware/verifyToken";

const router = express.Router();

// Token
router.patch("/:tokenId", verifyToken, checkRole('EDIT_PRODUCT'), Token.updateToken)
router.get("/all", verifyToken, checkRole('VIEW_PRODUCTS'), Token.getAllTokens)
router.get("/:tokenId", verifyToken, checkRole('VIEW_PRODUCTS'), Token.getToken)
router.delete("/:tokenId", verifyToken, checkRole('EDIT_PRODUCT'), Token.deleteToken)

export default router;
