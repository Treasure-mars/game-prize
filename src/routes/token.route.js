import express from "express";
import Token from "../controller/token.controller";
import checkRole from "../middleware/checkRole";
import verifyToken from "../middleware/verifyToken";

const router = express.Router();

// User
router.post("/register", verifyToken, checkRole('ADD_PRODUCT'), Token.register)
router.patch("/:tokenId", verifyToken, checkRole('EDIT_PRODUCT'), Token.updateToken)
router.get("/all", verifyToken, checkRole('VIEW_PRODUCTS'), Token.getAllTokens)
router.get("/:tokenId", verifyToken, checkRole('VIEW_PRODUCTS'), Token.getToken)
router.delete("/:tokenId", verifyToken, checkRole('EDIT_PRODUCT'), Token.deleteToken)
// router.get("/:id", verifyToken, checkRole('admin'), Product.identifiedUser)
// router.patch("/:id", verifyToken, checkRole('admin'), Product.updateUser)
// router.delete("/:id", verifyToken, checkRole('admin'), Product.deleteUser)
// router.delete("/banned/:id", verifyToken, checkRole('admin'), Product.banUserDel)

export default router;
