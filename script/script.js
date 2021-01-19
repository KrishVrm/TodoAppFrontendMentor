//! SELECTORS
const todoInput = document.querySelector(".todo-task-input");
const addButton = document.querySelector(".add-btn");
const todoList = document.querySelector(".todo-list");
const deleteButton = document.querySelector(".cross");
const allButton = document.querySelector("#all");
const activeButton = document.querySelector("#active");
const completedButton = document.querySelector("#completed");
const notCompleted = document.querySelector(".notCompleted");
const clearAllButton = document.querySelector(".clearAll");
const completed = document.querySelector(".completed");
const hours = document.querySelector(".hours");
const minutes = document.querySelector(".minutes");
const seconds = document.querySelector(".seconds");
const day = document.querySelector(".day");
const amPM = document.querySelector(".am_pm");
const itemsLeft = document.querySelector(".tasksLeft");
const searchTasksInput = document.querySelector(".search");

//! EVENTS
addButton.addEventListener("click", addList);
todoList.addEventListener("click", checkTodo);
todoList.addEventListener("click", deleteTodo);
todoInput.addEventListener("keyup", enterInput);
allButton.addEventListener("click", showAllTodos);
searchTasksInput.addEventListener("input", searchTodos);
activeButton.addEventListener("click", showActiveTodos);
completedButton.addEventListener("click", showCompletedTodos);
clearAllButton.addEventListener("click", clearAllTodos);
document.addEventListener("DOMContentLoaded", getTodos);
document.addEventListener("DOMContentLoaded", showIST);

//! FUNCTIONS
//! Add List function
function addList() {
  // create DIV
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // create check BUTTON
  const checkButton = document.createElement("button");
  checkButton.innerHTML = `<svg class="check_svg" xmlns="http://www.w3.org/2000/svg" width="11" height="9">
  <path class="check_svg_path" fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6" />
  </svg>`;
  checkButton.classList.add("checked");
  todoDiv.appendChild(checkButton);

  // create LI
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  // create cross button
  const crossButton = document.createElement("button");
  crossButton.innerHTML = `<svg class="cross_svg" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
  <path class="cross_svg_path" fill="#494C6B" fill-rule="evenodd"
    d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z" />
  </svg>`;
  crossButton.classList.add("cross");
  todoDiv.appendChild(crossButton);
  const noText = document.querySelector(".noText");

  // add todo to localstorage
  saveLocalTodos(todoInput.value);

  // append to list
  if (todoInput.value.length !== 0) {
    todoList.appendChild(todoDiv);
    noText.style.display = "none";
  } else {
    noText.style.display = "block";
  }
  totalTasks();

  // clear todo input value
  todoInput.value = "";
}

//! add list by pressing the enter key
function enterInput(e) {
  if (e.keyCode === 13) {
    addList();
  }
}

//! check todo function
function checkTodo(e) {
  const item = e.target;
  const todo = item.parentElement;
  if (item.classList[0] === "checked") {
    item.classList.toggle("checkTask");
    todo.classList.toggle("checkTask");
    todo.childNodes[1].classList.toggle("lineThrough");
    showAllTodos();
  }
}

//! delete todo function
function deleteTodo(e) {
  const item = e.target;
  const todo = item.parentElement;
  if (
    item.classList[0] === "cross" ||
    item.classList[0] === "cross_svg" ||
    item.classList[0] === "cross_path"
  ) {
    todo.classList.add("animateTodo");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", () => {
      todo.remove();
    });
  }
}

//! show all the todos function
function showAllTodos() {
  allButton.style.color = "hsl(220, 98%, 61%)";
  activeButton.style.color = "hsl(234, 11%, 52%)";
  completedButton.style.color = "hsl(234, 11%, 52%)";
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    todo.style.display = "flex";
    notCompleted.style.display = "none";
    completed.style.display = "none";
  });
}

//! show active todos function
function showActiveTodos() {
  const todos = todoList.childNodes;
  activeButton.style.color = "hsl(220, 98%, 61%)";
  allButton.style.color = "hsl(234, 11%, 52%)";
  completedButton.style.color = "hsl(234, 11%, 52%)";
  todos.forEach(function (todo) {
    if (todo.classList.contains("checkTask") === false) {
      todo.style.display = "flex";
      notCompleted.style.display = "none";
      completed.style.display = "none";
    } else {
      todo.style.display = "none";
      completed.style.display = "flex";
    }
  });
}

//! show completed todos
function showCompletedTodos() {
  const todos = todoList.childNodes;
  completedButton.style.color = "hsl(220, 98%, 61%)";
  allButton.style.color = "hsl(234, 11%, 52%)";
  activeButton.style.color = "hsl(234, 11%, 52%)";
  todos.forEach(function (todo) {
    if (todo.classList.contains("checkTask")) {
      todo.style.display = "flex";
      notCompleted.style.display = "none";
      completed.style.display = "none";
    } else {
      completed.style.display = "none";
      todo.style.display = "none";
      notCompleted.style.display = "flex";
    }
  });
}

