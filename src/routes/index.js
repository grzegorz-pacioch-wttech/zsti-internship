const router = require('express').Router();
const passport = require('passport');
const { Hash_Password } = require('../lib/hash_utilities');
const { is_auth, if_exists } = require('../lib/middlewares/auth_check');
const User = require('../models/user');
const Task = require('../models/task');
const Board = require('../models/board');

/////////////////////////////////////////////////////////////////////

router.post('/login', passport.authenticate('local', {failureRedirect: '/fail', successRedirect: '/boards'}), (req, res) => {});

router.post('/register', if_exists, (req, res) => {
    const password = req.body.reg_password.trim();
    const username = req.body.reg_username.trim();

    const salt_hash = Hash_Password(password);
    
    new User({
        username: username,
        hash: salt_hash.hash,
        salt: salt_hash.salt
    })
    .save()
    .then(user => console.log('Nowy uzytkownik: ' + user));

    res.redirect('/sign-user');   
});

router.post('/board-create', (req, res) => {
    new Board({
        name: req.body.boardName,
        creatorId: req.user._id,
        creation_date: Date.now()
    }).save();
});

router.post('/board', (req, res) => {
    const new_task = new Task({
        title: req.body.taskName,
        description: req.body.taskDescription,
        image: req.body.taskImg,
        creation_date: Date.now(),
        end_date: req.body.taskDeadline,
        // assigned_userId: req.body.user,
        category: req.body.taskCategory,
        creatorId: req.user._id
    });

    new_task.save();
});

///////////////////////////////////////////////////////////////////

router.get('/', (req, res) => {
    res.redirect('/sign-user');
});

router.get('/sign-user', (req, res) => {
    res.render('account-form');
});

router.get('/fail', (req, res) =>
{
    res.send('fail');
});

router.get('/boards', is_auth, async (req, res) => {
    const data = {
        username: req.user.username,
        user_boards: await Board.find({creatorId: req.user._id}).exec()
    };
    res.render('board-browser', {data});
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