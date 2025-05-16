import React, {ReactNode, useCallback, useState} from 'react';
import {CheckIcon, Trash2Icon, EditIcon, ChevronDownIcon} from "lucide-react";
import {
    Description,
    Field,
    Label,
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
    Select
} from '@headlessui/react'
// import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import {FilterCriteria, Todo} from "../../types/todo";
import {useTodo} from "../../hooks/useTodo";

type ListProps={
    renderItem : (todo:Todo)=> ReactNode
}
const FilterOptions:string[]=['All','Completed','Uncompleted']

const List : React.FC<ListProps> = ({renderItem}) => {
    const {filterTodo,filteredTodos:todos }= useTodo()
    const [editingId, setEditingId] = useState<number | null>(null)
    const [editText, setEditText] = useState("")
    const onButtonClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        // console.log('todos filtered ',filterTodo('All'))
    }, []);
    const onSelectChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(event.currentTarget.value);
        filterTodo(event.currentTarget.value as FilterCriteria)
        // console.log('todos filtered ',filterTodo(event.currentTarget.value as FilterCriteria))
    }, []);


    return (
        <>
            <div className="w-full max-w-md p-4">
                <Field>
                    <Label className="text-sm/6 font-medium text-white">Task status</Label>
                    <Description className="text-sm/6 text-white/50">This will be visible to clients on the
                        project.</Description>
                    <div className="relative">
                        <Select
                            name="filter" id="filter" onChange={onSelectChange}
                            className={clsx(
                                'mt-3 block w-full appearance-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
                                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                                // Make the text of each option black on Windows
                                '*:text-black'
                            )}
                        >
                            <option value="All">All</option>
                            <option value="Completed">Completed</option>
                            <option value="Uncompleted">Uncompleted</option>
                        </Select>
                        <ChevronDownIcon
                            className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
                            aria-hidden="true"
                        />
                    </div>
                </Field>
            </div>

            {todos.length === 0 && <div
                className="flex flex-col items-center justify-center py-12 px-6 border-t border-gray-200 dark:border-gray-700">
                <div
                    className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                    <CheckIcon className="h-12 w-12 text-gray-300 dark:text-gray-600"/>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                    Your task list is empty. Add your first task above!
                </p>
            </div>}

            {todos.length > 0 &&

                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {
                        todos.map((todo) => <React.Fragment key={todo.id}>{renderItem(todo)}</React.Fragment>)
                    }
                </ul>

            }
        </>
    )

};

export default List;