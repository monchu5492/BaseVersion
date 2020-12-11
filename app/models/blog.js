module.exports = function(sequelize, Sequelize) {
  const Blog = sequelize.define("blog", {
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
