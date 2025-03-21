const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const commonFields = require("./commonFields");

const Subtask = sequelize.define(
  "Subtask",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    isCompleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    taskId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Tasks",
        key: "id",
      },
      allowNull: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    ...commonFields,
  },
  {
    tableName: "Subtasks",
    timestamps: true,
    paranoid: true,
  }
);

module.exports = Subtask;
