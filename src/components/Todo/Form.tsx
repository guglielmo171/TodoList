import {useTodo} from "../../hooks/useTodo";
import React, {useCallback, useEffect, useState} from "react";
import {PlusIcon} from "lucide-react";

const Form = ()=>{
    const [text, setText] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const {addTodo} =useTodo();
    const onButtonClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        console.log('Clicked button Test')
    }, []);



    const handleSubmit = (evt:React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        if(text.trim()){
            setIsSubmitting(true)
            // Simulate a slight delay for the animation
            setTimeout(() => {
                addTodo(text)
                setText("")
                setIsSubmitting(false)
            }, 300)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="mb-6">

            <div className="relative" >
                <input
                    type="text"
                    value={text}
                    onChange={(evt) => setText(evt.target.value)}
                    placeholder="Add a new task..."
                    className="w-full pl-4 pr-12 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700
                                                                                  focus:border-purple-500 dark:focus:border-purple-400 focus:ring-2 focus:ring-purple-200
                                                                                  dark:focus:ring-purple-800 focus:outline-none transition-all duration-300
                                                                                  bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100"
                    disabled={isSubmitting}
                />
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`absolute right-2 top-1/2 transform -translate-y-1/2 
                                                              rounded-lg p-2 ${isSubmitting ? "bg-gray-300 dark:bg-gray-700" : "bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"} 
                                                              text-white transition-all duration-300 shadow-md hover:shadow-lg`}
                >
                    <PlusIcon className={`h-5 w-5 ${isSubmitting ? "animate-spin" : ""}`}/>
                </button>
                
            </div>
        </form>
    )
}


export default Form;