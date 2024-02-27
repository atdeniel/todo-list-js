import todoStore, {Filters} from "../../store/todo.store.js";

export const pendingCount = (elementId) => {
    let element;
    if (!element) element = document.querySelector(elementId);
    if (!element) throw new Error(`Element ${ elementId} not found`);
    element.innerHTML = todoStore.getTodos(Filters.Pending).length;
}