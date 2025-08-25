    /* get variables elements */
    const taskInput = document.getElementById('task-input');
    const addTaskButton = document.getElementById('add-task-button');
    const prioritySelect = document.getElementById('priority-select');
    const columns = document.querySelectorAll('.column');
    const clearBtn = document.getElementById("clear-button");
    const search = document.getElementById("search-input");

    /* Enable dragging on a task */
    function enableDrag(task) {
      task.setAttribute('draggable', 'true');

      task.addEventListener('dragstart', () => task.classList.add('dragging'));
      task.addEventListener('dragend', () => task.classList.remove('dragging'));
    }

    /* Edit tasks in-place */
    function enableEdit(task) {
      task.addEventListener("dblclick", () => {
        task.contentEditable = true;
        task.focus();
      });

      /* Use keyboard shortcuts */
      task.addEventListener("keydown", e => {
        if (e.key === "Enter") {
          e.preventDefault();
          task.contentEditable = false;
        }
      });
    }

    /* Create task item */
    function createTaskItem(text, priority) {
      const task = document.createElement('div');
      task.textContent = text;
      task.classList.add('task', priority);

      enableDrag(task);
      enableEdit(task);

      return task;
    }

    /* Add task button */
    addTaskButton.addEventListener('click', () => {
      const taskText = taskInput.value.trim();
      const priority = prioritySelect.value;
      if (taskText) {
        const taskItem = createTaskItem(taskText, priority);
        document.getElementById('todo').appendChild(taskItem);
        taskInput.value = '';
      }
    });

    /* Keyboard shortcut: Enter to add */
    taskInput.addEventListener("keydown", e => {
      if (e.key === "Enter") addTaskButton.click();
    });

    /* Drag & Drop for columns */
    columns.forEach(column => {
      column.addEventListener('dragover', e => {
        e.preventDefault();
        const draggingTask = document.querySelector('.dragging');
        if (draggingTask) column.appendChild(draggingTask);
      });
    });

    /* Search filter */
    search.addEventListener("input", () => {
      const query = search.value.toLowerCase();
      document.querySelectorAll(".task").forEach(task => {
        task.style.display = task.textContent.toLowerCase().includes(query) ? "" : "none";
      });
    });

    /* Clear search */
    clearBtn.addEventListener("click", () => {
      search.value = "";
      document.querySelectorAll(".task").forEach(task => task.style.display = "");
    });
