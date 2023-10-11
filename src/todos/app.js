import todoStore, { Filters } from '../store/todo.store';
import html from './app.html?raw';
import { renderPending } from './use-cases';
import {renderTodo} from './use-cases/render-todo';



/**
 * 
 * @param {string} elementId 
 */


const ElementIds = {
    ClearCompleted: '.clear-completed',
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    TodoFilters: '.filtro',
    PendingCountLabel: '#pending-count'
}

export const App = (elementId) =>{

    const displayTodos = () =>{

        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        console.log(todos);    
        renderTodo(ElementIds.TodoList, todos);
        updatePendingCount();
    }

    const updatePendingCount = () =>{
        renderPending(ElementIds.PendingCountLabel);
    }

    //cuando se llama App
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();



    //Referencias html

    const newDescriptionInput = document.querySelector(ElementIds.NewTodoInput);
    const todoListUL = document.querySelector(ElementIds.TodoList);
    const ClearCompleted = document.querySelector(ElementIds.ClearCompleted);
    const filtersUL = document.querySelectorAll(ElementIds.TodoFilters);

    //listener
    newDescriptionInput.addEventListener('keyup', (event)=>{
        if (event.keyCode !== 13) return;

        if (event.target.value.trim().length === 0) return;

        todoStore.addTodo(event.target.value);
        displayTodos();

        event.target.value = '';
    })



    todoListUL.addEventListener('click', (event) =>{

        const element = event.target.closest('[data-id]');
        todoStore.toggleTodo(element.getAttribute('data-id'));
        displayTodos();

    })


    
    todoListUL.addEventListener('click', (event) =>{

        if(event.target.matches('.destroy') === true){
            const element = event.target.closest('[data-id]');
            todoStore.deleteTodo(element.getAttribute('data-id'));
            displayTodos();
        }
      
       //console.log(element);

    })



    ClearCompleted.addEventListener('click', () => {
      
            todoStore.deleteCompleted();
            displayTodos();
    })




    filtersUL.forEach( element => {
        element.addEventListener('click', (element) => {
            filtersUL.forEach(el => el.classList.remove('selected'));
            
            element.target.classList.add('selected');

            switch(element.target.text){

            case 'Todos':
               
            todoStore.setFilter(Filters.All)
            break;

            case 'Pendientes':
                
                todoStore.setFilter(Filters.Pending)
                
                break;
    
            case 'Completados':
                
                todoStore.setFilter(Filters.Completed)
                
                break;
                     
        }

        displayTodos();
        });
    })


}