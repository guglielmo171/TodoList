import {Todo, TodoState} from "../types/todo";
import {STORAGE_KEY} from "../store/TodoProvider";

export const loadFromStorage = ():TodoState =>{
    try {
        const storedData = sessionStorage.getItem(STORAGE_KEY);
        if(!storedData) return { todos: [],filter:'All' };
        const parsedData = JSON.parse(storedData) ;
        const todosWithDates = parsedData.todos.map((todo:Todo)=>({
            ...todo,
            createdAt: new Date(todo.createdAt),
            updatedAt: new Date(todo.updatedAt),
        }))
        return {
            ...parsedData,
            todos: todosWithDates
        };
    } catch (error) {
        console.error('Errore nel caricamento dei dati da sessionStorage:', error);
        return {filter: 'All', todos: [] };
    }
}

export function saveToStorage(newState: TodoState) {
    try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    }catch (error){
        console.error('Errore nel salvataggio dei dati in sessionStorage:', error);
    }
}


