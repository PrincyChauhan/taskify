const sequelize = require("../config/db");
const User = require("./User");
const Task = require("./Task");
const SubTask = require("./SubTask");

const db = {
  sequelize,
  User,
  Task,
  SubTask,
};

require("./association")(db);

db.syncDatabase = async () => {
  try {
    // await sequelize.sync({ force: true });
    await sequelize.sync({});
    // await sequelize.sync({ alter: true });
    console.log("All tables synced successfully!");
  } catch (err) {
    console.error("Error syncing database:", err);
  }
};
module.exports = db;
