const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const path = require('path');

const sequelize = require('./config/connection');
const routes = require('./controller');
const PORT = process.env.PORT || 3001;

const app = express();

// Set up session middleware
const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge:  60 * 60 * 1000, // 1 hour
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};
app.use(session(sess));
const exphbs = require('express-handlebars');
const hbs = exphbs.create(); // Initialize handlebars engine

app.engine('handlebars', hbs.engine); // Use handlebars engine

// Set up view engine and static files
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));

// Parse incoming requests with JSON payload
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up routes
app.use(routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Sync Sequelize models with the database
sequelize.sync({ force: false }).then(() => {
  // Start the server
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
});