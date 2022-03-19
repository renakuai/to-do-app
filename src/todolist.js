import CheckBlank from './img/check-blank.svg';
import CheckFilled from './img/check-filled.svg';
import ChevronUp from './img/chevron-up.svg';
import ChevronDown from './img/chevron-down.svg';


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
  function closeTaskModal() {
    document.querySelector('.create-task-modal').style.display = 'none';
  }
  function openTaskModal() {
    document.querySelector('.create-task-modal').style.display = 'block';
  }
  function displayTodo(todo, clickedList) {
    const main = document.querySelector('.main-body');
    const full = document.createElement('div');
    full.classList.add('todo-full');
    main.appendChild(full);
    const row = document.createElement('div');
    row.classList.add('todo-row');
    row.id = todo.id;
    full.appendChild(row);
      const row__left = document.createElement('div');
      row__left.classList.add('todo-row__left');
      row.appendChild(row__left);
        const row__status = document.createElement('div');
        row__status.classList.add('todo-row__status');
          const checkbox = new Image();
          checkbox.src = CheckBlank;
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
        const row__chevron = document.createElement('div');
        row__chevron.classList.add('chevron-closed');
          const chevronDown = new Image();
          chevronDown.src = ChevronDown;
          chevronDown.classList.add('chevron');
          row__chevron.appendChild(chevronDown);
          row__right.appendChild(row__chevron);
  }
  function expandTodo(e) {
    if (e.target.parentNode.parentNode.parentNode.parentNode.children[1] !== undefined) {
      e.target.parentNode.parentNode.parentNode.parentNode.children[1].remove();
      let parent = e.target.parentNode;
      e.target.remove();
        const chevronDown = new Image();
        chevronDown.src = ChevronDown;
        chevronDown.classList.add('chevron');
        parent.appendChild(chevronDown);
    }
    else {
      let todoRowId = e.target.parentNode.parentNode.parentNode.id;//this is a task!
      let fullRow = e.target.parentNode.parentNode.parentNode.parentNode;
      const expanded = document.createElement('div');
      expanded.classList.add('expanded');
      let retrieved = todoArray.filter(note => note.id == todoRowId);
      let parent = e.target.parentNode;
      e.target.remove();
        const chevronUp = new Image();
        chevronUp.src = ChevronUp;
        chevronUp.classList.add('chevron');
        parent.appendChild(chevronUp);
      expanded.textContent = retrieved[0].notes;
      fullRow.appendChild(expanded);
    }
  }
  return {
    closeTaskModal : closeTaskModal,
    openTaskModal : openTaskModal,
    displayTodo: displayTodo,
    expandTodo : expandTodo,
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
  function closeListModal() {
    document.querySelector('.create-list-modal').style.display = 'none';
  }
  function openListModal() {
    document.querySelector('.create-list-modal').style.display = 'block';
  }
  function displaySideList(list) {
    const sideList = document.getElementById('list-nav');
    const newListLink = document.createElement('li');
    newListLink.classList.add('link');
    newListLink.id = list.name;
    newListLink.textContent = list.name
    sideList.appendChild(newListLink);
    const taskCount = document.createElement('div');
    taskCount.classList.add('count');
    newListLink.appendChild(taskCount);
  }
  function highlightList(clickedList) {
    if (typeof clickedList == "object") {
      clickedList = clickedList.name;
      console.log(clickedList);
    }
    else {
      clickedList = clickedList;
    }
    let active = document.querySelector('.active-link');
    if (active !== null) {
      document.querySelector('.active-link').classList.remove('active-link');
      document.getElementById(clickedList).classList.add('active-link');
    }
    else {
      console.log(clickedList);
      document.getElementById(clickedList).classList.add('active-link');
    }
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
      if (typeof clickedList == "object") {
        clickedList = clickedList.name;
        console.log(clickedList);
      }
      else {
        clickedList = clickedList;
      }
    document.querySelector('.main-title').textContent = clickedList;
    }
  }
  return {
    closeListModal : closeListModal,
    openListModal : openListModal,
    displaySideList : displaySideList,
    highlightList : highlightList,
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