const router = require('express').Router();
const passport = require('passport');
const { Hash_Password } = require('../lib/hash_utilities');
const { is_auth/*, if_exists*/ } = require('../lib/middlewares/auth_check');
const User = require('../models/user');

/////////////////////////////////////////////////////////////////////

router.post('/login', passport.authenticate('local', {failureRedirect: '/fail', successRedirect: '/board'}), (req, res) => {});

router.post('/register', /*if_exists,*/ (req, res) => {
    const password = req.body.password.trim();
    const username = req.body.username.trim();

    const salt_hash = Hash_Password(password);

    const new_user = new User({
        username: username,
        hash: salt_hash.hash,
        salt: salt_hash.salt
    });

    new_user.save()
    .then(user => console.log('Nowy uzytkownik: ' + user));

    res.redirect('/login');   
});

///////////////////////////////////////////////////////////////////

router.get('/', (req, res) => {
    res.redirect('/register');
});

router.get('/register', (req, res) => {
    res.render('account-form');
});

router.get('/login', (req, res) => {
    res.render('account-form');
});

    router.get('/success', (req, res) => 
{
    res.send('success');
});

router.get('/fail', (req, res) =>
{
    res.send('fail');
});

router.get('/board', is_auth, (req, res) => {
    res.render('board');
});

router.get('*', (req, res) => {
    res.status(404).json({
        status: res.statusCode,
        msg: 'Error: Page not found'
    });
});

module.exports = router;