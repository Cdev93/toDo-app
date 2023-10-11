import {createTodoHtml} from './create-todo-html';


let element;


export const renderTodo = (elementId, todos = []) =>{

    if (!element) element = document.querySelector(elementId);

    if (!element) throw new Error(`element ${elementId} not found`);

    element.innerHTML = '';


    todos.forEach(todo => {

       element.append(createTodoHtml(todo));
    });

}