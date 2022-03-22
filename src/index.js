import _ from 'lodash';
import './style.css';
import {createTodo, updateTodoDOM, storeAndGroup, createList, updateListDOM, modifyTodo, taskMatch, todoArray} from './todolist.js';

document.getElementById("duedate").valueAsDate = new Date();

//open task modal
const createTaskBtn = document.querySelector('.create-task-btn');
createTaskBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  updateListDOM.closeListModal();
  updateTodoDOM.openTaskModal();
})

//open list modal
const createListBtn = document.querySelector('.create-list-btn');
createListBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  updateTodoDOM.closeTaskModal();
  updateListDOM.openListModal();
})

//validating forms
const form = document.querySelectorAll('input');
form.forEach((input => {
  input.addEventListener('input', (e) => {
    e.stopPropagation();
    input.setCustomValidity('');
    input.checkValidity();
    console.log('error');
  });
  input.addEventListener('invalid', (e) => {
    e.stopPropagation();
    if (input.value === '') {
      input.setCustomValidity('This is a required input');
    };
  })
}))

//creating todo item
let i = 0;
const addBtn = document.getElementById('add-btn');
addBtn.addEventListener('click', (e) => {
  let calDate = document.getElementById('duedate').value;
  let convDate = storeAndGroup.convertDate(calDate);
  const todo = createTodo(
    document.getElementById("title").value, 
    document.getElementById("notes").value, 
    convDate,
    document.querySelector('input[name="priority"]:checked').value,
    document.querySelector('.main-title').textContent, 
    i++,
    'incomplete');
  storeAndGroup.storeTodo(todo);
  updateTodoDOM.displayTodo(todo);
  updateTodoDOM.closeTaskModal();
  e.stopPropagation();
})

//creating a list
let listCount = 100;
const addListBtn = document.getElementById('add-list-btn');
addListBtn.addEventListener('click', (e) => {
  const list = createList(
    document.getElementById("list-name").value, 
    document.getElementById("list-desc").value, 
    ++listCount);
  let clickedList = list;
  updateListDOM.displaySideList(list);
  updateListDOM.highlightList(clickedList);
  updateListDOM.clearPage();
  updateListDOM.setTitle(clickedList);
  updateListDOM.closeListModal();
  storeAndGroup.showGroupedList(clickedList);
  createTaskBtn.style.display = "block";
  e.stopPropagation();
})

//switching by list
const listLinks = document.querySelectorAll('.list-nav');
listLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    let clickedList = e.target.id;
    updateListDOM.clearPage();
    updateListDOM.setTitle(clickedList);
    updateListDOM.highlightList(clickedList);
    storeAndGroup.groupTodoProject(clickedList);
    storeAndGroup.showGroupedList(clickedList);
    createTaskBtn.style.display = "block";
    e.stopPropagation();
  });
})

//switching by top part of nav
const dateLinks = document.querySelectorAll('.other-nav');
dateLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    let clickedList = e.target.id;
    updateListDOM.clearPage();
    updateListDOM.setTitle(clickedList);
    storeAndGroup.groupTodoOther(clickedList)
    updateListDOM.highlightList(clickedList);
    storeAndGroup.showGroupedList(clickedList);
    createTaskBtn.style.display = "none";
    e.stopPropagation();
  });
})

//on page load, create initial starter list
window.addEventListener('load', (e) => {
  const startList = createList(
    'Starter List', 
    'This is your default starter list', 
    i++);
  let list = startList;
  let clickedList = startList.name;
  updateListDOM.displaySideList(list);
  updateListDOM.highlightList(list);
  updateListDOM.setTitle(clickedList);
  const todo = createTodo(
    'This is your first task!', 
    'You can even add notes to help you with your tasks!', 
    '03/18/2022',
    'High',
    document.querySelector('.main-title').textContent, 
    0,
    'incomplete');
    console.log(todoArray);
  storeAndGroup.storeTodo(todo);
  updateTodoDOM.displayTodo(todo);
});


