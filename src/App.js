import Todolist from "./Todolist";
import "./index.css";
import { useState, useRef, useEffect } from "react";

const LOCAL_STORAGE_KEY = "todoList";

function App() {
  const [todos, setTodos] = useState([]);
  const todoRef = useRef();

  useEffect(() => {
    const todoStrings = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (todoStrings) setTodos(todoStrings);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const uuidv4 = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  };

  function clearComplete() {
    const completeTodos = todos.filter((td) => td.complete === false);
    setTodos(completeTodos);
  }

  function toggleCompletion(id) {
    const newTodos = [...todos];
    const td = newTodos.find((t) => t.id === id);
    td.complete = !td.complete;
    setTodos(newTodos);
  }

  function handleTodo(e) {
    const name = todoRef.current.value;
    if (name === "") return;
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }];
    });
    todoRef.current.value = "";
  }

  function deleteTodo(id) {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  }

  return (
    <>
      <div className="container">
        <h1>TodoList App</h1>
        <Todolist
          todos={todos}
          toggle={toggleCompletion}
          deleteTodo={deleteTodo}
        />
        <input ref={todoRef} type="text" />
        <button onClick={handleTodo}>Add Todo</button>
        <button className="completed" onClick={clearComplete}>
          Clear Completed
        </button>
        <div className="left">
          {todos.filter((t) => t.complete === false).length} left to do
        </div>
      </div>
    </>
  );
}

export default App;
