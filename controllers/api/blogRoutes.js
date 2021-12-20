const router = require("express").Router();
const { BlogPost, Comment, Like } = require('../../models');
const withAuth = require("../../utils/auth");

// Creates a blog (post)

router.post("/", withAuth, (req, res) => {
  const body = req.body;
  console.log(req.session.name + "\n");
  BlogPost.create({ ...body, user_id: req.session.user_id })
    .then((newBlog) => {
      res.json(newBlog);
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err);
    });
});

// User can update the blog

router.put("/:id", withAuth, (req, res) => {
  console.log(req.body, req.params.id)
  BlogPost.update(req.body, {
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

router.post("/:id/comment", withAuth, (req, res) => {
  
  Comment.create({ ...req.body, blogpost_id:req.params.id ,user_id: req.session.user_id })
    .then((newComment) => {
      res.json(newComment);
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err);
    });
});

// User can like a blog post

router.post("/:id/like", withAuth, (req, res) => {
  Like.add({ ...req.body, user_id: req.session.user })
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
  BlogPost.destroy({
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
