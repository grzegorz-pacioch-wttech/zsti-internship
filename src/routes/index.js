const router = require('express').Router();
const passport = require('passport');
const { Hash_Password } = require('../lib/hash_utilities');
const User = require('../models/user');

router.post('/login', passport.authenticate('local', {failureRedirect: '/fail', successRedirect: '/success'}), (req, res) => {});

router.post('/register', (req, res) => {
    const salt_hash = Hash_Password(req.body.password);

    const new_user = new User({
        username: req.body.username,
        hash: salt_hash.hash,
        salt: salt_hash.salt
    });

    new_user.save().then(user => console.log('Nowy uzytkownik: ' + user));

    res.redirect('/login');
});

///////////////////////////////////////////////////////////////////

router.get('/', (req, res) => {
    res.redirect('/register');
});

router.get('/register', (req, res) => {
    res.send(`<form method="post">
                <input type="text" name="username" placeholder="username">
                <input type="text" name="password" placeholder="password">
                <input type="submit" value="Login">
            </form>`);
});

router.get('/login', (req, res) => {
    res.send(`<form method="post">
                <input type="text" name="username" placeholder="username">
                <input type="text" name="password" placeholder="password">
                <input type="submit" value="Login">
            </form>`);
});

router.get('/success', (req, res) => 
{
    res.send('success');
});

router.get('/fail', (req, res) =>
{
    res.send('fail');
});

// router.get('/board', (req, res) => {
//     res.sendFile('../pages/board.html', {root: __dirname});
// });

module.exports = router;