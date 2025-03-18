const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.get("/get-tasks/:userId", userController.getTasksByUserId);
router.post("/update-task-status", userController.updateTaskStatusByUser);
router.get("/get-subtasks/:taskId", userController.getSubTasksByTaskId);
module.exports = router;
