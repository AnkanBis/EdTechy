import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { createScholarship, getScholarships, searchScholarships } from "../controllers/scholarship";

const router = Router();

router.post("/add", authMiddleware, createScholarship);
router.get("/all", authMiddleware, getScholarships);
router.get("/search", authMiddleware, searchScholarships);

export default router;
