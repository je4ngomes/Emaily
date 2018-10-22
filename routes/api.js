const apiRoute = require('express').Router();
const mongoose = require('mongoose');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const sendMail = require('../services/mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const { strToObj } = require('../helpers/helpers');

const Survey = mongoose.model('survey');

apiRoute.get('/current_user', (req, res) => {
    res.send(
        req.isAuthenticated()
            ? { user: { credits: req.user.credits, OauthId: req.user.googleId }, auth: true }
            : { auth: false }
    );
});

apiRoute.get('/surveys/feedback', (req, res) => {
    res.send('Thanks for voting!');
});

apiRoute.post(
    '/surveys', 
    [requireLogin, requireCredits], 
    (req, res) => {
        const data = {
            ...req.body,
            recipients: strToObj(req.body.recipients)
        };
        const { googleId: OauthId } = req.user;

        const survey = new Survey({ 
            ...data,
            dataSent: Date.now(),
            _user: req.user.id
        });

        sendMail(data, surveyTemplate(data))
            .then(_ => {
                // billing user credits
                req.user.credits -= 1;

                // saving survey and user changes
                Promise.all([survey.save(), req.user.save()])
                    .then(([_, user]) => 
                        res.json({ user: { credits: user.credits, OauthId }, auth: true }))
                    .catch(err => {
                        console.error(err);
                        res.status(422).json({ error: 'Something went wrong. Please try again.', auth: true });
                    });
            })
            .catch(err => {
                console.error(err);
                res.status(422).json({ error: 'Something went wrong. Please try again.', auth: true });
            });
    }
);

apiRoute.post('/stripe', requireLogin, (req, res) => {
    const { user, body: { id } } = req;
    const { googleId: OauthId } = req.user;
    
    stripe
        .charges
        .create({
            amount: 500,
            currency: 'usd',
            source: id,
            description: '$5 for 5 survey credits'
        })
        .then(obj => {            
            user.credits += 5;
            user.save()
                .then(user => res.json({ user: { credits: user.credits, OauthId }, auth: true }));
        })
        .catch(err => res.status(500).send({ auth: true }));
});

module.exports = apiRoute;