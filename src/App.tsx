import './App.css'
import {TodoProvider} from "./store/TodoProvider";
import React from "react";
import Todo from "./components/Todo/Index";

interface AppProps{

}

const  App:React.FC<AppProps> = ()=> {
  return (
      <main
          className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
              <TodoProvider>
                  <Todo/>
              </TodoProvider>
          </div>
      </main>
  )
}

export default App
