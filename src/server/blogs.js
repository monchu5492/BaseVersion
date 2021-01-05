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

router.post("/postBlog", (req, res) => {
  // let blog = req.body;
  // connection.query("INSERT INTO `blogs` (name) VALUES (?)", username.toString(), function(err, result){
  //     if(err) throw err;
  //         console.log("1 record inserted");
  //     });
  // res.send(blog);
  console.log("\n\n\nblog posted!!!\n\n\n", req, res);
});

module.exports = router;
