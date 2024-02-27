


export const createTodoHtml = ( todo ) => {
    if ( !todo ) throw new Error('A Todo object is required.')

    // se puede desestructurar el Todo
    // const { done, description, id } = todo;

    const html = `
        <div class="view">
            <input class="toggle" type="checkbox" ${ todo.done ? 'checked': ''}>
                <label>"${todo.description}"</label>
                <button class="destroy"></button>
        </div>
        <input class="edit" value="${todo.description}">
    `;
    const liElement = document.createElement('li')
    liElement.innerHTML = html;
    liElement.setAttribute('data-id', todo.id);


    if ( todo.done )
        liElement.classList.add('completed')

    return liElement

}


