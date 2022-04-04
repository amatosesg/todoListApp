import { Todo } from "./todo.class";

export class TodoList{
    constructor(){
        this.getLocalStorage();
    }

    newTodo(todo){
        this.todos.push(todo);
        this.saveLocalStorage();
    }

    deleteTodo(id){
        this.todos = this.todos.filter(todo => todo.id != id);
        this.saveLocalStorage();
    }

    finishTodo(id){
        // Recorremos todos los valores de nuestro array todo
        for(const todo of this.todos){
            // Si el id que pasamos y el id del array son el mismo
            if(todo.id == id){
                todo.finished = !todo.finished;
                this.saveLocalStorage();
                break;
            }
        }
    }
    deleteFinishedTodos(){
        this.todos = this.todos.filter(todo => !todo.finished);
        this.saveLocalStorage();
    }

    saveLocalStorage(){
        localStorage.setItem('todo', JSON.stringify(this.todos));
    }

    getLocalStorage(){
        this.todos = (localStorage.getItem('todo')) ? this.todos = JSON.parse(localStorage.getItem('todo')) : [];

        this.todos = this.todos.map(obj => Todo.fromJSON(obj));
        // if(localStorage.getItem('todo')){
        //     this.todos = JSON.parse(localStorage.getItem('todo'));
        // }else{
        //     this.todos = [];
        // }
    } 
}