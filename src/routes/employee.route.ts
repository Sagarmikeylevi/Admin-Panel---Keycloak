import { Router } from "express";

import { authAdmin } from "../middleware/authAdmin.js";
import {
  createEmployee,
  deleteEmployee,
  getAllEmployees,
  updateEmployee,
} from "../controllers/employee.controller.js";

const employeeRouter = Router();

employeeRouter.get("/allEmployees", authAdmin, getAllEmployees);

employeeRouter.post("/create", authAdmin, createEmployee);

employeeRouter.put("/update/:id", authAdmin, updateEmployee);

employeeRouter.delete("/delete/:id", authAdmin, deleteEmployee);

export default employeeRouter;
