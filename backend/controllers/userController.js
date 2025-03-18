const { Task, User, SubTask } = require("../models");

const getTasksByUserId = async (req, res) => {
  const { userId } = req.params;
  console.log("userId----------", userId);
  try {
    const tasksByUserId = await Task.findAll({
      where: {
        assignedTo: userId,
      },
      include: [
        {
          model: User,
          as: "assignedToUser",
        },
      ],
    });
    console.log("tasksByUserId----------", tasksByUserId);
    res.status(200).json({
      message: "Tasks fetched successfully.",
      tasksByUserId,
    });

    if (!tasksByUserId.length) {
      return res.status(404).json({
        message: "No tasks found for this user",
        success: false,
      });
    }
  } catch (error) {
    console.error("Error fetching tasks by user id:", error);
    res.status(500).json({ message: "Server error." });
  }
};

const updateTaskStatusByUser = async (req, res) => {
  const { taskId, status } = req.body;
  try {
    const task = await Task.findByPk(taskId);
    if (!task) {
      return res.status(404).json({
        message: "Task not found",
        success: false,
      });
    }
    task.status = status;
    await task.save();
    res.status(200).json({
      success: true,
      message: "Task status updated successfully",
      task,
    });
  } catch (error) {
    console.error("Error updating task status:", error);
    res.status(500).json({ message: "Server error." });
  }
};

const getSubTasksByTaskId = async (req, res) => {
  const { taskId } = req.params;
  const task = await Task.findByPk(taskId, {
    include: {
      model: SubTask,
      as: "subtasks",
    },
  });
  if (!task) {
    return res.status(404).json({
      message: "Task not found",
      success: false,
    });
  }
  return res.status(200).json({
    message: "Subtasks fetched successfully",
    success: true,
    subtasks: task.subtasks,
  });
};

module.exports = {
  getTasksByUserId,
  updateTaskStatusByUser,
  getSubTasksByTaskId,
};
