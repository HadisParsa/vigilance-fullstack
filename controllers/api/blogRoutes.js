const router = require("express").router();
const { Blog, Comment, Like } = require();
const withAuth = require("../../utils/auth");
const { post } = require("./projectRoutes");

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

// User can update the blog

router.put("/:id", withAuth, (req, res) => {
  console.log(req.body, req.params.id)
  Blog.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(affectedRows => {
      if (affectedRows > 0) {
        res.status(200).end();
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
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

// User can like a blog post

router.post("/", withAuth, (req, res) => {
  Like.add({ ...req.body, userID: req.session.userID })
    .then((newLike) => {
      res.json(newLike);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// User can delete blog

router.delete("/:id", withAuth, (req, res) => {
  console.log(req.body, req.params.id)
  Blog.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(affectedRows => {
      if (affectedRows > 0) {
        res.status(200).end();
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
