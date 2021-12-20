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
    res.render('allblog', {
      posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});
router.get('/blog', async (req, res) => {
  try {
    res.render('post', {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }

})
//hadis 
router.get('/blog/:id', async (req, res) => {
  try {
    const postData = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: User,
        },
        {
          model: Like
        },
        {
          model: Comment,
        },
      ],
    });
    const post = postData.get({ plain: true })
    console.log(post)
    res.render('blog', {
      ...post,

      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }

})
//check it



// router.get('/project/:id', async (req, res) => {
//   try {
//     const projectData = await BlogPost.findByPk(req.params.id, {
//       include: [
//         {
//           model: User,
//           attributes: ['name'],
//         },
//       ],
//     });

//     const project = projectData.get({ plain: true });

//     res.render('project', {
//       ...project,
//       logged_in: req.session.logged_in
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: BlogPost }],
    });

    const user = userData.get({ plain: true });

    res.render('blog', {
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
