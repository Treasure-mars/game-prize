import express from "express";
import Draw from "../controller/draw.controller";
import checkRole from "../middleware/checkRole";
import verifyToken from "../middleware/verifyToken";

const router = express.Router();

// Draw
router.post("/register", verifyToken, checkRole('MAKE_DRAW'), Draw.register)
router.get("/product/:productId", verifyToken, checkRole('MAKE_DRAW'), Draw.getAllDrawsByProductId)
router.patch("/:drawId", verifyToken, checkRole('MAKE_DRAW'), Draw.updateDraw)
router.get("/all", verifyToken, checkRole('MAKE_DRAW'), Draw.getAllDraws)
router.get("/:drawId", verifyToken, checkRole('MAKE_DRAW'), Draw.getDraw)
router.delete("/:drawId", verifyToken, checkRole('MAKE_DRAW'), Draw.deleteDraw)

export default router;
