import CheckBlank from './img/check-blank.svg';
import CheckFilled from './img/check-filled.svg';
import ChevronUp from './img/chevron-up.svg';
import Logo from './img/todolist.svg';
import ChevronDown from './img/chevron-down.svg';
import Overflow from './img/overflow.svg';
import Trash from './img/delete.svg';
import Pencil from './img/pencil.svg';
import Llama from './img/llama.svg';

//factory function for new to do
const createTodo = (title, notes, duedate, priority, project, id, status) => {
  return {
    title: title,
    notes: notes,
    duedate: duedate,
    priority: priority,
    project: project,
    id: id,
    status: status,
    //project: document.getElementById("project").value,
  }
}

//module for modifying todo
let taskMatch = [];
let taskPos = [];
const modifyTodo = (() => {
  function findTodo(e) {
    taskMatch = [];
    let editArray = todoArray.filter(todo => todo.id == e.target.parentNode.parentNode.parentNode.parentNode.id);
    let editTodo = editArray[0];
    taskMatch.push(editTodo);
  }
  function findTodoPosition(e) {
    taskPos = [];
    let arrayPos = todoArray.findIndex(todo => todo.id == e.target.parentNode.parentNode.parentNode.parentNode.id);
    taskPos.push(arrayPos); // return position in array
  }
  function displayInFormDOM(e) {
    document.getElementById("edit-title").value 
    = taskMatch[0].title;
    document.getElementById("edit-notes").value = taskMatch[0].notes;
    let date = taskMatch[0].duedate;
    let convDate = date[6] + date[7] + date[8] + date[9] + '-' + date[0] + date[1] + '-' + date[3] + date[4];
    console.log(convDate);
    document.getElementById("edit-duedate").value = convDate;
    document.querySelector('input[name="priority"]:checked').value = taskMatch[0].priority;
  }
  function removeNonModified(e) {
    console.log(taskPos[0]);
    let position = taskPos[0];
    todoArray.splice(position, 1);
  }
  function replaceTodo(todo) {
    let position = taskPos[0];
    todoArray.splice(position, 0, todo);
  }
  function findForComplete(e) {
    taskMatch = [];
    let editArray = todoArray.filter(todo => todo.id == e.target.parentNode.parentNode.parentNode.id);
    let editTodo = editArray[0];
    taskMatch.push(editTodo); //find object in the array
    taskPos = [];
    let arrayPos = todoArray.findIndex(todo => todo.id == e.target.parentNode.parentNode.parentNode.id);
    taskPos.push(arrayPos); // return position in array
  }
  function removeReplaceComplete(todo) {
    let position = taskPos[0];
    todoArray.splice(position, 1); // remove the original obj from array
    todoArray.splice(position, 0, todo); // replace with the new obj stemming from todo
  }
  return {
    findTodo : findTodo,
    findTodoPosition : findTodoPosition,
    removeNonModified : removeNonModified,
    replaceTodo : replaceTodo,
    displayInFormDOM : displayInFormDOM,
    findForComplete : findForComplete,
    removeReplaceComplete : removeReplaceComplete,
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
  function closeEditTaskModal() {
    document.querySelector('.edit-task-modal').style.display = 'none';
    console.log(todoArray);
  }
  function openEditTaskModal() {
    document.querySelector('.edit-task-modal').style.display = 'block';
  }
  function check(e) {
    let parent = e.target.parentNode;
    let sibling = e.target.parentNode.nextSibling;
    e.target.remove();
    const checked = new Image();
    checked.src = CheckFilled;
    checked.classList.add('complete');
    sibling.classList.add('crossed');
    parent.appendChild(checked);
  }
  function uncheck(e) {
    console.log(e.target.parentNode);
    let parent = e.target.parentNode;
    let sibling = e.target.parentNode.nextSibling;
    sibling.classList.remove('crossed');
    e.target.remove();
    const check = new Image();
    check.src = CheckBlank;
    check.classList.add('incomplete');
    parent.appendChild(check);
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
        if (todo.status == 'complete') {
          const checkfilled = new Image();
          checkfilled.src = CheckFilled;
          checkfilled.classList.add('complete');
          row__status.appendChild(checkfilled);
        }
        else if (todo.status == 'incomplete') {
          const checkbox = new Image();
          checkbox.src = CheckBlank;
          checkbox.classList.add('incomplete');
          row__status.appendChild(checkbox);
        }
        row__left.appendChild(row__status);
        const row__titleproject = document.createElement('div');
        row__titleproject.classList.add('todo-row__titleproject');
        row__left.appendChild(row__titleproject);
          const row__title = document.createElement('div');
          row__title.classList.add('todo-row__title');
          if (todo.status == 'complete') {
            row__title.classList.add('crossed');
          }
          row__title.textContent = todo.title;
          row__titleproject.appendChild(row__title);
          if (clickedList == "all" || clickedList == "today" || clickedList == "week") {
            const row__project = document.createElement('div');
            row__project.classList.add('todo-row__projectName');
            row__project.textContent = todo.project;
            row__titleproject.appendChild(row__project);
          }
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
        const row__chevron = document.createElement('div');
        row__chevron.classList.add('chevron-closed');
          const chevronDown = new Image();
          chevronDown.src = ChevronDown;
          chevronDown.classList.add('chevron');
          row__chevron.appendChild(chevronDown);
          row__right.appendChild(row__chevron);
        const row__overflow = document.createElement('div');
        row__overflow.classList.add('overflow');
            const overflow = new Image();
            overflow.src = Overflow;
            overflow.classList.add('overflow');
            row__overflow.appendChild(overflow);
            row__right.appendChild(row__overflow);
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
      fullRow.appendChild(expanded);
      const notesLabel = document.createElement('div');
      notesLabel.classList.add('notes-label');
      notesLabel.textContent = 'Notes';
      expanded.appendChild(notesLabel);
      const notesText = document.createElement('div');
      notesText.classList.add('notes-text');
      let retrieved = todoArray.filter(note => note.id == todoRowId);
      let parent = e.target.parentNode;
      e.target.remove();
        const chevronUp = new Image();
        chevronUp.src = ChevronUp;
        chevronUp.classList.add('chevron');
        parent.appendChild(chevronUp);
      notesText.textContent = retrieved[0].notes;
      expanded.appendChild(notesText);
    }
  }
  function openActionModal(e) {
    let overflowDiv = e.target.parentNode;
    const actionModal = document.createElement('div');
    actionModal.classList.add('action-modal');
    const edit = document.createElement('div');
    edit.classList.add('action-edit');
    const editimg = document.createElement('div');
    edit.appendChild(editimg);
      editimg.classList.add('pencil');
      const pencil = new Image();
      pencil.src = Pencil;
      editimg.appendChild(pencil);
    edit.textContent = 'Edit task';
    actionModal.appendChild(edit);
    const del = document.createElement('div');
    del.classList.add('action-delete');
    const delimg = document.createElement('div');
    del.appendChild(delimg);
    delimg.classList.add('trashcan');
      const trash = new Image();
      trash.src = Trash;
      delimg.appendChild(trash);
    del.textContent = 'Delete task';
    actionModal.appendChild(del);
    overflowDiv.appendChild(actionModal);
  }
  function closeActionModal(e) {
    const actionModal = document.querySelector('.action-modal')
    actionModal.remove();
  }
  return {
    closeTaskModal : closeTaskModal,
    openTaskModal : openTaskModal,
    displayTodo: displayTodo,
    expandTodo : expandTodo,
    openActionModal : openActionModal,
    closeActionModal : closeActionModal,
    openEditTaskModal : openEditTaskModal,
    closeEditTaskModal : closeEditTaskModal,
    check : check,
    uncheck : uncheck,
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
    if (matchingArray.length == 0) {
      const main = document.querySelector('.main-body');
      const empty = document.createElement('div');
      empty.classList.add('empty-state');
      const emptyText = document.createElement('div');
      emptyText.classList.add('empty-text');
      emptyText.textContent = 'Lucky you! There are no tasks here.';
      const llama = new Image();
          llama.src = Llama;
          llama.classList.add('llama');
      empty.appendChild(llama);
      empty.appendChild(emptyText);
      main.appendChild(empty);     
    }
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
  modifyTodo,
  taskMatch,
  todoArray,
}