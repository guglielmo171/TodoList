import {TodoCtx} from "../store/TodoProvider";
import {useContext} from "react";

export const useTodo = () => {
    const context = useContext(TodoCtx);
    if (!context) {
        throw new Error('useTodo deve essere utilizzato all\'interno di un TodoCtx');
    }
    return context;
};