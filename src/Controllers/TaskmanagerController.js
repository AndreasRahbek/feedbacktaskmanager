const Task = require('../Model/Task');
let taskList = []

exports.getTasks = (req, res) => {
    res.json(taskList);
}

exports.createTask = (req, res) => {
    const {taskName} = req.body;
    console.log(taskName);
    const task = new Task(taskName);
    console.log(task);
    taskList.push(task.getTaskInfo());
    res.send(task);
}

exports.updateTask = (req, res) => {
    const {id} = req.params;
    const {taskName} = req.body;
    const task = getTaskFromList(id)
    if(task){
        task.taskName = taskName
        res.send(task);
    }
    else return res.send('Task not found')
}

exports.deleteTask = (req, res) => {
    const {id} = req.params;
    const taskIndex = taskList.findIndex(task => task.id === parseInt(id));
    if(taskIndex !== 1){
        taskList.splice(taskIndex, 1);
        res.json(true)
    }
    else return res.send('Couldnt find the specified task')
}

exports.changeTaskstatus = (req, res) => {
    const {id} = req.params;
    const task = getTaskFromList(id)
    if(task){
        if(task.status === false){
            task.status = true
        } else{
            task.status = false;
        }

        res.json(task.status);
    }
}

function getTaskFromList(id){
    return taskList.find(task => task.id === parseInt(id));
}