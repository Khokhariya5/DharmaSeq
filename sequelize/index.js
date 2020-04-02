const Sequelize = require("sequelize");

const sequelize = new Sequelize(global.ENV_DATA.database.db, global.ENV_DATA.database.user, global.ENV_DATA.database.password, {
  host: global.ENV_DATA.database.host,
  dialect: global.ENV_DATA.database.dialect,
  operatorsAliases: false,

  pool: {
    max: global.ENV_DATA.database.pool.max,
    min: global.ENV_DATA.database.pool.min,
    acquire: global.ENV_DATA.database.pool.acquire,
    idle: global.ENV_DATA.database.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("../models/users.model")(sequelize, Sequelize);
db.tasks = require("../models/tasks.model")(sequelize, Sequelize);

module.exports = db;