'use strict';
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const app = express();
const PORT = process.env.PORT || 3000;
const session = require('express-session');
const passport = require('passport');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const db = require('./db');
const sessionStore = new SequelizeStore({ db });
const socketio = require('socket.io');
const compression = require('compression');

if (process.env.NODE_ENV !== 'production') require('../secrets');

// passport registration
passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

const createApp = () => {
  // Logging middleware
  app.use(morgan('dev'));

  // Body parsing middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(compression());
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'my best friend is Cody',
      store: sessionStore,
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  // for mounting + routes
  app.use('/api', require('./api')); // include our routes!
  app.use('/auth', require('./auth'));

  // Static middleware
  app.use(express.static(path.join(__dirname, '..', 'public')));
  console.log(path.join(__dirname, '..', 'public'));

  // For all GET requests that aren't to an API route,
  // we will send the index.html!
  app.get('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
  });

  // Handle 404s
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // Error handling endware
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send(err.message || 'Internal server error');
  });
};

const startListening = () => {
  // start listening (and create a 'server' object representing our server)
  const server = app.listen(PORT, () =>
    console.log(`
    ==> 🌎 Listening at http://localhost:${PORT}
    http://localhost:3000/
`)
  );

  // set up our socket control center
  const io = socketio(server);
  require('./socket')(io);
};

const syncDb = () => db.sync();

async function bootApp() {
  await sessionStore.sync();
  await syncDb();
  await createApp();
  await startListening();
}
// This evaluates as true when this file is run directly from the command line,
// i.e. when we say 'node server/index.js' (or 'nodemon server/index.js', or 'nodemon server', etc)
// It will evaluate false when this module is required by another module - for example,
// if we wanted to require our app in a test spec
if (require.main === module) {
  bootApp();
} else {
  createApp();
}
