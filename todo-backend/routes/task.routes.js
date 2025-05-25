import express from "express";
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";
import verifyToken from "../middlewares/verifyToken.js";
import validate from "../middlewares/validate.middleware.js";
import { taskSchema } from "../validations/task.validation.js";

const router = express.Router();

router.use(verifyToken);

router.get("/", getAllTasks);
router.post("/", validate(taskSchema), createTask);
router.put("/:id", validate(taskSchema), updateTask);
router.delete("/:id", deleteTask);

export default router;
