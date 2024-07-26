
document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task');
    const taskList = document.getElementById('task-list');
    const filterButtons = document.querySelectorAll('.filter-buttons button');
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const clearAllBtn = document.getElementById('clear-all');
    
    let tasks = [];

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && taskInput.value.trim() && taskInput.value != "") {
            addTask(taskInput.value.trim());
            taskInput.value = '';
        }
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterTasks(button.dataset.filter);
        });
    });

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        const icon = themeToggleBtn.querySelector('i');
        icon.classList.toggle('fa-sun');
        icon.classList.toggle('fa-moon');
    });

    clearAllBtn.addEventListener('click', () => {
        tasks = [];
        renderTasks();
    });

    function addTask(task) {
        const newTask = {
            id: Date.now(),
            text: task,
            completed: false,
            addedAt: new Date().toLocaleString(),
            completedAt: null
        };
        tasks.push(newTask);
        renderTasks();
    }

    function toggleTaskCompletion(taskId) {
        tasks = tasks.map(task => 
            task.id === taskId ? { 
                ...task, 
                completed: !task.completed,
                completedAt: !task.completed ? new Date().toLocaleString() : null
            } : task
        );
        renderTasks();
    }

    function deleteTask(taskId) {
        tasks = tasks.filter(task => task.id !== taskId);
        renderTasks();
    }

    function editTask(taskId) {
        const task = tasks.find(task => task.id === taskId);
        if (task) {
            const newText = prompt("Edit task:", task.text);
            if (newText !== null && newText.trim() !== "") {
                task.text = newText.trim();
                renderTasks();
            }
        }
    }

    function filterTasks(filter) {
        const filteredTasks = tasks.filter(task => {
            if (filter === 'all') return true;
            if (filter === 'pending') return !task.completed;
            if (filter === 'completed') return task.completed;
        });
        renderTasks(filteredTasks);
    }

    function renderTasks(filteredTasks = tasks) {
        taskList.innerHTML = '';
        filteredTasks.forEach(task => {
            const li = document.createElement('li');
            li.className = task.completed ? 'completed' : '';
            li.innerHTML = `
                <div class="task-left">
                    <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleTaskCompletion(${task.id})">
                    <span>${task.text}</span>
                    <div class="timestamps">
                        <span>Added: ${task.addedAt}</span>
                        ${task.completed ? `<span>Completed: ${task.completedAt}</span>` : ''}
                    </div>
                </div>
                <div class="task-right">
                    <button onclick="editTask(${task.id})"><i class="fas fa-edit"></i></button>
                    <button onclick="deleteTask(${task.id})"><i class="fas fa-trash-alt"></i></button>
                </div>
            `;
            taskList.appendChild(li);
        });
    }

    window.toggleTaskCompletion = toggleTaskCompletion;
    window.deleteTask = deleteTask;
    window.editTask = editTask;
});
