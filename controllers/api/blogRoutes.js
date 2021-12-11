const router = require("express").router();
const { Blog, Comment, User } = require();
const withAuth = require("../../utils/auth");

router.post("/", withAuth, (req, res) => {
  const body = req.body;
  console.log(req.session.userID);
  Blog.create({ ...body, userID: req.session.userID })
    .then((newBlog) => {
      res.json(newBlog);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
