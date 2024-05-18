const express = require('express');
const router = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const KEYS = require('../config/keys');
const Activity = require('../models/Activity');
const User = require('../models/User');

router.use(session({
    secret: KEYS.sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

router.use(passport.initialize());
router.use(passport.session());

passport.use(new GoogleStrategy({
    clientID: KEYS.googleClientID,
    clientSecret: KEYS.googleClientSecret,
    callbackURL: 'http://localhost:3000/auth/google/callback'
},
function (accessToken, refreshToken, profile, done) {
    userProfile = profile;
    return done(null, userProfile);
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

router.get('/auth/google',
    passport.authenticate('google', { scope: ['email'] })
);

router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/');
    }
);

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
    