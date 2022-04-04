import{ Todo, TodoList } from './classes';
import { createTodoHTML } from './js/components';
import './styles.css';


export const todoList = new TodoList();

todoList.todos.forEach( todo => createTodoHTML(todo));