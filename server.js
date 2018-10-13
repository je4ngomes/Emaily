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

const { authRoutes, apiRoutes } = require('./routes');

app.use(cookieSession({
    name: '.',
    secret: process.env.COOKIE_KEY,
    maxAge: 30 * 24 * 60 * 60 * 1000
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());


app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

if (process.env.NODE_ENV === 'production') {
    // Express will serve up production assets
    // like main.js file, or main.css file
    app.use(express.static(path.join(__dirname, 'client/build')))
    
    // Express will serve up the index.html file
    // If it doesn't recognize the route
    app.get('*', (req, res) => {
        console.log(req.url)
        res.sendFile(path.join(__dirname, 'client/build/index.html'))
    })
}

app.listen(
    process.env.PORT || 5000, 
    () => console.log('Listening...')
);