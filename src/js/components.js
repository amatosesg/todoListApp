import { todoList } from "../index";
import { Todo } from "../classes";

// HTML References
const divTodoList = document.querySelector('.todo-list');
const inputTxt = document.querySelector('.new-todo');
const btnDeleteCompleted = document.querySelector('.clear-completed'); 
const ulFilters = document.querySelector('.filters');
const aFilters = document.querySelectorAll('.filtro');

export const createTodoHTML = (todo) =>{
    const htmlTodo = `
        <li class="${(todo.finished) ? 'completed' : ''}" data-id="${todo.id}">
			<div class="view">
				<input class="toggle" type="checkbox" ${(todo.finished) ? 'checked' : ''}>
				<label>${todo.task}</label>
				<button class="destroy"></button>
			</div>
			<input class="edit" value="Create a TodoMVC template">
		</li>`;
    
    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild);

    return div;
}

// Events
// Evento para recibir el task que inserta el cliente
inputTxt.addEventListener('keyup', (event) =>{
    // Se evalua si ha pulsado enter y no esta vacio
    if(event.keyCode === 13 && inputTxt.value.length > 0){
        // Crea el nuevo TODO con el valor del input
        const newTodo = new Todo(inputTxt.value);

        // Lo guarda en array
        todoList.newTodo(newTodo);

        // Crea el elemento HTML para mostrarlo en pantalla y reinicia el input
        createTodoHTML(newTodo);
        inputTxt.value = '';
    }
});
divTodoList.addEventListener('click', (event) =>{
    const elementName = event.target.localName;
    const elementTodo = event.target.parentElement.parentElement;
    const idTodo = elementTodo.getAttribute('data-id');

    if(elementName.includes('input')){
        todoList.finishTodo(idTodo);
        elementTodo.classList.toggle('completed');
    }else if(elementName.includes('button')){
        todoList.deleteTodo(idTodo);
        divTodoList.removeChild(elementTodo);
    }
});

btnDeleteCompleted.addEventListener('click', ()=>{
    todoList.deleteFinishedTodos();
    for(let i = divTodoList.children.length - 1; i >= 0; i--){
        const element = divTodoList.children[i];
        if(element.classList.contains('completed')){
            divTodoList.removeChild(element);
        }
    }
});

ulFilters.addEventListener('click', (event) =>{
    const filter = event.target.text;
    if(!filter) {return;}

    aFilters.forEach(element => element.classList.remove('selected'));
    event.target.classList.add('selected');

    for(const element of divTodoList.children){
        element.classList.remove('hidden');
        const completed = element.classList.contains('completed');

        switch( filter ){
            case 'Pendientes':
                if(completed){
                    element.classList.add('hidden');
                }
                break;
            case 'Completados':
                if(!completed){
                    element.classList.add('hidden');
                }
                break;
        }

    }
})