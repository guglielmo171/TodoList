
export interface Todo {
    id: number;
    text: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface TodoState{
    todos: Todo[],
    filter:FilterCriteria

}


export type FilterCriteria='All'|'Completed'|'Uncompleted'

export type TodoAction=
    | { type: 'ADD_TODO'; payload: string }
    | { type: 'TOGGLE_TODO'; payload: number }
    | { type: 'DELETE_TODO'; payload: number }
    | { type: 'UPDATE_TODO'; payload: { id: number; text: string } }
    | { type: 'SET_FILTER'; payload: FilterCriteria }




export interface TodoCtxType{
    todos:Todo[],
    addTodo:(text: string) => void,
    toggleTodo: (id: number) => void,
    deleteTodo : (id: number) => void,
    updateTodo: (id: number,text:string) => void,
    filterTodo:(filterCriteria:FilterCriteria) => void,
    filteredTodos:Todo[]
}