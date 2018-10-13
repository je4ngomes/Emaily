const authRoute = require('express').Router();
const passport = require('passport');

authRoute.get(
    '/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);

authRoute.get(
    '/google/callback', 
    passport.authenticate('google'),
    (req, res) => res.redirect('/surveys')
);

apiRoute.get(
    '/logout',
    (req, res) => {
        req.logOut();
        res.redirect('/');
    }
)

module.exports = authRoute;