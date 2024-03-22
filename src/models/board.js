const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const Board = mongoose.model('Board', 
    new mongoose.Schema({
        name : {type: String, required: true},
        creatorId : {type: ObjectId, required: true},
        collab_usersId : [{type: ObjectId, required: false, default: undefined, ref: 'User'}],
        creation_date : {type: Date, required: true},
        column1_name : {type: String, required: true, default: 'Backlog'},
        column2_name : {type: String, required: true, default: 'In progress'},
        column21_name : {type: String, required: true, default: 'Waiting'},
        column22_name : {type: String, required: true, default: 'Working'},
        column3_name : {type: String, required: true, default: 'Done'},
    })
);
module.exports = Board;