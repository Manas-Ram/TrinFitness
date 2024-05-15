const express = require('express');
const router = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const KEYS = require('../config/keys');
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
async function (accessToken, refreshToken, profile, done) {
    const email = profile.emails[0].value;
    const adminEmails = [
        "manas.ramesh24@trinityschoolnyc.org",
        "robert.levine24@trinityschoolnyc.org",
        "thierry.lawrence24@trinityschoolnyc.org",
        "justin.test1@trinityschoolnyc.org"
    ];
    const isAdmin = adminEmails.includes(email) || email.endsWith("@gmail.com") ||
                    (email.endsWith("@trinityschoolnyc.org") && !/\d/.test(email.split('@')[0]));

    try {
        const user = await User.findOrCreate({ email, isAdmin });
        return done(null, user);
    } catch (err) {
        return done(err);
    }
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
        res.redirect('/calendar');
    }
);

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
