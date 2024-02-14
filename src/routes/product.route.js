import express from "express";
import Product from "../controller/product.controller";
import checkRole from "../middleware/checkRole";
import verifyToken from "../middleware/verifyToken";

const router = express.Router();

// Product
router.post("/register", verifyToken, checkRole('ADD_PRODUCT'), Product.register)
router.patch("/:productId", verifyToken, checkRole('EDIT_PRODUCT'), Product.updateProduct)
router.get("/all", verifyToken, checkRole('VIEW_PRODUCTS'), Product.getAllProducts)
router.get("/:productId", verifyToken, checkRole('VIEW_PRODUCTS'), Product.getProduct)
router.delete("/:productId", verifyToken, checkRole('EDIT_PRODUCT'), Product.deleteProduct)

export default router;
