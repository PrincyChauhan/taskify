const express = require("express");
const subTaskController = require("../controllers/subtaskController");
const { isAdmin } = require("../middlewares/auth");
const router = express.Router();

router.post("/create-subtask", isAdmin, subTaskController.createSubTask);
router.post("/update-subtask", isAdmin, subTaskController.updateSubTask);
router.post("/delete-subtask", isAdmin, subTaskController.deleteSubTask);
router.get(
  "/get-subtask/:subtaskId",
  isAdmin,
  subTaskController.getSubTaskById
);
router.get("/subtask-count", subTaskController.countSubTask);

module.exports = router;
