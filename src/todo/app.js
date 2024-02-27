import appHtml from './app.html?raw';
import todoStore, {Filters} from "../store/todo.store.js";
import {pendingCount, renderTodos} from "./use-cases/index.js";

const ElementIDs = {
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    deleteCompletedTodo: '.clear-completed',
    TodoFilters: '.filtro',
    PendingCountLabel: '#pending-count'

}
/**
 *
 * @param elementId
 * @constructor
 */
export const App = ( elementId ) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
        renderTodos( ElementIDs.TodoList, todos );
        updatePendingCount();
    }

    const updatePendingCount = () => {
        pendingCount(ElementIDs.PendingCountLabel)
    }


    // Cuando la funcion App() se llama
    (()=> {
        const app = document.createElement('div');
        app.innerHTML = appHtml;
        document.querySelector(elementId).append(app);
        todoStore.initStore();
        displayTodos();
    })();

    const newDescriptionInput = document.querySelector( ElementIDs.NewTodoInput );
    const todoListUL = document.querySelector( ElementIDs.TodoList );
    const deleteCompletedTodoButton = document.querySelector( ElementIDs.deleteCompletedTodo );
    const filtersULs = document.querySelectorAll( ElementIDs.TodoFilters );


    newDescriptionInput.addEventListener( 'keyup', ( event ) => {
        if ( event.keyCode != 13 ) return;
        if ( event.target.value.trim().length === 0 ) return;

        todoStore.addTodo(event.target.value);
        displayTodos();

        event.target.value = ''
    });

    todoListUL.addEventListener('click', (event) => {
        // busca el elemento padre con el elemento id mas cercano
        const element =  event.target.closest('[data-id]');
        elementId = element.getAttribute('data-id');
        todoStore.toggleTodo(elementId);
        displayTodos();
    });


    todoListUL.addEventListener('click', (event) => {
        const isDestroyElement =  event.target.className === 'destroy';
        const element =  event.target.closest('[data-id]');
        if ( !element || !isDestroyElement ) return;
        elementId = element.getAttribute('data-id');
        todoStore.deleteTodo(elementId);
        displayTodos();
    });

    deleteCompletedTodoButton.addEventListener('click', (event) => {
        todoStore.deleteCompletedTodo()
        displayTodos();
    });

    filtersULs.forEach( element => {
        element.addEventListener('click', (element) => {
            filtersULs.forEach( el => el.classList.remove('selected'))
            element.target.classList.add('selected');

            switch (element.target.text){
                case 'Todos':
                    todoStore.setFilter(Filters.All);
                break;
                case 'Pendientes':
                    todoStore.setFilter(Filters.Pending);
                break;
                case 'Completados':
                    todoStore.setFilter(Filters.Completed);
                break;
            }

            displayTodos();

        });
    });



}