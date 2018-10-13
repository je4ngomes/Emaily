const apiRoute = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const requireLogin = require('../middlewares/requireLogin');

apiRoute.get('/current_user', (req, res) => res.json(req.user));

apiRoute.post('/stripe', requireLogin, (req, res) => {
    const { id } = req.body;
    
    stripe
        .charges
        .create({
            amount: 500,
            currency: 'usd',
            source: id,
            description: '$5 for 5 survey credits'
        })
        .then(obj => {            
            req.user.credits += 5;
            req.user.save()
                .then(user => res.json(user));
        })
        .catch(err => res.status(500).send({ user: req.user }));
});

apiRoute.get(
    '/logout',
    (req, res) => {
        req.logOut();
        console.log('aqui');
        res.redirect('/');
    }
)

module.exports = apiRoute;