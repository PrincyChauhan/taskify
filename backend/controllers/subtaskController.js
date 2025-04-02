const { SubTask, Task } = require("../models");
const sequelize = require("../models");

const createSubTask = async (req, res) => {
  try {
    const { title, description, taskId } = req.body;

    const task = await Task.findByPk(taskId);

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found." });
    }
    const subtask = await SubTask.create({
      title,
      description,
      taskId,
      // isCompleted: isCompleted ?? false,
    });
    res.status(201).json({
      success: true,
      message: "Subtask created successfully.",
      subtask,
    });
  } catch (error) {
    console.error("Error creating subtask:", error);
    res.status(500).json({ message: "Server error." });
  }
};

const updateSubTask = async (req, res) => {
  try {
    const { subtaskId, taskId, title, description, isCompleted } = req.body;
    if (!subtaskId) {
      return res
        .status(400)
        .json({ success: false, message: "Subtask ID is required." });
    }
    const subtask = await SubTask.findOne({
      where: { id: subtaskId, taskId },
    });
    if (!subtask) {
      return res
        .status(404)
        .json({ success: false, message: "Subtask not found." });
    }
    await subtask.update({
      title: title ?? subtask.title,
      description: description ?? subtask.description,
      isCompleted: isCompleted ?? subtask.isCompleted,
    });
    res.status(200).json({
      success: true,
      message: "Subtask updated successfully.",
      subtask,
    });
  } catch (error) {
    console.error("Error updating subtask:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

const deleteSubTask = async (req, res) => {
  try {
    const { subtaskId, taskId } = req.body;

    if (!subtaskId) {
      return res.status(400).json({ message: "Subtask ID is required." });
    }
    const subtask = await SubTask.findOne({
      where: { id: subtaskId, taskId, isDeleted: false },
    });

    if (!subtask) {
      return res
        .status(404)
        .json({ message: "Subtask not found or already deleted." });
    }
    subtask.isDeleted = true;
    await subtask.save();
    await subtask.destroy();
    res
      .status(200)
      .json({ message: "Subtask deleted successfully.", success: true });
  } catch (error) {
    console.error("Error deleting subtask:", error);
    res.status(500).json({ message: "Server error." });
  }
};

const getSubTaskById = async (req, res) => {
  try {
    const { subtaskId } = req.params;
    const subtask = await SubTask.findByPk(subtaskId);
    if (!subtask) {
      return res
        .status(404)
        .json({ success: false, message: "Subtask not found." });
    }
    return res.status(200).json({
      message: "SubTask fetched successfully",
      success: true,
      subtask,
    });
  } catch (error) {
    console.error("Error deleting subtask:", error);
    res.status(500).json({ message: "Server error." });
  }
};

const countSubTask = async (req, res) => {
  try {
    const totalSubTasks = await SubTask.count({
      where: {
        isDeleted: false,
      },
    });
    res.status(200).json({
      message: "SubTask counts fetched successfully",
      totalSubTasks,
    });
  } catch (error) {}
};
module.exports = {
  createSubTask,
  updateSubTask,
  deleteSubTask,
  getSubTaskById,
  countSubTask,
};
