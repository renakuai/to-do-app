import Checkbox from './img/checkbox.svg';

//factory function for new to do
const createTodo = (title, notes, duedate, priority, project, id) => {
  return {
    title: title,
    notes: notes,
    duedate: duedate,
    priority: priority,
    project: project,
    id: id,
    //project: document.getElementById("project").value,
  }
}

//module for modifying todo
const modifyTodo = (() => {
  function changePriority() {
    todoObj.priority = document.getElementById("title").value;
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
  function displayTodo(todo, clickedList) {
    const main = document.querySelector('.main-body');
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
      if (clickedList == "all" || clickedList == "today" || clickedList == "week") {
        const row__project = document.createElement('div');
        row__project.classList.add('todo-row__projectName');
        row__project.textContent = todo.project;
        row__right.appendChild(row__project);
      }
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

let todoArray = [];
let matchingArray = [];
const storeAndGroup = (() => {
  function convertDate(calDate) {
    let convertedDate = calDate[5]+calDate[6] + '/' + calDate[8]+calDate[9] + '/' + calDate[0]+calDate[1]+calDate[2]+calDate[3];
    return convertedDate;
  }
  function storeTodo(todo) {
    todoArray.push(todo);
  }
  function groupTodoProject(clickedList) {
    matchingArray = [];
    for (let i=0; i < todoArray.length; i++) {
      if (todoArray[i]['project'] == clickedList) {
        matchingArray.push(todoArray[i]);
      }
    }
  }
  function groupTodoOther(clickedList) {
    matchingArray = [];
    let today = new Date();
    if (clickedList == 'today') {
      for (let i = 0; i < todoArray.length; i++) {
        let todayConvert = today.toDateString();
        let clickedDate = todoArray[i]['duedate']; 
        let clickedDateConvert = new Date(clickedDate).toDateString();
        if (clickedDateConvert == todayConvert) {
          matchingArray.push(todoArray[i]);
        }
      }
    }
    else if (clickedList == 'week') {
      let todayMS = today.getTime() // returns MS
      let weekMS = todayMS + 604800000; //ms
      for (let i=0; i < todoArray.length; i++) {
        let clickedDate = new Date(todoArray[i]['duedate']);
        let clickedDateMS = clickedDate.getTime();
        if (clickedDateMS <= weekMS && clickedDateMS >= todayMS) {
          matchingArray.push(todoArray[i]);
        }
      }
    }
    else if (clickedList == 'all') {
      for (let i=0; i < todoArray.length; i++) {
        matchingArray.push(todoArray[i]);
      }
    }
  }
  function showGroupedList(clickedList) {
    for (let i=0; i < matchingArray.length; i++) {
      let todo = matchingArray[i];
      updateTodoDOM.displayTodo(todo, clickedList);
    }
  }
  return {
    storeTodo : storeTodo,
    groupTodoProject : groupTodoProject,
    showGroupedList : showGroupedList,
    groupTodoOther : groupTodoOther,
    convertDate : convertDate,
  }
})();

//factory function for new list
const createList = (name, description, id) => {
  return {
    name: name,
    description: description,
    id: id,
  }
}

//module for updating list DOM
const updateListDOM = (() => {
  function closeModal() {
    document.querySelector('.create-modal').style.display = 'none';
  }
  function openModal() {
    document.querySelector('.create-modal').style.display = 'block';
  }
  function displaySideList(list) {
    const sideList = document.getElementById('list-nav');
    const newListLink = document.createElement('li');
    newListLink.classList.add('link');
    newListLink.id = list.name;
    newListLink.textContent = list.name
    sideList.appendChild(newListLink);
  }
  function highlightList(list) {
    document.getElementById(list.name).classList.add('active-link');
  }
  function linkListToModal(list) {
    const dropdown = document.getElementById('project-dropdown');
    const newList = document.createElement('option');
    newList.value = list.name;
    newList.textContent = list.name;
    dropdown.appendChild(newList);
  }
  function clearPage() {
    document.querySelector('.main-body').textContent = '';
    document.querySelector('.main-title').textContent = '';
  }
  function setTitle(clickedList) {
    if (clickedList == "all") {
      document.querySelector('.main-title').textContent = 'All tasks';
    }
    else if (clickedList == "today") {
      document.querySelector('.main-title').textContent = 'Today\'s tasks';
    }
    else if (clickedList == "week") {
      document.querySelector('.main-title').textContent = 'This week\'s tasks';
    }
    else {
    document.querySelector('.main-title').textContent = clickedList;
    }
  }
  return {
    closeModal : closeModal,
    openModal : openModal,
    displaySideList : displaySideList,
    highlightList : highlightList,
    linkListToModal : linkListToModal,
    setTitle : setTitle,
    clearPage : clearPage,
  }
})();

//export
export {
  createList,
  updateListDOM,
  createTodo,
  updateTodoDOM,
  storeAndGroup,
}