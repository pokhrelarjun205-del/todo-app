
      let taskInput = document.getElementById("task-input");
      let taskBtn = document.querySelector(".task-btn");
      let taskList = document.querySelector(".task-list");
      let error_box = document.querySelector(".error_box");

      const todo = () => {
        let text = taskInput.value.trim();
        error_box.classList.remove("error-text", "success-text");
        error_box.style.display = "block";
        if (text === "") {
          error_box.textContent = "Invalid Input";
          error_box.classList.add("error-text");
          setTimeout(() => {
            error_box.style.display = "none";
          }, 3000);
        } else {
          taskBtn.innerHTML = ` <i class="fa-solid fa-plus"></i>Add task`;
          let li = document.createElement("li");
          let deleteBtn = document.createElement("button");
          let editBtn = document.createElement("button");
          let btnBox = document.createElement("div");
          let taskTextBox = document.createElement("span");
          editBtn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
          deleteBtn.innerHTML = `<i class="fa-regular fa-square-minus"></i>`;
          btnBox.append(deleteBtn, editBtn);
          taskTextBox.innerText = text;
          li.appendChild(btnBox);
          li.prepend(taskTextBox);
          taskList.appendChild(li);
          error_box.textContent = "Task added success !";
          error_box.classList.add("success-text");
          taskInput.value = "";
          deleteBtn.addEventListener("click", () => {
            taskBtn.textContent = "Add task";
            taskList.removeChild(li);
            error_box.style.display = "block";
            error_box.textContent = "Task Removed success !";
            setTimeout(() => {
              error_box.style.display = "none";
            }, 3000);
          });
          setTimeout(() => {
            error_box.style.display = "none";
          }, 3000);

          editBtn.addEventListener("click", () => {
            taskBtn.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>Update`;
            
            taskInput.value = taskTextBox.innerText;
            li.remove();
            taskInput.focus();
          });
        }
      };

      taskInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          todo();
        }
      });
      taskBtn.addEventListener("click", todo);