import express, { response } from "express";
import passport from "passport/lib/index";
import session from "express-session"; // github.com/expressjs/session
import { generalPromise } from "./wildAlmondsPromise";

const router = express.Router();
router.use(passport.initialize());
router.use(session());

router.get("/checkBlog", (req, res) => {
  const getBlogs = "SELECT * FROM blogs";

  generalPromise(getBlogs).then((payload) => {
    const blogs = payload;
    console.log("\n\n\nBlogs Uploaded!!!!\n\n\n");

    const sortBlogs = blogs.sort((a, b) => b.blog_id - a.blog_id);
    console.log(sortBlogs);
    res.status(200).send(sortBlogs);
  });
});

router.post("/postBlog", (req, res) => {
  // let blog = req.body;
  const blogPost = `INSERT INTO blogs (blog_id, title, body, author) VALUES (null, "${req.body.title}", "${req.body.body}", ${req.body.author})`;
  generalPromise(blogPost).then((payload) => {
    console.log(req.body);
    console.log(`Blog Complete! ${payload}`);
  });
  console.log("\n\n\nblog posted!!!\n\n\n", req, res);
});

router.patch("/patchBlog", (req, res) => {
  // SELECT title, body FROM blogs WHERE blog_id = ${req.body.blog_id};
  const blogUpdate = `UPDATE blogs SET title = '${req.body.title}', body = '${req.body.body}' WHERE blog_id = '${req.body.blog_id}';`;
  generalPromise(blogUpdate).then((payload) => {
    console.log(req.body);
    console.log(`Blog Update Complete! ${payload}`);
  });
  console.log("\n\n\nblog Updated!!!\n\n\n", req, res);
});

module.exports = router;
