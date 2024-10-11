let taskID = 0
class Task {
    constructor(taskName){
        this.id = taskID++;
        this.taskName = taskName;
        this.status = false;
    }

    getTaskInfo(){
        return{
            id: this.id,
            taskName: this.taskName,
            status: this.status,
        }
    }
}

module.exports = Task;