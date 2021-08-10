const router = require('express').Router();
const { User, Post } = require('../models');
// Import the custom middleware
const withAuth = require('../utils/auth');

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

router.post("/", withAuth, async (req, res) => {
  // create a new application
  console.log("post route")
  try {
      const dbPostData = await Post.create({
          title: req.body.title,
          content: req.body.content,
          user_id: req.session.user,
      });

      console.log(dbPostData.dataValues.id);

      req.session.save(() => {
          req.session.applicationId = dbPostData.dataValues.id;

          // if the application is successfully created, the new response will be returned as json
          res.status(200).json(dbPostData);
      });
  } catch (err) {
      res.status(400).json(err);
  }
});

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

// New blog post route
router.get("/newPost", (req, res) => {
  res.render("newPost", {
    loggedIn: req.session.loggedIn,
    user_id: req.session.user,
  });
});

module.exports = router;
