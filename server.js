const express = require('express');
const passport = require('passport');
const cookieSession = require('cookie-session');
const path = require('path');
const app = express();

// load env
process.env.NODE_ENV !== 'production' ?
    require('./config/env').config(path.join(__dirname, './config/dev.env')) : null;
// create db connection and define models
require('./db/db'); require('./models/User');
// load passport configuration
require('./services/passport');

const { authRoutes } = require('./routes');

app.use(cookieSession({
    name: '.',
    secret: process.env.COOKIE_KEY,
    maxAge: 30 * 24 * 60 * 60 * 1000
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);

app.listen(
    process.env.PORT || 5000, 
    () => console.log('Listening...')
);