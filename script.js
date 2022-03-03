//access elements
const todoInput= document.querySelector('.todo-input');
const todoButton= document.querySelector('.todo-button');
const todoList= document.querySelector('.todo-list');
//add action listener
todoButton.addEventListener('click', addNewItem);
document.addEventListener('DOMContentLoaded', getTodoListOnLoad);
todoList.addEventListener('click', handelDeleteOrEdit);

//function to add task list into the ul
function addNewItem(e){

    e.preventDefault();
   
    let newDiv= document.createElement('div')
      let newItem = `
        <li>${todoInput.value}</li>
        <i class="fa-solid fa-pen"></i>
        <i class="fa-solid fa-trash"></i>`;

      newDiv.innerHTML= newItem;
      todoList.appendChild(newDiv)
      newDiv.classList.add('todo-item') //add style for div

      saveToLocalStorage(todoInput.value);
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

}