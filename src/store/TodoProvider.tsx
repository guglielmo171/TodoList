import React, {createContext, PropsWithChildren, ReactNode, useContext, useMemo, useReducer} from 'react';
import {FilterCriteria, Todo, TodoAction, TodoCtxType, TodoState} from "../types/todo";
import {loadFromStorage, saveToStorage} from "../services/storage";
import {todoReducer} from "./todoReducer";

export const STORAGE_KEY = 'todoApp';

export const TodoCtx = createContext<TodoCtxType | undefined>(undefined);

const initialState:TodoState = {
    todos: [],
    filter:'All'
};

export const TodoProvider : React.FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(todoReducer, loadFromStorage());

    const filteredTodos = useMemo(()=>{
        return state.todos
            .filter(t=>{
                switch (state.filter){
                    case 'All':
                        return true;
                    case "Completed":
                        return t.completed;
                    case 'Uncompleted':
                        return !(t.completed)
                    default:
                        return true;
                }
            })
    }, [state.todos,state.filter]);

    const addTodo = (text:string) => {
        dispatch({ type: 'ADD_TODO', payload: text });
    };

    const toggleTodo = (id:number) => {
        dispatch({ type: 'TOGGLE_TODO', payload: id });
    };

    const deleteTodo = (id:number) => {
        dispatch({ type: 'DELETE_TODO', payload: id });
    };

    const updateTodo = (id:number,text:string) => {
        dispatch({ type: 'UPDATE_TODO', payload: {id,text} });
    };
    const filterTodo = (payload:FilterCriteria)=>{
        dispatch({ type: 'SET_FILTER', payload });

    }
        return (
        <TodoCtx.Provider
            value={{
                todos: state.todos,
                addTodo,
                toggleTodo,
                deleteTodo,
                updateTodo,
                filterTodo,
                filteredTodos
            }}
        >
            {children}
        </TodoCtx.Provider>
    );
};

export const useTodo = () => {
    const context = useContext(TodoCtx);
    if (!context) {
        throw new Error('useTodo deve essere utilizzato all\'interno di un TodoCtx');
    }
    return context;
};