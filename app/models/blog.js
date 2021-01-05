module.exports = function(sequelize, Sequelize) {
  const Blog = sequelize.define("blog", {
    blog_id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    title: {
      type: Sequelize.STRING,
      notEmpty: true,
    },
    body: {
      type: Sequelize.STRING,
      notEmpty: true,
    },
    author: {
      type: Sequelize.INTEGER,
    },
  });

  return Blog;
};
