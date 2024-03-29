const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const task_schema = new mongoose.Schema({
    boardId : {type: ObjectId, required: true},
    title : {type: String, required: true},
    description : {type: String},
    image : {type: Buffer},
    category : {type: String},
    creation_date : {type: Date, required: true},
    end_date : {type: Date},
    creatorId : {type: ObjectId, required: true},
    assigned_userId : {type: ObjectId},
    column : {type: Number, required: true, default: 1},
    row : {type: Number, required: true, default: 0}
});

const Task = mongoose.model('Task', task_schema);
module.exports = Task;