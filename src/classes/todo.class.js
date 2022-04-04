export class Todo{

    static fromJSON({task, id, finished, created}){
        const tempTodo = new Todo(task);
        tempTodo.id = id;
        tempTodo.finished = finished;
        tempTodo.created = created;

        return tempTodo;
    }

    constructor(task){
        this.task = task;
        this.id = new Date().getTime();
        this.finished = false;
        this.created = new Date();
    }
}