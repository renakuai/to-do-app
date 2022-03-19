import _ from 'lodash';
import './style.css';
import {createTodo, updateTodoDOM, storeAndGroup, createList, updateListDOM} from './todolist.js';

document.getElementById("duedate").valueAsDate = new Date();

//open task modal
const createTaskBtn = document.querySelector('.create-task-btn');
createTaskBtn.addEventListener('click', () => {
  updateTodoDOM.openTaskModal();
})

//open list modal
const createListBtn = document.querySelector('.create-list-btn');
createListBtn.addEventListener('click', () => {
  updateListDOM.openListModal();
})


//creating todo item
let i = 1;
const addBtn = document.getElementById('add-btn');
addBtn.addEventListener('click', () => {
  let calDate = document.getElementById('duedate').value;
  let convDate = storeAndGroup.convertDate(calDate);
  const todo = createTodo(
    document.getElementById("title").value, 
    document.getElementById("notes").value, 
    convDate,
    document.querySelector('input[name="priority"]:checked').value,
    document.querySelector('.main-title').textContent, 
    i++);
  storeAndGroup.storeTodo(todo);
  updateTodoDOM.displayTodo(todo);
  updateTodoDOM.closeTaskModal();
})

//creating a list
const addListBtn = document.getElementById('add-list-btn');
addListBtn.addEventListener('click', (e) => {
  const list = createList(
    document.getElementById("list-name").value, 
    document.getElementById("list-desc").value, 
    i++);
  let clickedList = list;
  updateListDOM.displaySideList(list);
  updateListDOM.highlightList(clickedList);
  updateListDOM.clearPage();
  updateListDOM.setTitle(clickedList);
  updateListDOM.closeListModal();
  createTaskBtn.style.display = "block";
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
    storeAndGroup.showGroupedList(clickedList);
    createTaskBtn.style.display = "none";
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
    'This is a task!', 
    'You can even write notes', 
    '3/18/2022',
    'High',
    document.querySelector('.main-title').textContent, 
    i++);
  storeAndGroup.storeTodo(todo);
  updateTodoDOM.displayTodo(todo);
});

//expanding todo
const parent = document.querySelectorAll('.main-body');
parent.forEach((row) => {
  row.addEventListener('click', (e) => {
    if (e.target.classList == 'chevron') {
      updateTodoDOM.expandTodo(e);
    }
  })
})
