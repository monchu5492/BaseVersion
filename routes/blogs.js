// import async from 'async';
// import blog from '../app/models/blog';

const express = require("express");
const router = express.Router();
// const passport = require('../app/config/passport');
const { Blog } = require("../src/server/sequelize");

router.post("/blog", (req, res, next) => {
  const { body } = req;

  if (!body.title) {
    return res.status(422).json({
      errors: {
        title: "is required",
      },
    });
  }

  if (!body.author) {
    return res.status(422).json({
      errors: {
        author: "is required",
      },
    });
  }

  if (!body.body) {
    return res.status(422).json({
      errors: {
        body: "is required",
      },
    });
  }

  if (!body.user_id) {
    return res.status(422).json({
      errors: {
        user_id: "is required",
      },
    });
  }

  const finalBlog = new Blog(body);
  return finalBlog
    .save()
    .then(() => res.json({ blog: finalBlog.toJSON() }))
    .catch(next);
});

router.get("/blogs", (req, res, next) => {
  return Blog.find()
    .sort({ createdAt: "descending" })
    .then((blogs) => res.json({ blogs: blogs.map((blog) => blog.toJSON()) }))
    .catch(next);
});

// router.param('id', (req, res, next, id) => {
//   return Articles.findById(id, (err, article) => {
//     if(err) {
//       return res.sendStatus(404);
//     } else if(article) {
//       req.article = article;
//       return next();
//     }
//   }).catch(next);
// });

router.get("blogs/:id", (req, res, next) => {
  return res.json({
    blog: req.blog.toJSON(),
  });
});

router.patch("blogs/:id", (req, res, next) => {
  const { body } = req;

  if (typeof body.title !== "undefined") {
    req.blog.title = body.title;
  }

  if (typeof body.author !== "undefined") {
    req.blog.author = body.author;
  }

  if (typeof body.body !== "undefined") {
    req.blog.body = body.body;
  }

  return req.blog
    .save()
    .then(() => res.json({ blog: req.blog.toJSON() }))
    .catch(next);
});

router.delete("blogs/:id", (req, res, next) => {
  return Blog.findByIdAndRemove(req.blog._id)
    .then(() => res.sendStatus(200))
    .catch(next);
});

// module.exports = router;
