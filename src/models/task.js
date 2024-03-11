const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const task_schema = new mongoose.Schema({
    title : {type: String, required: true},
    description : {type: String},
    image : {type: Buffer},
    creation_date : {type: Date, required: true},
    end_date : {type: Date},
    creatorId : {type: ObjectId, required: true},
    assigned_userId : {type: ObjectId}
});

const Task = mongoose.model('Task', task_schema);
module.exports = Task;