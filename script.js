const form = document.getElementById("todo-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

// Handle form submission
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    addTask(taskText);
    taskInput.value = "";
  }
});

function addTask(text) {
  const li = document.createElement("li");

  // ✅ Create span for task text
  const taskSpan = document.createElement("span");
  taskSpan.textContent = text;

  // ✅ Create button container
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("task-buttons");

  // ✅ Complete button
  const completeBtn = document.createElement("button");
  completeBtn.textContent = "Complete";
  completeBtn.classList.add("complete-btn");

  completeBtn.addEventListener("click", function () {
    taskSpan.style.textDecoration = "line-through"; // Only text
    taskSpan.style.color = "#999";
    completeBtn.disabled = true; // Disable button after clicking
  });

  // ✅ Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");

  deleteBtn.addEventListener("click", function () {
    li.remove();
  });

  // ✅ Append buttons to container
  buttonContainer.appendChild(completeBtn);
  buttonContainer.appendChild(deleteBtn);

  // ✅ Add text and buttons to li
  li.appendChild(taskSpan);
  li.appendChild(buttonContainer);

  // ✅ Add li to task list
  taskList.appendChild(li);
}
