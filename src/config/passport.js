const passport = require('passport');
const local_strategy = require('passport-local').Strategy;
const connection = require('./db');
const User = connection.models.User;
const { Validate_Password } = require('../lib/hash_utilities');

const Verify = (username, password, next) => {

    User.findOne({ username: username })
        .then((user) => {
            if(!user) return next(null, false);

            const is_valid = Validate_Password(password, user.hash, user.salt);

            if(is_valid) return next(null, user);
            else return next(null, false);
        })
        .catch(err => next(err));
};

const strategy = new local_strategy(Verify);

passport.use(strategy);

passport.serializeUser((user, next) => {
    next(null, user.id);
});

passport.deserializeUser((userID, next) => {
    User.findById(userID)
        .then((user) => {
            next(null, user);
        })
        .catch(err => next(err));
});