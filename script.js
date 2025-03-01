// Select elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Load tasks from local storage
document.addEventListener("DOMContentLoaded", loadTasks);

// Add task event
addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") addTask();
});

// Function to add a task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    createTaskElement(taskText, false);
    taskInput.value = "";
    saveTasks();
}

// Function to create a task element
function createTaskElement(taskText, isCompleted) {
    const li = document.createElement("li");

    // Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");
    checkbox.checked = isCompleted;
    checkbox.addEventListener("change", () => {
        li.classList.toggle("completed", checkbox.checked);
        saveTasks();
    });

    // Task Text
    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;

    // Delete Button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => {
        li.remove();
        saveTasks();
    });

    // Append elements
    li.appendChild(checkbox);
    li.appendChild(taskSpan);
    li.appendChild(deleteBtn);

    // Set completed class
    if (isCompleted) li.classList.add("completed");

    taskList.appendChild(li);
}

// Save tasks to local storage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach(task => {
        const taskText = task.querySelector("span").textContent;
        const isCompleted = task.querySelector(".checkbox").checked;
        tasks.push({ text: taskText, completed: isCompleted });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from local storage
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(task => createTaskElement(task.text, task.completed));
}
