import {createTodoHtml} from "./create-todo-html.js";


let element;

/**
 *
 * @param elementId
 * @param todos
 */
export const renderTodos = ( elementId, todos = []) => {

    if ( !element )
        element = document.querySelector( elementId );

    if ( !element ) throw new Error(`Element ${elementId} not found`)

    element.innerHTML = '';

    todos.forEach( todo => {
        element.append( createTodoHtml(todo) );
    });
}