const express = require('express');
const session = require('express-session');
const app = express();
const routes = require('./routes');

require('dotenv').config();

const mongoose = require('mongoose');
const mongo_store = require('connect-mongo');
const db = mongoose.connection;

const passport = require('passport');

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

require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

// error handler here

app.listen(process.env.PORT);