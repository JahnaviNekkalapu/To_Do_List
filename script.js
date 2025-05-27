document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("enter the data");
    const addTaskButton = document.getElementById("button for add");
    const taskList = document.getElementById("tasklist");

   
    const predefinedTasks = ["Attend meeting", "Reading", "Rest"];

    
    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(taskText => addTask(taskText));

    
    taskInput.addEventListener("focus", () => {
        if (taskList.children.length === 0) { 
            predefinedTasks.forEach(taskText => {
                addTask(taskText);
                saveTask(taskText);
            });
        }
    });

    
    addTaskButton.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            addTask(taskText);
            saveTask(taskText);
            taskInput.value = ""; 
        }
    });

    
    function addTask(taskText) {
        const taskItem = document.createElement("li");
        taskItem.textContent = taskText;

        
        taskItem.addEventListener("click", () => {
            taskItem.classList.toggle("completed");
            updateLocalStorage();
        });

        
        const removeButton = document.createElement("button");
        removeButton.textContent = "❌";
        removeButton.style.marginLeft = "10px";
        removeButton.addEventListener("click", () => {
            taskItem.remove();
            updateLocalStorage();
        });

        taskItem.appendChild(removeButton);
        taskList.prepend(taskItem);
    }

    
    function saveTask(taskText) {
        savedTasks.push(taskText);
        localStorage.setItem("tasks", JSON.stringify(savedTasks));
    }

    
    function updateLocalStorage() {
        const taskItems = Array.from(taskList.children).map(task => task.textContent.replace("❌", "").trim());
        localStorage.setItem("tasks", JSON.stringify(taskItems));
    }
});
