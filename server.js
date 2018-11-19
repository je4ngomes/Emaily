const express = require('express');
const passport = require('passport');
const cookieSession = require('cookie-session');
const enforce = require('express-sslify');
const path = require('path');
const app = express();

// load env
process.env.NODE_ENV !== 'production' ?
    require('./config/env').config(path.join(__dirname, './config/dev.env')) : null;
// create db connection and define models
require('./db/db'); 
require('./models/User');
require('./models/Survey');
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
process.env.NODE_ENV === 'production' ? app.use(enforce.HTTPS()) : null;

app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

if (process.env.NODE_ENV === 'production') {
	// Express will serve up production assets
	// like our main.js file, or main.css file!
	app.use(express.static('client/build'));
    
	// Express will serve up the index.html file
	// if it doesn't recognize the route
	app.get('*', (req, res) =>
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	);
}

app.listen(
    process.env.PORT || 5000, 
    () => console.log('Listening...')
);