//actions on each todo row
let rowId = [];
const parent = document.querySelectorAll('.main-body');
parent.forEach((item) => {
  item.addEventListener('click', (e) => {
    e.stopPropagation();
     //expanding todo
    if (e.target.classList == 'chevron') {
      updateTodoDOM.expandTodo(e);
    }
    //expand actions modal
    else if (e.target.classList == 'overflow') {
      if (document.querySelector('.action-modal') !== null) {
        updateTodoDOM.closeActionModal(e);
      }
      updateTodoDOM.openActionModal(e);
    }
    else if (e.target.classList == 'action-edit') {
      let tgtId = e.target.parentNode.parentNode.parentNode.parentNode.id;
      rowId.push(tgtId);
      modifyTodo.findTodoPosition(e);
      modifyTodo.findTodo(e);
      updateTodoDOM.openEditTaskModal();
      modifyTodo.displayInFormDOM(e);
      updateTodoDOM.closeActionModal(e);
    }
    else if (e.target.classList == 'action-delete') {
      let tgtId = e.target.parentNode.parentNode.parentNode.parentNode.id;
      rowId.push(tgtId);
      modifyTodo.findTodoPosition(e);
      modifyTodo.findTodo(e);
      modifyTodo.removeNonModified(e);
      document.getElementById(rowId[0]).parentNode.remove();
      rowId = [];
    }
    else if (e.target.classList == 'incomplete') {
      rowId = [];
      let tgtId = e.target.parentNode.parentNode.parentNode.id;
      rowId.push(tgtId);
      modifyTodo.findForComplete(e);
      updateTodoDOM.check(e);
      let clickedList = document.querySelector('.main-title').textContent;
      const todo = createTodo(
        taskMatch[0].title, 
        taskMatch[0].notes, 
        taskMatch[0].duedate,
        taskMatch[0].priority,
        document.querySelector('.main-title').textContent, 
        rowId[0],
        'complete');
      document.querySelector('.main-body').textContent ='';
      modifyTodo.removeReplaceComplete(todo);
      storeAndGroup.groupTodoProject(clickedList);
      storeAndGroup.showGroupedList(clickedList);
      e.stopPropagation();
    }
    else if (e.target.classList == 'complete') {
      rowId = [];
      let tgtId = e.target.parentNode.parentNode.parentNode.id;
      rowId.push(tgtId);
      modifyTodo.findForComplete(e);
      updateTodoDOM.uncheck(e);
      let clickedList = document.querySelector('.main-title').textContent;
      const todo = createTodo(
        taskMatch[0].title, 
        taskMatch[0].notes, 
        taskMatch[0].duedate,
        taskMatch[0].priority,
        document.querySelector('.main-title').textContent, 
        rowId[0],
        'incomplete');
      document.querySelector('.main-body').textContent ='';
      modifyTodo.removeReplaceComplete(todo);
      storeAndGroup.groupTodoProject(clickedList);
      storeAndGroup.showGroupedList(clickedList);
      e.stopPropagation();
    }
  })
})


const editBtn = document.getElementById('edit-task-btn');
editBtn.addEventListener('click', (e) => {
  let calDate = document.getElementById('edit-duedate').value;
  console.log(calDate);
  let convDate = storeAndGroup.convertDate(calDate);
  let clickedList = document.querySelector('.main-title').textContent;
  const todo = createTodo(
    document.getElementById("edit-title").value, 
    document.getElementById("edit-notes").value, 
    convDate,
    document.querySelector('input[name="edit-priority"]:checked').value,
    document.querySelector('.main-title').textContent, 
    rowId[0],
    'incomplete');
  document.querySelector('.main-body').textContent ='';
  modifyTodo.removeNonModified(e);
  modifyTodo.replaceTodo(todo);
  storeAndGroup.groupTodoProject(clickedList);
  storeAndGroup.showGroupedList(clickedList);
  updateTodoDOM.closeEditTaskModal();
  console.log(todoArray);
  e.stopPropagation();
})

//closing modals + popovers when not clicked
const taskModal = document.querySelector('.create-task-modal');
const listModal = document.querySelector('.create-list-modal');
const editTaskModal = document.querySelector('.edit-task-modal');

const body = document.querySelector('body');
window.addEventListener('click', (e) => {
  if (e.target == body){
    return;
  }
  else if (taskModal.style.display == 'block' && (!taskModal.contains(e.target) || e.target.classList == 'close')) {
    console.log('if fired');
    updateTodoDOM.closeTaskModal();
    e.stopPropagation();
  }
  else if (editTaskModal.style.display == 'block' && (!editTaskModal.contains(e.target) || e.target.classList == 'close')) {
    console.log('if fired');
    updateTodoDOM.closeEditTaskModal();
    e.stopPropagation();
  }
  else if (listModal.style.display == 'block' && (!listModal.contains(e.target) ||  e.target.classList == 'close')) {
    console.log('if fired');
    updateListDOM.closeListModal();
    e.stopPropagation();
  }
  else if (document.querySelector('.action-modal') !== null && !document.querySelector('.action-modal').contains(e.target)) {
    updateTodoDOM.closeActionModal();
  }
})





