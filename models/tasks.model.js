module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("tasks", {
      userId: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      }
    });
  
    return Task;
  };