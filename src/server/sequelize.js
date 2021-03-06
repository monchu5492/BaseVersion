const Sequelize = require("sequelize");
const UserModel = require("../../app/models/user");
const BlogModel = require("../../app/models/blog");

const sequelize = new Sequelize("wabase01", "root", "Lunabean1^^", {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const User = UserModel(sequelize, Sequelize);
const Blog = BlogModel(sequelize, Sequelize);

module.exports = {
  User,
  Blog,
};
