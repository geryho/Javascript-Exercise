const todoList = [];
renderTodoList();
function renderTodoList() {
  let todoListHTML = "";

  for (let i = 0; i < todoList.length; i++) {
    const todoObject = todoList[i];
    const { name, dueDate, completed } = todoObject;
    const html = `
    <div>
    <input type="checkbox" id= "todo-${i}" ${completed ? "checked" : ""}
        onchange="toggleTodoCompletion(${i}, this.checked)">
    </div>
    <div class="${completed ? "completed" : ""}">
      ${name}
    </div>
    <div>
      ${dueDate}
    </div>
      <button onclick="todoList.splice(${i},1);
      renderTodoList();" class="delete-todo-button">Delete</button>`;
    todoListHTML += html;
  }

  document.querySelector(".js-todo-list").innerHTML = todoListHTML;
}

function toggleTodoCompletion(index, isChecked) {
  todoList[index].completed = isChecked;
  renderTodoList();
}

function addTodo() {
  const inputElement = document.querySelector(".js-name-input");
  const name = inputElement.value.trim();
  const dateInputElement = document.querySelector(`.js-due-date-input`);
  const dueDate = dateInputElement.value;
  const errorElement = document.querySelector(".js-error-message");

  // Clear previous error states
  inputElement.classList.remove("error-input");
  dateInputElement.classList.remove("error-input");
  errorElement.textContent = "";
  errorElement.classList.remove("show");

  // Validate inputs
  if (!name) {
    showError("Please enter a task name", inputElement);
    return;
  }

  if (!dueDate) {
    showError("Please select a due date", dateInputElement);
    return;
  }
  // Add new todo
  todoList.push({
    name,
    dueDate,
    completed: false,
  });

  // Reset form
  inputElement.value = "";
  dateInputElement.value = "";
  renderTodoList();
}
function showError(message, inputElement) {
  const errorElement = document.querySelector(".js-error-message");
  errorElement.textContent = message;
  errorElement.classList.add("show");

  if (inputElement) {
    inputElement.classList.add("error-input");
    inputElement.focus();
  }
}

renderTodoList();
