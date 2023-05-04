import express from "express";
import { isAuthenticated } from "../midddlewares/auth.js";
import { deleteTask, getMyTask, newTask, updateTask } from "../controllers/task.js";

const router= new express.Router();

router.post("/tasks/new",isAuthenticated, newTask);
router.get("/tasks/my",isAuthenticated, getMyTask);
router.route("/tasks/:id").put(isAuthenticated, updateTask).post(isAuthenticated, deleteTask);

export default router;