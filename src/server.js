const express = require('express');
const app = express();
const session = require('express-session');

require('dotenv').config();

const mongoose = require('mongoose');
const db = mongoose.connection;
const mongo_store = require('connect-mongo');
const User = require('./models/user.js');

const passport = require('passport');

////////////////////////////////////////////////////////////////////

mongoose.connect(process.env.DB_URL).then(() => {
    console.log('connected to the database');
}).catch((err) => {
    console.log(err);
});

////////////////////////////////////////////////////////////////////

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: mongo_store.create({
        mongoUrl: process.env.DB_URL,
        mongoose: db,
        collectionName: 'sessions',
        dbName: 'kanban'
    }),
    cookie: {maxAge: 1000*60*60*2} // 1 godzina
}));

////////////////////////////////////////////////////////////////////

app.get('/', (req, res) => {
    res.redirect('/login');
});

app.get('/login', (req, res) => {
    res.sendFile('pages/account-form.html', {root: __dirname});
});

app.post('/login', (req, res) => {
    const {username, password} = req.body;

    if (username == "test" && password == "tset") res.redirect('/board');
    else res.send("Bledne dane");

});

app.get('/board', (req, res) => {
    res.sendFile('pages/board.html', {root: __dirname});
});

app.listen(process.env.PORT);