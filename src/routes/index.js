const router = require('express').Router();
const passport = require('passport');
const { Hash_Password } = require('../lib/hash_utilities');
const { is_auth, if_exists } = require('../lib/middlewares/auth_check');
const { task_save } = require('../lib/save_utilties');
const User = require('../models/user');
const Task = require('../models/task');
const Board = require('../models/board');

/////////////////////////////////////////////////////////////////////

router.post('/login', passport.authenticate('local', {failureRedirect: '/signin-fail', successRedirect: '/boards'}));

router.post('/register', if_exists, (req, res) => {
    const password = req.body.reg_password.trim();
    const username = req.body.reg_username.trim();

    const salt_hash = Hash_Password(password);
    
    new User({
        username: username,
        hash: salt_hash.hash,
        salt: salt_hash.salt
    })
    .save();
    // .then(user => console.log('[Database] New user: ' + user));

    res.redirect('/sign-user');   
});

router.post('/board-create', (req, res) => {
    new Board({
        name: req.body.boardName,
        creatorId: req.user._id,
        creation_date: Date.now()
    }).save();
    // .then(board => console.log('[Database] New board: ' + board));
    res.redirect('/boards');
    // check if board name already exists
});

router.post('/board/:id', (req, res) => {
    const task= {
        boardId: req.params.id,
        title: req.body.taskName,
        description: req.body.taskDesc,
        image: req.body.taskImg,
        creation_date: Date.now(),
        end_date: req.body.taskDeadline,
        // assigned_userId: req.body.user,
        category: req.body.taskCategory,
        creatorId: req.user._id
    };
    task_save(task);

    // .then(task => console.log('[Database] New task: ' + task));
    res.redirect(`/board/${req.params.id}`);
});

router.post('/board/:id/change-columns', async (req, res) => {
    const board = await Board.findById(req.params.id).exec();
    board[req.body.id + '_name'] = req.body.value.trim();
    board.save();
    // res.redirect(`/board/${req.params.id}`);
});

router.post('/board/:id/update-task-location', async (req, res) => {
    const task = await Task.findById(req.body.id).exec();
    task.column = parseInt(req.body.column);
    task.row = parseInt(req.body.row);
    task.save().catch(err => console.log(err));
});

router.post('/board-search', (req, res) => {
    if (req.body.board_list != undefined) res.redirect(`board/${req.body.board_list}`);
    else res.redirect('/board-search');
});

///////////////////////////////////////////////////////////////////

router.get('/', (req, res) => {
    res.redirect('/sign-user');
});

router.get('/sign-user', (req, res) => {
    res.render('account-form');
});

router.get('/signin-fail', (req, res) =>
{
    res.status(401).render('message', {
        status: res.statusCode,
        msg: 'Sign in unsuccessful'
    });
});

router.get('/boards', is_auth, async (req, res) => {
    const data = {
        username: req.user.username,
        user_boards: await Board.find({creatorId: req.user._id}).exec(),
        collab_boards: await Board.find({collab_usersId: req.user._id}).exec() // test if multiple users id will pass
    };
    res.render('board-browser', {data});
});

router.get('/board/:id', is_auth, async (req, res) => {
    const data = {
        board: await Board.findById(req.params.id).exec(),
        tasks: ''
    };

    if (data.board != undefined || data.board.length <= 0) {
        data.tasks = await Task.find({boardId: req.params.id}).exec();

        if (data.board.creatorId.equals(req.user._id) || data.board.collab_usersId.equals(req.user._id)) res.render('board', {data});
        else res.status(401).render('message', {
            status: res.statusCode,
            msg: 'Not authorized'
        });

    } else {
        res.status(404).render('message', {
            status: res.statusCode,
            msg: 'Board not found'
        });
    }    
});

router.get('/logout', (req, res, next) => {
    req.logout(err => {
        if(err) return next(err);
    });
    res.status(200).render('message', {
        status: res.statusCode,
        msg: 'Successfully signed out'
    });
    
});

router.get('*', (req, res) => {
    res.status(404).render('message', {
        status: res.statusCode,
        msg: 'Page not found'
    });
});



module.exports = router;