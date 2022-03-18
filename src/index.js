import _ from 'lodash';
import './style.css';
import {createTodo, updateTodoDOM, storeAndGroup, createList, updateListDOM} from './todolist.js';


document.getElementById("duedate").valueAsDate = new Date();

//open modal
const createBtn = document.querySelector('.create-btn');
createBtn.addEventListener('click', () => {
  updateTodoDOM.openModal();
})

// switching between task + project modal
const newType = document.querySelectorAll('li.new-type');
newType.forEach((button) => {
  button.addEventListener('click', (e) => {
    if (e.target.id == 'new-task') {
      document.getElementById('task-form').style.display = 'flex';
      document.getElementById('list-form').style.display = 'none';
    }
    else if (e.target.id == 'new-list') {
      document.getElementById('list-form').style.display = 'flex';
      document.getElementById('task-form').style.display = 'none';
    }
  })
})

//adding to do item + todo list DOM
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
    document.getElementById('project-dropdown').value, 
    i++);
  storeAndGroup.storeTodo(todo);
  updateTodoDOM.displayTodo(todo);
  updateTodoDOM.closeModal();
})

//creating a list
const addListBtn = document.getElementById('add-list-btn');
addListBtn.addEventListener('click', (e) => {
  const list = createList(
    document.getElementById("list-name").value, 
    document.getElementById("list-desc").value, 
    i++);
  let clickedList = list.name;
  updateListDOM.displaySideList(list);
  updateListDOM.highlightList(list);
  updateListDOM.clearPage();
  updateListDOM.setTitle(clickedList);
  updateListDOM.closeModal();
  updateListDOM.linkListToModal(list);
})

//switching by list
const listLinks = document.querySelectorAll('.list-nav');
listLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    let clickedList = e.target.id;
    updateListDOM.clearPage();
    updateListDOM.setTitle(clickedList);
    storeAndGroup.groupTodoProject(clickedList);
    storeAndGroup.showGroupedList(clickedList);
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
  });
})

