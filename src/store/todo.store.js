import {Todo} from "../todo/models/todo.model.js";

export const Filters = {
    All: 'All',
    Completed: 'Completed',
    Pending: 'Pending'
}

const state = {
    todos: [
        new Todo('Piedra del alma.'),
        new Todo('Piedra del infinito.'),
        new Todo('Piedra del tiempo.')
    ],
    filter: Filters.All,
}

const initStore  = () => {
    loadLocalStore();
}

const loadLocalStore = () => {
    const stateStore = localStorage.getItem('state');
    if (!stateStore) return;
    const { todos = [], filter = Filters.All } = JSON.parse(stateStore);
    state.todos = todos;
    state.filter = filter;
}

const saveStateToLocalStorage = () => {
    // only string in storages
    localStorage.setItem('state', JSON.stringify(state))
}

const getTodos = ( filter ) => {
    switch ( filter ){
        case Filters.All:
            return [...state.todos];
        case Filters.Completed:
            return state.todos.filter( todo => todo.done);
        case Filters.Pending:
            return state.todos.filter( todo => !todo.done);
        default:
            throw new Error(`${filter} is not valid.`);
    }
}

const addTodo = ( description ) => {
    if (!description) throw new Error('Description is required.');
    state.todos.push( new Todo(description) );
    saveStateToLocalStorage();
}

const toggleTodo = ( todoId ) => {
    state.todos = state.todos.map( todo => {
        if ( todo.id === todoId) {
            todo.done = !todo.done
        } return todo
    });
    saveStateToLocalStorage();
}

const deleteTodo = ( todoId ) => {
    state.todos = state.todos.filter( todo => todo.id !== todoId);
    saveStateToLocalStorage();
}

const deleteCompletedTodo = () => {
    state.todos = state.todos.filter( todo => !todo.done);
    saveStateToLocalStorage();
}

const setFilter = ( filter = Filters.All ) => {
    if (Object.values(Filters).indexOf(filter) < 0) throw new Error('Description is required.');
    state.filter = filter;
}

const getCurrentFilter = () => {
    return state.filter;
}

export default {
    addTodo,
    deleteCompletedTodo,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    loadLocalStore,
    setFilter,
    toggleTodo,
}