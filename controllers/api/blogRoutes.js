const router = require("express").router();
const { Blog, Comment, Like, User } = require();
const withAuth = require("../../utils/auth");

// Creates a blog (post)
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

// User can comment on a blog post
router.post("/", withAuth, (req, res) => {
  Comment.create({ ...req.body, userID: req.session.userID })
    .then((newComment) => {
      res.json(newComment);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// User can like blog post
router.post("/", withAuth, (req, res) => {
  Like.add({ ...req.body, userID: req.session.userID })
    .then((newLike) => {
      res.json(newLike);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
