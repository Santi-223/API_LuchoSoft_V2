import { Router } from "express";
import { methods as authRoutes } from "../controllers/auth.controller";

const router = Router();

router.post("/login", authRoutes.login);


export default router;