//access elements
const todoInput= document.querySelector('.todo-input');
const todoButton= document.querySelector('.todo-button');
const todoList= document.querySelector('.todo-list');
//add action listener
todoButton.addEventListener('click', addNewItem);

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
    todoInput.value=""; //!once task added leave the input blank
}

