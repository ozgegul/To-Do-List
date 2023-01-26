// Elements
const task = document.getElementById("task");
const list = document.getElementById("list");
const container = document.querySelector(".container");

eventListener();

function newElement() {
  const newTask = task.value.trim();
  if (newTask == "") {
    // showAlert("danger","Add!");
    $(".error").toast("show");
  } else {
    addTask(newTask);
    // showAlert("success","To do eklendi!");
    addNewElementToStorage(newTask);
    $(".success").toast("show");
  }
}

function eventListener() {
  container.addEventListener("click", deleteTask);
  document.addEventListener("DOMContentLoaded", loadAllNewElementToUI);
}

const ul = document.querySelector("ul");
list.addEventListener(
  "click",
  function (ev) {
    if (ev.target.tagName === "LI") {
      ev.target.classList.toggle("checked");
    }
  },
  false
);

function loadAllNewElementToUI() {
  let newElements = getNewElementFromStorage();
  newElements.forEach(function (newTask) {
    addTask(newTask);
  });
}

function addNewElementToStorage(newTask) {
  let newElements = getNewElementFromStorage();
  newElements.push(newTask);
  localStorage.setItem("task1", JSON.stringify(newElements));
}

function getNewElementFromStorage() {
  let newElements;
  if (localStorage.getItem("task1") === null) {
    newElements = [];
  } else {
    newElements = JSON.parse(localStorage.getItem("task1"));
  }
  return newElements;
}

function addTask(newTask) {
  // Creating List Item
  const listItem = document.createElement("li");
  // Creating Link
  const link = document.createElement("a");
  link.href = "#";
  link.className = "delete-item";
  link.innerHTML = "<i class ='fa fa-remove'></i>";
  listItem.className = "list-group-item d-flex justify-content-between";
  link.style.color = "#9ca3ab";

  // Adding Text Node
  listItem.appendChild(document.createTextNode(newTask));
  listItem.appendChild(link);

  // Adding To do to List Item
  list.appendChild(listItem);
  task.value = "";
}

function deleteTask(e) {
  if (e.target.className === "fa fa-remove") {
    e.target.parentElement.parentElement.remove();
  }

  function showAlert(type, message) {
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;

    container.appendChild(alert);

    setTimeout(function () {
      alert.remove();
    }, 2000);
  }
}
