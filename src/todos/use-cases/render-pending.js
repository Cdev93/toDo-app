import todoStore, { Filters } from "../../store/todo.store";

let element;


export const renderPending = (elementId) =>{

    if (!element) element = document.querySelector(elementId);

    if (!element) throw new Error ('not found this element');

    element.innerHTML = todoStore.getTodos(Filters.Pending).length;

}