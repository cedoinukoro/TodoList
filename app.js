// // order of things to do
// 1- define vars that are important for the app (whole form, buttons, input, you can put a console log to make sure they are selected properly);

// Call functions that will be created 
// Create the Event listener 
// create the function ==>
// for an element to be appended
// make a statement for condition before running fct
// create li, give it a class, 
// create link that goes inside li, give it class, add the html inside (icon). 
// append link to li
// append li to ul (or .collection here).




// Define UI Vars
// contains the new tasks and button as children
const form = document.getElementById('task-form');
// that is where the new tasks will appear
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.getElementById('filter');
const taskInput = document.getElementById('task');

// call function
loadEventListeners();

// Function to load all event listeners
function loadEventListeners(){
  // DOM Load event (stored in local storage)
  document.addEventListener('DOMContentLoaded', getTasks);
  // add task event on Submit
  form.addEventListener('submit' , addTask);
  // remove task event on the ul (delegation)
  taskList.addEventListener('click',removeTask);
  // clear task event
  clearBtn.addEventListener('click', removeAllTasks);
  // filter tasks event
  filter.addEventListener('keyup', filterTasks);
};

// get Tasks from LocalStorage
function getTasks() {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
   tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task){
  const li = document.createElement('li');
  li.className = 'collection-item';
  li.appendChild(document.createTextNode(task));
  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class="fa fa-remove"></i>';
  li.appendChild(link);
  taskList.appendChild(li);
  })
}
// Create event on submit
function addTask(e){
  // make sure there is a value inside
  if( taskInput.value === '') {
    alert('Type a task to add !');
  } else {
  //  create a list item with the element typed in taskInput
  const li = document.createElement('li');
  // add a class to the li
  li.className = 'collection-item';
  // Create textNode and append to the li
  li.appendChild(document.createTextNode(taskInput.value));
  // add the link element for remove
  const link = document.createElement('a');
  // add class to link
  link.className = 'delete-item secondary-content';
  // add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // append link to li
  li.appendChild(link);
  // append li to ul
  taskList.appendChild(li);

  // Store in LocalStorage
  storeTaskInLocalStorage(taskInput.value);

  // clear after input
  taskInput.value = '';
  }

  e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
   tasks = JSON.parse(localStorage.getItem('tasks'));
  }
   tasks.push(task);

   localStorage.setItem('tasks',JSON.stringify(tasks));
};
// remove task
function removeTask(e){
  // check if the parent of where we click contains a class
if(e.target.parentElement.classList.contains('delete-item')) {
  if(confirm('Are you sure ?')) {
  // we want to delete the parent of the parent <li>
  e.target.parentElement.parentElement.remove();

  // Remove from LS
  removeTaskFromLocalStorage(e.target.parentElement.parentElement);
   }
  } 
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
   tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task,index){
  if(taskItem.textContent === task){
    tasks.splice(index, 1);
  }
  });
  localStorage.setItem('tasks',JSON.stringify(tasks));
}

function removeAllTasks(){
// 2 ways to to this
// taskList.innerHTML = "";

// Faster :loop with a while loop and remove each one
 while(taskList.firstChild) {
   taskList.removeChild(taskList.firstChild);
 }
// while ul has a child, remove this first child of the tasklist

// CLEAR from LS
clearTasksFromLocalStorage();
}

// Clear FROM LS
function clearTasksFromLocalStorage(){
localStorage.clear();
}

// filter Tasks
function filterTasks(e){
  // get the value of what we type in filter and put it to lower case to avoid confusion
  const text = e.target.value.toLowerCase();
  
  // loop thru all li with this class, we can do ForEach loop because Li are node list !
  // get element by class would no work !
  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    // This method returns -1 if the value to search for never occurs. so if the value occurs show block
    if(item.toLowerCase().indexOf(text) != -1){ task.style.display = 'block';

    } else { task.style.display = 'none';

    }

  });
}
