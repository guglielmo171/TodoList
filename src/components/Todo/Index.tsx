import React from 'react';
import Header from './Header';
import Form from './Form';
import List from './List';
import Item from './Item';
import ThemeSwitch from "../Theme/ThemeSwitch";


const Todo = () => {
    return (
        <div className="space-y-8 transition-all duration-300">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 dark:from-purple-400 dark:to-blue-300">
                    TaskFlow
                </h1>
                <ThemeSwitch />

            </div>

            <div
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all duration-300">
                <div className="p-6">
                    <Todo.Header/>
                    <Todo.Form/>
                </div>
                <Todo.List renderItem={ (todo)=>(<Todo.Item todo={todo} key={todo.id} />) } />
            </div>

            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                Drag and drop tasks to reorder • Click to edit
            </p>
        </div>

        // <div className="container mx-auto max-w-md p-4">
        //     <Todo.Header />
        //     <Todo.Form />
        //     <Todo.List />
        // </div>
    );
};

// Aggiungiamo i subcomponenti come proprietà statiche
Todo.Header = Header;
Todo.Form = Form;
Todo.List = List;
Todo.Item = Item;

export default Todo;


