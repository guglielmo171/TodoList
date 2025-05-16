import {useTodo} from "../../hooks/useTodo";
import React, {useState} from "react";
import { CheckIcon, Trash2Icon, EditIcon } from "lucide-react"
import {formatDate} from "../../utils/dateFormatter";
import {Todo} from "../../types/todo";

interface TodoItemProps{
    todo:Todo
}
const Item : React.FC<TodoItemProps> = ({todo})=>{
    const { toggleTodo, deleteTodo, updateTodo }= useTodo()
    const [editingId, setEditingId] = useState<number | null>(null)
    const [editText, setEditText] = useState("")

    const startEditing = (todo:Todo) => {
        setEditingId(todo.id)
        setEditText(todo.text)
    }

    const saveEdit = () => {
        if (editText.trim() && editingId) {
            updateTodo(editingId, editText)
            setEditingId(null)
        }
    }
    return (
        <li
            key={todo.id}
            className={`group px-6 py-4 transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-700
                     ${todo.completed ? "bg-gray-50 dark:bg-gray-700" : ""}`}
        >
            <div className="flex items-center">
                <button
                    onClick={() => toggleTodo(todo.id)}
                    className={`flex-shrink-0 h-6 w-6 rounded-full border-2 mr-3 flex items-center justify-center
                        transition-all duration-300 ${
                        todo.completed
                            ? "bg-gradient-to-r from-green-400 to-emerald-500 border-transparent"
                            : "border-gray-300 dark:border-gray-600 hover:border-purple-500 dark:hover:border-purple-400"
                    }`}
                    aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
                >
                    {todo.completed && <CheckIcon className="h-4 w-4 text-white"/>}
                </button>

                {editingId === todo.id ? (
                    <div className="flex-grow flex">
                        <input
                            type="text"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            onBlur={saveEdit}
                            onKeyDown={(e) => e.key === "Enter" && saveEdit()}
                            className="flex-grow px-2 py-1 border-b-2 border-purple-500 dark:border-purple-400
                           bg-transparent focus:outline-none text-gray-800 dark:text-gray-200"
                            autoFocus
                        />
                    </div>
                ) : (
                    <div
                        className={`flex-grow ${todo.completed ? "line-through text-gray-400 dark:text-gray-500" : "text-gray-800 dark:text-gray-200"}`}
                        onClick={() => startEditing(todo)}
                    >
                        {todo.text}
                        <p className="text-sm/6 text-white/50">Updated: {formatDate(todo.updatedAt)}</p>
                    </div>
                )}

                <div className="flex-shrink-0 ml-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                    {!editingId && (
                        <button
                            onClick={() => startEditing(todo)}
                            className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 mr-2 p-1"
                            aria-label="Edit task"
                        >
                            <EditIcon className="h-5 w-5"/>
                        </button>
                    )}
                    <button
                        onClick={() => deleteTodo(todo.id)}
                        className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400"
                        aria-label="Delete task"
                    >
                        <Trash2Icon className="h-5 w-5"/>
                    </button>
                </div>
            </div>
        </li>
    );

}

export default Item;