//! IST function
function showIST() {
  // setinterval to keep updating the time
  setInterval(() => {
    let currentTime = new Date();
    let currentHours = currentTime.getHours();
    let currentMinutes = currentTime.getMinutes();
    let currentSeconds = currentTime.getSeconds();

    // day names
    let currentDay = currentTime.getDay();
    if (currentDay === 0) day.innerText = "Sunday";
    if (currentDay === 1) day.innerText = "Monday";
    if (currentDay === 2) day.innerText = "Tuesday";
    if (currentDay === 3) day.innerText = "Wednesday";
    if (currentDay === 4) day.innerText = "Thursday";
    if (currentDay === 5) day.innerText = "Friday";
    if (currentDay === 6) day.innerText = "Saturday";

    // ist heading
    document.querySelector(".ist").innerText = "IST -";

    // pm or am?
    currentHours < 12 ? (amPM.innerText = "AM") : (amPM.innerText = "PM");

    // change to 12 hour clock
    currentHours = currentHours > 12 ? currentHours - 12 : currentHours;

    // add 0
    if (currentHours < 10) {
      hours.innerText = `0${currentHours}:`;
    } else {
      hours.innerText = `${currentHours}:`;
    }

    if (currentMinutes < 10) {
      minutes.innerText = `0${currentMinutes}:`;
    } else {
      minutes.innerText = `${currentMinutes}:`;
    }

    if (currentSeconds < 10) {
      seconds.innerText = `0${currentSeconds}`;
    } else {
      seconds.innerText = `${currentSeconds}`;
    }
  }, 1000);
}

// //! Save to localstorage
function saveLocalTodos(todo) {
  let todos;
  let notesLS = localStorage.getItem("todos");
  if (notesLS === null) {
    todos = [];
  } else {
    todos = JSON.parse(notesLS);
  }
  if (todo.length > 1) {
    todos.push(todo);
  }
  localStorage.setItem("todos", JSON.stringify(todos));
}

//! get and show the todos from the localstorage
function getTodos() {
  let todos;
  let notesLS = localStorage.getItem("todos");
  if (notesLS === null) {
    todos = [];
  } else {
    todos = JSON.parse(notesLS);
  }
  todos.forEach(function (todo) {
    // create DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // create check BUTTON
    const checkButton = document.createElement("button");
    checkButton.innerHTML = `<svg class="check_svg" xmlns="http://www.w3.org/2000/svg" width="11" height="9">
    <path class="check_svg_path" fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6" />
    </svg>`;
    checkButton.classList.add("checked");
    todoDiv.appendChild(checkButton);

    // create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // create cross button
    const crossButton = document.createElement("button");
    crossButton.innerHTML = `<svg class="cross_svg" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
    <path class="cross_svg_path" fill="#494C6B" fill-rule="evenodd"
    d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z" />
    </svg>`;
    crossButton.classList.add("cross");
    todoDiv.appendChild(crossButton);
    const noText = document.querySelector(".noText");

    // append to list
    todoList.appendChild(todoDiv);
    totalTasks();
  });
}

//! remove todos from the localstorage
function removeLocalTodos(todo) {
  let todos;
  let notesLS = localStorage.getItem("todos");
  if (notesLS === null) {
    todos = [];
  } else {
    todos = JSON.parse(notesLS);
  }
  const todoIndex = todo.children[1].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  totalTasks();
}

//! total number of tasks
function totalTasks(todo) {
  let todos;
  let notesLS = localStorage.getItem("todos");
  if (notesLS === null) {
    todos = [];
  } else {
    todos = JSON.parse(notesLS);
  }
  itemsLeft.innerText = `${todos.length} Total Tasks`;
}
totalTasks();

//! clear all todos
function clearAllTodos(todo) {
  let todos;
  let notesLS = localStorage.getItem("todos");
  if (notesLS === null) {
    todos = [];
  } else {
    todos = JSON.parse(notesLS);
  }
  let notesCard = document.getElementsByClassName("todo");
  Array.from(notesCard).forEach((element) => {
    element.remove();
  });
  todos.splice(0, todos.length);
  localStorage.setItem("todos", JSON.stringify(todos));
  totalTasks();
}

//! search todo
function searchTodos() {
  let searchInputVal = searchTasksInput.value;
  let notesCard = document.getElementsByClassName("todo");
  Array.from(notesCard).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("li")[0].innerText;
    if (cardTxt.includes(searchInputVal)) {
      element.style.border = "2px solid hsl(234, 39%, 85%)";
    } else {
      element.style.border = "none";
    }
    if (searchInputVal.length === 0) {
      element.style.border = "none";
    }
  });
}
