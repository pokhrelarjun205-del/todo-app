let form = document.querySelector("form");
let addTaskBtn = document.querySelector(".add-btn");
let taskContainer = document.querySelector(".task-list");
let taskContent = document.querySelector(".task-input");
let validationBox = document.querySelector(".status");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let taskText = taskContent.value.trim();
    if (taskText === "") {
        validationBox.textContent = "Tasks can't be empty";
        validationBox.classList.add("error")
        return;

    }
    const li = document.createElement("li");
    let checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    let span = document.createElement("span");
    span.textContent = taskText;
    let firstDiv = document.createElement("div");
    let secondDiv = document.createElement("div");
    secondDiv.classList.add("task-action");
    let editBox = document.createElement("div");
    editBox.innerHTML=``
    firstDiv.classList.add("small-box");
    firstDiv.append(checkBox, span);
    li.append(firstDiv, secondDiv);
    taskContainer.append(li);
})