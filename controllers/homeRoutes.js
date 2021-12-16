const router = require('express').Router();
const { BlogPost, User, Like, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const postData = await BlogPost.findAll({
      include: [
        {
          model: User
        },
        {
          model: Like
        },
        {
          model: Comment
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));
    console.log(posts)
    // Pass serialized data and session flag into template
    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

//comment from hadis
router.get('/post/:id', async (req, res) => {
  try {
    const title = "title";
    const post = 'some post'
    const fakePost = {
      title,
      // title: "title",
      post,
      // post: "some post",
      Comment
    }
    // Fake post to use in template
    const fakePost2 = {
      nameOf: "Hadis",
      title: "test post",
      post: "The culmination of the progressionist speech for which I labored was often criticism, bored expressions and, sometimes, outright rejection; thus, after unsuccessful revisions and heartfelt considerations, I came to a conclusion: no radical idea, however expertly or clumsily delivered and written, will be unanimously accepted; instead, radical ideas will often encounter criticism without constructive comment, but this fact does not negate our responsibility to write them and take a stand.",
      comment: [],
    }
    res.render('post', {
      ...fakePost2,
      // title: "test post",
      // post:"lorem",
      // logged_in: req.session.logged_in
      logged_in: false,
    });
  } catch (err) {
    res.status(500).json(err);
  }

})




router.get('/project/:id', async (req, res) => {
  try {
    const projectData = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const project = projectData.get({ plain: true });

    res.render('project', {
      ...project,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: BlogPost }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
