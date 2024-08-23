// script.js

// Add event listeners
document.getElementById('add-task').addEventListener('click', addTask);
document.getElementById('task-list').addEventListener('click', handleTaskActions);

// Load tasks from local storage
document.addEventListener('DOMContentLoaded', loadTasks);

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const task = createTaskElement(taskText);
        document.getElementById('task-list').appendChild(task);
        storeTaskInLocalStorage(taskText);
        taskInput.value = '';
    }
}

// Function to handle task actions (complete/delete)
function handleTaskActions(e) {
    if (e.target.tagName === 'BUTTON') {
        const taskItem = e.target.parentElement;

        if (e.target.classList.contains('complete')) {
            taskItem.classList.toggle('completed');
        } else if (e.target.classList.contains('delete')) {
            taskItem.remove();
            removeTaskFromLocalStorage(taskItem.innerText);
        }
    }
}

// Function to create a task element
function createTaskElement(taskText) {
    const li = document.createElement('li');
    li.innerText = taskText;

    const completeButton = document.createElement('button');
    completeButton.className = 'complete';
    completeButton.innerText = 'Complete';
    li.appendChild(completeButton);

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete';
    deleteButton.innerText = 'Delete';
    li.appendChild(deleteButton);

    return li;
}

// Store task in local storage
function storeTaskInLocalStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from local storage
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(taskText => {
        const task = createTaskElement(taskText);
        document.getElementById('task-list').appendChild(task);
    });
}

// Remove task from local storage
function removeTaskFromLocalStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
