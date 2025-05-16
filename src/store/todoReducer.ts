import {TodoAction, TodoState} from "../types/todo";
import {saveToStorage} from "../services/storage";

export const todoReducer = (state:TodoState, action:TodoAction) => {
    let newState: TodoState;

    switch (action.type) {
        case 'ADD_TODO':
            newState= {
                ...state,
                todos: [
                    ...state.todos,
                    {
                        id: Date.now(),
                        text: action.payload,
                        completed: false,
                        createdAt:new Date(),
                        updatedAt:new Date(),
                    }
                ]
            };
            break;
        case 'TOGGLE_TODO':
            newState= {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.payload
                        ? { ...todo, completed: !todo.completed }
                        : todo
                )
            };
            break;
        case 'DELETE_TODO':
            newState= {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload)
            };
            break;
        case 'UPDATE_TODO':
            newState= {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.payload.id
                        ? { ...todo, text:action.payload.text,updatedAt:new Date() }
                        : todo
                )
            };
            break;
        case "SET_FILTER":
            newState= {
                ...state,
                filter:action.payload
            }
            break;
        default:
            return state;
    }
    saveToStorage(newState);
    return newState;
};
