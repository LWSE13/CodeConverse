const router = require('express').Router();
const { User } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const dbUserData = await User.findAll({
      attributes: { exclude: ['password'] },
    });

    res.json(dbUserData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// CREATE new user
router.post('/signup', async (req, res) => {
  try {
    const dbUserData = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.name = req.body.name; 
      console.log(req.session);
      res.redirect('/');
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      return res.status(400).json({ message: 'Incorrect email or password. Please try again!' });
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      return res.status(400).json({ message: 'Incorrect email or password. Please try again!' });
    }

    req.session.loggedIn = true;
    req.session.name = dbUserData.name;
    req.session.save(() => {
      res.redirect('/');
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.redirect('/login');
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
