import express from "express";
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

module.exports = router;
