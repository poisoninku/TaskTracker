const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
function renderTasks() {
  todoList.innerHTML = '';
  tasks.forEach((task, index) => {
    //create list item
    const li = document.createElement('li');
    li.className = 'todo-item';
    if (task.completed) {
      li.classList.add('completed');
    }
    //create checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => toggleComplete(index));
    //create task span
    const taskSpan = document.createElement('span');
    taskSpan.className = 'task';
    taskSpan.textContent = task.text;
    //create delete button with trashcan icon
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = `<img src="https://img.icons8.com/material-outlined/24/000000/trash--v1.png" alt="Delete">`;
    deleteBtn.addEventListener('click', () => deleteTask(index));
    li.appendChild(checkbox);
    li.appendChild(taskSpan);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
  });
}
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}
addBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText) {
    tasks.push({ text: taskText, completed: false });
    taskInput.value = '';
    saveTasks();
    renderTasks();
  }
});
renderTasks();