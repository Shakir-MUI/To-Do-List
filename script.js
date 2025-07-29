const form = document.getElementById("todo-form");
const taskInput = document.getElementById("task-input");
const prioritySelect = document.getElementById("priority-select");
const taskList = document.getElementById("task-list");

let tasks = [];
let editTaskId = null; // Track if editing

const priorityOrder = { high: 3, medium: 2, low: 1 };

// Handle form submission
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  const priority = prioritySelect.value;

  if (taskText !== "" && priority !== "") {
    if (editTaskId) {
      updateTask(editTaskId, taskText, priority);
    } else {
      addTask(taskText, priority);
    }
    taskInput.value = "";
    prioritySelect.value = "";
    editTaskId = null;
    form.querySelector('button[type="submit"]').textContent = "Add";
  }
});

function addTask(text, priority) {
  const taskId = Date.now().toString();
  const task = {
    id: taskId,
    text: text,
    priority: priority,
    completed: false
  };
  tasks.push(task);
  sortTasks();
  saveTasks();
  renderTasks();
}

function updateTask(id, newText, newPriority) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.text = newText;
    task.priority = newPriority;
    sortTasks();
    saveTasks();
    renderTasks();
  }
}

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement("li");
    li.setAttribute("data-priority", task.priority);
    li.setAttribute("data-id", task.id);
    if (task.completed) {
      li.classList.add('completed');
    }

    // Priority label
    const priorityLabel = document.createElement("span");
    priorityLabel.className = "priority-label";
    priorityLabel.textContent = task.priority;

    // Task text
    const taskSpan = document.createElement("span");
    taskSpan.className = "task-text";
    taskSpan.textContent = task.text;
    if (task.completed) {
      taskSpan.style.textDecoration = "line-through";
      taskSpan.style.color = "#999";
    }

    // Complete button
    const completeBtn = document.createElement("button");
    completeBtn.textContent = task.completed ? "Undo" : "Complete";
    completeBtn.classList.add("complete-btn");
    completeBtn.addEventListener("click", function() {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
    });

    // Edit button
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit-btn");
    editBtn.addEventListener("click", function() {
      taskInput.value = task.text;
      prioritySelect.value = task.priority;
      editTaskId = task.id;
      form.querySelector('button[type="submit"]').textContent = "Update";
      taskInput.focus();
    });

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", function() {
      if (confirm("Are you sure you want to delete this task?")) {
        tasks = tasks.filter(t => t.id !== task.id);
        saveTasks();
        renderTasks();
      }
    });

    // Button container
    const buttonContainer = document.createElement("div");
    buttonContainer.className = "task-buttons";
    buttonContainer.appendChild(completeBtn);
    buttonContainer.appendChild(editBtn);
    buttonContainer.appendChild(deleteBtn);

    // Task info container
    const taskInfo = document.createElement("div");
    taskInfo.className = "task-info";
    taskInfo.appendChild(priorityLabel);
    taskInfo.appendChild(taskSpan);

    // Task container
    const taskContainer = document.createElement("div");
    taskContainer.className = "task-container";
    taskContainer.appendChild(taskInfo);
    taskContainer.appendChild(buttonContainer);

    li.appendChild(taskContainer);
    taskList.appendChild(li);
  });
}

function sortTasks() {
  tasks.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
  } else {
    tasks = [];
  }
  sortTasks();
  renderTasks();
}

document.addEventListener("DOMContentLoaded", loadTasks);
