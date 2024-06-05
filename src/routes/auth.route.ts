import { Router } from "express";
import { createUser, session } from "../controllers/auth.controller.js";
import { authenticateKeycloakAdmin } from "../middleware/authkeyclock.js";

const authRouter = Router();

authRouter.post("/register", authenticateKeycloakAdmin, createUser);
authRouter.post("/login", authenticateKeycloakAdmin, session);

export default authRouter;
