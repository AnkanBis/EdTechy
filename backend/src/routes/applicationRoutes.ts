import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import {
  createApplication,
  getApplications,
  updateApplicationStatus,
} from "../controllers/application";

const router = Router();

router.post("/", authMiddleware, createApplication);
router.get("/", authMiddleware, getApplications);
router.put("/:id", authMiddleware, updateApplicationStatus);

export default router;
