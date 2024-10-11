async function fetchTasks(){
    try{
        const response = await fetch('http://localhost:4000/tasks');
        const tasks = await response.json();

        //Get the list from HTML
        tasks.forEach(task => {
            addTaskToList(task);
        })
    } catch (err){
        console.log(err)
    }
}
function addTaskToList(task){
    const list = document.getElementById('taskList')
    const listItem = document.createElement('li');

    //Status button for each li
    const statusButton = document.createElement('button');
    changeStatusText(task.status,statusButton)

    statusButton.addEventListener('click', async () => {
        const awaitTaskStatus = await statusButtonClick(task.id)
        changeStatusText(awaitTaskStatus,statusButton)
    })

    //Delete button for each li
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Remove'
    deleteButton.addEventListener('click', async () => {
        const awaitStatus = await deleteButtonFunction(task.id)
        if(awaitStatus){
            listItem.remove()
        }
    })

    //Append all items
    listItem.textContent = task.taskName;
    listItem.appendChild(statusButton);
    listItem.appendChild(deleteButton);
    list.appendChild(listItem);
}

async function deleteButtonFunction(taskID){
    const response = await fetch(`http://localhost:4000/remove/${taskID}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })

    if(!response.ok){
        throw new Error('Couldnt remove task')
    }

    //Returns true / false
    const deleteResponse = await response.json()
    console.log(deleteResponse)
    return deleteResponse
}

function changeStatusText(taskStatus, button){
    if(taskStatus === false){
        button.textContent = 'Incomplete'
    }
    else button.textContent = 'Complete'
}

async function statusButtonClick(taskID){
    const response = await fetch(`http://localhost:4000/changeStatus/${taskID}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })

    if(!response.ok){
        throw new Error('Couldnt change status of task')
    }

    const updatedResponse = await response.json()
    console.log(updatedResponse)
    return updatedResponse
}


async function createNewTask(){
    try{
        document.getElementById('taskForm').addEventListener('submit', async function(event) {
            event.preventDefault();

            const taskName = {taskName: document.getElementById('taskName').value};

            const response = await fetch(`http://localhost:4000/createTask`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(taskName)
            })
            const task = await response.json();

            if(response.ok){
                addTaskToList(task)
            }
        })

    }  catch (err){
        console.log(err)
    }
}

createNewTask()
fetchTasks()