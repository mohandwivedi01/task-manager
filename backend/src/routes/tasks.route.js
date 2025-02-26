import { Router } from "express";
import { 
    createTask, 
    getAllTasks,
    getTaskById, 
    updateTask, 
    deleteTask,
    healthCheck
 } from "../controllers/task.controller.js";

const router = Router();

router.route("/health-check").get(healthCheck);

router.route("/add-task").post(createTask);
router.route("/get-all-tasks").get(getAllTasks);
router.route("/get-task-by-id/:taskId").get(getTaskById);
router.route("/update-task/:taskId").patch(updateTask);
router.route("/delete-task/:taskId").delete(deleteTask);

export default router;