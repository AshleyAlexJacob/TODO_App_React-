import React, { useRef, useEffect } from 'react';
import { useState } from 'react';
import { TrashIcon } from "@heroicons/react/outline";
export const TODO_KEY = "TODOS";
  

function App() {
  const [todos, setTodos] = useState<string[]>([]);
  const nameRef = useRef<HTMLInputElement>(null); //To get access to the input field value from html
  // Business Logic to add the todos to our list
  useEffect(() => {
    const jsonTodos = localStorage.getItem(TODO_KEY);
    if (jsonTodos) setTodos(JSON.parse(jsonTodos));
  }, []);

  useEffect(() => {
    localStorage.setItem(TODO_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    // assignment of the value
    const name = nameRef.current?.value ?? "";
    if (name === "") return;
    // then addinng the todo to our list 
    // using spread operator to add the new item

    setTodos([...todos, name]);
    // clearing the current list
    if (nameRef.current) {
      nameRef.current.value = "";
    }
  };
  const removeTodo = (index: number) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };
  return (
    <div className="w-screen h-screen flex flex-col items-center space-y-8 pt-40 dark">
        <h1 className="text-4xl font-medium  font-sans">TODO List</h1>
        <div className="flex space-x-2 flex-row">
          <input className="border rounded px-4 py-2"
              ref={nameRef}
              type="text"
          />  
            <button className="bg-blue-700 py-2 px-4 rounded text-white hover:bg-blue-900" 
        onClick={()=>{addTodo()}}>Add</button>
        </div>
        {
          todos.map((value,index)=>{
           return (
             <div className="flex justify-between w-80" 
              key={index}>
               <p>{value}</p>
               <TrashIcon
          className="w-6 h-6 text-gray-400 cursor-pointer hover:text-gray-700"
          onClick={() => removeTodo(index)}
        ></TrashIcon>
             </div>
           );
          })
        }
      
    </div>
  );
}

export default App;
