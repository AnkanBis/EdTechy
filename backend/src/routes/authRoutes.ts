import { Router, Request, Response } from "express";
import { signup } from "../controllers/signup";
import { signin } from "../controllers/signin";

const router = Router();

router.post("/signup", signup);
router.post("/signin", signin);

export default router;
