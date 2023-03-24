const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Comment, Post, User } = require('../models');
const sequelize = require('../config/connection');


router.get('/', async (req, res) => {
    try {
      // Get all posts and JOIN with user and comment
      const postData = await Post.findAll({
        include: [
          {
            model: User,
            attributes: ['username'],
          },
        ],
          include: [{
            model: Comment,
            attributes: ['id', 'content', 'user_id', 'post_id'],
        },
    ],
});

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      posts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
      include: [
        {
            model: Comment,
            attributes: ['id', 'content', 'user_id', 'post_id'],
        }
      ]
    });

    const post = postData.get({ plain: true });

    res.render('project', {
      ...post,
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
        include: [{ model: Post }],
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
  

router.post('/login', async (req, res) => {
    //placeholder
});

module.exports = router;