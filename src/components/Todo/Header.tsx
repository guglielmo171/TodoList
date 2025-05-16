import {useTodo} from "../../hooks/useTodo";

const Header = ()=>{

    const { todos } = useTodo();
    const completedTodos = todos.filter(todo => todo.completed).length;

    return (
        <div className="mb-6 text-center">
            <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 dark:from-purple-400 dark:to-blue-300">La Mia Todo List</h1>
            {todos.length > 0 && <p className="text-gray-600">Completati {completedTodos} di {todos.length} task</p>}
            {!(todos.length > 0) && <p className="text-gray-600">Aggiungi il tuo primo task!</p>}
        </div>
    );
}

export default  Header;