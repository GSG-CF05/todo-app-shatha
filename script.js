//access elements
const todoInput= document.querySelector('.todo-input');
const addTaskButton= document.getElementById('add-task-but');
const saveTaskButton= document.getElementById('save-task-but');
const todoList= document.querySelector('.todo-list');
const saveIndex= document.getElementById('save-index');

//add action listener
addTaskButton.addEventListener('click', addNewItem);
document.addEventListener('DOMContentLoaded', getTodoListOnLoad);
todoList.addEventListener('click', handelDeleteOrEdit);

//function to add task list into the ul
function addNewItem(e){

    e.preventDefault();

    if(todoInput.value!=""){ 
    let newDiv= document.createElement('div')
      let newItem = `
        <li>${todoInput.value}</li>
        <i class="fa-solid fa-pen"></i>
        <i class="fa-solid fa-trash"></i>`;

      newDiv.innerHTML= newItem;
      todoList.appendChild(newDiv)
      newDiv.classList.add('todo-item') //add style for div

      saveToLocalStorage(todoInput.value);
    }
    todoInput.value=""; //!once task added leave the input blank
}

//save items to local storage
function saveToLocalStorage(todo){
    let todos
    if(localStorage.getItem('todos')==null){
    todos=[]
    }
    else {
        todos=JSON.parse(localStorage.getItem('todos'))//transforming json string into a js object
    }
    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos))//transforming into js object to json string 
}

// get list in page when it loaded
function getTodoListOnLoad(){
    if(localStorage.getItem('todos')){
        todos= JSON.parse(localStorage.getItem('todos'))
    }

    todos.forEach(todo => {
        let newDiv= document.createElement('div')
      let newItem = `
        <li>${todo}</li>
        <i class="fa-solid fa-pen"></i>
        <i class="fa-solid fa-trash"></i>
      `;
      newDiv.innerHTML= newItem;
      todoList.appendChild(newDiv)
      newDiv.classList.add('todo-item')
    });
}
// function responsible to handel if the event for delete or edit depends on the class
function handelDeleteOrEdit(e){
  if(e.target.classList.contains('fa-trash'))
  deleteTodo(e);
  if(e.target.classList.contains("fa-pen"))
  editTodo(e);
}

//delete function 
function deleteTodo(e){
   let item = e.target.parentNode; //access the parent of e which is div
   let array=JSON.parse(localStorage.getItem('todos')) //access the array from local storage
   let itemDelete=array.indexOf(item.innerText)//get the index for item 
   array.splice(itemDelete, 1)//delete item from array
   localStorage.setItem('todos', JSON.stringify(array))//add array to local storage after delete item
   item.remove();//remove the item from the page
}
//edit function
function editTodo(e){
  let item = e.target.parentNode;
  let allItems=JSON.parse(localStorage.getItem('todos'))
  let itemEdit=allItems.indexOf(item.innerText) //the idex for editable item 
  saveIndex.value=itemEdit; // put a value for hidden input which is index 
  todoInput.value=allItems[itemEdit] // put an editable item in todo input to edit it 
  addTaskButton.style.display="none"; // hide add button
  saveTaskButton.style.display="inline"; //display save button 
}
// function responsible for save edit 
saveTaskButton.addEventListener('click', function(){
  let allItems=JSON.parse(localStorage.getItem('todos'))
  allItems[saveIndex.value]= todoInput.value; 
  localStorage.setItem('todos', JSON.stringify(allItems))
})


//light and dark mood
const bodyElement =document.querySelector('body');
const toggleIcon = document.querySelector('.toggle-icon');

toggleIcon.addEventListener('click' , changeTheme);

function toggleDarkTheme(){
  bodyElement.classList.toggle('dark')
}

function changeTheme(){
  darkMood= localStorage.getItem('dark')
  if(darkMood != 'on'){
    toggleDarkTheme();
    darkMood= localStorage.setItem('dark', 'on')
  }else {
    toggleDarkTheme();
    darkMood= localStorage.setItem('dark', 'off')
  }
}
let darkMood= localStorage.getItem('dark')

if(darkMood == 'on'){
  toggleDarkTheme();
}