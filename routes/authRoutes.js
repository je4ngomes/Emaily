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

authRoute.get(
    '/facebook',
    passport.authenticate('facebook')
);

authRoute.get(
    '/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    (req, res) => res.redirect('/surveys')
);

authRoute.get(
    '/logout',
    (req, res) => {
        req.logOut();
        res.redirect('/');
    }
)

module.exports = authRoute;