import { Router } from "express";
import adminRouter from "./admin.route.js";
import authRouter from "./auth.route.js";

const router = Router();
router.use("/admin", adminRouter);
router.use("/auth", authRouter);

export default router;
