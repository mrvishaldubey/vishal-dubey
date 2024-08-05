window.addEventListener('load', () => {
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const list_el = document.querySelector("#tasks");

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        createTaskElement(task);
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const task = input.value;
        if (!task) {
            alert("Please enter a task");
            return;
        }

        const taskObj = {
            text: task,
            completed: false
        };
        tasks.push(taskObj);
        localStorage.setItem('tasks', JSON.stringify(tasks));

        createTaskElement(taskObj);
        input.value = '';
    });

    function createTaskElement(taskObj) {
        const task_el = document.createElement('div');
        task_el.classList.add('task');
        if (taskObj.completed) {
            task_el.classList.add('completed');
        }

        const task_checkbox_el = document.createElement('input');
        task_checkbox_el.type = 'checkbox';
        task_checkbox_el.classList.add('checkbox');
        task_checkbox_el.checked = taskObj.completed;

        const task_content_el = document.createElement('div');
        task_content_el.classList.add('content');

        task_el.appendChild(task_checkbox_el);
        task_el.appendChild(task_content_el);

        const task_input_el = document.createElement('input');
        task_input_el.classList.add('text');
        task_input_el.type = 'text';
        task_input_el.value = taskObj.text;
        task_input_el.setAttribute('readonly', 'readonly');

        task_content_el.appendChild(task_input_el);

        const task_actions_el = document.createElement('div');
        task_actions_el.classList.add('actions');

        const task_edit_el = document.createElement('button');
        task_edit_el.classList.add('edit');
        task_edit_el.innerText = 'Edit';

        const task_delete_el = document.createElement('button');
        task_delete_el.classList.add('delete');
        task_delete_el.innerText = 'Delete';

        task_actions_el.appendChild(task_edit_el);
        task_actions_el.appendChild(task_delete_el);

        task_el.appendChild(task_actions_el);

        list_el.appendChild(task_el);

        task_checkbox_el.addEventListener('change', (e) => {
            taskObj.completed = task_checkbox_el.checked;
            task_el.classList.toggle('completed');
            localStorage.setItem('tasks', JSON.stringify(tasks));
        });

        task_edit_el.addEventListener('click', (e) => {
            if (task_edit_el.innerText.toLowerCase() === "edit") {
                task_edit_el.innerText = "Save";
                task_input_el.removeAttribute("readonly");
                task_input_el.focus();
            } else {
                task_edit_el.innerText = "Edit";
                task_input_el.setAttribute("readonly", "readonly");
                taskObj.text = task_input_el.value;
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }
        });

        task_delete_el.addEventListener('click', (e) => {
            list_el.removeChild(task_el);
            tasks.splice(tasks.indexOf(taskObj), 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        });
    }
});