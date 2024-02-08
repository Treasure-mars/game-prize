import express from "express";
import Product from "../controller/product.controller";
import checkRole from "../middleware/checkRole";
import verifyToken from "../middleware/verifyToken";

const router = express.Router();

// User
router.post("/register", verifyToken, checkRole('ADD_PRODUCT'), Product.register)
router.patch("/:productId", verifyToken, checkRole('EDIT_PRODUCT'), Product.updateProduct)
router.get("/all", verifyToken, checkRole('VIEW_PRODUCTS'), Product.getAllProducts)
router.get("/:productId", verifyToken, checkRole('VIEW_PRODUCTS'), Product.getProduct)
router.delete("/:productId", verifyToken, checkRole('EDIT_PRODUCT'), Product.deleteProduct)
// router.get("/:id", verifyToken, checkRole('admin'), Product.identifiedUser)
// router.patch("/:id", verifyToken, checkRole('admin'), Product.updateUser)
// router.delete("/:id", verifyToken, checkRole('admin'), Product.deleteUser)
// router.delete("/banned/:id", verifyToken, checkRole('admin'), Product.banUserDel)

export default router;
