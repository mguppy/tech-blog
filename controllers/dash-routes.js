const router = require('express').Router();
const { Post } = require('../models');
// Import the custom middleware
const withAuth = require('../utils/auth');

// GET all posts for user id
// req.session.loggedIn = user ID
router.get('/', withAuth, async (req, res) => {
try {
    const dbPostData = await Post.findAll({
        where: {id: req.session.loggedIn}
    });

    const posts = dbPostData.map((post) =>
    post.get({ plain: true })
    );

    res.render('user-homepage', {
    layout: 'dashboard', 
    posts,
    loggedIn: req.session.loggedIn,
    });
} catch (err) {
    console.log(err);
    res.redirect('login')
}
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });
  
  module.exports = router;