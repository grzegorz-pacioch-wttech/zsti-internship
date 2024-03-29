const express = require('express');
const session = require('express-session');
const app = express();
const routes = require('./src/routes');

require('dotenv').config();

const mongoose = require('mongoose');
const mongo_store = require('connect-mongo');
const db = require('./src/config/db');

const passport = require('passport');
const path = require('path');

////////////////////////////////////////////////////////////////////

app.use(express.static('public'));
app.use('/scripts', express.static('node_modules/jquery/dist/'));
app.use('/scripts', express.static('node_modules/jquery-ui/dist/'));

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

require('./src/config/passport');
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/src/views'));
app.use(routes);

app.use((err, req, res, next) => {
    res.status(500).json({
        status: res.statusCode,
        msg: 'Internal server error'
    });
    console.log(err);
});

app.listen(process.env.PORT);