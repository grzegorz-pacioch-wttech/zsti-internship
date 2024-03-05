const mongoose = require('mongoose');

const user_schema = new mongoose.Schema({
    username : {type: String, required: true, unique: true},
    hash : {type: String, required: true},
    salt : {type: String, required: true}
});

const User = mongoose.model('User', user_schema);
module.exports = User;