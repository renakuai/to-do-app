//module for grouping todo in appropriate list
const groupTasks = (() => {
  function createListObj(list) {
    list.project
  }
  function markStatus() {
    //clicked = finished
  }
  return {
    //changePriority,
    //markStatus,
  }
})();

//module for updating DOM
const updateTodoDOM = (() => {
  function closeModal() {
    document.querySelector('.create-modal').style.display = 'none';
  }
  function openModal() {
    document.querySelector('.create-modal').style.display = 'block';
  }
  function displayTodo(todo) {
    const main = document.querySelector('.main');
    const row = document.createElement('div');
    row.classList.add('todo-row');
    main.appendChild(row);
      const row__left = document.createElement('div');
      row__left.classList.add('todo-row__left');
      row.appendChild(row__left);
        const row__status = document.createElement('div');
        row__status.classList.add('todo-row__status');
          const checkbox = new Image();
          checkbox.src = Checkbox;
          row__status.appendChild(checkbox);
        row__left.appendChild(row__status);
        const row__title = document.createElement('div');
        row__title.classList.add('todo-row__title');
        row__title.textContent = todo.title;
        row__left.appendChild(row__title);
      const row__right = document.createElement('div');
      row__right.classList.add('todo-row__right');
      row.appendChild(row__right);
        const row__priority = document.createElement('div');
        if (todo.priority == 'Low') {
          row__priority.classList.add('todo-row__low');
          row__priority.textContent = todo.priority;
        }
        else if (todo.priority == 'Medium') {
          row__priority.classList.add('todo-row__medium');
          row__priority.textContent = todo.priority;
        }
        else if (todo.priority == 'High') {
          row__priority.classList.add('todo-row__high');
          row__priority.textContent = todo.priority;
        }
        row__right.appendChild(row__priority);
        const row__duedate = document.createElement('div');
        row__duedate.classList.add('todo-row__duedate');
        row__duedate.textContent = todo.duedate;
        row__right.appendChild(row__duedate);
  }
  return {
    closeModal : closeModal,
    openModal : openModal,
    displayTodo: displayTodo,
  }
})();

//export
export {
  createTodo,
  updateTodoDOM,
}