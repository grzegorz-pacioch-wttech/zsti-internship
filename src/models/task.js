const mongoose = require('mongoose');

const task_schema = new mongoose.Schema({
    title : {Type: String, required: true},
    description : {Type: String, required: false},
    image : {Type: Buffer, required: false},
    creation_date : {Type: Date, required: true},
    end_date : {Type: Date, required: false},
    assigned_userId: {Type: String, required: false}
});

const Task = mongoose.model('Task', task_schema);
module.exports = Task;