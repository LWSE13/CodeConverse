const router = require('express').Router();
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
  if (req.session.loggedIn) {
    // If user is logged in, render the dashboard
    const name = req.session.name || ''; // Get the name from session or set it to an empty string
    res.render('dashboard', { loggedIn: true, name });
  } else {
    // If user is not logged in, render the homepage
    res.render('homepage', { loggedIn: false, name: '' }); // Pass loggedIn as false and an empty name
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