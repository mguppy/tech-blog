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

router.post("/", async(req, res) => {
    // create a new application
    console.log("post route")
    try {
        const dbPostData = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.loggedIn,
        });
        // if the application is successfully created, the new response will be returned as json
        res.status(200).json(applicationData);
    } catch (err) {
        res.status(400).json(err);
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