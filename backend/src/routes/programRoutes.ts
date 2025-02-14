import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();


router.post("/add", authMiddleware, );
router.get("/all", authMiddleware, );
// router.post("/search", authMiddleware);

export default router;
