export const generateId = () => Math.floor(Math.random()*100000)

export const addTodo = (list, item) => [...list, item]

export const findById = (id, list) => list.find(l => l.id === id)

export const toggleTodo = (item) => ({...item, isComplete: !item.isComplete})

export const updateTodo = (list, item) => {
    const index = list.findIndex(l => l.id === item.id);
    return [...list.slice(0, index), item, ...list.slice(index+1)];
}

export const removeTodo = (list, id) => {
    const index = list.findIndex(l => l.id === id);
    return [...list.slice(0, index), ...list.slice(index+1)]
}

export const filterTodos = (list, route) => {
    switch(route) {
        case '/active':
            return list.filter(l => !l.isComplete);
        case '/complete':
            return list.filter(l => l.isComplete);
        default:
            return list
    }
}