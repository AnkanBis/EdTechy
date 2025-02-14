import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { addUniversity, getUniversity } from "../controllers/university";

const router = Router();


router.post("/add", authMiddleware, addUniversity);
router.get("/all", authMiddleware, getUniversity);
// router.post("/search", authMiddleware);

export default router;
