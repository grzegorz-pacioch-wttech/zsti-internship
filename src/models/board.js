const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const Board = mongoose.model('Board', 
    new mongoose.Schema({
        name : {type: String, required: true},
        creatorId : {type: ObjectId, required: true},
        collab_usersId : {type: ObjectId, required: false},
        creation_date : {type: Date, required: true}
    })
);
module.exports = Board;