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
    passport.authenticate('google')
);

authRoute.get(
    '/logout',
    (req, res) => {
        req.logOut();
        res.send(req.user);
    }
)

module.exports = authRoute;