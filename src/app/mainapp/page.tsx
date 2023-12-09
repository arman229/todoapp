'use client'
import React, { useState} from "react";
import {FaTrash} from 'react-icons/fa';
import {Todo} from "@/app/mainapp/Todo";

export default function Mainpage() {

    const [todos, setTodos] = useState<Todo[]>([])
    const [newTodo, setNewTodo] = useState("");
    const completed = (todos.filter(item => item.status)).length
    const pending = (todos.filter(item => !item.status)).length
     const addaudio = new Audio('/audio/audio.mp3');
    const removeaudio = new Audio('/audio/remove.mp3');
    const markasdone = new Audio('/audio/markasdone.mp3');
    const addTodo = () => {
        if (newTodo.trim() !== "") {
            const newTodoItem:Todo = {
                id: todos.length + 1,
                name: newTodo,
                status: false,
            };
            setTodos((prevTodos) => [...prevTodos, newTodoItem]);
            addaudio.play()
            setNewTodo("");
        }
    };
    const markComplete = (id:number) => {
        setTodos((preitem) => preitem.map((item) =>
            item.id === id ? {...item, status: !item.status} : item)
        )
        markasdone.play()
    }
    const Deleteitem = (id:number) => {
        setTodos((prevItems) =>
            prevItems.filter((item) => item.id !== id)
        );
        removeaudio.play()
    };
    return (
        <div className="   mx-auto mt-4 p-4" style={{maxWidth: '470px'}}>
            <div className="relative text-xl my-8">
                <input type="search" id="search" value={newTodo}
                       onChange={(e) => setNewTodo(e.target.value)}
                       className="block w-full  py  p-2   border    rounded-lg              "
                       placeholder="Add New Todo..." required autoComplete="off"/>
                <button type="submit" onClick={addTodo}
                        className=" text-xl   text-white absolute top-1.5 end-2.5 bottom-1.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4   dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> +
                </button>
            </div>
            <div className="border p-2 bg-blue-100 rounded-lg shadow">
                <h1 className="text-2xl font-bold mb-4 ps-2">Todos List</h1>
                <div className="flex justify-around mb-4">
                    <p className="font-bold  text-blue-600">Total: {todos.length} </p>
                    <p className="font-bold text-green-500">Completed : {completed} </p>
                    <p className="font-bold  text-red-600">Pending : {pending}  </p>
                </div>
                <div className="flex items-center   rounded-md p-2 mb-4 bg-blue-700 text-white">
                    <div className="w-1/12 text-center">#</div>
                    <div className="w-5/12">Todos Title</div>
                    <div className="w-3/12 text-center">Status</div>
                    <div className="w-3/12 text-center">Delete</div>
                </div>
                <ul id="todoList" className="list-none">
                    {todos.map((item) => (
                        <li key={item.id}
                            className={`${item.status ? "bg-green-500" : "bg-red-600"}   flex items-center text-white  rounded-md p-2 mb-2`}>
                            <div className="w-1/12 text-center"><input type="checkbox"
                                                                       onClick={() => markComplete(item.id)}/></div>
                            <div className="w-5/12">{item.name}</div>
                            <div className="w-3/12 text-center">
                                {item.status ? "completed" : "pending"}
                            </div>
                            <div className="w-3/12 text-center">
                                <button className="text-white   hover:text-black "
                                        onClick={() => Deleteitem(item.id)}><FaTrash/></button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}



