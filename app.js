//// Define UI Variables

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


//// Load all event listeners

LoadEventListeners();  

function LoadEventListeners(){

    // DOM Load Event (From Local Storage)

    document.addEventListener('DOMContentLoaded', getTasks);

    // Add Task Event

    form.addEventListener('submit', addTask);   

    // Delete Task Event

    taskList.addEventListener('click', removeTask);

    // Clear Task Event

    clearBtn.addEventListener('click', clearTasks);

    // Filter Task Event

    filter.addEventListener('keyup', filterTasks);

}

// DOM Load Event

function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(function(task){

    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(task));

    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);

    taskList.appendChild(li);
    });
}

// Add Event

function addTask(e){

    if (taskInput.value === ''){
        alert('No task was added. Please add a task.')
    } else {

   // Create a new li element

    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value));

    // Create a new link element "X"

    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);

    // Adding the new li element to the ul

    taskList.appendChild(li); 

    // Storing Data in Local Storage

    storeTaskInLocalStorage(taskInput.value);

    //Clearing the input

    taskInput.value = '';

    }

    e.preventDefault(); 
}

// Store Task Event

function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Delete Event

function removeTask(e){
    if (e.target.parentElement.classList.contains('delete-item')){
    //console.log(e.target);
        if(confirm('Are You Sure?')){
            e.target.parentElement.parentElement.remove();

        // Delete from Local Storage
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// Remove from Local Storage

function removeTaskFromLocalStorage(taskItem){
    //console.log(taskItem);
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Event

function clearTasks(){
    // Option 1
    //taskList.innerHTML = '';

    // Option 2
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    
    confirm("Are you sure?");

    // Clear All Tasks from Local Storage

    clearAllTasksFromLocalStorage();
}

// Clear from Local Storage

function clearAllTasksFromLocalStorage(){
    localStorage.clear();
}

// Filter Event

function filterTasks(e){

    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task){
            const item = task.firstChild.textContent;
            if (item.toLowerCase().indexOf(text) !== -1){
                task.style.display = 'block';
            } else {
                task.style.display = 'none';
            }
    })

    //console.log(text)
}

