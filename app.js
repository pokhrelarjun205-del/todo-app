let form = document.querySelector("form");
let addTaskBtn = document.querySelector(".add-btn");
let taskContainer = document.querySelector(".task-list");
let taskContent = document.querySelector(".task-input");
let validationBox = document.querySelector(".status");
let tasks = [];
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let taskText = taskContent.value.trim();
    if (taskText === "") {
        validationBox.textContent = "Tasks can't be empty";
        validationBox.classList.add("error")
        validationBox.classList.remove("hidden");
        return;
    }
    // creating element
    let li = document.createElement("li");
    let div1 = document.createElement("div");
    let div2 = document.createElement("div");
    // adding classes
    div1.classList.add("small-box");
    // small box-content
    let checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    let span = document.createElement("span");
    span.textContent = taskText;
    div2.classList.add("task-action");
    // task-action content
    let editDiv = document.createElement("div");
    let editBtn = document.createElement("button");
    editBtn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
    editDiv.append(editBtn);
    let delDiv = document.createElement("div");
    let delBtn = document.createElement("button");
    delBtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
    delDiv.append(delBtn);
    // appending content
    div2.append(editDiv, delDiv);
    div1.append(checkBox, span)
    // appending to webpage
    li.append(div1, div2);
    taskContent.value = "";
    validationBox.textContent = "Tasks Added Successfully !";
    validationBox.classList.add("success");
    validationBox.classList.remove("error");
    validationBox.classList.remove("hidden");
    setTimeout(() => {
        validationBox.classList.add("hidden");
    }, 3000);
    taskContainer.append(li);

    let objectContent = {
        id: Date.now(),
        taskText: taskText,
        completedTask: false,
    }
    tasks.push(objectContent);


    // mark completed tasks
    checkBox.addEventListener("click", () => {
        checkBox.checked ? span.classList.add("completed-task") : span.classList.remove("completed-task");
        objectContent.completedTask = checkBox.checked;
    })
    // delete Functions
    delBtn.addEventListener("click", () => {
        li.remove();
    });



})