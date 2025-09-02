const totDoInput=document.querySelector('.todo-input');


const totDoButton=document.querySelector('.todo-button');
const todoList=document.querySelector('.todo-list');
const todoFilter=document.querySelector('.filter-todo');
document.addEventListener('DOMContentLoaded',function(e){
    getToDo();
});

totDoButton.addEventListener('click',addToDo);
todoList.addEventListener("click",deleteCheck);
todoFilter.addEventListener("click",filterToDo);

function addToDo(e){

    //li element creation
    const todoDiv=document.createElement('div');
    todoDiv.className='todo';
    const todos=document.createElement("li");
    todos.className="todo-item";
    setToDos(totDoInput.value);
    todos.appendChild(document.createTextNode(totDoInput.value));
    todoDiv.appendChild(todos);
    console.log(todos);
    totDoInput.value="";

    //2 button creation
    const compltBtn=document.createElement('button');
    compltBtn.className="complete-btn";
    compltBtn.innerHTML='<i class="fas fa-check"></i>';
    todoDiv.appendChild(compltBtn);


    const trashBtn=document.createElement('button');
    trashBtn.className="trash-btn";
    trashBtn.innerHTML='<i class="fas fa-trash"></i>';
    todoDiv.appendChild(trashBtn);

    todoList.appendChild(todoDiv);


    e.preventDefault();
}

function deleteCheck(e){
    //cdelete
        ;

    const items=e.target;
    if(items.className==='trash-btn'){
        const todo=items.parentElement;

        todo.classList.add("fall");
        removeToDo(todo);
        todo.addEventListener('transitionend',function(){
            todo.remove();
        })
        
    }


    if(items.className==='complete-btn'){
        const todo=items.parentElement;
        todo.classList.toggle('completed');
        updateToDoStatus(todo);

    }

    e.preventDefault();

}

function filterToDo(e){
    const todos= todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display="flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display="flex";
                }
                else{
                    todo.style.display="none";
                }
                break;

            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display="flex";
                }
                else{
                    todo.style.display="none";
                }
                break;

            default:
                console.log(e.target.value);

        }
    });

    e.preventDefault();
}


function setToDos(todoText) {
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push({ text: todoText, completed: false });
    localStorage.setItem("todos", JSON.stringify(todos));
}



function getToDo(){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function(todo){
        const todoDiv = document.createElement("div");
        todoDiv.className = "todo";

        const todoItem = document.createElement("li");
        todoItem.className = "todo-item";
        todoItem.appendChild(document.createTextNode(todo.text));
        todoDiv.appendChild(todoItem);

        // if it was completed, add completed class
        if (todo.completed) {
            todoDiv.classList.add("completed");
        }

        const compltBtn = document.createElement("button");
        compltBtn.className = "complete-btn";
        compltBtn.innerHTML = '<i class="fas fa-check"></i>';
        todoDiv.appendChild(compltBtn);

        const trashBtn = document.createElement("button");
        trashBtn.className = "trash-btn";
        trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
        todoDiv.appendChild(trashBtn);

        todoList.appendChild(todoDiv);
    });
}




function removeToDo(todo) {
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoText = todo.children[0].innerText;

    todos = todos.filter(item => item.text !== todoText);

    localStorage.setItem("todos", JSON.stringify(todos));
}


function updateToDoStatus(todo){
    let todos = JSON.parse(localStorage.getItem("todos"));
    const todoText = todo.children[0].innerText;

    todos.forEach(function(item){
        if(item.text === todoText){
            item.completed = todo.classList.contains("completed");
        }
    });

    localStorage.setItem("todos", JSON.stringify(todos));
}
