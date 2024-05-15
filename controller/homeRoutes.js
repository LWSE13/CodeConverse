const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Post, User, Comment } = require('../models');

router.get('/', async (req, res) => {
    try {
      const postData = await Post.findAll({
        order: [['date_created', 'DESC']],
        limit: req.session.loggedIn ? undefined : 3,
        include: [
          {
            model: User,
            attributes: ['name']
          },
          {
            model: Comment,
            attributes: ['content', 'date_created'],
            include: {
              model: User,
              attributes: ['name']
            }
          }
        ]
      });
  
      const posts = postData.map(post => post.get({ plain: true }));
      res.render('homepage', { posts, loggedIn: req.session.loggedIn, name: req.session.name });
    } catch (err) {
      res.status(500).json({message: 'Failed to get posts', error: err});
    }
  });


  router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      
      return;
    }
    res.render('login');
  });

  router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      
      return;
    }
    res.render('signup');
  });
  module.exports = router;