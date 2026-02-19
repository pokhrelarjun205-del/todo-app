let form = document.querySelector("form");
let taskContainer = document.querySelector(".task-list");
let taskContent = document.querySelector(".task-input");
let validationBox = document.querySelector(".status");

let tasks = [];
let editableTask = null;
let editableElement = null;


/* =========================
   Render Function
========================= */
function renderTask(taskObj) {

    let li = document.createElement("li");

    let div1 = document.createElement("div");
    div1.classList.add("small-box");

    let checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.checked = taskObj.completedTask;

    let span = document.createElement("span");
    span.textContent = taskObj.taskText;

    if (taskObj.completedTask) {
        span.classList.add("completed-task");
    }

    let div2 = document.createElement("div");
    div2.classList.add("task-action");

    let editBtn = document.createElement("button");
    editBtn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;

    let delBtn = document.createElement("button");
    delBtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;

    div2.append(editBtn, delBtn);
    div1.append(checkBox, span);
    li.append(div1, div2);
    taskContainer.append(li);


    /* Checkbox */
    checkBox.addEventListener("click", () => {
        taskObj.completedTask = checkBox.checked;
        span.classList.toggle("completed-task");
        localStorage.setItem("savedData", JSON.stringify(tasks));
    });

    /* Delete */
    delBtn.addEventListener("click", () => {
        li.remove();
        tasks = tasks.filter(t => t.id !== taskObj.id);
        localStorage.setItem("savedData", JSON.stringify(tasks));
    });

    /* Edit */
    editBtn.addEventListener("click", () => {
        editableTask = taskObj.id;
        editableElement = span;
        taskContent.value = span.textContent;
    });
}


/* =========================
   Load From LocalStorage
========================= */
let savedData = localStorage.getItem("savedData");

if (savedData) {
    tasks = JSON.parse(savedData);
    tasks.forEach(task => renderTask(task));
}


/* =========================
   Submit Event
========================= */
form.addEventListener("submit", (e) => {
    e.preventDefault();

    let taskText = taskContent.value.trim();

    if (taskText === "") {
        validationBox.textContent = "Tasks can't be empty";
        validationBox.classList.add("error");
        validationBox.classList.remove("hidden");
        return;
    }

    /* Edit Mode */
    if (editableTask !== null) {
        tasks = tasks.map(task => {
            if (task.id === editableTask) {
                task.taskText = taskText;
                editableElement.textContent = taskText;
            }
            return task;
        });

        editableTask = null;
        editableElement = null;
        taskContent.value = "";

        localStorage.setItem("savedData", JSON.stringify(tasks));
        return;
    }

    /* Add New Task */
    let newTask = {
        id: Date.now(),
        taskText: taskText,
        completedTask: false
    };

    tasks.push(newTask);
    renderTask(newTask);

    localStorage.setItem("savedData", JSON.stringify(tasks));

    taskContent.value = "";

    validationBox.textContent = "Task Added Successfully!";
    validationBox.classList.add("success");
    validationBox.classList.remove("error");
    validationBox.classList.remove("hidden");

    setTimeout(() => {
        validationBox.classList.add("hidden");
    }, 2000);
});
