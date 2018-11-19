const apiRoute = require('express').Router();
const mongoose = require('mongoose');
const Path = require('path-parser').default;
const R = require('ramda');
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

apiRoute.get('/surveys', requireLogin, (req, res) => {
    Survey.find({ _user: req.user.id })
        .select({ recipients: false })
        .sort({ _id: -1 })
        .then(surveys => {
            res.send(surveys);
        })
});

apiRoute.get('/surveys/thanks', (req, res) => {
    res.send('Thanks for voting!');
});

apiRoute.get('/surveys/:surveyId/:choice', (req, res) => {
    res.redirect('/api/surveys/thanks');
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
            dateSent: Date.now(),
            _user: req.user.id
        });

        sendMail(data, surveyTemplate(survey))
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

apiRoute.post('/surveys/webhooks', (req, res) => {
    const path = Path.createPath('/api/surveys/:surveyId/:choice');
    const events = R.compose(
        R.uniq,
        R.filter(
            R.compose(
                R.both(
                    R.contains('surveyId'), 
                    R.contains('choice')), 
                R.keys
        )),
        R.map(([email, url]) => R.assoc('email', email, path.test(new URL(url).pathname))),
        R.map(R.props(['email', 'url'])),
        R.filter(
            R.compose(
                R.equals('click'), 
                R.prop('event'))
        )
    )(req.body);
    
    events.forEach(({email, surveyId, choice}) => {
        Survey.updateOne({ 
            _id: surveyId, 
            recipients: { $elemMatch: { email, responded: false } }
            }, {
                $inc: { [choice]: 1 },
                $set: { 'recipients.$.responded': true, lastResponded: new Date() }
            }).exec()
            .then(x => console.log(x));
    });
});

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