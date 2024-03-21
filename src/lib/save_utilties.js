const Task = require('../models/task');

module.exports.task_save = async (task) => {
    const task_count = await Task.countDocuments({column: task.column});
    
    if(task_count > 0) task.row = task_count + 1;

    const new_task = new Task(task);
    await new_task.save();
};
