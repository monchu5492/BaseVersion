const Sequelize = require("sequelize");
const UserModel = require("../../app/models/user");
<<<<<<< HEAD

const sequelize = new Sequelize("wabase01", "TPatterson5492", "Lunabean1^^", {
=======
const BlogModel = require("../../app/models/blog");

const sequelize = new Sequelize("wabase01", "root", "Lunabean1^^", {
>>>>>>> new_branch2
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
<<<<<<< HEAD

module.exports = {
  User,
=======
const Blog = BlogModel(sequelize, Sequelize);

module.exports = {
  User,
  Blog,
>>>>>>> new_branch2
};
