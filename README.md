# to-do-app
A project to showcase OOP design principles, modules, factory functions, Webpack, etc.

<h3>Overview</h3>
This was the final project of the Intermediate Javascript (front-end track) from The Odin Project. The basic requirements were to create a to-do / task manager app that allowed you to create tasks (with titles, notes, due dates, and priorities), create projects, and modify projects.

<h3>Before coding</h3>
<p><b>Initial design / UX stuff</b>
<br>The first thing I did was create an initial basic UI using Figma and selected a few styles to use (fonts, colors, etc.). so that I understood my HTML / CSS requirements and the basic flow of the actions.

<p><b>Basic code structure</b>
<br>I also did some light brainstorming to understand the different modules / classes I wanted to utilize. I ended up using:
<ul>
  <li>2 factory functions for new tasks and projects</li>
  <li>Several modules for traversing through existing tasks and projects and displaying information in the DOM</li>
  <li>Several event listeners for different actions like closing out of modals, creating todos, expanding details, etc.</li>
  
<h3>The code</h3>
<p><b>The general flow</b>
<br>I ended up recycling a lot of the same functions for the actions a user needed to take for creating a task, creating a project, modifying a task, and displaying the right tasks in the body. Will dive into a few of these flows below:
  
<p>Creating a task:
<ul>
  <li>Event listener triggers Create Task modal to open</li>
  <li>Upon submission, the factory function takes in all the user inputs and generates a task object</li>
  <li>The UI then displays the new object using DOM manipulation functions</li>
</ul>
  
<p>Modifying a task details:
<ul>
  <li>Event listener triggers Edit Task modal to open</li>
  <li>A function finds the targeted task in the list of created tasks</li>
  <li>Inputs in the modal read the values of the found task the prior inputs are displayed in the inputs themselves</li>
  <li>Upon submission, the found task is essentially removed and replaced by the modified version of that task</li>
  <li>The UI then displays the modified object</li>
</ul>

<p>Displaying tasks for this week:
<ul>
  <li>Clicking on 'This week' triggers the whole flow</li>
  <li>A function finds today's date, converts that to MS, and adds on a week to find the week timeframe</li>
  <li>A function then finds tasks with due dates that are within the range</li>
  <li>The UI then displays all the matching tasks for the clicked date range</li>
</ul>

<p><b>Using OOP design principles</b>
<br>This was the first project where I really tried to organize my code in a way that was logical and efficient. I made sure to break up each module into seperate functions that weren't tightly coupled with another function and made sure that each function only did one thing. For example, I utilized a module that was specifically meant for finding + grouping a task object from the full list of tasks. This module has several functions that do things like traversing through the full list of tasks and finding the wanted task (or list of tasks). 
  
<p><b>Factory Functions</b>
<br>Prior to this project, I was kind of confused about when / how to use factory functions as the examples I read didn't really resonate with me. However, I finally used factory functions for this project and it solidified to me the beauty that comes with using a few lines of code to continue to generate new objects. I ended up using the 2 factory functions for new tasks, new projects, and each time a task was modified. It was really neat!
  
<p><b>Other things</b>
<br>I implemeneted some other nice UX-ey things like empty states, utilizing icons, and utilizing accordions to display notes.
 
<h3>Struggles</h3>
<p><b>Implementing closure of modals</b>
<br>I ended spending like 2 days trying to implement the closing of modals when clicking outside of the modal itself. Initially, I couldn't get the modal to stay open when clicking INSIDE of the modal so of course I consulted Google and ended up learning a lot about how Event Bubbling works. I eventually ended up creating a listener function that would close the modal if the target WAS NOT contained in the modal class. I also ended up using this knowledge to implement listeners on objects that don't exist yet (future tasks, nav items)
  
<p><b>The UX of adding tasks to projects</b>
<br>Initially, I had planned on putting the Create Task button on the side and accessible by all nav items. However, I realized that this wouldn't work for the time range nav links (today, this week, etc.) since those should just display already created tasks. I then decided on a model where users are first launched into a sample project where you can add tasks to that specific project.

<p><b>Dates ugh</b>
<br>When I was trying to get the right tasks to display on the 'Today' tab, I realized that for some reason, my original date pulled from the calendar picker was generating a date that was 1 day earlier than it actually was. After some digging, I came upon a stackoverflow post that mentioned that for some reason, formats of YYYY-MM-DD get converted incorrectly. Thus, I realized that I had to convert the date range picker to MM/DD/YYYY first to get the right day.
  

