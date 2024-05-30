import { Router } from "express";
import { adminSession } from "../controllers/admin.controller.js";
import employeeRouter from "./employee.route.js";

const adminRouter = Router();

adminRouter.post("/login", adminSession);
adminRouter.use("/employee", employeeRouter);

export default adminRouter;
