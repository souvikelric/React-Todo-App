import React from "react";

export default function Todo({ todo, toggle, deleteTodo }) {
  function handleToggle() {
    toggle(todo.id);
  }
  function handleDelete() {
    deleteTodo(todo.id);
  }
  return (
    <div className="todo-items">
      <label>
        <input
          type="checkbox"
          checked={todo.complete}
          onChange={handleToggle}
        />
        {todo.name}
        <button onClick={handleDelete} className="close">
          Delete
        </button>
      </label>
    </div>
  );
}
