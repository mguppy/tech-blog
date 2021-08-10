const router = require('express').Router();
const { User, Post } = require('../models');
// Import the custom middleware
// const withAuth = require('../utils/auth');

// GET all posts for homepage
router.get('/', async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const posts = dbPostData.map((post) =>
      post.get({ plain: true })
    );

    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one gallery
// Use the custom middleware before allowing the user to access the gallery
// router.get('/post/:id', withAuth, async (req, res) => {
//   try {
//     const dbPostData = await Post.findByPk(req.params.id, {
//       // include: [
//       //   {
//       //     model: Painting,
//       //     attributes: [
//       //       'id',
//       //       'title',
//       //       'artist',
//       //       'exhibition_date',
//       //       'filename',
//       //       'description',
//       //     ],
//       //   },
//       // ],
//     });

//     const posts = dbPostData.get({ plain: true });
//     res.render('post', { post, loggedIn: req.session.loggedIn });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

//Login route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

//Signup route
router.get("/signup", (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  // Otherwise, render the 'signup' template
  res.render("signup");
});

module.exports = router;
